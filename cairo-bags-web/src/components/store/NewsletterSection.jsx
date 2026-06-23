import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { Input } from "../ui/Input.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { useToast } from "../ui/Toast.jsx";
import { cn } from "../../utils/cn.js";

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
      className={cn(
        "rounded-lg border border-brand-border bg-brand-secondary px-6 py-10 text-center md:px-12 md:py-14",
        className
      )}
    >
      <p className="text-xs font-medium tracking-[0.25em] text-brand-accent uppercase">
        {locale === "ar" ? "النشرة البريدية" : "Newsletter"}
      </p>
      <h2 className="mt-3 font-display text-2xl font-medium text-brand-text md:text-3xl">
        {locale === "ar" ? "ابق على اطلاع" : "Stay in the Know"}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-brand-muted">
        {locale === "ar"
          ? "اشترك لتصلك أحدث المجموعات والعروض الحصرية"
          : "Subscribe for exclusive access to new collections and offers"}
      </p>
      <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={locale === "ar" ? "بريدك الإلكتروني" : "Your email"}
          className="flex-1"
          required
        />
        <Button type="submit" variant="accent" className="shrink-0">
          {locale === "ar" ? "اشترك" : "Subscribe"}
        </Button>
      </form>
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
      <div className="mb-8 text-center">
        <h2 className="font-display text-2xl font-medium text-brand-text md:text-3xl">
          {locale === "ar" ? "لماذا Cairo Bags؟" : "Why Cairo Bags?"}
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-brand-border bg-brand-surface p-6 text-center"
          >
            <div className="mx-auto mb-4 h-px w-10 bg-brand-accent" />
            <h3 className="font-display text-lg font-medium text-brand-text">{item.title}</h3>
            <p className="mt-2 text-sm text-brand-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
