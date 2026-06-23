export const fontFamily = {
  display: ['"Playfair Display"', "Georgia", "serif"],
  sans: ['"DM Sans"', "system-ui", "sans-serif"],
  arabic: ['"Tajawal"', '"DM Sans"', "system-ui", "sans-serif"],
};

export const fontSize = {
  xs: ["0.75rem", { lineHeight: "1.125rem", letterSpacing: "0.02em" }],
  sm: ["0.875rem", { lineHeight: "1.375rem", letterSpacing: "0.01em" }],
  base: ["1rem", { lineHeight: "1.625rem", letterSpacing: "0" }],
  lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
  xl: ["1.25rem", { lineHeight: "1.875rem", letterSpacing: "-0.01em" }],
  "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],
  "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
  "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.03em" }],
  "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
};

export const typography = {
  h1: "font-display text-4xl md:text-5xl font-semibold tracking-tight text-brand-text",
  h2: "font-display text-3xl md:text-4xl font-semibold tracking-tight text-brand-text",
  h3: "font-display text-2xl md:text-3xl font-medium text-brand-text",
  h4: "font-display text-xl md:text-2xl font-medium text-brand-text",
  body: "font-sans text-base text-brand-text",
  bodySm: "font-sans text-sm text-brand-text",
  muted: "font-sans text-sm text-brand-muted",
  label: "font-sans text-sm font-medium text-brand-text",
  caption: "font-sans text-xs text-brand-muted tracking-wide uppercase",
  overline: "font-sans text-xs font-medium tracking-[0.2em] uppercase text-brand-muted",
};

export function typographyClass(locale = "en") {
  return locale === "ar" ? "font-arabic" : "font-sans";
}
