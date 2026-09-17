"use client";

import { usePortfolioLanguage, type PortfolioLanguage } from "@/hooks/usePortfolioLanguage";

const japanese: Record<string, string> = {
  // Home
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

  // Shared work-page UI
  WORKS: "実績",
  "FIVE PRODUCTS IN PRODUCTION": "公開・運用中の5プロジェクト",
  "SHIPPED,": "公開済み、",
  "AND LIVE.": "そして運用中。",
  "Products and sites I designed and built end to end, from the information architecture to the deploy — each one live, each one in use. Open a case study for what was built and how.": "情報設計からデザイン、実装、デプロイまで一貫して手がけたプロダクトとWebサイトです。すべて実際に公開・運用されています。各ケーススタディで、何をどのように構築したかをご覧いただけます。",
  "CASE STUDY": "詳細を見る",
  CLIENT: "クライアント",
  SECTOR: "分野",
  ROLE: "担当",
  YEAR: "年",
  LIVE: "公開サイト",
  PROJECT: "プロジェクト",
  DELIVERED: "実装内容",
  TECHNOLOGY: "技術",
  NEXT: "次の実績",
  "ALL WORKS": "実績一覧",

  // Names requested for Japanese display
  Hakuho: "白萌",
  HAKUHO: "白萌",
  "Goodwill Legal": "行政書士グッドウィル法務事務所",
  GOODWILL: "行政書士グッドウィル",
  LEGAL: "法務事務所",
  Jurakuen: "聚楽苑",
  JURAKUEN: "聚楽苑",
  "DMC Fuji": "DMC Fuji",
  DMC: "DMC",
  FUJI: "FUJI",

  // CaRoot
  "CaRoot — own product": "CaRoot — 個人開発プロダクト",
  "Consumer app / Nutrition": "コンシューマーアプリ / 栄養管理",
  "iOS & Android": "iOS / Android",
  "Planning, UI/UX, development, operations": "企画、UI/UX、開発、運用",
  "A personal calorie and nutrition management app designed to reduce the effort of everyday meal logging.": "毎日の食事記録にかかる手間を減らすために設計した、個人向けカロリー・栄養管理アプリ。",
  "CaRoot is a personal product developed from planning through UI/UX, frontend, backend, AI features, database design and App Store release work.": "CaRootは、企画からUI/UX、フロントエンド、バックエンド、AI機能、データベース設計、App Store公開対応まで一貫して開発した個人プロダクトです。",
  "Users can analyse a meal from a photo, scan a barcode or read a nutrition label, then manage calories and PFC from the resulting record. The app also supports manual entry, weight and water tracking, weekly reports, meal reminders and Japanese / English use.": "食事写真の解析、バーコードスキャン、栄養成分表示の読み取りから記録を作成し、カロリーとPFCを管理できます。手動入力、体重・水分記録、週間レポート、食事リマインダー、日本語・英語にも対応しています。",
  "Food data includes Japan's official food composition data and restaurant / chain menu data based on published nutrition information. AI photo analysis is handled through a server-side function, while the core logging features remain available without relying on the photo-analysis connection.": "食品データには日本の公的な食品成分データと、公開されている栄養情報をもとにした飲食店・チェーンのメニューデータを利用しています。AI写真解析はサーバーサイドで処理し、写真解析に依存せず基本の記録機能を利用できる構成です。",
  "AI meal-photo analysis with editable calorie and PFC estimates": "AIによる食事写真解析と、編集可能なカロリー・PFC推定",
  "Barcode scanning and nutrition-label photo reading": "バーコードスキャンと栄養成分表示の画像読み取り",
  "Calorie / PFC targets based on profile, activity and goal settings": "プロフィール・活動量・目標に基づくカロリー / PFC目標設定",
  "Manual food entry, weight and water tracking, weekly reports and meal reminders": "食事の手動入力、体重・水分記録、週間レポート、食事リマインダー",
  "Japanese / English support and App Store release preparation": "日本語 / 英語対応とApp Store公開対応",
  "End-to-end product development from planning and UI/UX through frontend, backend and database work": "企画・UI/UXからフロントエンド、バックエンド、データベースまで一貫したプロダクト開発",

  // 白萌
  "Hakuho Inc. — 株式会社白萌": "株式会社白萌",
  "Manufacturing / Precision machining": "製造業 / 精密加工",
  "Shimizu, Shizuoka": "静岡県静岡市清水区",
  "Planning, design, development, SEO, launch": "企画、デザイン、開発、SEO、公開",
  "A corporate website for a precision-machining company, structured to help prospective customers understand capabilities and move directly to a quote request.": "精密加工会社の技術力を分かりやすく伝え、見込み顧客がそのまま見積依頼へ進めるよう設計したコーポレートサイト。",
  "Hakuho manufactures more than 24,000 parts a year for over 200 clients. The site organises its machining capabilities, equipment, quality information and production examples so prospective customers can judge whether their requirements can be handled.": "白萌は200社以上の取引先に対し、年間24,000点以上の部品を製造しています。加工技術、設備、品質情報、製作事例を整理し、依頼内容に対応可能かを見込み顧客が判断しやすいサイト構成にしました。",
  "The quote flow accepts drawings and specification files including PDF, DXF, DWG, STEP and IGES, allowing enquiries to arrive with the information needed for an actual manufacturing discussion.": "見積フォームではPDF、DXF、DWG、STEP、IGESなどの図面・仕様ファイルを受け付け、実際の製造相談に必要な情報を添えて問い合わせできるようにしています。",
  "I handled the project end to end: requirements and information architecture, UI/UX, frontend and backend implementation, the quote and email flow, SEO, testing and launch.": "要件整理・情報設計、UI/UX、フロントエンド・バックエンド実装、見積・メール導線、SEO、テスト、公開まで一貫して担当しました。",
  "Information architecture centred on machining capabilities and quote conversion": "加工技術の理解と見積依頼への導線を中心にした情報設計",
  "Drawing-upload quote form with specification fields and email delivery": "図面アップロード・仕様入力・メール送信に対応した見積フォーム",
  "Structured presentation of materials, sizes, lot sizes, tolerances, equipment and quality information": "材質、サイズ、ロット、精度、設備、品質情報の体系的な掲載",
  "Responsive UI and motion design": "レスポンシブUIとモーションデザイン",
  "SEO foundations including canonical URLs and sitemap": "canonical URL、サイトマップなどSEOの基盤整備",
  "Automated tests for key site functionality": "主要機能の自動テスト",

  // 行政書士グッドウィル法務事務所
  "Professional services / Legal": "士業 / 行政書士",
  "Sapporo, Hokkaido": "北海道札幌市",
  "Planning, design, development, CMS, SEO, operations": "企画、デザイン、開発、CMS、SEO、運用",
  "A website for a Sapporo administrative scrivener's office, designed to explain its services clearly and connect consultation enquiries with ongoing content publishing.": "札幌の行政書士事務所の業務内容を分かりやすく伝え、相談問い合わせと継続的な情報発信をつなぐWebサイト。",
  "The project covers the office's service information, consultation flow, profile and access information together with a continuously updated column section.": "事務所の業務案内、相談の流れ、プロフィール、アクセス情報に加え、継続更新するコラムセクションまで構築しました。",
  "A CMS was introduced so articles can be published and organised without modifying the site code. The enquiry flow sends consultation details to the office and returns a confirmation to the sender.": "サイトコードを変更せず記事を公開・整理できるCMSを導入。問い合わせ内容を事務所へ通知し、送信者にも自動確認メールを返す導線を実装しています。",
  "I handled the project from site planning and UI/UX through implementation, CMS integration, enquiry functionality, SEO, launch and ongoing maintenance.": "サイト企画・UI/UXから実装、CMS連携、問い合わせ機能、SEO、公開、継続運用まで担当しています。",
  "Service and consultation-information pages": "業務案内・相談案内ページ",
  "CMS-based article publishing and category structure": "CMSによる記事公開とカテゴリ設計",
  "Contact flow with office notification and automatic confirmation": "事務所通知と自動返信を備えた問い合わせ導線",
  "Office profile and access information": "事務所プロフィールとアクセス情報",
  "SEO-oriented metadata, sitemap and content structure": "SEOを考慮したメタデータ、サイトマップ、コンテンツ構造",
  "Ongoing maintenance and content-operation support": "継続的な保守・コンテンツ運用支援",

  // 聚楽苑
  "聚楽苑 — Jurakuen": "聚楽苑",
  "Commerce / Organic tea": "EC / オーガニック茶",
  "Fuji, Shizuoka": "静岡県富士市",
  "Design, development, commerce, multilingual, SEO": "デザイン、開発、EC、多言語対応、SEO",
  "A bilingual direct-to-consumer website for an organic tea producer in Fuji, combining brand communication with online purchasing.": "富士の有機茶生産者のブランド発信とオンライン購入を一体化した、日英対応のD2Cサイト。",
  "The site presents the producer, cultivation and organic JAS information alongside a product catalogue and online purchasing flow. Japanese and English pages allow the same brand and product information to reach both domestic and overseas visitors.": "生産者、栽培、有機JASに関する情報と商品カタログ・オンライン購入導線を一つのサイトに統合。日本語・英語の両ページで、国内外のユーザーに同じブランド・商品情報を届けられる構成にしています。",
  "The commerce flow includes cart and Stripe checkout. Search visibility was addressed through locale-specific canonical URLs, sitemap generation, structured product data and index control for transactional pages.": "EC導線にはカートとStripe決済を実装。言語別canonical URL、サイトマップ生成、商品構造化データ、決済関連ページのインデックス制御など検索対策も行いました。",
  "Product catalogue, cart and online checkout": "商品カタログ、カート、オンライン決済",
  "Japanese / English site structure": "日本語 / 英語のサイト構成",
  "Producer, cultivation and organic JAS information pages": "生産者、栽培、有機JASの情報ページ",
  "Product structured data and search-engine metadata": "商品構造化データと検索エンジン向けメタデータ",
  "Dynamic sitemap and index control for cart / payment-result pages": "動的サイトマップとカート / 決済結果ページのインデックス制御",
  "SEO landing pages and internal-link structure for organic tea and matcha searches": "有機茶・抹茶検索を意識したSEOランディングページと内部リンク設計",

  // DMC — name stays DMC as requested
  "DMC LLC — DMC FUJI": "DMC LLC — DMC FUJI",
  "Studio / Photography & experience": "スタジオ / 写真・体験",
  "Design, development, CMS, gallery, multilingual": "デザイン、開発、CMS、ギャラリー、多言語対応",
  "A bilingual website for DMC Fuji, bringing its photography and related services into one clear digital experience.": "DMC Fujiの写真撮影と関連サービスを、分かりやすい一つのデジタル体験にまとめた日英対応Webサイト。",
  "The site organises multiple services under one brand while giving photography a central role. Visitors can move between service information, the gallery, articles, access information and enquiries in Japanese or English.": "写真を中心に複数のサービスを一つのブランドとして整理。日本語・英語の双方で、サービス案内、ギャラリー、記事、アクセス、問い合わせへスムーズに移動できる構成です。",
  "The implementation includes a managed photo gallery, CMS-backed content and an enquiry flow, allowing the business to update visual and editorial content without rebuilding the site.": "管理可能なフォトギャラリー、CMS連携コンテンツ、問い合わせ導線を実装し、サイトを再構築せず写真や記事を更新できる運用環境を整えました。",
  "Service pages and information architecture across the DMC Fuji offering": "DMC Fujiの各サービスページと情報設計",
  "Photo gallery backed by managed storage": "管理ストレージと連携したフォトギャラリー",
  "CMS-backed blog and content management": "CMS連携のブログ・コンテンツ管理",
  "Japanese / English page delivery": "日本語 / 英語ページ対応",
  "Contact and enquiry functionality": "問い合わせ機能",
  "Responsive UI and motion implementation": "レスポンシブUIとモーション実装",
};

// Some work-page kickers combine index + sector into a single text node.
const sectorKickerTranslations: Array<[RegExp, string]> = [
  [/MANUFACTURING \/ PRECISION MACHINING/g, "製造業 / 精密加工"],
  [/PROFESSIONAL SERVICES \/ LEGAL/g, "士業 / 行政書士"],
  [/COMMERCE \/ ORGANIC TEA/g, "EC / オーガニック茶"],
  [/STUDIO \/ PHOTOGRAPHY & EXPERIENCE/g, "スタジオ / 写真・体験"],
  [/CONSUMER APP \/ NUTRITION/g, "コンシューマーアプリ / 栄養管理"],
];

const english = Object.fromEntries(
  Object.entries(japanese).map(([source, translated]) => [translated, source]),
);

function applyDocumentLanguage(language: PortfolioLanguage) {
  const dictionary = language === "ja" ? japanese : english;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  for (const node of nodes) {
    const raw = node.nodeValue ?? "";
    const value = raw.trim();
    if (!value) continue;

    if (dictionary[value]) {
      node.nodeValue = raw.replace(value, dictionary[value]);
      continue;
    }

    if (language === "ja") {
      let next = raw;
      for (const [pattern, translated] of sectorKickerTranslations) next = next.replace(pattern, translated);
      node.nodeValue = next;
    }
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
