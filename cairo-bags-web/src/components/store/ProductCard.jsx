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
        <div className="relative overflow-hidden rounded-lg border border-brand-border bg-brand-surface">
          <div className="aspect-[3/4] overflow-hidden bg-brand-secondary">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-brand-muted">
                <span className="font-display text-3xl">CB</span>
              </div>
            )}
          </div>
          <div className="absolute start-3 top-3">
            <ProductBadges product={product} showStock={false} />
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <h3 className="font-display text-base font-medium text-brand-text transition-colors group-hover:text-brand-accent md:text-lg">
            {name}
          </h3>
          {shortDesc ? (
            <p className="line-clamp-2 text-xs text-brand-muted md:text-sm">{shortDesc}</p>
          ) : null}
          <ProductPrice product={product} size="sm" />
        </div>
      </Link>
    </article>
  );
}
