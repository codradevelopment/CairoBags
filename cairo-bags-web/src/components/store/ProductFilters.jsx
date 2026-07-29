import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { Button } from "../ui/Button.jsx";
import { Input } from "../ui/Input.jsx";
import { Label } from "../ui/Input.jsx";
import { Card, CardBody, CardHeader } from "../ui/Card.jsx";
import { getCategoryId, getCategoryName } from "../../utils/productHelpers.js";
import { cn } from "../../utils/cn.js";

export function ProductFilters({
  categories = [],
  filters,
  onChange,
  onApply,
  onReset,
  className,
}) {
  const { locale } = useLocale();

  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <Card variant="flat" padding="md" className={cn("h-fit", className)}>
      <CardHeader
        title={locale === "ar" ? "تصفية" : "Filters"}
        className="mb-3"
      />
      <CardBody className="space-y-4">
        <div>
          <Label htmlFor="filter-category">{locale === "ar" ? "التصنيف" : "Category"}</Label>
          <select
            id="filter-category"
            value={filters.categoryId ?? ""}
            onChange={(e) => update("categoryId", e.target.value || "")}
            className="mt-1.5 h-11 w-full rounded-md border border-brand-border bg-brand-surface px-3 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          >
            <option value="">{locale === "ar" ? "الكل" : "All"}</option>
            {categories.map((cat) => (
              <option key={getCategoryId(cat)} value={getCategoryId(cat)}>
                {getCategoryName(cat, locale)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="filter-min">{locale === "ar" ? "أقل سعر" : "Min price"}</Label>
            <Input
              id="filter-min"
              type="number"
              min="0"
              placeholder="0"
              value={filters.minPrice ?? ""}
              onChange={(e) => update("minPrice", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="filter-max">{locale === "ar" ? "أعلى سعر" : "Max price"}</Label>
            <Input
              id="filter-max"
              type="number"
              min="0"
              placeholder="—"
              value={filters.maxPrice ?? ""}
              onChange={(e) => update("maxPrice", e.target.value)}
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-brand-text">
          <input
            type="checkbox"
            checked={filters.inStock === true}
            onChange={(e) => update("inStock", e.target.checked ? true : "")}
            className="h-4 w-4 rounded border-brand-border text-brand-accent focus:ring-brand-accent"
          />
          {locale === "ar" ? "متوفر فقط" : "In stock only"}
        </label>

        <div className="flex gap-2 pt-2">
          <Button type="button" variant="primary" className="flex-1" onClick={onApply}>
            {locale === "ar" ? "تطبيق" : "Apply"}
          </Button>
          <Button type="button" variant="outline" onClick={onReset}>
            {locale === "ar" ? "إعادة" : "Reset"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
