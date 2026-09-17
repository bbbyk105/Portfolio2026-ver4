"use client";

import { useCallback } from "react";
import { usePortfolioLanguage } from "@/hooks/usePortfolioLanguage";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const noop = useCallback(() => {}, []);
  const { language } = usePortfolioLanguage(noop);
  const ja = language === "ja";

  return (
    <form className={styles.form} action="mailto:byakkokondo@gmail.com" method="post" encType="text/plain">
      <div className={styles.grid}>
        <label className={`${styles.field} t-mono soft-in`}><span className={styles.label}>{ja ? "お名前" : "NAME"}</span><input required name="name" autoComplete="name" className={styles.input} placeholder={ja ? "お名前" : "Your name"} /></label>
        <label className={`${styles.field} t-mono soft-in`}><span className={styles.label}>{ja ? "メールアドレス" : "EMAIL"}</span><input required type="email" name="email" autoComplete="email" className={styles.input} placeholder="you@example.com" /></label>
        <label className={`${styles.field} t-mono soft-in`}><span className={styles.label}>{ja ? "会社・組織" : "COMPANY / ORGANISATION"}</span><input name="company" autoComplete="organization" className={styles.input} placeholder={ja ? "任意" : "Optional"} /></label>
        <label className={`${styles.field} t-mono soft-in`}><span className={styles.label}>{ja ? "件名" : "SUBJECT"}</span><input required name="subject" className={styles.input} placeholder={ja ? "ご相談内容を簡単にお書きください" : "What would you like to discuss?"} /></label>
      </div>
      <label className={`${styles.field} ${styles.message} t-mono soft-in`}><span className={styles.label}>{ja ? "お問い合わせ内容" : "MESSAGE"}</span><textarea required name="message" rows={7} className={`${styles.input} ${styles.textarea}`} placeholder={ja ? "プロジェクト内容、必要な機能、スケジュールなど、ご相談内容をお聞かせください。" : "Project, scope, timeline, or anything else that would help me understand the enquiry."} /></label>
      <button type="submit" className={`${styles.submit} soft-in`}><span className={`t-mono ${styles.submitKicker}`}>{ja ? "BYAKKO KONDO へ送信" : "SEND TO BYAKKO KONDO"}</span><span className={`t-display ${styles.submitTitle}`}>{ja ? "送信する" : "SEND MESSAGE"}</span><span className={`t-mono ${styles.submitArrow}`} aria-hidden="true">→</span></button>
    </form>
  );
}
