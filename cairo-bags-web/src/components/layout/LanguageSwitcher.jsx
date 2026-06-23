import { useEffect, useState } from "react";
import { Button } from "../ui/Button.jsx";
import { applyLocale, locales } from "../../theme/rtl.js";
import { cn } from "../../utils/cn.js";

const LOCALE_STORAGE_KEY = "cairo-locale";

export function useLocale() {
  const [locale, setLocaleState] = useState(() => {
    if (typeof localStorage === "undefined") return locales.EN;
    return localStorage.getItem(LOCALE_STORAGE_KEY) || locales.EN;
  });

  useEffect(() => {
    applyLocale(locale);
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = (next) => {
    setLocaleState(next === locales.AR ? locales.AR : locales.EN);
  };

  const toggleLocale = () => {
    setLocale(locale === locales.AR ? locales.EN : locales.AR);
  };

  return { locale, setLocale, toggleLocale, isRtl: locale === locales.AR };
}

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
