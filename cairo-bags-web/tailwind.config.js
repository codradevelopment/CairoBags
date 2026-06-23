import { breakpoints } from "./src/theme/breakpoints.js";
import { spacing } from "./src/theme/spacing.js";
import { fontFamily, fontSize } from "./src/theme/typography.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#111111",
          secondary: "#EAE4D8",
          background: "#F5F1E8",
          border: "#D8D0C2",
          text: "#111111",
          muted: "#666666",
          surface: "#FFFFFF",
          accent: "#C9A962",
          "accent-muted": "#E8D5A3",
        },
      },
      fontFamily,
      fontSize,
      spacing,
      screens: breakpoints,
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(17, 17, 17, 0.08)",
        card: "0 2px 16px -2px rgba(17, 17, 17, 0.06)",
        modal: "0 24px 48px -12px rgba(17, 17, 17, 0.18)",
        toast: "0 8px 32px -4px rgba(17, 17, 17, 0.12)",
      },
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "200ms",
        slow: "300ms",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(0.5rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-0.5rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
        "fade-out": "fade-out 150ms ease-in",
        "slide-up": "slide-up 250ms ease-out",
        "slide-down": "slide-down 250ms ease-out",
        shimmer: "shimmer 1.5s ease-in-out infinite",
        spin: "spin 0.8s linear infinite",
      },
      maxWidth: {
        container: "80rem",
      },
    },
  },
  plugins: [],
};
