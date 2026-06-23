import { PAYMENT_METHOD_OPTIONS } from "../../constants/paymentMethodOptions.js";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { cn } from "../../utils/cn.js";

export function PaymentMethodSelector({ value, onChange, className }) {
  const { locale } = useLocale();

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="font-display text-lg font-medium text-brand-text">
        {locale === "ar" ? "طريقة الدفع" : "Payment Method"}
      </h3>
      <div className="space-y-3">
        {PAYMENT_METHOD_OPTIONS.map((method) => {
          const selected = value === method.value;
          return (
            <label
              key={method.value}
              className={cn(
                "flex cursor-pointer gap-3 rounded-lg border p-4 transition-colors",
                selected
                  ? "border-brand-accent bg-brand-accent/5"
                  : "border-brand-border hover:border-brand-muted"
              )}
            >
              <input
                type="radio"
                name="payment-method"
                className="mt-1"
                checked={selected}
                onChange={() => onChange(method.value)}
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-brand-text">
                  {locale === "ar" ? method.labelAr : method.labelEn}
                </p>
                <p className="mt-1 text-sm text-brand-muted">
                  {locale === "ar" ? method.descriptionAr : method.descriptionEn}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
