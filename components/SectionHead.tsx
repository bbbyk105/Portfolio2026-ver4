"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { usePortfolioLanguage } from "@/hooks/usePortfolioLanguage";

const labels: Record<string, string> = {
  WORK: "実績", WORKS: "実績", ABOUT: "プロフィール", CONTACT: "お問い合わせ",
  PROFILE: "プロフィール", JOURNEY: "経歴", "WHAT I DO": "対応領域",
  ENQUIRY: "お問い合わせフォーム", DIRECT: "メール", PROJECT: "プロジェクト",
  DELIVERED: "実装内容", TECHNOLOGY: "技術",
};
const notes: Record<string, string> = {
  "FIVE PRODUCTS IN PRODUCTION": "公開・運用中の5プロジェクト",
  "PROJECTS / COLLABORATION / ENQUIRIES": "プロジェクト / 協業 / ご相談",
  "BYAKKO KONDO — TOKYO, JAPAN": "BYAKKO KONDO — 東京",
};

export default function SectionHead({ index, label, note, link }: { index: string; label: string; note?: string; link?: { label: string; href: string } }) {
  const root = useRef<HTMLDivElement>(null);
  const noop = useCallback(() => {}, []);
  const { language } = usePortfolioLanguage(noop);
  const ja = language === "ja";

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: DUR.reveal, ease: EASE.enter, scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    return () => mm.revert();
  }, []);

  const shownLabel = ja ? (labels[label] ?? label) : label;
  const shownNote = note && ja ? (notes[note] ?? note) : note;
  const shownLink = link && ja ? (labels[link.label] ?? link.label) : link?.label;

  return (
    <div className="section-head" ref={root}>
      <p className="kicker t-mono"><span className="kicker-sq" aria-hidden="true" />{index} — {shownLabel}</p>
      {link ? <Link href={link.href} className="section-head-note section-head-link t-mono">{shownLink}</Link> : shownNote ? <p className="section-head-note t-mono">{shownNote}</p> : null}
    </div>
  );
}
