import { cn } from "../../utils/cn.js";
import { useLocale } from "./LanguageSwitcher.jsx";

export function Breadcrumbs({ items = [], className }) {
  const { locale } = useLocale();

  if (!items.length) return null;

  const ariaLabel = locale === "ar" ? "مسار التنقل" : "Breadcrumb";

  return (
    <nav aria-label={ariaLabel} className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-brand-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 ? (
                <span className="text-brand-border select-none" aria-hidden="true">
                  /
                </span>
              ) : null}
              {isLast || !item.href ? (
                <span
                  className={cn(isLast ? "font-medium text-brand-text" : "")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="transition-colors hover:text-brand-text">
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
