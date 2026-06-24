import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StoreLayout } from "../../layouts/StoreLayout.jsx";
import { usePageTitle } from "../../hooks/usePageTitle.js";
import { useLocale } from "../../components/layout/LanguageSwitcher.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useToast } from "../../components/ui/Toast.jsx";
import * as productService from "../../services/productService.js";
import {
  ProductGallery,
  ProductPrice,
  ProductBadges,
  ProductDetailSkeleton,
  EmptyState,
} from "../../components/store/index.js";
import {
  getProductDescription,
  getProductImages,
  getProductName,
  getProductVariants,
  getVariantColorName,
  getVariantComparePrice,
  getVariantId,
  getVariantPrice,
  isVariantInStock,
} from "../../utils/productHelpers.js";
import { Button, Label } from "../../components/ui/index.js";
import { cn } from "../../utils/cn.js";

export function ProductDetailsPage() {
  const { id } = useParams();
  const { locale } = useLocale();
  const { addItem, loading: cartLoading } = useCart();
  const { success, error: toastError } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [adding, setAdding] = useState(false);

  const productName = product ? getProductName(product, locale) : "";
  usePageTitle(productName || (locale === "ar" ? "المنتج" : "Product"));

  const loadProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductById(id);
      setProduct(data);
      const variants = getProductVariants(data);
      const defaultVariant =
        variants.find((v) => v.isDefault ?? v.IsDefault) ?? variants[0] ?? null;
      setSelectedVariantId(defaultVariant ? getVariantId(defaultVariant) : null);
    } catch (err) {
      setError(err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const variants = useMemo(
    () => (product ? getProductVariants(product) : []),
    [product]
  );

  const selectedVariant = useMemo(
    () => variants.find((v) => getVariantId(v) === selectedVariantId) ?? null,
    [variants, selectedVariantId]
  );

  const images = product ? getProductImages(product) : [];
  const description = product ? getProductDescription(product, locale) : "";
  const inStock = selectedVariant ? isVariantInStock(selectedVariant) : false;

  async function handleAddToCart() {
    if (!selectedVariantId) {
      toastError(locale === "ar" ? "اختر اللون" : "Please select a variant");
      return;
    }
    if (!inStock) {
      toastError(locale === "ar" ? "غير متوفر" : "Out of stock");
      return;
    }
    setAdding(true);
    try {
      await addItem({ productVariantId: selectedVariantId, quantity: 1 });
      success(locale === "ar" ? "أُضيف إلى السلة" : "Added to cart");
    } catch (err) {
      toastError(err.message || (locale === "ar" ? "فشل الإضافة" : "Could not add to cart"));
    } finally {
      setAdding(false);
    }
  }

  return (
    <StoreLayout contentClassName="!py-6 md:!py-10">
      <nav className="mb-6 text-sm text-brand-muted">
        <Link to="/" className="hover:text-brand-accent">
          {locale === "ar" ? "الرئيسية" : "Home"}
        </Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-brand-accent">
          {locale === "ar" ? "تسوق" : "Shop"}
        </Link>
        {productName ? (
          <>
            <span className="mx-2">/</span>
            <span className="text-brand-text">{productName}</span>
          </>
        ) : null}
      </nav>

      {loading ? <ProductDetailSkeleton /> : null}

      {!loading && error ? (
        <EmptyState
          title={locale === "ar" ? "المنتج غير موجود" : "Product not found"}
          description={error.message}
          action={
            <Link to="/shop">
              <Button variant="accent">{locale === "ar" ? "العودة للتسوق" : "Back to Shop"}</Button>
            </Link>
          }
        />
      ) : null}

      {!loading && !error && product ? (
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={images} productName={productName} />

          <div>
            <ProductBadges product={product} className="mb-4" />
            <h1 className="font-display text-3xl font-medium text-brand-text md:text-4xl">
              {productName}
            </h1>

            <ProductPrice
              className="mt-4"
              size="lg"
              price={selectedVariant ? getVariantPrice(selectedVariant) : undefined}
              comparePrice={selectedVariant ? getVariantComparePrice(selectedVariant) : undefined}
              product={!selectedVariant ? product : undefined}
            />

            {description ? (
              <p className="mt-6 text-sm leading-relaxed text-brand-muted md:text-base">
                {description}
              </p>
            ) : null}

            {variants.length > 0 ? (
              <div className="mt-8">
                <Label className="mb-3">
                  {locale === "ar" ? "اللون" : "Color"}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant) => {
                    const variantId = getVariantId(variant);
                    const selected = variantId === selectedVariantId;
                    const colorName = getVariantColorName(variant, locale);
                    const available = isVariantInStock(variant);
                    return (
                      <button
                        key={variantId}
                        type="button"
                        disabled={!available}
                        onClick={() => setSelectedVariantId(variantId)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                          selected
                            ? "border-brand-primary bg-brand-primary text-brand-secondary"
                            : "border-brand-border bg-brand-surface text-brand-text hover:border-brand-accent",
                          !available && "cursor-not-allowed opacity-50"
                        )}
                        aria-pressed={selected}
                      >
                        {colorName}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-4">
              <p
                className={cn(
                  "text-sm font-medium",
                  inStock ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
                )}
              >
                {inStock
                  ? locale === "ar"
                    ? "متوفر"
                    : "In stock"
                  : locale === "ar"
                    ? "غير متوفر"
                    : "Out of stock"}
              </p>
            </div>

            <Button
              type="button"
              variant="accent"
              size="lg"
              className="mt-8 w-full sm:w-auto"
              disabled={!inStock || !selectedVariantId}
              loading={adding || cartLoading}
              onClick={handleAddToCart}
            >
              {locale === "ar" ? "أضف إلى السلة" : "Add to Cart"}
            </Button>
          </div>
        </div>
      ) : null}
    </StoreLayout>
  );
}
