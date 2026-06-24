import { useEffect } from "react";

const BRAND = "Cairo Bags";

export function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | ${BRAND}` : BRAND;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
