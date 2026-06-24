import { Button } from "../ui/Button.jsx";
import { cn } from "../../utils/cn.js";
import { useLocale } from "../../context/LocaleContext.jsx";

export { useLocale };

export function LanguageSwitcher({ className, variant = "ghost", size = "sm" }) {
  const { locale, toggleLocale } = useLocale();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={toggleLocale}
      className={cn("min-w-[3rem] font-medium tracking-wider", className)}
      aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      {locale === "ar" ? "EN" : "عربي"}
    </Button>
  );
}
