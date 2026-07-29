/**
 * Dark Mode Strategy — Cairo Bags
 *
 * Approach: class-based toggle on <html class="dark"> (Tailwind darkMode: 'class').
 *
 * Rationale:
 * - Luxury storefront defaults to light (warm ivory background).
 * - Admin or user preference can opt into dark via persisted setting.
 * - CSS variables in globals.css mirror tokens for both themes.
 *
 * Implementation:
 * 1. ThemeProvider (future) reads localStorage 'cairo-theme' = 'light' | 'dark' | 'system'
 * 2. On 'system', use matchMedia('(prefers-color-scheme: dark)')
 * 3. Apply/remove 'dark' on document.documentElement
 *
 * Do NOT auto-enable dark on storefront — brand identity is light-first.
 */
export const THEME_STORAGE_KEY = "cairo-theme";

export const themeModes = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

export function getSystemPrefersDark() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function resolveTheme(mode) {
  if (mode === themeModes.DARK) return themeModes.DARK;
  if (mode === themeModes.SYSTEM && getSystemPrefersDark()) return themeModes.DARK;
  return themeModes.LIGHT;
}

export function applyTheme(mode) {
  if (typeof document === "undefined") return;
  const resolved = resolveTheme(mode);
  document.documentElement.classList.toggle("dark", resolved === themeModes.DARK);
  document.documentElement.dataset.theme = resolved;
}

export function initTheme(mode = themeModes.LIGHT) {
  const stored =
    typeof localStorage !== "undefined"
      ? localStorage.getItem(THEME_STORAGE_KEY) || mode
      : mode;
  applyTheme(stored);
  return stored;
}

export function setTheme(mode) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }
  applyTheme(mode);
}
