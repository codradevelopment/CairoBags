import { Button } from "../ui/Button.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { cn } from "../../utils/cn.js";

export function QuantitySelector({
  value,
  min = 1,
  max,
  onChange,
  disabled,
  className,
}) {
  const { locale } = useLocale();
  const canDecrease = value > min && !disabled;
  const canIncrease = (max == null || value < max) && !disabled;

  function decrease() {
    if (canDecrease) onChange(value - 1);
  }

  function increase() {
    if (canIncrease) onChange(value + 1);
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-brand-border bg-brand-surface",
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-none"
        onClick={decrease}
        disabled={!canDecrease}
        aria-label={locale === "ar" ? "تقليل الكمية" : "Decrease quantity"}
      >
        −
      </Button>
      <span className="min-w-[2.5rem] px-2 text-center text-sm font-medium tabular-nums">
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-none"
        onClick={increase}
        disabled={!canIncrease}
        aria-label={locale === "ar" ? "زيادة الكمية" : "Increase quantity"}
      >
        +
      </Button>
    </div>
  );
}
