import { PAYMENT_METHOD, PAYMENT_METHOD_LABELS } from "./paymentMethods.js";

export const PAYMENT_METHOD_OPTIONS = [
  {
    value: PAYMENT_METHOD.CASH_ON_DELIVERY,
    labelEn: "Cash On Delivery",
    labelAr: "الدفع عند الاستلام",
    descriptionEn: "Pay the courier when your order arrives.",
    descriptionAr: "ادفع للمندوب عند استلام الطلب.",
    isWallet: false,
  },
  {
    value: PAYMENT_METHOD.INSTA_PAY,
    labelEn: "InstaPay",
    labelAr: "إنستاباي",
    descriptionEn: "Transfer via InstaPay, then upload payment proof.",
    descriptionAr: "حوّل عبر إنستاباي، ثم ارفع إثبات الدفع.",
    isWallet: true,
  },
  {
    value: PAYMENT_METHOD.VODAFONE_CASH,
    labelEn: "Vodafone Cash",
    labelAr: "فودافون كاش",
    descriptionEn: "Send payment via Vodafone Cash wallet.",
    descriptionAr: "أرسل الدفع عبر فودافون كاش.",
    isWallet: true,
  },
  {
    value: PAYMENT_METHOD.ORANGE_CASH,
    labelEn: "Orange Cash",
    labelAr: "أورانج كاش",
    descriptionEn: "Send payment via Orange Cash wallet.",
    descriptionAr: "أرسل الدفع عبر أورانج كاش.",
    isWallet: true,
  },
  {
    value: PAYMENT_METHOD.ETISALAT_CASH,
    labelEn: "Etisalat Cash",
    labelAr: "اتصالات كاش",
    descriptionEn: "Send payment via Etisalat Cash wallet.",
    descriptionAr: "أرسل الدفع عبر اتصالات كاش.",
    isWallet: true,
  },
  {
    value: PAYMENT_METHOD.WE_PAY,
    labelEn: "WE Pay",
    labelAr: "وي باي",
    descriptionEn: "Complete payment via WE Pay wallet.",
    descriptionAr: "أكمل الدفع عبر وي باي.",
    isWallet: true,
  },
];

export function isWalletPaymentMethod(method) {
  const option = PAYMENT_METHOD_OPTIONS.find((m) => m.value === method);
  return option?.isWallet ?? method !== PAYMENT_METHOD.CASH_ON_DELIVERY;
}

export function getPaymentMethodLabel(method, locale = "en") {
  if (typeof method === "string") {
    const option = PAYMENT_METHOD_OPTIONS.find(
      (m) => PAYMENT_METHOD_LABELS[m.value] === method
    );
    if (option) return locale === "ar" ? option.labelAr : option.labelEn;
    return method;
  }
  const option = PAYMENT_METHOD_OPTIONS.find((m) => m.value === method);
  if (!option) return String(method);
  return locale === "ar" ? option.labelAr : option.labelEn;
}
