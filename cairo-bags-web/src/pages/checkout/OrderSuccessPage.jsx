import { Link, useLocation, Navigate } from "react-router-dom";
import { StoreLayout } from "../../layouts/StoreLayout.jsx";
import { usePageTitle } from "../../hooks/usePageTitle.js";
import { useLocale } from "../../components/layout/LanguageSwitcher.jsx";
import { CartSummary } from "../../components/cart/index.js";
import { getPaymentMethodLabel } from "../../constants/paymentMethodOptions.js";
import { formatCheckoutResponse } from "../../utils/cartHelpers.js";
import { Button, Card, CardBody } from "../../components/ui/index.js";

export function OrderSuccessPage() {
  const { locale } = useLocale();
  const location = useLocation();
  const checkout = formatCheckoutResponse(location.state?.checkout);

  usePageTitle(locale === "ar" ? "تم الطلب" : "Order Confirmed");

  if (!location.state?.checkout) {
    return <Navigate to="/account/orders" replace />;
  }

  return (
    <StoreLayout>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10 text-2xl text-brand-accent">
          ✓
        </div>
        <h1 className="font-display text-3xl font-medium text-brand-text md:text-4xl">
          {locale === "ar" ? "شكراً لطلبك" : "Thank You for Your Order"}
        </h1>
        <p className="mt-3 text-sm text-brand-muted md:text-base">
          {checkout.nextStepMessage ||
            (locale === "ar"
              ? "تم استلام طلبك بنجاح"
              : "Your order has been received successfully")}
        </p>

        <Card variant="elevated" padding="lg" className="mt-8 text-start">
          <CardBody className="space-y-4">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-brand-muted">{locale === "ar" ? "رقم الطلب" : "Order Number"}</span>
              <span className="font-medium text-brand-text">{checkout.orderNumber}</span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-brand-muted">{locale === "ar" ? "حالة الطلب" : "Order Status"}</span>
              <span className="font-medium text-brand-text">{checkout.orderStatus}</span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-brand-muted">{locale === "ar" ? "حالة الدفع" : "Payment Status"}</span>
              <span className="font-medium text-brand-text">{checkout.paymentStatus}</span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-brand-muted">{locale === "ar" ? "طريقة الدفع" : "Payment Method"}</span>
              <span className="font-medium text-brand-text">
                {getPaymentMethodLabel(checkout.paymentMethod, locale) || checkout.paymentMethod}
              </span>
            </div>
          </CardBody>
        </Card>

        <div className="mt-6">
          <CartSummary
            subTotal={checkout.subTotal}
            discountAmount={checkout.discountAmount}
            shippingFee={checkout.shippingFee}
            totalAmount={checkout.totalAmount}
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to={`/account/orders/${checkout.orderId}`}>
            <Button variant="accent">{locale === "ar" ? "عرض الطلب" : "View Order"}</Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline">{locale === "ar" ? "متابعة التسوق" : "Continue Shopping"}</Button>
          </Link>
        </div>
      </div>
    </StoreLayout>
  );
}
