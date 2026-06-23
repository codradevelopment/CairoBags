import { useEffect } from "react";
import { Button } from "../ui/Button.jsx";
import { Input } from "../ui/Input.jsx";
import { Navbar } from "./Navbar.jsx";
import { getNavLabel, storeNavLinks } from "./navConfig.js";
import { useLocale } from "./LanguageSwitcher.jsx";
import { cn } from "../../utils/cn.js";

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MobileMenu({ open, onClose, links = storeNavLinks }) {
  const { locale } = useLocale();

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const searchPlaceholder = locale === "ar" ? "ابحث عن حقائب..." : "Search bags...";

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-brand-primary/40 backdrop-blur-[2px]"
        aria-label={locale === "ar" ? "إغلاق القائمة" : "Close menu"}
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute inset-y-0 start-0 flex w-[min(100vw-3rem,20rem)] flex-col",
          "border-e border-brand-border bg-brand-surface shadow-modal animate-slide-down"
        )}
        role="dialog"
        aria-modal="true"
        aria-label={locale === "ar" ? "قائمة الجوال" : "Mobile menu"}
      >
        <div className="flex items-center justify-between border-b border-brand-border px-4 py-4">
          <span className="font-display text-lg font-medium text-brand-text">Cairo Bags</span>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </Button>
        </div>

        <div className="border-b border-brand-border p-4">
          <Input type="search" placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  className="block rounded-md px-3 py-3 text-sm font-medium text-brand-text hover:bg-brand-secondary"
                  onClick={onClose}
                >
                  {getNavLabel(link, locale)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
