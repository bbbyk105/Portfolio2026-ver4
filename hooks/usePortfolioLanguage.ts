"use client";

import { useCallback, useEffect, useState } from "react";

export type PortfolioLanguage = "en" | "ja";

const STORAGE_KEY = "portfolio-language";
const LANGUAGE_EVENT = "portfolio-language-change";

export function detectVisitorLanguage(): PortfolioLanguage {
  const locales = [navigator.language, ...(navigator.languages ?? [])]
    .filter(Boolean)
    .map((value) => value.toLowerCase());

  if (locales.some((locale) => locale === "ja" || locale.startsWith("ja-"))) return "ja";

  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Tokyo") return "ja";
  } catch {
    // Browser privacy settings may hide timezone data.
  }

  return "en";
}

export function usePortfolioLanguage(
  applyLanguage: (language: PortfolioLanguage) => void,
) {
  const [language, setLanguage] = useState<PortfolioLanguage>("en");

  const apply = useCallback(
    (next: PortfolioLanguage, persist: boolean) => {
      setLanguage(next);
      applyLanguage(next);
      if (persist) window.localStorage.setItem(STORAGE_KEY, next);
    },
    [applyLanguage],
  );

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initial: PortfolioLanguage =
      saved === "ja" || saved === "en" ? saved : detectVisitorLanguage();
    apply(initial, false);

    const sync = (event: Event) => {
      const next = (event as CustomEvent<PortfolioLanguage>).detail;
      if (next === "ja" || next === "en") apply(next, false);
    };
    window.addEventListener(LANGUAGE_EVENT, sync);
    return () => window.removeEventListener(LANGUAGE_EVENT, sync);
  }, [apply]);

  const changeLanguage = useCallback(
    (next: PortfolioLanguage) => {
      apply(next, true);
      window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: next }));
    },
    [apply],
  );

  return { language, changeLanguage } as const;
}
