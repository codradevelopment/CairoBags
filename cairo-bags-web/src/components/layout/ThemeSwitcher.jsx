import { useEffect, useState } from "react";
import { Button } from "../ui/Button.jsx";
import {
  initTheme,
  setTheme,
  themeModes,
  THEME_STORAGE_KEY,
} from "../../theme/darkMode.js";
import { cn } from "../../utils/cn.js";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function useThemeMode() {
  const [mode, setModeState] = useState(() => {
    if (typeof localStorage === "undefined") return themeModes.LIGHT;
    return localStorage.getItem(THEME_STORAGE_KEY) || themeModes.LIGHT;
  });

  useEffect(() => {
    initTheme(mode);
  }, [mode]);

  const setMode = (next) => {
    setTheme(next);
    setModeState(next);
  };

  const toggleMode = () => {
    const next = mode === themeModes.DARK ? themeModes.LIGHT : themeModes.DARK;
    setMode(next);
  };

  const isDark = mode === themeModes.DARK;

  return { mode, setMode, toggleMode, isDark };
}

export function ThemeSwitcher({ className, variant = "ghost", size = "sm" }) {
  const { isDark, toggleMode } = useThemeMode();

  return (
    <Button
      type="button"
      variant={variant}
      size="icon"
      onClick={toggleMode}
      className={cn(className)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
