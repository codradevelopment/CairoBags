import { Button } from "../ui/Button.jsx";
import { getNavLabel, adminNavLinks } from "./navConfig.js";
import { useLocale } from "./LanguageSwitcher.jsx";
import { cn } from "../../utils/cn.js";

function ChevronIcon({ collapsed }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("transition-transform", collapsed && "rotate-180")}
    >
      <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AdminSidebar({
  className,
  activeKey,
  collapsed = false,
  onToggleCollapse,
  mobile = false,
}) {
  const { locale } = useLocale();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-brand-border bg-brand-primary text-brand-secondary",
        mobile ? "w-full border-0" : "hidden border-e lg:flex",
        !mobile && (collapsed ? "w-[4.5rem]" : "w-64"),
        className
      )}
      aria-label={locale === "ar" ? "قائمة الإدارة" : "Admin navigation"}
    >
      <div className={cn("flex items-center border-b border-white/10", collapsed ? "justify-center p-3" : "justify-between px-4 py-4")}>
        {!collapsed || mobile ? (
          <a href="/admin" className="font-display text-lg font-semibold tracking-tight">
            {locale === "ar" ? "إدارة القاهرة" : "Cairo Admin"}
          </a>
        ) : (
          <span className="font-display text-lg font-semibold">CB</span>
        )}
        {!mobile && onToggleCollapse ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-brand-secondary hover:bg-white/10 hover:text-brand-secondary"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronIcon collapsed={collapsed} />
          </Button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {adminNavLinks.map((link) => {
          const active = activeKey === link.key;
          return (
            <a
              key={link.key}
              href={link.href}
              title={collapsed && !mobile ? getNavLabel(link, locale) : undefined}
              className={cn(
                "flex items-center rounded-md text-sm font-medium transition-colors",
                collapsed && !mobile ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5",
                active ? "bg-brand-accent text-brand-primary" : "text-brand-secondary/90 hover:bg-white/10"
              )}
              aria-current={active ? "page" : undefined}
            >
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
              {(!collapsed || mobile) && <span>{getNavLabel(link, locale)}</span>}
            </a>
          );
        })}
      </nav>

      <div className={cn("border-t border-white/10 p-3", collapsed && !mobile && "text-center")}>
        <a
          href="/"
          className="text-xs tracking-wide text-brand-secondary/70 transition-colors hover:text-brand-secondary"
        >
          {collapsed && !mobile ? "↩" : locale === "ar" ? "← العودة للمتجر" : "← Back to Store"}
        </a>
      </div>
    </aside>
  );
}

export function AdminTopbar({
  className,
  title,
  breadcrumbs,
  onOpenMobileNav,
  actions,
}) {
  const { locale } = useLocale();

  return (
    <div className={cn("border-b border-brand-border bg-brand-surface", className)}>
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          {onOpenMobileNav ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onOpenMobileNav}
              aria-label={locale === "ar" ? "فتح القائمة" : "Open navigation"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Button>
          ) : null}
          <div className="min-w-0">
            {breadcrumbs}
            {title ? <h1 className="truncate font-display text-xl font-medium text-brand-text">{title}</h1> : null}
          </div>
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
