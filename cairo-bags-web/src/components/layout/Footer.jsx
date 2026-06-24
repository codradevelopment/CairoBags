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

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.86a8.17 8.17 0 0 0 4.78 1.52V7a4.85 4.85 0 0 1-1.01-.31z" />
      </svg>
    ),
  },
];

function FooterColumn({ title, links, locale }) {
  return (
    <div>
      <h3
        className="text-xs font-semibold tracking-[0.2em] uppercase"
        style={{ color: "rgba(232, 213, 163, 0.6)" }}
      >
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="cb-underline-reveal text-sm transition-colors duration-fast"
              style={{ color: "rgba(245, 241, 232, 0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8d5a3")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245, 241, 232, 0.7)")}
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
    <footer className={cn("relative overflow-hidden", className)} style={{ backgroundColor: "#0d0d0b" }}>
      {/* Gold accent top border */}
      <div className="cb-gold-line" />

      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 80%, rgba(201,169,98,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,169,98,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="cb-container relative py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a
              href="/"
              className="cb-text-gradient-gold font-display text-2xl font-semibold"
              style={{ letterSpacing: "-0.02em" }}
            >
              Cairo Bags
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: "rgba(245,241,232,0.55)" }}>
              {tagline}
            </p>
            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-fast hover:border-brand-accent hover:text-brand-accent"
                  style={{
                    borderColor: "rgba(61,58,53,0.8)",
                    color: "rgba(245,241,232,0.5)",
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title={titles.shop} links={footerLinks.shop} locale={locale} />
          <FooterColumn title={titles.support} links={footerLinks.support} locale={locale} />
          <FooterColumn title={titles.account} links={footerLinks.account} locale={locale} />
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
          style={{ borderTop: "1px solid rgba(61,58,53,0.6)" }}
        >
          <p className="text-xs" style={{ color: "rgba(245,241,232,0.35)" }}>
            © {year} Cairo Bags.{" "}
            {locale === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <div className="flex gap-6 text-xs" style={{ color: "rgba(245,241,232,0.35)" }}>
            <a
              href="/privacy"
              className="transition-colors hover:text-brand-accent-muted"
            >
              {locale === "ar" ? "الخصوصية" : "Privacy"}
            </a>
            <a
              href="/terms"
              className="transition-colors hover:text-brand-accent-muted"
            >
              {locale === "ar" ? "الشروط" : "Terms"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
