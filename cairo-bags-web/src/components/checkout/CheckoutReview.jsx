import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { getPaymentMethodLabel } from "../../constants/paymentMethodOptions.js";
import { Card, CardBody, CardHeader } from "../ui/Card.jsx";
import { cn } from "../../utils/cn.js";

export function CheckoutReview({
  shippingAddress,
  paymentMethod,
  couponCode,
  notes,
  className,
}) {
  const { locale } = useLocale();

  function formatAddress(address) {
    if (!address) return "—";
    const parts = [
      address.fullName ?? address.FullName,
      address.phoneNumber ?? address.PhoneNumber,
      address.addressLine1 ?? address.AddressLine1,
      address.city ?? address.City,
      address.governorate ?? address.Governorate,
    ].filter(Boolean);
    return parts.join(locale === "ar" ? " · " : " · ");
  }

  return (
    <Card variant="flat" padding="md" className={cn(className)}>
      <CardHeader title={locale === "ar" ? "مراجعة الطلب" : "Review Order"} />
      <CardBody className="space-y-4 text-sm">
        <div>
          <p className="font-medium text-brand-text">
            {locale === "ar" ? "الشحن إلى" : "Ship to"}
          </p>
          <p className="mt-1 text-brand-muted">{formatAddress(shippingAddress)}</p>
        </div>
        <div>
          <p className="font-medium text-brand-text">
            {locale === "ar" ? "الدفع" : "Payment"}
          </p>
          <p className="mt-1 text-brand-muted">
            {getPaymentMethodLabel(paymentMethod, locale)}
          </p>
        </div>
        {couponCode ? (
          <div>
            <p className="font-medium text-brand-text">
              {locale === "ar" ? "الكوبون" : "Coupon"}
            </p>
            <p className="mt-1 text-brand-accent">{couponCode}</p>
          </div>
        ) : null}
        {notes ? (
          <div>
            <p className="font-medium text-brand-text">
              {locale === "ar" ? "ملاحظات" : "Notes"}
            </p>
            <p className="mt-1 text-brand-muted">{notes}</p>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
