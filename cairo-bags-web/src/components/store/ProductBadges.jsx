import { Badge } from "../ui/Badge.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import {
  isProductFeatured,
  isProductInStock,
  isProductNewArrival,
} from "../../utils/productHelpers.js";
import { cn } from "../../utils/cn.js";

export function ProductBadges({ product, className, showStock = true }) {
  const { locale } = useLocale();
  const featured = isProductFeatured(product);
  const newArrival = isProductNewArrival(product);
  const inStock = isProductInStock(product);

  if (!featured && !newArrival && !showStock) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {featured ? (
        <Badge variant="accent" size="sm">
          {locale === "ar" ? "مميز" : "Featured"}
        </Badge>
      ) : null}
      {newArrival ? (
        <Badge variant="primary" size="sm">
          {locale === "ar" ? "جديد" : "New"}
        </Badge>
      ) : null}
      {showStock ? (
        <Badge variant={inStock ? "success" : "outline"} size="sm">
          {inStock
            ? locale === "ar"
              ? "متوفر"
              : "In Stock"
            : locale === "ar"
              ? "نفد"
              : "Sold Out"}
        </Badge>
      ) : null}
    </div>
  );
}
