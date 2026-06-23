import { useEffect, useState } from "react";
import * as addressService from "../../services/addressService.js";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { Button } from "../ui/Button.jsx";
import { Input, Label, FieldError, InputGroup } from "../ui/Input.jsx";
import { Card, CardBody, CardHeader } from "../ui/Card.jsx";
import { Spinner } from "../ui/Spinner.jsx";
import { cn } from "../../utils/cn.js";

function getAddressId(address) {
  return address?.id ?? address?.Id;
}

function formatAddressLine(address, locale) {
  const line2 = address?.addressLine2 ?? address?.AddressLine2;
  const parts = [
    address?.addressLine1 ?? address?.AddressLine1,
    line2,
    address?.city ?? address?.City,
    address?.governorate ?? address?.Governorate,
  ].filter(Boolean);
  return parts.join(locale === "ar" ? "، " : ", ");
}

const EMPTY_FORM = {
  fullName: "",
  phoneNumber: "",
  governorate: "",
  city: "",
  addressLine1: "",
  addressLine2: "",
  postalCode: "",
  isDefault: true,
};

export function ShippingAddressSelector({
  value,
  onChange,
  className,
}) {
  const { locale } = useLocale();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  async function loadAddresses() {
    setLoading(true);
    setError(null);
    try {
      const data = await addressService.getShippingAddresses();
      const list = Array.isArray(data) ? data : [];
      setAddresses(list);
      if (!value && list.length > 0) {
        const defaultAddr = list.find((a) => a.isDefault ?? a.IsDefault) ?? list[0];
        onChange(getAddressId(defaultAddr), defaultAddr);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAddresses();
  }, []);

  useEffect(() => {
    if (user?.name && !form.fullName) {
      setForm((prev) => ({
        ...prev,
        fullName: user.name || user.userName || "",
        phoneNumber: user.phoneNumber || "",
      }));
    }
  }, [user]);

  async function handleCreate(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = locale === "ar" ? "مطلوب" : "Required";
    if (!form.phoneNumber.trim()) nextErrors.phoneNumber = locale === "ar" ? "مطلوب" : "Required";
    if (!form.governorate.trim()) nextErrors.governorate = locale === "ar" ? "مطلوب" : "Required";
    if (!form.city.trim()) nextErrors.city = locale === "ar" ? "مطلوب" : "Required";
    if (!form.addressLine1.trim()) nextErrors.addressLine1 = locale === "ar" ? "مطلوب" : "Required";
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSaving(true);
    try {
      const created = await addressService.createShippingAddress({
        fullName: form.fullName.trim(),
        phoneNumber: form.phoneNumber.trim(),
        governorate: form.governorate.trim(),
        city: form.city.trim(),
        addressLine1: form.addressLine1.trim(),
        addressLine2: form.addressLine2.trim() || null,
        postalCode: form.postalCode.trim() || null,
        isDefault: form.isDefault,
      });
      await loadAddresses();
      onChange(getAddressId(created), created);
      setShowForm(false);
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className={cn("flex justify-center py-8", className)}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-medium text-brand-text">
          {locale === "ar" ? "عنوان الشحن" : "Shipping Address"}
        </h3>
        <Button type="button" variant="outline" size="sm" onClick={() => setShowForm((v) => !v)}>
          {showForm
            ? locale === "ar"
              ? "إلغاء"
              : "Cancel"
            : locale === "ar"
              ? "عنوان جديد"
              : "New Address"}
        </Button>
      </div>

      {error && !showForm ? (
        <p className="text-sm text-red-700">{error.message}</p>
      ) : null}

      {addresses.length > 0 ? (
        <div className="space-y-3">
          {addresses.map((address) => {
            const id = getAddressId(address);
            const selected = value === id;
            return (
              <label
                key={id}
                className={cn(
                  "block cursor-pointer rounded-lg border p-4 transition-colors",
                  selected
                    ? "border-brand-accent bg-brand-accent/5"
                    : "border-brand-border hover:border-brand-muted"
                )}
              >
                <input
                  type="radio"
                  name="shipping-address"
                  className="sr-only"
                  checked={selected}
                  onChange={() => onChange(id, address)}
                />
                <p className="font-medium text-brand-text">
                  {address.fullName ?? address.FullName}
                </p>
                <p className="mt-1 text-sm text-brand-muted">
                  {address.phoneNumber ?? address.PhoneNumber}
                </p>
                <p className="mt-1 text-sm text-brand-muted">{formatAddressLine(address, locale)}</p>
              </label>
            );
          })}
        </div>
      ) : !showForm ? (
        <Card variant="flat" padding="md">
          <CardBody className="text-center text-sm text-brand-muted">
            {locale === "ar" ? "أضف عنوان شحن للمتابعة" : "Add a shipping address to continue"}
          </CardBody>
        </Card>
      ) : null}

      {showForm ? (
        <Card variant="bordered" padding="md">
          <CardHeader title={locale === "ar" ? "عنوان جديد" : "New Address"} />
          <form onSubmit={handleCreate}>
            <CardBody className="grid gap-4 sm:grid-cols-2">
              <InputGroup className="sm:col-span-2">
                <Label required>{locale === "ar" ? "الاسم الكامل" : "Full name"}</Label>
                <Input
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  variant={fieldErrors.fullName ? "error" : "default"}
                />
                <FieldError>{fieldErrors.fullName}</FieldError>
              </InputGroup>
              <InputGroup>
                <Label required>{locale === "ar" ? "الهاتف" : "Phone"}</Label>
                <Input
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  variant={fieldErrors.phoneNumber ? "error" : "default"}
                />
                <FieldError>{fieldErrors.phoneNumber}</FieldError>
              </InputGroup>
              <InputGroup>
                <Label required>{locale === "ar" ? "المحافظة" : "Governorate"}</Label>
                <Input
                  value={form.governorate}
                  onChange={(e) => setForm({ ...form, governorate: e.target.value })}
                  variant={fieldErrors.governorate ? "error" : "default"}
                />
                <FieldError>{fieldErrors.governorate}</FieldError>
              </InputGroup>
              <InputGroup>
                <Label required>{locale === "ar" ? "المدينة" : "City"}</Label>
                <Input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  variant={fieldErrors.city ? "error" : "default"}
                />
                <FieldError>{fieldErrors.city}</FieldError>
              </InputGroup>
              <InputGroup className="sm:col-span-2">
                <Label required>{locale === "ar" ? "العنوان" : "Address line"}</Label>
                <Input
                  value={form.addressLine1}
                  onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                  variant={fieldErrors.addressLine1 ? "error" : "default"}
                />
                <FieldError>{fieldErrors.addressLine1}</FieldError>
              </InputGroup>
              <InputGroup className="sm:col-span-2">
                <Label>{locale === "ar" ? "تفاصيل إضافية" : "Address line 2"}</Label>
                <Input
                  value={form.addressLine2}
                  onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
                />
              </InputGroup>
              <div className="sm:col-span-2">
                <Button type="submit" variant="accent" loading={saving}>
                  {locale === "ar" ? "حفظ العنوان" : "Save Address"}
                </Button>
              </div>
            </CardBody>
          </form>
        </Card>
      ) : null}
    </div>
  );
}
