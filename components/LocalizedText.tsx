"use client";

import { useCallback } from "react";
import { usePortfolioLanguage } from "@/hooks/usePortfolioLanguage";

export default function LocalizedText({ en, ja }: { en: string; ja: string }) {
  const noop = useCallback(() => {}, []);
  const { language } = usePortfolioLanguage(noop);
  return <>{language === "ja" ? ja : en}</>;
}
