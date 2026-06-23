import { Link, useNavigate } from "react-router-dom";
import { StoreLayout } from "../../layouts/StoreLayout.jsx";
import { usePageTitle } from "../../hooks/usePageTitle.js";
import { useLocale } from "../../components/layout/LanguageSwitcher.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useToast } from "../../components/ui/Toast.jsx";
import { CartItem, CartSummary, EmptyCart } from "../../components/cart/index.js";
import { Button, Spinner } from "../../components/ui/index.js";
import { getCartItems } from "../../utils/cartHelpers.js";

export function CartPage() {
  const { locale } = useLocale();
  const { isAuthenticated } = useAuth();
  const { cart, loading, itemsCount, subTotal, clearCart } = useCart();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const items = getCartItems(cart);

  usePageTitle(locale === "ar" ? "سلة التسوق" : "Shopping Bag");

  async function handleClearCart() {
    try {
      await clearCart();
      success(locale === "ar" ? "تم تفريغ السلة" : "Cart cleared");
    } catch (err) {
      toastError(err.message);
    }
  }

  return (
    <StoreLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-brand-text md:text-4xl">
            {locale === "ar" ? "سلة التسوق" : "Shopping Bag"}
          </h1>
          {itemsCount > 0 ? (
            <p className="mt-2 text-sm text-brand-muted">
              {locale === "ar"
                ? `${itemsCount} منتج`
                : `${itemsCount} item${itemsCount === 1 ? "" : "s"}`}
            </p>
          ) : null}
        </div>
        {items.length > 0 ? (
          <Button type="button" variant="outline" size="sm" onClick={handleClearCart} disabled={loading}>
            {locale === "ar" ? "تفريغ السلة" : "Clear Cart"}
          </Button>
        ) : null}
      </div>

      {loading && items.length === 0 ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : null}

      {!loading && items.length === 0 ? <EmptyCart /> : null}

      {items.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="rounded-lg border border-brand-border bg-brand-surface p-4 md:p-6">
            {items.map((item) => (
              <CartItem key={item.variantId ?? item.VariantId} item={item} />
            ))}
          </div>

          <div className="space-y-4">
            <CartSummary subTotal={subTotal} itemCount={itemsCount} />
            <Link
              to={isAuthenticated ? "/checkout" : "/login"}
              state={isAuthenticated ? undefined : { from: "/checkout" }}
            >
              <Button variant="accent" size="lg" className="w-full" disabled={loading}>
                {locale === "ar" ? "إتمام الشراء" : "Proceed to Checkout"}
              </Button>
            </Link>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => navigate("/shop")}
            >
              {locale === "ar" ? "متابعة التسوق" : "Continue Shopping"}
            </Button>
          </div>
        </div>
      ) : null}
    </StoreLayout>
  );
}
