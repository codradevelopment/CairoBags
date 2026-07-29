/**
 * Cairo Bags — live frontend-backend integration audit (read-only + safe test mutations).
 * Run: node scripts/integration-audit.mjs
 */
const BASE = process.env.VITE_API_BASE_URL || "http://localhost:5073";
const ts = Date.now();
const testEmail = `audit_${ts}@cairobags.test`;
const testUser = `audituser_${ts}`;
const testPhone = `010${String(ts).slice(-8)}`;
const testPassword = "AuditTest9!";
const sessionId = `audit-session-${ts}`;

const report = [];
let customerToken = null;
let adminToken = null;
let createdCategoryId = null;
let createdProductId = null;
let variantId = null;
let orderId = null;
let paymentId = null;

function auth(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function req(method, path, { body, token, headers = {}, isForm = false } = {}) {
  const url = `${BASE}${path}`;
  const h = { ...headers, ...auth(token) };
  if (!isForm && body !== undefined) h["Content-Type"] = "application/json";
  const init = { method, headers: h };
  if (body !== undefined) init.body = isForm ? body : JSON.stringify(body);
  const started = Date.now();
  let res, text, data;
  try {
    res = await fetch(url, init);
    text = await res.text();
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }
    return {
      ok: res.ok,
      status: res.status,
      ms: Date.now() - started,
      data,
      raw: typeof data === "string" ? data.slice(0, 300) : data,
    };
  } catch (err) {
    return { ok: false, status: 0, ms: Date.now() - started, error: err.message, data: null };
  }
}

function sample(obj, depth = 0) {
  if (obj == null || depth > 2) return obj;
  if (Array.isArray(obj)) {
    return obj.length ? [sample(obj[0], depth + 1)] : [];
  }
  if (typeof obj !== "object") return obj;
  const out = {};
  for (const [k, v] of Object.entries(obj).slice(0, 20)) {
    out[k] = sample(v, depth + 1);
  }
  return out;
}

function add(flow, endpoint, result, notes = []) {
  report.push({
    flow,
    endpoint,
    live: result.ok,
    status: result.status,
    ms: result.ms,
    sample: result.data ? sample(result.data) : result.error || result.raw,
    notes,
  });
  return result;
}

function keysOf(obj) {
  return obj && typeof obj === "object" && !Array.isArray(obj) ? Object.keys(obj) : [];
}

async function main() {
  console.log(`Auditing against ${BASE}\n`);

  // --- Public catalog ---
  let r = add("Categories", "GET /api/categories", await req("GET", "/api/categories"));
  const categories = Array.isArray(r.data) ? r.data : [];
  const categoryId = categories[0]?.id ?? categories[0]?.Id;

  r = add("Products", "GET /api/products", await req("GET", "/api/products"));
  const products = Array.isArray(r.data) ? r.data : [];
  const productId = products[0]?.id ?? products[0]?.Id;

  if (productId) {
    r = add(
      "Product Details",
      `GET /api/products/${productId}`,
      await req("GET", `/api/products/${productId}`)
    );
    const variants = r.data?.variants ?? r.data?.Variants ?? [];
    variantId = variants[0]?.id ?? variants[0]?.Id;
    const feExpects = ["id", "english", "arabic", "variants", "images", "primaryImageUrl", "lowestPrice"];
    const beKeys = keysOf(r.data).map((k) => k.toLowerCase());
    const missing = feExpects.filter((f) => !beKeys.includes(f.toLowerCase()));
    if (missing.length) report[report.length - 1].notes.push(`FE helpers also read: ${missing.join(", ")} (PascalCase aliases used)`);
  }

  add("Home/Featured", "GET /api/products/featured", await req("GET", "/api/products/featured"));
  add("Home/NewArrivals", "GET /api/products/new-arrivals", await req("GET", "/api/products/new-arrivals"));
  add("Search", "GET /api/products/search?q=bag", await req("GET", "/api/products/search?q=bag"));

  // --- Register ---
  r = add(
    "Register",
    "POST /api/Account/register",
    await req("POST", "/api/Account/register", {
      body: {
        userName: testUser,
        email: testEmail,
        phoneNumber: testPhone,
        password: testPassword,
      },
    })
  );
  if (r.ok) {
    customerToken = r.data?.token ?? r.data?.Token;
    const user = r.data?.user ?? r.data;
    if (!customerToken) report[report.length - 1].notes.push("Missing token in register response");
    if (!(user?.role ?? user?.Role)) report[report.length - 1].notes.push("Missing role in user payload");
  }

  // --- Login (separate call) ---
  const loginEmail = testEmail;
  r = add(
    "Login",
    "POST /api/Account/LogIn",
    await req("POST", "/api/Account/LogIn", {
      body: { email: loginEmail, password: testPassword },
    })
  );
  if (r.ok) customerToken = r.data?.token ?? r.data?.Token ?? customerToken;

  // --- Profile ---
  r = add("Profile Update", "PUT /api/Account/Me", await req("PUT", "/api/Account/Me", {
    token: customerToken,
    body: { email: testEmail, phoneNumber: testPhone, userName: testUser },
  }));
  add("Profile Read", "GET /api/Account/Me", await req("GET", "/api/Account/Me", { token: customerToken }));

  // --- Cart guest ---
  r = add("Cart (guest)", "GET /api/cart", await req("GET", "/api/cart", {
    headers: { "X-Session-Id": sessionId },
  }));

  if (variantId) {
    r = add(
      "Add To Cart",
      "POST /api/cart/items",
      await req("POST", "/api/cart/items", {
        headers: { "X-Session-Id": sessionId },
        body: { productVariantId: variantId, quantity: 1 },
      })
    );
    const items = r.data?.items ?? r.data?.Items ?? [];
    if (r.ok && items.length === 0) report[report.length - 1].notes.push("Cart returned 200 but items empty");
  } else {
    add("Add To Cart", "POST /api/cart/items", { ok: false, status: 0, ms: 0, data: null, error: "No variantId from catalog" }, [
      "Skipped — no in-stock variant in DB",
    ]);
  }

  add("Cart (auth)", "GET /api/cart", await req("GET", "/api/cart", { token: customerToken }));

  // --- Shipping + Checkout ---
  r = add(
    "Shipping Addresses",
    "POST /api/shipping-addresses",
    await req("POST", "/api/shipping-addresses", {
      token: customerToken,
      body: {
        fullName: "Audit User",
        phoneNumber: testPhone,
        governorate: "Cairo",
        city: "Cairo",
        addressLine1: "123 Audit St",
        isDefault: true,
      },
    })
  );
  const addressId = r.data?.id ?? r.data?.Id;

  if (addressId && variantId) {
    // ensure cart has item for auth user
    await req("POST", "/api/cart/items", {
      token: customerToken,
      body: { productVariantId: variantId, quantity: 1 },
    });
    r = add(
      "Order Creation / Checkout",
      "POST /api/checkout",
      await req("POST", "/api/checkout", {
        token: customerToken,
        body: {
          shippingAddressId: addressId,
          paymentMethod: 2,
          notes: "integration audit",
        },
      })
    );
    orderId = r.data?.orderId ?? r.data?.OrderId;
    const checkoutFields = ["orderId", "orderNumber", "totalAmount", "paymentMethod", "paymentStatus", "orderStatus", "nextStepMessage"];
    const present = checkoutFields.filter((f) => r.data && (r.data[f] != null || r.data[f[0].toUpperCase() + f.slice(1)] != null));
    if (r.ok && present.length < checkoutFields.length) {
      report[report.length - 1].notes.push(`Checkout response missing some FE fields; present: ${present.join(", ")}`);
    }
  }

  // --- Orders list ---
  r = add("Account Orders", "GET /api/orders", await req("GET", "/api/orders", { token: customerToken }));
  if (!orderId && Array.isArray(r.data) && r.data[0]) {
    orderId = r.data[0].orderId ?? r.data[0].OrderId;
  }

  if (orderId) {
    add(
      "Order Details",
      `GET /api/orders/${orderId}`,
      await req("GET", `/api/orders/${orderId}`, { token: customerToken })
    );
    add(
      "Payment by Order",
      `GET /api/payments/${orderId}`,
      await req("GET", `/api/payments/${orderId}`, { token: customerToken })
    );
  }

  // --- Notifications ---
  add("Notifications", "GET /api/Notifications", await req("GET", "/api/Notifications", { token: customerToken }));
  add(
    "Notifications unread",
    "GET /api/Notifications/unread-count",
    await req("GET", "/api/Notifications/unread-count", { token: customerToken })
  );

  // --- Try admin login with common dev creds ---
  const adminAttempts = [
    { email: "admin@cairobags.com", password: "Admin@12345" },
    { email: "admin@cairobags.com", password: "Admin12345!" },
  ];
  for (const cred of adminAttempts) {
    const ar = await req("POST", "/api/Account/LogIn", { body: cred });
    if (ar.ok) {
      adminToken = ar.data?.token ?? ar.data?.Token;
      add("Admin Login", "POST /api/Account/LogIn", ar, [`Used seeded admin: ${cred.email}`]);
      break;
    }
  }
  if (!adminToken) {
    add("Admin flows", "POST /api/Account/LogIn", { ok: false, status: 401, ms: 0, data: null }, [
      "No admin credentials available — admin endpoints tested unauthenticated only",
    ]);
  }

  if (adminToken) {
    // Categories CRUD
    r = add(
      "Admin Categories CREATE",
      "POST /api/admin/categories",
      await req("POST", "/api/admin/categories", {
        token: adminToken,
        body: {
          nameAr: `تصنيف ${ts}`,
          nameEn: `Audit Cat ${ts}`,
          slugAr: `audit-cat-ar-${ts}`,
          slugEn: `audit-cat-en-${ts}`,
          sortOrder: 99,
          isActive: true,
        },
      })
    );
    createdCategoryId = r.data?.id ?? r.data?.Id;

    if (createdCategoryId) {
      add(
        "Admin Categories UPDATE",
        `PUT /api/admin/categories/${createdCategoryId}`,
        await req("PUT", `/api/admin/categories/${createdCategoryId}`, {
          token: adminToken,
          body: {
            nameAr: `تصنيف ${ts}`,
            nameEn: `Audit Cat Updated ${ts}`,
            slugAr: `audit-cat-ar-${ts}`,
            slugEn: `audit-cat-en-upd-${ts}`,
            sortOrder: 100,
            isActive: true,
          },
        })
      );
    }

    const catForProduct = createdCategoryId ?? categoryId;
    if (catForProduct) {
      r = add(
        "Admin Products CREATE",
        "POST /api/admin/products",
        await req("POST", "/api/admin/products", {
          token: adminToken,
          body: {
            categoryId: catForProduct,
            status: 1,
            nameAr: `منتج ${ts}`,
            nameEn: `Audit Product ${ts}`,
            slugAr: `audit-prod-ar-${ts}`,
            slugEn: `audit-prod-en-${ts}`,
            variants: [
              {
                colorNameAr: "أسود",
                colorNameEn: "Black",
                sku: `AUDIT-SKU-${ts}`,
                price: 1500,
                quantity: 10,
                lowStockThreshold: 2,
                isDefault: true,
                status: 1,
              },
            ],
          },
        })
      );
      createdProductId = r.data?.id ?? r.data?.Id;
      const newVariants = r.data?.variants ?? r.data?.Variants ?? [];
      const newVariantId = newVariants[0]?.id ?? newVariants[0]?.Id;

      if (createdProductId) {
        add(
          "Admin Products UPDATE",
          `PUT /api/admin/products/${createdProductId}`,
          await req("PUT", `/api/admin/products/${createdProductId}`, {
            token: adminToken,
            body: {
              categoryId: catForProduct,
              status: 1,
              nameAr: `منتج ${ts}`,
              nameEn: `Audit Product Updated ${ts}`,
              slugAr: `audit-prod-ar-${ts}`,
              slugEn: `audit-prod-en-upd-${ts}`,
              variants: [
                {
                  id: newVariantId,
                  colorNameAr: "أسود",
                  colorNameEn: "Black",
                  sku: `AUDIT-SKU-${ts}`,
                  price: 1600,
                  quantity: 10,
                  lowStockThreshold: 2,
                  isDefault: true,
                  status: 1,
                },
              ],
            },
          })
        );
      }
    }

    // Inventory
    r = add(
      "Admin Inventory",
      "GET /api/admin/inventory",
      await req("GET", "/api/admin/inventory", { token: adminToken })
    );
    const invItems = Array.isArray(r.data) ? r.data : [];
    const inv = invItems[0];
    if (inv) {
      const feVariantId = inv.variantId ?? inv.VariantId;
      const beVariantId = inv.productVariantId ?? inv.ProductVariantId;
      if (!feVariantId && beVariantId) {
        report[report.length - 1].notes.push(
          `MISMATCH: FE InventoryPage reads variantId/VariantId but API returns productVariantId=${beVariantId}`
        );
      }
      const productName = inv.productName ?? inv.ProductName;
      const productNameEn = inv.productNameEn ?? inv.ProductNameEn;
      if (!productName && productNameEn) {
        report[report.length - 1].notes.push(
          `MISMATCH: FE reads productName/ProductName but API returns productNameEn/ProductNameAr`
        );
      }
      if (beVariantId) {
        add(
          "Admin Inventory adjust",
          `POST /api/admin/inventory/${beVariantId}/adjust`,
          await req("POST", `/api/admin/inventory/${beVariantId}/adjust`, {
            token: adminToken,
            body: { quantity: 1, notes: "audit" },
          })
        );
      }
    }

    add(
      "Admin Inventory low-stock",
      "GET /api/admin/inventory/low-stock",
      await req("GET", "/api/admin/inventory/low-stock", { token: adminToken })
    );

    // Orders
    r = add(
      "Admin Orders",
      "GET /api/admin/orders",
      await req("GET", "/api/admin/orders", { token: adminToken })
    );
    const adminOrders = Array.isArray(r.data) ? r.data : [];
    const adminOrderId = orderId ?? adminOrders[0]?.orderId ?? adminOrders[0]?.OrderId;
    if (adminOrderId) {
      const detail = add(
        "Admin Order Details",
        `GET /api/admin/orders/${adminOrderId}`,
        await req("GET", `/api/admin/orders/${adminOrderId}`, { token: adminToken })
      );
      const nested = detail.data?.order ?? detail.data?.Order;
      const topPayment = detail.data?.paymentStatus ?? detail.data?.PaymentStatus;
      if (nested && !nested.paymentStatus && !nested.PaymentStatus && topPayment) {
        report[report.length - 1].notes.push(
          "MISMATCH: paymentStatus on admin detail is top-level only; FE OrderDetailsPage reads it from nested order object"
        );
      }
    }

    // Payments
    r = add(
      "Admin Payments",
      "GET /api/admin/payments/pending",
      await req("GET", "/api/admin/payments/pending", { token: adminToken })
    );
    const pending = Array.isArray(r.data) ? r.data : [];
    paymentId = pending[0]?.paymentId ?? pending[0]?.PaymentId;
    if (pending[0]) {
      const p = pending[0];
      if (!(p.orderStatus ?? p.OrderStatus)) {
        report[report.length - 1].notes.push(
          "MISMATCH: PaymentsPage StatusBadge expects orderStatus but AdminPendingPaymentDto has no OrderStatus field"
        );
      }
    }
    if (paymentId) {
      add(
        "Admin Payment Detail",
        `GET /api/admin/payments/${paymentId}`,
        await req("GET", `/api/admin/payments/${paymentId}`, { token: adminToken })
      );
    }

    // Cleanup DELETE
    if (createdProductId) {
      add(
        "Admin Products DELETE",
        `DELETE /api/admin/products/${createdProductId}`,
        await req("DELETE", `/api/admin/products/${createdProductId}`, { token: adminToken })
      );
    }
    if (createdCategoryId) {
      add(
        "Admin Categories DELETE",
        `DELETE /api/admin/categories/${createdCategoryId}`,
        await req("DELETE", `/api/admin/categories/${createdCategoryId}`, { token: adminToken })
      );
    }
  } else {
    add("Admin Categories CRUD", "POST /api/admin/categories", { ok: false, status: 401, ms: 0, data: null }, [
      "Skipped — admin auth unavailable",
    ]);
    add("Admin Products CRUD", "POST /api/admin/products", { ok: false, status: 401, ms: 0, data: null }, [
      "Skipped — admin auth unavailable",
    ]);
    add("Admin Inventory", "GET /api/admin/inventory", await req("GET", "/api/admin/inventory"));
    add("Admin Orders", "GET /api/admin/orders", await req("GET", "/api/admin/orders"));
    add("Admin Payments", "GET /api/admin/payments/pending", await req("GET", "/api/admin/payments/pending"));
  }

  // Products list field check
  if (products[0]) {
    const p = products[0];
    if (!(p.defaultSku ?? p.DefaultSku) && !(p.variants ?? p.Variants)) {
      report.push({
        flow: "Admin Products list (FE)",
        endpoint: "GET /api/products?includeDraft=true",
        live: true,
        status: 200,
        notes: [
          "MISMATCH: ProductsPage searches defaultSku/DefaultSku but ProductSummaryDto has no DefaultSku — SKU search always empty",
        ],
      });
    }
  }

  // Product form edit mapping
  report.push({
    flow: "Admin Product Edit (FE)",
    endpoint: "GET /api/products/{id}",
    live: Boolean(productId),
    notes: [
      "ProductFormPage maps variant.quantity from quantityOnHand — matches ProductVariantDto.QuantityOnHand",
      "ProductFormPage does not send Arabic short/description fields on create — optional backend fields only",
    ],
  });

  const outPath = new URL("../integration-audit-results.json", import.meta.url);
  const fs = await import("fs");
  fs.writeFileSync(outPath, JSON.stringify({ base: BASE, ts: new Date().toISOString(), report }, null, 2));
  console.log(JSON.stringify({ summary: summarize(report), report }, null, 2));
}

function summarize(report) {
  const total = report.length;
  const live = report.filter((r) => r.live).length;
  const mismatches = report.flatMap((r) => (r.notes || []).filter((n) => n.includes("MISMATCH")));
  return { total, live, failed: total - live, mismatches };
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
