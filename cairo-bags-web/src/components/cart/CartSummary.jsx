import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { formatPrice } from "../../utils/productHelpers.js";
import { Card, CardBody, CardHeader } from "../ui/Card.jsx";
import { cn } from "../../utils/cn.js";

export function CartSummary({
  subTotal,
  shippingFee,
  discountAmount,
  totalAmount,
  itemCount,
  className,
  showEstimateNote = false,
}) {
  const { locale } = useLocale();
  const title = locale === "ar" ? "ملخص الطلب" : "Order Summary";
  const displayTotal = totalAmount ?? subTotal ?? 0;

  const rows = [
    {
      label: locale === "ar" ? "المجموع الفرعي" : "Subtotal",
      value: formatPrice(subTotal ?? 0, locale),
    },
  ];

  if (discountAmount != null && discountAmount > 0) {
    rows.push({
      label: locale === "ar" ? "الخصم" : "Discount",
      value: `−${formatPrice(discountAmount, locale)}`,
      accent: true,
    });
  }

  if (shippingFee != null) {
    rows.push({
      label: locale === "ar" ? "الشحن" : "Shipping",
      value: shippingFee === 0 ? (locale === "ar" ? "مجاني" : "Free") : formatPrice(shippingFee, locale),
    });
  }

  return (
    <Card variant="elevated" padding="md" className={cn("h-fit", className)}>
      <CardHeader title={title} />
      <CardBody className="space-y-3">
        {itemCount != null ? (
          <p className="text-sm text-brand-muted">
            {locale === "ar"
              ? `${itemCount} منتج`
              : `${itemCount} item${itemCount === 1 ? "" : "s"}`}
          </p>
        ) : null}

        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className="text-brand-muted">{row.label}</span>
            <span className={cn("font-medium", row.accent && "text-brand-accent")}>{row.value}</span>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-brand-border pt-3">
          <span className="font-medium text-brand-text">
            {locale === "ar" ? "الإجمالي" : "Total"}
          </span>
          <span className="font-display text-xl font-medium text-brand-primary">
            {formatPrice(displayTotal, locale)}
          </span>
        </div>

        {showEstimateNote ? (
          <p className="text-xs text-brand-muted">
            {locale === "ar"
              ? "رسوم الشحن والخصم تُحسب عند إتمام الطلب"
              : "Shipping and discounts are calculated when you place your order"}
          </p>
        ) : null}
      </CardBody>
    </Card>
  );
}
