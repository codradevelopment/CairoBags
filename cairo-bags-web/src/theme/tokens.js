/**
 * Cairo Bags — canonical design tokens (source of truth for JS + CSS variables).
 */
export const colors = {
  primary: "#111111",
  secondary: "#EAE4D8",
  background: "#F5F1E8",
  border: "#D8D0C2",
  text: "#111111",
  muted: "#666666",
  surface: "#FFFFFF",
  accent: "#C9A962",
  accentMuted: "#E8D5A3",
  success: "#2D6A4F",
  warning: "#B8860B",
  error: "#9B2226",
  info: "#1D4E89",
};

export const darkColors = {
  primary: "#F5F1E8",
  secondary: "#2A2824",
  background: "#111111",
  border: "#3D3A35",
  text: "#F5F1E8",
  muted: "#A8A29E",
  surface: "#1A1A1A",
  accent: "#C9A962",
  accentMuted: "#8A7340",
};

export const radii = {
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1.25rem",
  full: "9999px",
};

export const shadows = {
  soft: "0 4px 24px -4px rgba(17, 17, 17, 0.08)",
  card: "0 2px 16px -2px rgba(17, 17, 17, 0.06)",
  modal: "0 24px 48px -12px rgba(17, 17, 17, 0.18)",
  toast: "0 8px 32px -4px rgba(17, 17, 17, 0.12)",
};

export const zIndex = {
  dropdown: 40,
  sticky: 50,
  modal: 60,
  toast: 70,
};

export const transitions = {
  fast: "150ms",
  default: "200ms",
  slow: "300ms",
};
