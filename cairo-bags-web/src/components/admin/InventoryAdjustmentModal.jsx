import { useState } from "react";
import { Modal } from "../ui/Modal.jsx";
import { Button, Input, InputGroup, Label, Textarea } from "../ui/index.js";
import { useLocale } from "../layout/LanguageSwitcher.jsx";

export function InventoryAdjustmentModal({
  open,
  onClose,
  item,
  mode = "adjust",
  onSubmit,
  loading,
}) {
  const { locale } = useLocale();
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  if (!item) return null;

  const titles = {
    adjust: locale === "ar" ? "تعديل المخزون" : "Adjust stock",
    reserve: locale === "ar" ? "حجز مخزون" : "Reserve stock",
    release: locale === "ar" ? "إطلاق مخزون" : "Release stock",
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit({
      quantity: Number(quantity),
      notes: notes.trim() || undefined,
      referenceNumber: referenceNumber.trim() || undefined,
    });
    setQuantity("");
    setNotes("");
    setReferenceNumber("");
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={titles[mode] || titles.adjust}
      description={item.sku ?? item.Sku}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {locale === "ar" ? "إلغاء" : "Cancel"}
          </Button>
          <Button variant="accent" onClick={handleSubmit} loading={loading}>
            {locale === "ar" ? "تأكيد" : "Confirm"}
          </Button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputGroup>
          <Label required>
            {mode === "adjust"
              ? locale === "ar"
                ? "التغيير (+/-)"
                : "Adjustment (+/-)"
              : locale === "ar"
                ? "الكمية"
                : "Quantity"}
          </Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>{locale === "ar" ? "ملاحظات" : "Notes"}</Label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
        </InputGroup>
        <InputGroup>
          <Label>{locale === "ar" ? "رقم المرجع" : "Reference number"}</Label>
          <Input value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} />
        </InputGroup>
      </form>
    </Modal>
  );
}
