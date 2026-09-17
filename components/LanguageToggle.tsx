"use client";

import { usePortfolioLanguage, type PortfolioLanguage } from "@/hooks/usePortfolioLanguage";

const japanese: Record<string, string> = {
  "I design and build digital products, web experiences, and automation systems from research prototypes to production services.": "リサーチ段階のプロトタイプから本番サービスまで、デジタルプロダクト、Web体験、業務自動化システムを設計・実装しています。",
  "A personal calorie and meal management app that uses AI to make everyday food logging easier.": "AIを活用し、日々の食事記録をより手軽にする個人向けカロリー・食事管理アプリ。",
  "University research development for comparing protein structures through inter-carbon distances, with automated retrieval and processing of structural data from UniProt and PDB.": "炭素間距離を用いてタンパク質構造を比較する大学研究。UniProt・PDBからの構造データ取得と処理まで自動化。",
  "Web and commerce development for client projects, from information architecture and frontend implementation to CMS and checkout integration.": "クライアント向けのWeb・EC開発。情報設計、フロントエンド実装からCMS、決済連携まで一貫して構築。",
  "Automation work connecting APIs and data-processing steps for research and operational workflows.": "研究・業務フローにおけるAPI連携とデータ処理工程をつなぐ自動化システムの設計・開発。",
  "My work spans mobile apps, web development, research software, and workflow automation. I studied life science at Gakushuin University, where I developed software for protein structure analysis.": "モバイルアプリ、Web開発、研究用ソフトウェア、業務自動化まで領域を横断して開発しています。学習院大学では生命科学を専攻し、タンパク質構造解析のためのソフトウェアを開発しました。",
  "Today I work across personal product development and client projects, focusing on practical systems that are clear, reliable, and usable.": "現在は個人プロダクトとクライアントワークの双方に取り組み、明快で信頼性が高く、実際に使われるシステムを重視しています。",
  "Food photo": "食事写真",
  "Barcode / label": "バーコード / ラベル",
  Nutrition: "栄養解析",
  "Cα distances": "Cα間距離",
  "Structure analysis": "構造解析",
};

const english = Object.fromEntries(
  Object.entries(japanese).map(([source, translated]) => [translated, source]),
);

function applyDocumentLanguage(language: PortfolioLanguage) {
  const dictionary = language === "ja" ? japanese : english;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  for (const node of nodes) {
    const value = node.nodeValue?.trim();
    if (!value || !dictionary[value]) continue;
    node.nodeValue = (node.nodeValue ?? "").replace(value, dictionary[value]);
  }

  document.documentElement.lang = language;
  document.documentElement.dataset.lang = language;
}

type Props = {
  onLanguageChange?: (language: PortfolioLanguage) => void;
};

export default function LanguageToggle({ onLanguageChange }: Props) {
  const { language, changeLanguage } = usePortfolioLanguage(applyDocumentLanguage);

  const selectLanguage = (next: PortfolioLanguage) => {
    changeLanguage(next);
    onLanguageChange?.(next);
  };

  return (
    <div className="language-toggle t-mono" aria-label="Language selector">
      <button type="button" className={language === "en" ? "is-active" : ""} onClick={() => selectLanguage("en")} aria-pressed={language === "en"}>EN</button>
      <span className="language-toggle-divider" aria-hidden="true">/</span>
      <button type="button" className={language === "ja" ? "is-active" : ""} onClick={() => selectLanguage("ja")} aria-pressed={language === "ja"}>JP</button>
    </div>
  );
}
