import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";
import { initTheme } from "./theme/darkMode.js";
import { applyLocale, locales } from "./theme/rtl.js";

const LOCALE_STORAGE_KEY = "cairo-locale";

initTheme();

const storedLocale =
  typeof localStorage !== "undefined"
    ? localStorage.getItem(LOCALE_STORAGE_KEY) || locales.EN
    : locales.EN;
applyLocale(storedLocale);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
