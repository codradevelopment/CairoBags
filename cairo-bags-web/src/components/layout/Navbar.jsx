import { cn } from "../../utils/cn.js";
import { getNavLabel, storeNavLinks } from "./navConfig.js";
import { useLocale } from "./LanguageSwitcher.jsx";

export function Navbar({ className, links = storeNavLinks, orientation = "horizontal" }) {
  const { locale } = useLocale();

  return (
    <nav
      className={cn(
        orientation === "horizontal"
          ? "hidden items-center gap-8 lg:flex"
          : "flex flex-col gap-1",
        className
      )}
      aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
    >
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          className={cn(
            "text-sm font-medium tracking-wide text-brand-text transition-colors",
            "hover:text-brand-accent",
            orientation === "vertical" && "rounded-md px-3 py-2.5 hover:bg-brand-secondary"
          )}
        >
          {getNavLabel(link, locale)}
        </a>
      ))}
    </nav>
  );
}
