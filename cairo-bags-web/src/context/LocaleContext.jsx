import { createContext, useContext, useState, useEffect } from "react";
import { applyLocale, locales } from "../theme/rtl.js";

const LOCALE_STORAGE_KEY = "cairo-locale";

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof localStorage === "undefined") return locales.EN;
    return localStorage.getItem(LOCALE_STORAGE_KEY) || locales.EN;
  });

  useEffect(() => {
    applyLocale(locale);
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = (next) => {
    setLocaleState(next === locales.AR ? locales.AR : locales.EN);
  };

  const toggleLocale = () => {
    setLocale(locale === locales.AR ? locales.EN : locales.AR);
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        isRtl: locale === locales.AR,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
