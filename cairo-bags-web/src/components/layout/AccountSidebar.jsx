import { getNavLabel, accountNavLinks } from "./navConfig.js";
import { useLocale } from "./LanguageSwitcher.jsx";
import { cn } from "../../utils/cn.js";

export function AccountSidebar({ className, activeKey }) {
  const { locale } = useLocale();

  return (
    <aside
      className={cn("hidden w-56 shrink-0 lg:block", className)}
      aria-label={locale === "ar" ? "قائمة الحساب" : "Account navigation"}
    >
      <nav className="sticky top-28 space-y-1">
        {accountNavLinks.map((link) => {
          const active = activeKey === link.key;
          return (
            <a
              key={link.key}
              href={link.href}
              className={cn(
                "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-primary text-brand-secondary"
                  : "text-brand-text hover:bg-brand-secondary"
              )}
              aria-current={active ? "page" : undefined}
            >
              {getNavLabel(link, locale)}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

export function AccountMobileNav({ className, activeKey, onNavigate }) {
  const { locale } = useLocale();

  return (
    <nav
      className={cn(
        "flex gap-2 overflow-x-auto border-b border-brand-border pb-3 lg:hidden cb-scrollbar-thin",
        className
      )}
      aria-label={locale === "ar" ? "قائمة الحساب" : "Account navigation"}
    >
      {accountNavLinks.map((link) => {
        const active = activeKey === link.key;
        return (
          <a
            key={link.key}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand-primary text-brand-secondary"
                : "bg-brand-secondary text-brand-text hover:bg-brand-border"
            )}
            aria-current={active ? "page" : undefined}
          >
            {getNavLabel(link, locale)}
          </a>
        );
      })}
    </nav>
  );
}
