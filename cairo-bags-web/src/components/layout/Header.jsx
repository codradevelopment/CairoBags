import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button.jsx";
import { Navbar } from "./Navbar.jsx";
import { MobileMenu } from "./MobileMenu.jsx";
import { LanguageSwitcher } from "./LanguageSwitcher.jsx";
import { ThemeSwitcher } from "./ThemeSwitcher.jsx";
import { UserDropdown } from "./UserDropdown.jsx";
import { NotificationDropdown } from "./NotificationDropdown.jsx";
import { CartButton } from "./CartButton.jsx";
import { CartDrawer } from "../cart/CartDrawer.jsx";
import { ProductSearch } from "../store/ProductSearch.jsx";
import { useLocale } from "./LanguageSwitcher.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { cn } from "../../utils/cn.js";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AnnouncementBar({ message, messageAr, href = "/shop", className }) {
  const { locale } = useLocale();
  const text =
    message ||
    (locale === "ar"
      ? messageAr || "شحن مجاني للطلبات فوق ٢٠٠٠ جنيه — تسوق الآن"
      : "Complimentary shipping on orders over EGP 2,000 — Shop Now");

  return (
    <div className={cn("bg-brand-primary text-brand-secondary", className)}>
      <div className="cb-container">
        <Link
          to={href}
          className="flex min-h-10 items-center justify-center px-4 py-2 text-center text-xs font-medium tracking-[0.15em] uppercase transition-opacity hover:opacity-90 sm:text-sm"
        >
          {text}
        </Link>
      </div>
    </div>
  );
}

export function Header({ className, showAnnouncement = true, announcement }) {
  const { locale } = useLocale();
  const { drawerOpen, closeDrawer } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchPlaceholder = locale === "ar" ? "ابحث عن حقائب..." : "Search bags...";

  return (
    <header className={cn("sticky top-0 z-40 border-b border-brand-border bg-brand-surface/95 backdrop-blur-md", className)}>
      {showAnnouncement ? <AnnouncementBar {...announcement} /> : null}

      <div className="cb-container">
        <div className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={locale === "ar" ? "فتح القائمة" : "Open menu"}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </Button>

            <Link to="/" className="font-display text-xl font-semibold tracking-tight text-brand-text md:text-2xl">
              Cairo Bags
            </Link>
          </div>

          <Navbar className="mx-4 flex-1 justify-center" />

          <div className="hidden max-w-sm flex-1 lg:block">
            <ProductSearch compact />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={searchPlaceholder}
              onClick={() => setSearchOpen((v) => !v)}
            >
              <SearchIcon />
            </Button>
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <ThemeSwitcher />
            <NotificationDropdown />
            <CartButton />
            <UserDropdown />
          </div>
        </div>

        {searchOpen ? (
          <div className="border-t border-brand-border py-3 lg:hidden">
            <ProductSearch autoFocus onSubmit={() => setSearchOpen(false)} />
          </div>
        ) : null}
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer open={drawerOpen} onClose={closeDrawer} />
    </header>
  );
}
