import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../../layouts/AdminLayout.jsx";
import { usePageTitle } from "../../hooks/usePageTitle.js";
import { useLocale } from "../../components/layout/LanguageSwitcher.jsx";
import { useToast } from "../../components/ui/Toast.jsx";
import { DataTable } from "../../components/admin/index.js";
import { Button, ConfirmModal, Input } from "../../components/ui/index.js";
import * as productService from "../../services/productService.js";
import {
  formatPrice,
  getProductId,
  getProductName,
} from "../../utils/productHelpers.js";
import { paginateItems } from "../../utils/pagination.js";

const STATUS_LABELS = {
  0: { en: "Draft", ar: "مسودة" },
  1: { en: "Active", ar: "نشط" },
  2: { en: "Archived", ar: "مؤرشف" },
};

export function ProductsPage() {
  const { locale } = useLocale();
  const { success, error: toastError } = useToast();
  const title = locale === "ar" ? "المنتجات" : "Products";
  usePageTitle(title);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const pageSize = 10;

  function loadProducts() {
    setLoading(true);
    productService
      .getProducts({ includeDraft: true })
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => {
        toastError(err.message);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const name = getProductName(product, locale).toLowerCase();
      const q = search.trim().toLowerCase();
      const matchesSearch = !q || name.includes(q);
      const status = product.status ?? product.Status;
      const matchesStatus = statusFilter === "" || String(status) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter, locale]);

  const paged = useMemo(
    () => paginateItems(filtered, page, pageSize),
    [filtered, page]
  );

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await productService.deleteProduct(getProductId(deleteTarget));
      success(locale === "ar" ? "تم حذف المنتج" : "Product deleted");
      setDeleteTarget(null);
      loadProducts();
    } catch (err) {
      toastError(err.message);
    } finally {
      setDeleting(false);
    }
  }

  const columns = [
    {
      key: "name",
      header: locale === "ar" ? "المنتج" : "Product",
      render: (row) => getProductName(row, locale),
    },
    {
      key: "status",
      header: locale === "ar" ? "الحالة" : "Status",
      render: (row) => {
        const status = row.status ?? row.Status ?? 1;
        const label = STATUS_LABELS[status];
        return label ? (locale === "ar" ? label.ar : label.en) : status;
      },
    },
    {
      key: "price",
      header: locale === "ar" ? "السعر" : "Price",
      render: (row) =>
        formatPrice(row.lowestPrice ?? row.LowestPrice, locale),
    },
    {
      key: "stock",
      header: locale === "ar" ? "المخزون" : "Stock",
      render: (row) =>
        row.isInStock ?? row.IsInStock
          ? locale === "ar"
            ? "متوفر"
            : "In stock"
          : locale === "ar"
            ? "نفد"
            : "Out",
    },
    {
      key: "actions",
      header: locale === "ar" ? "إجراءات" : "Actions",
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <Link to={`/admin/products/${getProductId(row)}/edit`}>
            <Button variant="outline" size="sm">
              {locale === "ar" ? "تعديل" : "Edit"}
            </Button>
          </Link>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => setDeleteTarget(row)}
          >
            {locale === "ar" ? "حذف" : "Delete"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout
      activeKey="products"
      title={title}
      topbarActions={
        <Link to="/admin/products/new">
          <Button variant="accent" size="sm">
            {locale === "ar" ? "إضافة منتج" : "Add Product"}
          </Button>
        </Link>
      }
    >
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-brand-text">
            {locale === "ar" ? "بحث" : "Search"}
          </label>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={locale === "ar" ? "اسم المنتج" : "Product name"}
          />
        </div>
        <div className="w-full lg:w-48">
          <label className="mb-1.5 block text-sm font-medium text-brand-text">
            {locale === "ar" ? "الحالة" : "Status"}
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 w-full rounded-md border border-brand-border bg-brand-surface px-3 text-sm"
          >
            <option value="">{locale === "ar" ? "الكل" : "All"}</option>
            <option value="0">{locale === "ar" ? "مسودة" : "Draft"}</option>
            <option value="1">{locale === "ar" ? "نشط" : "Active"}</option>
            <option value="2">{locale === "ar" ? "مؤرشف" : "Archived"}</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={paged}
        loading={loading}
        page={page}
        pageSize={pageSize}
        totalItems={filtered.length}
        onPageChange={setPage}
        getRowKey={(row) => getProductId(row)}
        emptyMessage={locale === "ar" ? "لا توجد منتجات" : "No products found"}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title={locale === "ar" ? "حذف المنتج" : "Delete Product"}
        message={
          deleteTarget
            ? locale === "ar"
              ? `هل تريد حذف "${getProductName(deleteTarget, locale)}"؟`
              : `Delete "${getProductName(deleteTarget, locale)}"?`
            : ""
        }
        confirmLabel={locale === "ar" ? "حذف" : "Delete"}
        variant="danger"
      />
    </AdminLayout>
  );
}
