import { Link } from "react-router-dom";
import { Button } from "../ui/Button.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { cn } from "../../utils/cn.js";

export function EmptyCart({ className, onContinue }) {
  const { locale } = useLocale();

  return (
    <div className={cn("py-12 text-center", className)}>
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-brand-accent/30 bg-brand-secondary text-2xl text-brand-accent">
        ◇
      </div>
      <h3 className="font-display text-xl font-medium text-brand-text">
        {locale === "ar" ? "سلتك فارغة" : "Your bag is empty"}
      </h3>
      <p className="mt-2 text-sm text-brand-muted">
        {locale === "ar"
          ? "اكتشف مجموعتنا الفاخرة من الحقائب"
          : "Discover our luxury handbag collection"}
      </p>
      {onContinue ? (
        <Button type="button" variant="accent" className="mt-6" onClick={onContinue}>
          {locale === "ar" ? "تسوق الآن" : "Shop Now"}
        </Button>
      ) : (
        <Link to="/shop" className="mt-6 inline-block">
          <Button variant="accent">{locale === "ar" ? "تسوق الآن" : "Shop Now"}</Button>
        </Link>
      )}
    </div>
  );
}
