"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "ja";

const ja: Record<string, string> = {
  "I design and build digital products, web experiences, and automation systems from research prototypes to production services.": "リサーチ段階のプロトタイプから本番サービスまで、デジタルプロダクト、Web体験、業務自動化システムを設計・実装しています。",
  "A personal calorie and meal management app that uses AI to make everyday food logging easier.": "AIを活用し、日々の食事記録をより手軽にする個人向けカロリー・食事管理アプリ。",
  "University research development for comparing protein structures through inter-carbon distances, with automated retrieval and processing of structural data from UniProt and PDB.": "炭素間距離を用いてタンパク質構造を比較する大学研究。UniProt・PDBからの構造データ取得と処理まで自動化。",
  "Web and commerce development for client projects, from information architecture and frontend implementation to CMS and checkout integration.": "クライアント向けのWeb・EC開発。情報設計、フロントエンド実装からCMS、決済連携まで一貫して構築。",
  "Automation work connecting APIs and data-processing steps for research and operational workflows.": "研究・業務フローにおけるAPI連携とデータ処理工程をつなぐ自動化システムの設計・開発。",
  "My work spans mobile apps, web development, research software, and workflow automation. I studied life science at Gakushuin University, where I developed software for protein structure analysis.": "モバイルアプリ、Web開発、研究用ソフトウェア、業務自動化まで領域を横断して開発しています。学習院大学では生命科学を専攻し、タンパク質構造解析のためのソフトウェアを開発しました。",
  "Today I work across personal product development and client projects, focusing on practical systems that are clear, reliable, and usable.": "現在は個人プロダクトとクライアントワークの双方に取り組み、明快で信頼性が高く、実際に使われるシステムを重視しています。",
  "Food photo": "食事写真",
  "Barcode / label": "バーコード / ラベル",
  "Nutrition": "栄養解析",
  "Cα distances": "Cα間距離",
  "Structure analysis": "構造解析"
};

const en = Object.fromEntries(Object.entries(ja).map(([key, value]) => [value, key]));

function translate(root: HTMLElement, lang: Lang) {
  const dictionary = lang === "ja" ? ja : en;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    const value = node.nodeValue?.trim();
    if (!value || !dictionary[value]) continue;
    node.nodeValue = (node.nodeValue ?? "").replace(value, dictionary[value]);
  }
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
}

function detectVisitorLanguage(): Lang {
  const locales = [navigator.language, ...(navigator.languages ?? [])]
    .filter(Boolean)
    .map((value) => value.toLowerCase());

  // Prefer the visitor's explicit browser/device language. This is more
  // privacy-friendly and more accurate for travellers than IP alone.
  if (locales.some((locale) => locale === "ja" || locale.startsWith("ja-"))) return "ja";

  // Location-aware fallback without a third-party geolocation request:
  // browsers expose the IANA timezone selected by the device. Japan has one
  // timezone, so Asia/Tokyo is a strong signal when the browser language is
  // otherwise inconclusive.
  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Tokyo") return "ja";
  } catch {
    // Ignore unavailable/blocked Intl data and fall back to English.
  }

  return "en";
}

export default function LanguageToggle() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language") as Lang | null;
    const initial: Lang = saved === "ja" || saved === "en" ? saved : detectVisitorLanguage();
    setLang(initial);
    translate(document.body, initial);
  }, []);

  const change = (next: Lang) => {
    if (next === lang) return;
    translate(document.body, next);
    window.localStorage.setItem("portfolio-language", next);
    setLang(next);
  };

  return (
    <div className="language-toggle t-mono" aria-label="Language selector">
      <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => change("en")} aria-pressed={lang === "en"}>EN</button>
      <span className="language-toggle-divider" aria-hidden="true">/</span>
      <button type="button" className={lang === "ja" ? "is-active" : ""} onClick={() => change("ja")} aria-pressed={lang === "ja"}>JP</button>
    </div>
  );
}
