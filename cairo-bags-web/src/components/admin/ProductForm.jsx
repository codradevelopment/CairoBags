import { useState } from "react";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import * as fileService from "../../services/fileService.js";
import { slugify } from "../../utils/pagination.js";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FieldError,
  Input,
  InputGroup,
  Label,
  Textarea,
} from "../ui/index.js";

const DEFAULT_VARIANT = {
  colorNameAr: "",
  colorNameEn: "",
  sku: "",
  price: "",
  compareAtPrice: "",
  status: 1,
  isDefault: true,
  quantity: 0,
  lowStockThreshold: 5,
};

const EMPTY_PRODUCT = {
  categoryId: "",
  status: 1,
  compareAtPrice: "",
  isFeatured: false,
  isNewArrival: false,
  nameAr: "",
  nameEn: "",
  slugAr: "",
  slugEn: "",
  shortDescriptionAr: "",
  shortDescriptionEn: "",
  descriptionAr: "",
  descriptionEn: "",
  imageUrl: "",
  variants: [{ ...DEFAULT_VARIANT }],
};

export function ProductForm({ initialValues, categories = [], onSubmit, submitting }) {
  const { locale } = useLocale();
  const [form, setForm] = useState({ ...EMPTY_PRODUCT, ...initialValues });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  function updateField(key, value) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "nameEn" && !prev.slugEn) next.slugEn = slugify(value);
      if (key === "nameAr" && !prev.slugAr) next.slugAr = slugify(value);
      return next;
    });
  }

  function updateVariant(index, key, value) {
    setForm((prev) => {
      const variants = [...prev.variants];
      variants[index] = { ...variants[index], [key]: value };
      return { ...prev, variants };
    });
  }

  async function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { imageUrl } = await fileService.uploadImageAndGetUrl(file);
      updateField("imageUrl", imageUrl);
    } finally {
      setUploading(false);
    }
  }

  function validate() {
    const next = {};
    if (!form.categoryId) next.categoryId = locale === "ar" ? "مطلوب" : "Required";
    if (!form.nameAr.trim()) next.nameAr = locale === "ar" ? "مطلوب" : "Required";
    if (!form.nameEn.trim()) next.nameEn = locale === "ar" ? "مطلوب" : "Required";
    if (!form.slugAr.trim()) next.slugAr = locale === "ar" ? "مطلوب" : "Required";
    if (!form.slugEn.trim()) next.slugEn = locale === "ar" ? "مطلوب" : "Required";
    if (!form.variants[0]?.sku) next.variant = locale === "ar" ? "SKU مطلوب" : "SKU required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      categoryId: Number(form.categoryId),
      status: Number(form.status),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
      isFeatured: Boolean(form.isFeatured),
      isNewArrival: Boolean(form.isNewArrival),
      nameAr: form.nameAr.trim(),
      nameEn: form.nameEn.trim(),
      slugAr: form.slugAr.trim(),
      slugEn: form.slugEn.trim(),
      shortDescriptionAr: form.shortDescriptionAr?.trim() || null,
      shortDescriptionEn: form.shortDescriptionEn?.trim() || null,
      descriptionAr: form.descriptionAr?.trim() || null,
      descriptionEn: form.descriptionEn?.trim() || null,
      variants: form.variants.map((v, index) => ({
        id: v.id ?? undefined,
        colorNameAr: v.colorNameAr || form.nameAr,
        colorNameEn: v.colorNameEn || form.nameEn,
        sku: v.sku,
        price: Number(v.price) || 0,
        compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : null,
        status: Number(v.status) || 1,
        isDefault: index === 0,
        quantity: Number(v.quantity) || 0,
        lowStockThreshold: Number(v.lowStockThreshold) || 5,
      })),
      images: form.imageUrl
        ? [{ imageUrl: form.imageUrl, isPrimary: true, sortOrder: 0 }]
        : undefined,
    };

    await onSubmit(payload);
  }

  const variant = form.variants[0];

  return (
    <form onSubmit={handleSubmit}>
      <Card variant="default" padding="lg">
        <CardBody className="grid gap-4 md:grid-cols-2">
          <InputGroup>
            <Label required>{locale === "ar" ? "التصنيف" : "Category"}</Label>
            <select
              value={form.categoryId}
              onChange={(e) => updateField("categoryId", e.target.value)}
              className="h-11 w-full rounded-md border border-brand-border bg-brand-surface px-3 text-sm"
            >
              <option value="">{locale === "ar" ? "اختر" : "Select"}</option>
              {categories.map((cat) => (
                <option key={cat.id ?? cat.Id} value={cat.id ?? cat.Id}>
                  {cat.english?.name ?? cat.English?.Name}
                </option>
              ))}
            </select>
            <FieldError>{errors.categoryId}</FieldError>
          </InputGroup>
          <InputGroup>
            <Label>{locale === "ar" ? "الحالة" : "Status"}</Label>
            <select
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
              className="h-11 w-full rounded-md border border-brand-border bg-brand-surface px-3 text-sm"
            >
              <option value={0}>{locale === "ar" ? "مسودة" : "Draft"}</option>
              <option value={1}>{locale === "ar" ? "نشط" : "Active"}</option>
              <option value={2}>{locale === "ar" ? "مؤرشف" : "Archived"}</option>
            </select>
          </InputGroup>
          <InputGroup>
            <Label required>{locale === "ar" ? "الاسم (عربي)" : "Name (Arabic)"}</Label>
            <Input value={form.nameAr} onChange={(e) => updateField("nameAr", e.target.value)} />
            <FieldError>{errors.nameAr}</FieldError>
          </InputGroup>
          <InputGroup>
            <Label required>{locale === "ar" ? "الاسم (إنجليزي)" : "Name (English)"}</Label>
            <Input value={form.nameEn} onChange={(e) => updateField("nameEn", e.target.value)} />
            <FieldError>{errors.nameEn}</FieldError>
          </InputGroup>
          <InputGroup>
            <Label required>{locale === "ar" ? "الرابط (عربي)" : "Slug (Arabic)"}</Label>
            <Input value={form.slugAr} onChange={(e) => updateField("slugAr", e.target.value)} />
            <FieldError>{errors.slugAr}</FieldError>
          </InputGroup>
          <InputGroup>
            <Label required>{locale === "ar" ? "الرابط (إنجليزي)" : "Slug (English)"}</Label>
            <Input value={form.slugEn} onChange={(e) => updateField("slugEn", e.target.value)} />
            <FieldError>{errors.slugEn}</FieldError>
          </InputGroup>
          <InputGroup className="md:col-span-2">
            <Label>{locale === "ar" ? "وصف قصير (إنجليزي)" : "Short description (English)"}</Label>
            <Textarea
              value={form.shortDescriptionEn}
              onChange={(e) => updateField("shortDescriptionEn", e.target.value)}
            />
          </InputGroup>
          <InputGroup className="md:col-span-2">
            <Label>{locale === "ar" ? "الوصف (إنجليزي)" : "Description (English)"}</Label>
            <Textarea value={form.descriptionEn} onChange={(e) => updateField("descriptionEn", e.target.value)} />
          </InputGroup>
          <InputGroup className="md:col-span-2">
            <Label>{locale === "ar" ? "صورة المنتج" : "Product image"}</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} />
          </InputGroup>
          <div className="flex flex-wrap gap-4 md:col-span-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => updateField("isFeatured", e.target.checked)}
              />
              {locale === "ar" ? "مميز" : "Featured"}
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isNewArrival}
                onChange={(e) => updateField("isNewArrival", e.target.checked)}
              />
              {locale === "ar" ? "وصل حديثاً" : "New arrival"}
            </label>
          </div>

          <div className="rounded-lg border border-brand-border p-4 md:col-span-2">
            <p className="mb-3 font-medium text-brand-text">
              {locale === "ar" ? "المتغير الافتراضي" : "Default variant"}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <InputGroup>
                <Label required>SKU</Label>
                <Input value={variant.sku} onChange={(e) => updateVariant(0, "sku", e.target.value)} />
                <FieldError>{errors.variant}</FieldError>
              </InputGroup>
              <InputGroup>
                <Label required>{locale === "ar" ? "السعر" : "Price"}</Label>
                <Input
                  type="number"
                  value={variant.price}
                  onChange={(e) => updateVariant(0, "price", e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <Label>{locale === "ar" ? "الكمية" : "Quantity"}</Label>
                <Input
                  type="number"
                  value={variant.quantity}
                  onChange={(e) => updateVariant(0, "quantity", e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <Label>{locale === "ar" ? "حد المخزون المنخفض" : "Low stock threshold"}</Label>
                <Input
                  type="number"
                  value={variant.lowStockThreshold}
                  onChange={(e) => updateVariant(0, "lowStockThreshold", e.target.value)}
                />
              </InputGroup>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button type="submit" variant="accent" loading={submitting || uploading}>
            {locale === "ar" ? "حفظ المنتج" : "Save product"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
