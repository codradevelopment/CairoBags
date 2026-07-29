/**
 * RTL + LTR support utilities.
 *
 * Usage:
 * - Set document.documentElement.dir = 'rtl' | 'ltr'
 * - Set document.documentElement.lang = 'ar' | 'en'
 * - Prefer logical Tailwind classes: ms-, me-, ps-, pe-, start-, end-
 */
export const locales = {
  EN: "en",
  AR: "ar",
};

export const localeDirections = {
  en: "ltr",
  ar: "rtl",
};

export function applyLocale(locale) {
  if (typeof document === "undefined") return;
  const dir = localeDirections[locale] || "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = locale;
  document.documentElement.dataset.locale = locale;
}

export function isRtl(locale = document?.documentElement?.lang) {
  return locale === locales.AR || localeDirections[locale] === "rtl";
}
