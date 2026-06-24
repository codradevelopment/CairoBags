import { Link } from "react-router-dom";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { ProductPrice } from "./ProductPrice.jsx";
import { ProductBadges } from "./ProductBadges.jsx";
import {
  buildProductPath,
  getPrimaryImageUrl,
  getProductName,
  getProductShortDescription,
} from "../../utils/productHelpers.js";
import { cn } from "../../utils/cn.js";

export function ProductCard({ product, className }) {
  const { locale } = useLocale();
  const name = getProductName(product, locale);
  const shortDesc = getProductShortDescription(product, locale);
  const imageUrl = getPrimaryImageUrl(product);
  const href = buildProductPath(product);

  return (
    <article className={cn("group", className)}>
      <Link to={href} className="block">
        {/* Image container */}
        <div
          className="relative overflow-hidden rounded-xl border transition-all duration-slow"
          style={{
            borderColor: "var(--cb-border-subtle)",
            background: "var(--cb-surface)",
            boxShadow: "var(--cb-shadow-card)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "var(--cb-shadow-hover)";
            e.currentTarget.style.borderColor = "rgba(201,169,98,0.3)";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "var(--cb-shadow-card)";
            e.currentTarget.style.borderColor = "var(--cb-border-subtle)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div className="aspect-[3/4] overflow-hidden bg-brand-secondary">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-cover transition-transform"
                style={{
                  transitionDuration: "700ms",
                  transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                }}
                loading="lazy"
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-brand-muted">
                <span
                  className="font-display text-3xl opacity-30"
                  style={{
                    background: "linear-gradient(135deg, #c9a962, #e8d5a3)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  CB
                </span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="absolute start-3 top-3">
            <ProductBadges product={product} showStock={false} />
          </div>

          {/* Hover overlay with quick view hint */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 transition-opacity duration-fast group-hover:opacity-100 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(17,17,17,0.5) 0%, transparent 50%)",
            }}
          >
            <span
              className="rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                color: "rgba(245,241,232,0.9)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {locale === "ar" ? "عرض المنتج" : "View Product"}
            </span>
          </div>
        </div>

        {/* Product info */}
        <div className="mt-4 space-y-1 px-0.5">
          {/* Product name with gold underline reveal */}
          <h3
            className="cb-underline-reveal font-display text-base font-medium text-brand-text transition-colors group-hover:text-brand-accent md:text-lg"
            style={{ letterSpacing: "-0.01em" }}
          >
            {name}
          </h3>
          {shortDesc ? (
            <p className="line-clamp-1 text-xs text-brand-muted">{shortDesc}</p>
          ) : null}
          <ProductPrice product={product} size="sm" />
        </div>
      </Link>
    </article>
  );
}
