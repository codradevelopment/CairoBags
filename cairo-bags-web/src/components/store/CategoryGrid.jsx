import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as categoryService from "../../services/categoryService.js";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import {
  buildCategoryPath,
  getCategoryId,
  getCategoryName,
} from "../../utils/productHelpers.js";
import { CategoryGridSkeleton } from "./ProductSkeleton.jsx";
import { EmptyState } from "./EmptyState.jsx";
import { cn } from "../../utils/cn.js";

export function CategoryGrid({ className, title, subtitle }) {
  const { locale } = useLocale();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    categoryService
      .getCategories()
      .then((data) => {
        if (!cancelled) setCategories(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const heading = title ?? (locale === "ar" ? "تسوق حسب التصنيف" : "Shop by Category");
  const sub =
    subtitle ??
    (locale === "ar" ? "استكشف مجموعاتنا المنسقة" : "Explore our curated collections");

  return (
    <section className={cn(className)}>
      {/* Section header */}
      <div className="mb-10 text-center md:mb-14">
        <p className="cb-section-label">{locale === "ar" ? "تصنيفاتنا" : "Our Collections"}</p>
        <h2 className="cb-section-heading mt-3">{heading}</h2>
        <p className="cb-section-subheading mx-auto mt-3">{sub}</p>
        <div className="cb-gold-line mx-auto mt-6 max-w-[4rem]" />
      </div>

      {loading ? <CategoryGridSkeleton /> : null}
      {!loading && error ? (
        <EmptyState
          title={locale === "ar" ? "تعذر تحميل التصنيفات" : "Unable to load categories"}
          description={error.message}
        />
      ) : null}
      {!loading && !error && categories.length === 0 ? (
        <EmptyState
          title={locale === "ar" ? "لا توجد تصنيفات" : "No categories yet"}
          description={
            locale === "ar" ? "ستتوفر التصنيفات قريباً" : "Categories will appear here soon"
          }
        />
      ) : null}

      {!loading && !error && categories.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((category) => {
            const id = getCategoryId(category);
            const name = getCategoryName(category, locale);
            const imageUrl = category?.imageUrl ?? category?.ImageUrl;
            return (
              <Link
                key={id}
                to={buildCategoryPath(category)}
                className="group block text-center"
              >
                {/* Image container with overlay */}
                <div
                  className="cb-overlay-dark relative aspect-[4/3] overflow-hidden rounded-xl border transition-all duration-slow"
                  style={{
                    borderColor: "var(--cb-border-subtle)",
                    boxShadow: "var(--cb-shadow-card)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "var(--cb-shadow-glow)";
                    e.currentTarget.style.borderColor = "rgba(201,169,98,0.35)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "var(--cb-shadow-card)";
                    e.currentTarget.style.borderColor = "var(--cb-border-subtle)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
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
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  ) : (
                    <div
                      className="flex h-full items-center justify-center font-display text-2xl"
                      style={{ color: "rgba(201,169,98,0.4)", background: "var(--cb-secondary)" }}
                    >
                      CB
                    </div>
                  )}

                  {/* Category name overlay (appears on hover) */}
                  <div
                    className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-4 opacity-0 transition-opacity duration-fast group-hover:opacity-100"
                    style={{ zIndex: 2 }}
                  >
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium tracking-wider uppercase"
                      style={{
                        background: "rgba(201,169,98,0.9)",
                        color: "#111111",
                      }}
                    >
                      {locale === "ar" ? "استكشف" : "Explore"}
                    </span>
                  </div>
                </div>

                {/* Name below */}
                <p
                  className="cb-underline-reveal mt-3 text-sm font-medium text-brand-text transition-colors group-hover:text-brand-accent md:text-base"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {name}
                </p>
              </Link>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
