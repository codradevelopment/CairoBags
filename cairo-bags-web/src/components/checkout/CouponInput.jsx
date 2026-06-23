import { useState } from "react";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { Button } from "../ui/Button.jsx";
import { Input, Label } from "../ui/Input.jsx";
import { cn } from "../../utils/cn.js";

export function CouponInput({ value, onChange, className }) {
  const { locale } = useLocale();
  const [draft, setDraft] = useState(value || "");

  function apply() {
    onChange(draft.trim().toUpperCase());
  }

  function clear() {
    setDraft("");
    onChange("");
  }

  return (
    <div className={cn("space-y-3", className)}>
      <Label htmlFor="coupon-code">
        {locale === "ar" ? "كود الخصم" : "Coupon Code"}
      </Label>
      <div className="flex gap-2">
        <Input
          id="coupon-code"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={locale === "ar" ? "أدخل الكود" : "Enter code"}
          className="flex-1"
        />
        {value ? (
          <Button type="button" variant="outline" onClick={clear}>
            {locale === "ar" ? "إزالة" : "Remove"}
          </Button>
        ) : (
          <Button type="button" variant="accent" onClick={apply} disabled={!draft.trim()}>
            {locale === "ar" ? "تطبيق" : "Apply"}
          </Button>
        )}
      </div>
      {value ? (
        <p className="text-sm text-brand-accent">
          {locale === "ar" ? `مُطبّق: ${value}` : `Applied: ${value}`}
        </p>
      ) : (
        <p className="text-xs text-brand-muted">
          {locale === "ar"
            ? "يُتحقق من الكود عند إتمام الطلب"
            : "Coupon is validated when you place your order"}
        </p>
      )}
    </div>
  );
}
