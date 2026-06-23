import { useLocale } from "./LanguageSwitcher.jsx";
import { cn } from "../../utils/cn.js";

const footerLinks = {
  shop: [
    { href: "/shop", labelEn: "All Bags", labelAr: "كل الحقائب" },
    { href: "/shop?filter=new", labelEn: "New Arrivals", labelAr: "وصل حديثاً" },
    { href: "/categories", labelEn: "Categories", labelAr: "التصنيفات" },
  ],
  support: [
    { href: "/contact", labelEn: "Contact", labelAr: "تواصل معنا" },
    { href: "/shipping", labelEn: "Shipping", labelAr: "الشحن" },
    { href: "/returns", labelEn: "Returns", labelAr: "الاسترجاع" },
  ],
  account: [
    { href: "/login", labelEn: "Sign In", labelAr: "تسجيل الدخول" },
    { href: "/account/orders", labelEn: "My Orders", labelAr: "طلباتي" },
    { href: "/account", labelEn: "Profile", labelAr: "الملف الشخصي" },
  ],
};

function FooterColumn({ title, links, locale }) {
  return (
    <div>
      <h3 className="font-display text-sm font-medium tracking-wide text-brand-text">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm text-brand-muted transition-colors hover:text-brand-text"
            >
              {locale === "ar" ? link.labelAr : link.labelEn}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ className }) {
  const { locale } = useLocale();
  const year = new Date().getFullYear();

  const titles = {
    shop: locale === "ar" ? "تسوق" : "Shop",
    support: locale === "ar" ? "الدعم" : "Support",
    account: locale === "ar" ? "الحساب" : "Account",
  };

  const tagline =
    locale === "ar"
      ? "حقائب فاخرة بتصميم مصري أصيل — أناقة بلا حدود."
      : "Luxury bags with authentic Egyptian craft — elegance without limits.";

  return (
    <footer className={cn("border-t border-brand-border bg-brand-secondary", className)}>
      <div className="cb-container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <a href="/" className="font-display text-2xl font-semibold text-brand-text">
              Cairo Bags
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-muted">{tagline}</p>
          </div>
          <FooterColumn title={titles.shop} links={footerLinks.shop} locale={locale} />
          <FooterColumn title={titles.support} links={footerLinks.support} locale={locale} />
          <FooterColumn title={titles.account} links={footerLinks.account} locale={locale} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-border pt-8 sm:flex-row">
          <p className="text-xs text-brand-muted">
            © {year} Cairo Bags. {locale === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <div className="flex gap-6 text-xs text-brand-muted">
            <a href="/privacy" className="hover:text-brand-text">
              {locale === "ar" ? "الخصوصية" : "Privacy"}
            </a>
            <a href="/terms" className="hover:text-brand-text">
              {locale === "ar" ? "الشروط" : "Terms"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
