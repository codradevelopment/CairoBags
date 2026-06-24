import { Link } from "react-router-dom";
import { Button } from "../ui/Button.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { cn } from "../../utils/cn.js";

export function HeroSection({ className }) {
  const { locale } = useLocale();

  return (
    <section
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor: "#0d0d0b", minHeight: "82vh" }}
    >
      {/* Multi-layer gradient backgrounds */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 65% 45%, rgba(201,169,98,0.18) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(168,133,62,0.08) 0%, transparent 50%)",
          }}
        />
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Decorative corner lines */}
      <div className="absolute start-8 top-8 hidden md:block">
        <div
          style={{
            width: "60px",
            height: "60px",
            borderTop: "1px solid rgba(201,169,98,0.3)",
            borderInlineStart: "1px solid rgba(201,169,98,0.3)",
          }}
        />
      </div>
      <div className="absolute bottom-8 end-8 hidden md:block">
        <div
          style={{
            width: "60px",
            height: "60px",
            borderBottom: "1px solid rgba(201,169,98,0.3)",
            borderInlineEnd: "1px solid rgba(201,169,98,0.3)",
          }}
        />
      </div>

      {/* Content */}
      <div className="cb-container relative flex min-h-[82vh] flex-col items-center justify-center py-20 text-center">
        {/* Overline label */}
        <div className="flex items-center gap-3 animate-fade-in">
          <div className="h-px w-10 opacity-50" style={{ background: "linear-gradient(90deg, transparent, #c9a962)" }} />
          <p
            className="text-xs font-medium tracking-[0.4em] uppercase"
            style={{ color: "#c9a962" }}
          >
            {locale === "ar" ? "مجموعة ٢٠٢٦" : "Collection 2026"}
          </p>
          <div className="h-px w-10 opacity-50" style={{ background: "linear-gradient(90deg, #c9a962, transparent)" }} />
        </div>

        {/* Main headline */}
        <h1
          className="mt-6 max-w-4xl font-display font-light leading-[1.05] tracking-tight animate-slide-up"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            color: "#f5f1e8",
            animationDelay: "100ms",
            animationFillMode: "both",
          }}
        >
          {locale === "ar" ? (
            "فخامة القاهرة\nفي كل قطعة"
          ) : (
            <>
              Cairo Luxury,{" "}
              <em
                className="not-italic"
                style={{
                  background: "linear-gradient(135deg, #c9a962 0%, #e8d5a3 50%, #a8853e 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Crafted to Last
              </em>
            </>
          )}
        </h1>

        {/* Subtext */}
        <p
          className="mx-auto mt-6 max-w-lg text-sm leading-relaxed animate-fade-in md:text-base"
          style={{
            color: "rgba(245,241,232,0.6)",
            animationDelay: "250ms",
            animationFillMode: "both",
          }}
        >
          {locale === "ar"
            ? "اكتشف حقائب يدوية الصنع تجمع بين الأناقة الخالدة والجودة الاستثنائية"
            : "Discover handcrafted bags that blend timeless elegance with exceptional quality"}
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row animate-slide-up"
          style={{ animationDelay: "350ms", animationFillMode: "both" }}
        >
          <Link to="/shop">
            <Button
              variant="accent"
              size="lg"
              className="relative overflow-hidden px-8 tracking-wide"
              style={{ minWidth: "160px" }}
            >
              {locale === "ar" ? "تسوق الآن" : "Shop Now"}
            </Button>
          </Link>
          <Link to="/shop?filter=new">
            <Button
              variant="outline"
              size="lg"
              className="px-8 tracking-wide"
              style={{
                borderColor: "rgba(245,241,232,0.25)",
                color: "rgba(245,241,232,0.8)",
                minWidth: "160px",
              }}
            >
              {locale === "ar" ? "وصل حديثاً" : "New Arrivals"}
            </Button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float"
          style={{ color: "rgba(201,169,98,0.5)" }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1" />
            <circle cx="8" cy="8" r="2" fill="currentColor">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 8; 0 0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>
    </section>
  );
}
