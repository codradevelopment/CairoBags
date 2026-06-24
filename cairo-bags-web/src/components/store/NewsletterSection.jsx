import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { Input } from "../ui/Input.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { useToast } from "../ui/Toast.jsx";
import { cn } from "../../utils/cn.js";

const whyIcons = [
  // Diamond / Craftsmanship
  <svg key="craft" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 9 10-7 10 7v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>,
  // Time / Timeless
  <svg key="time" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>,
  // Box / Delivery
  <svg key="deliver" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10"/>
    <rect x="1" y="6" width="22" height="4" rx="1"/>
    <line x1="12" y1="22" x2="12" y2="6"/>
  </svg>,
];

export function NewsletterSection({ className }) {
  const { locale } = useLocale();
  const { success } = useToast();
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    success(
      locale === "ar"
        ? "شكراً لاشتراكك في نشرتنا"
        : "Thank you for subscribing to our newsletter"
    );
    setEmail("");
  }

  return (
    <section
      className={cn("relative overflow-hidden rounded-2xl", className)}
      style={{
        background: "linear-gradient(135deg, #0d0d0b 0%, #1a1710 40%, #2a2010 70%, #0d0d0b 100%)",
      }}
    >
      {/* Gold shimmer overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,169,98,0.5) 0%, transparent 65%)",
        }}
      />
      {/* Corner brackets */}
      <div className="absolute start-6 top-6">
        <div style={{ width: "32px", height: "32px", borderTop: "1px solid rgba(201,169,98,0.4)", borderInlineStart: "1px solid rgba(201,169,98,0.4)" }} />
      </div>
      <div className="absolute bottom-6 end-6">
        <div style={{ width: "32px", height: "32px", borderBottom: "1px solid rgba(201,169,98,0.4)", borderInlineEnd: "1px solid rgba(201,169,98,0.4)" }} />
      </div>

      <div className="relative px-8 py-12 text-center md:px-16 md:py-16">
        <p className="cb-section-label">{locale === "ar" ? "النشرة البريدية" : "Newsletter"}</p>
        <h2
          className="mt-3 font-display font-light tracking-tight"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#f5f1e8" }}
        >
          {locale === "ar" ? "ابق على اطلاع" : "Stay in the Know"}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm" style={{ color: "rgba(245,241,232,0.55)" }}>
          {locale === "ar"
            ? "اشترك لتصلك أحدث المجموعات والعروض الحصرية"
            : "Subscribe for exclusive access to new collections and offers"}
        </p>
        <div className="cb-gold-line mx-auto mt-5 max-w-[4rem]" />

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={locale === "ar" ? "بريدك الإلكتروني" : "Your email address"}
            className="flex-1"
            required
            style={{
              background: "rgba(255,255,255,0.06)",
              borderColor: "rgba(201,169,98,0.3)",
              color: "#f5f1e8",
            }}
          />
          <Button type="submit" variant="accent" className="shrink-0">
            {locale === "ar" ? "اشترك" : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export function WhyChooseSection({ className }) {
  const { locale } = useLocale();

  const items = [
    {
      title: locale === "ar" ? "حرفية فاخرة" : "Luxury Craftsmanship",
      desc:
        locale === "ar"
          ? "كل قطعة مصنوعة بعناية فائقة من أجود الخامات"
          : "Each piece is meticulously crafted from premium materials",
    },
    {
      title: locale === "ar" ? "تصاميم خالدة" : "Timeless Design",
      desc:
        locale === "ar"
          ? "أناقة لا تتأثر بمواسم الموضة"
          : "Elegance that transcends seasonal trends",
    },
    {
      title: locale === "ar" ? "شحن مميز" : "Premium Delivery",
      desc:
        locale === "ar"
          ? "تغليف فاخر وتوصيل آمن لباب منزلك"
          : "Luxury packaging and secure delivery to your door",
    },
  ];

  return (
    <section className={cn(className)}>
      <div className="mb-10 text-center">
        <p className="cb-section-label">{locale === "ar" ? "مميزاتنا" : "Why Us"}</p>
        <h2 className="cb-section-heading mt-3">
          {locale === "ar" ? "لماذا Cairo Bags؟" : "Why Cairo Bags?"}
        </h2>
        <div className="cb-gold-line mx-auto mt-5 max-w-[4rem]" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={item.title}
            className="group relative rounded-xl border p-8 text-center transition-all duration-slow cursor-default"
            style={{
              borderColor: "var(--cb-border-subtle)",
              background: "var(--cb-surface)",
              boxShadow: "var(--cb-shadow-card)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--cb-shadow-glow)";
              e.currentTarget.style.borderColor = "rgba(201,169,98,0.35)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--cb-shadow-card)";
              e.currentTarget.style.borderColor = "var(--cb-border-subtle)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Icon circle */}
            <div
              className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-fast"
              style={{
                background: "linear-gradient(135deg, rgba(201,169,98,0.15) 0%, rgba(232,213,163,0.08) 100%)",
                border: "1px solid rgba(201,169,98,0.25)",
                color: "#c9a962",
              }}
            >
              {whyIcons[i]}
            </div>
            <h3
              className="font-display text-lg font-medium text-brand-text"
              style={{ letterSpacing: "-0.01em" }}
            >
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-brand-muted leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
