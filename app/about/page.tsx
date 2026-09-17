import type { Metadata } from "next";
import Link from "next/link";
import PageChrome from "@/components/PageChrome";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import SiteFooter from "@/components/SiteFooter";
import LocalizedText from "@/components/LocalizedText";

export const metadata: Metadata = { title: "About — Byakko Kondo", description: "About Byakko Kondo — engineer and creative developer working across product development, web, research software and automation." };

const timeline = [
  { year: "UNIVERSITY", title: "GAKUSHUIN UNIVERSITY / OKADA LAB", body: "Studied life science and worked on software for protein-structure analysis, comparing structures through inter-carbon distances and automating structural-data retrieval and processing from sources including UniProt and PDB.", bodyJa: "学習院大学理学部生命科学科で生命科学を学び、岡田研究室では炭素間距離を用いたタンパク質構造解析に取り組みました。UniProtやPDBなどから構造データを取得・処理する工程の自動化ソフトウェアも開発しました。" },
  { year: "EARLY CAREER", title: "レターファン株式会社 / Drumroll株式会社", body: "Gained practical development experience through レターファン株式会社 and Drumroll株式会社 before moving into independent client work.", bodyJa: "レターファン株式会社、Drumroll株式会社での実務経験を経て、個人でのクライアントワークへ活動領域を広げました。" },
  { year: "2025—", title: "FREELANCE ENGINEER", body: "Designing and building production websites, commerce experiences, automation workflows and digital systems for clients. Work spans requirements, information architecture, UI/UX, frontend and backend implementation, deployment and ongoing operation.", bodyJa: "クライアント向けにWebサイト、EC、業務自動化、デジタルシステムを設計・開発。要件整理、情報設計、UI/UX、フロントエンド・バックエンド実装、デプロイ、継続運用まで担当しています。" },
  { year: "2026—", title: "PRODUCT DEVELOPMENT", body: "Building CaRoot, a personal calorie and nutrition management product, from planning and UI/UX through mobile development, backend systems, AI features, data design and release operations.", bodyJa: "個人向けカロリー・栄養管理アプリCaRootを開発。企画・UI/UXからモバイル開発、バックエンド、AI機能、データ設計、リリース運用まで一貫して取り組んでいます。" },
  { year: "2026.08—", title: "NPO PROUD / DIRECTOR", body: "Supporting IT and web initiatives as a director, including website development and a monitoring-service project for older adults, with responsibility spanning product and project coordination.", bodyJa: "NPO法人プラウドの理事としてIT・Web領域を担当。Webサイト開発や高齢者向け見守りサービスなど、プロダクトと開発プロジェクトの推進を支援しています。" },
];

export default function AboutPage() {
  return <><PageChrome /><main className="doc">
    <section className="scene page-intro"><SectionHead index="01" label="ABOUT" note="BYAKKO KONDO — TOKYO, JAPAN" /><Reveal><h1 className="t-display page-title"><span className="line-mask"><span>ENGINEER,</span></span><span className="line-mask"><span className="t-faint">DESIGNER, BUILDER.</span></span></h1><p className="t-body page-lede soft-in"><LocalizedText en="I work across product development, web engineering, research software and workflow automation — taking ideas from requirements and structure through design, implementation and operation." ja="プロダクト開発、Webエンジニアリング、研究用ソフトウェア、業務自動化まで横断し、要件整理からデザイン、実装、運用まで一貫して形にしています。" /></p></Reveal></section>
    <section className="scene work-body">
      <Reveal className="work-section"><SectionHead index="02" label="PROFILE" /><div className="brief"><p className="t-body soft-in"><LocalizedText en="My background began in life science at Gakushuin University. In the Okada Lab, I worked on protein-structure analysis using inter-carbon distances and developed software to automate parts of the structural-data workflow." ja="学習院大学理学部生命科学科で生命科学を学び、岡田研究室では炭素間距離を用いたタンパク質構造解析に取り組みました。研究では構造データ処理の一部を自動化するソフトウェアも開発しました。" /></p><p className="t-body soft-in"><LocalizedText en="After gaining practical experience through レターファン株式会社 and Drumroll株式会社, I moved into freelance engineering. Today my work ranges from mobile products and corporate websites to commerce, backend integrations and automation. I prefer to stay involved across the full path from understanding the problem to shipping and maintaining the final system." ja="レターファン株式会社、Drumroll株式会社での実務経験を経て、現在はフリーランスエンジニアとして活動しています。モバイルプロダクト、コーポレートサイト、EC、バックエンド連携、自動化まで幅広く、課題の理解から公開後の運用まで一貫して関わることを大切にしています。" /></p><p className="t-body soft-in"><LocalizedText en="Alongside client work, I develop my own products including CaRoot. Since August 2026, I have also served as a director of NPO Proud, supporting its IT and web initiatives and helping coordinate development of a monitoring service for older adults." ja="クライアントワークと並行してCaRootなどの個人プロダクトを開発しています。2026年8月からはNPO法人プラウドの理事としてIT・Web領域を担当し、高齢者向け見守りサービスを含む開発プロジェクトにも携わっています。" /></p></div></Reveal>
      <Reveal className="work-section"><SectionHead index="03" label="JOURNEY" /><ol className="built t-body">{timeline.map((item, i) => <li key={item.title} className="soft-in"><span className="built-n t-mono">{String(i + 1).padStart(2, "0")}</span><span><span className="t-mono">{item.year}</span><br /><strong>{item.title}</strong><br /><LocalizedText en={item.body} ja={item.bodyJa} /></span></li>)}</ol></Reveal>
      <Reveal className="work-section"><SectionHead index="04" label="WHAT I DO" /><div className="brief"><p className="t-body soft-in"><LocalizedText en="Product planning and information architecture. UI/UX and frontend engineering. Mobile application development. Backend and API integration. Research software and data pipelines. Workflow automation. Deployment, SEO and ongoing product operation." ja="プロダクト企画・情報設計、UI/UX・フロントエンド開発、モバイルアプリ開発、バックエンド・API連携、研究用ソフトウェア・データパイプライン、業務自動化、デプロイ、SEO、継続的なプロダクト運用まで対応しています。" /></p></div></Reveal>
    </section>
    <section className="scene work-next"><Reveal><Link href="/works" className="next-link soft-in"><span className="t-mono next-label">SELECTED PROJECTS</span><span className="t-display next-name">VIEW WORKS</span><span className="t-mono next-arrow">→</span></Link><Link href="/contact" className="t-mono all-link soft-in">GET IN TOUCH →</Link></Reveal></section>
    <footer className="scene site-foot"><SiteFooter /></footer>
  </main></>;
}
