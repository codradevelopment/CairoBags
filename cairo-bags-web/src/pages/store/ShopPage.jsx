import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StoreLayout } from "../../layouts/StoreLayout.jsx";
import { usePageTitle } from "../../hooks/usePageTitle.js";
import { useLocale } from "../../components/layout/LanguageSwitcher.jsx";
import * as productService from "../../services/productService.js";
import * as categoryService from "../../services/categoryService.js";
import {
  ProductCard,
  ProductFilters,
  ProductGridSkeleton,
  ProductSearch,
  EmptyState,
} from "../../components/store/index.js";
import {
  buildProductQueryParams,
  filtersToSearchParams,
  parseShopFilters,
} from "../../utils/shopFilters.js";
import { Button } from "../../components/ui/index.js";

export function ShopPage() {
  const { locale } = useLocale();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFilters = parseShopFilters(searchParams);
  const [draftFilters, setDraftFilters] = useState(urlFilters);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  usePageTitle(locale === "ar" ? "تسوق" : "Shop");

  useEffect(() => {
    setDraftFilters(parseShopFilters(searchParams));
  }, [searchParams]);

  useEffect(() => {
    categoryService.getCategories().then((data) => {
      setCategories(Array.isArray(data) ? data : []);
    }).catch(() => {});
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts(buildProductQueryParams(urlFilters));
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [urlFilters.categoryId, urlFilters.minPrice, urlFilters.maxPrice, urlFilters.inStock, urlFilters.searchTerm]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function applyFilters() {
    const next = filtersToSearchParams(draftFilters);
    setSearchParams(next);
    setFiltersOpen(false);
  }

  function resetFilters() {
    const empty = { categoryId: "", minPrice: "", maxPrice: "", inStock: false, searchTerm: "" };
    setDraftFilters(empty);
    setSearchParams({});
    setFiltersOpen(false);
  }

  const title = locale === "ar" ? "تسوق" : "Shop";
  const countLabel =
    locale === "ar"
      ? `${products.length} منتج`
      : `${products.length} product${products.length === 1 ? "" : "s"}`;

  return (
    <StoreLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-medium text-brand-text md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-brand-muted">
          {locale === "ar"
            ? "استكشف مجموعتنا الكاملة من الحقائب الفاخرة"
            : "Explore our full collection of luxury handbags"}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <ProductSearch
          className="w-full lg:max-w-md"
          defaultValue={urlFilters.searchTerm}
          onSubmit={(q) => {
            const next = filtersToSearchParams({ ...urlFilters, searchTerm: q });
            setSearchParams(next);
          }}
        />
        <Button
          type="button"
          variant="outline"
          className="lg:hidden"
          onClick={() => setFiltersOpen((v) => !v)}
        >
          {locale === "ar" ? "تصفية" : "Filters"}
        </Button>
      </div>

      <div className="flex gap-8">
        <aside className={filtersOpen ? "block w-full lg:block lg:w-64 lg:shrink-0" : "hidden lg:block lg:w-64 lg:shrink-0"}>
          <ProductFilters
            categories={categories}
            filters={draftFilters}
            onChange={setDraftFilters}
            onApply={applyFilters}
            onReset={resetFilters}
          />
        </aside>

        <div className="min-w-0 flex-1">
          <p className="mb-4 text-sm text-brand-muted">{countLabel}</p>

          {loading ? <ProductGridSkeleton /> : null}
          {!loading && error ? (
            <EmptyState
              title={locale === "ar" ? "تعذر تحميل المنتجات" : "Unable to load products"}
              description={error.message}
              action={
                <Button variant="accent" onClick={loadProducts}>
                  {locale === "ar" ? "إعادة المحاولة" : "Try again"}
                </Button>
              }
            />
          ) : null}
          {!loading && !error && products.length === 0 ? (
            <EmptyState
              title={locale === "ar" ? "لا توجد منتجات" : "No products found"}
              description={
                locale === "ar"
                  ? "جرّب تعديل عوامل التصفية"
                  : "Try adjusting your filters"
              }
              action={
                <Button variant="outline" onClick={resetFilters}>
                  {locale === "ar" ? "مسح التصفية" : "Clear filters"}
                </Button>
              }
            />
          ) : null}
          {!loading && !error && products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id ?? product.Id} product={product} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </StoreLayout>
  );
}
