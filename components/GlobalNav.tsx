"use client";

import { useCallback, useRef, useState } from "react";
import { contact } from "@/lib/content";
import { gsap, EASE, DUR, MQ } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { lockScroll, unlockScroll } from "@/lib/lenisRef";
import NavAnchor from "@/components/NavAnchor";
import LanguageToggle from "@/components/LanguageToggle";
import LocalizedText from "@/components/LocalizedText";

const links = [
  { href: "/works", en: "WORK", ja: "実績" },
  { href: "/about", en: "ABOUT", ja: "プロフィール" },
  { href: "/contact", en: "CONTACT", ja: "お問い合わせ" },
];

export default function GlobalNav() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(MQ.reduced).matches;
      const t = gsap.timeline({ paused: true });
      t.set(".menu", { pointerEvents: "auto" }).fromTo(".menu", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: reduced ? 0.001 : 0.62, ease: EASE.swap }, 0).fromTo(".menu-item", { yPercent: 118 }, { yPercent: 0, duration: reduced ? 0.001 : 0.72, ease: EASE.enter, stagger: reduced ? 0 : 0.06 }, reduced ? 0 : 0.16).fromTo(".menu-foot", { opacity: 0 }, { opacity: 1, duration: reduced ? 0.001 : 0.5 }, reduced ? 0 : 0.4).to(".burger-top", { y: 4, rotate: 45, duration: reduced ? 0.001 : 0.4, ease: EASE.swap }, 0).to(".burger-bottom", { y: -4, rotate: -45, duration: reduced ? 0.001 : 0.4, ease: EASE.swap }, 0);
      tl.current = t;
      if (!reduced) gsap.from([".nav-mark", ".nav-links", ".language-toggle", ".nav-cta", ".burger"], { opacity: 0, y: -6, duration: DUR.swap, ease: EASE.glide, stagger: 0.05, delay: 0.4 });
    }, el);
    gsap.set(q(".menu"), { pointerEvents: "none" });
    return () => { ctx.revert(); tl.current = null; document.documentElement.classList.remove("menu-open"); };
  }, []);

  const toggle = useCallback((next: boolean) => {
    setOpen(next);
    const t = tl.current;
    if (!t) return;
    document.documentElement.classList.toggle("menu-open", next);
    if (next) { lockScroll(); t.play(); } else { t.reverse(); unlockScroll(); }
  }, []);

  useIsoLayoutEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") toggle(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, toggle]);

  return (
    <div ref={root}>
      <header className="nav">
        <div className="nav-mark t-mono">
          <NavAnchor href="/#hero" className="nav-home" aria-label="Byakko Kondo — home"><span className="nav-glyph" aria-hidden="true" />BYAKKO KONDO</NavAnchor>
          <span className="nav-role block" style={{ color: "var(--dim)" }}>ENGINEER / CREATIVE DEVELOPER</span>
        </div>
        <div className="nav-right">
          <nav className="nav-links t-mono" aria-label="Primary">{links.map((item) => <NavAnchor key={item.href} href={item.href}><LocalizedText en={item.en} ja={item.ja} /></NavAnchor>)}</nav>
          <LanguageToggle />
          <NavAnchor className="nav-cta t-mono" href="/contact"><LocalizedText en="GET IN TOUCH" ja="お問い合わせ" /></NavAnchor>
        </div>
        <button type="button" className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="site-menu" onClick={() => toggle(!open)}><span className="burger-top" /><span className="burger-bottom" /></button>
      </header>
      <div id="site-menu" className="menu" hidden={false} aria-hidden={!open}>
        <nav className="menu-list" aria-label="Menu">
          <NavAnchor href="/#hero" className="menu-line" tabIndex={open ? 0 : -1} onClick={() => toggle(false)}><span className="menu-item t-display"><LocalizedText en="HOME" ja="ホーム" /></span></NavAnchor>
          {links.map((item) => <NavAnchor key={item.href} href={item.href} className="menu-line" tabIndex={open ? 0 : -1} onClick={() => toggle(false)}><span className="menu-item t-display"><LocalizedText en={item.en} ja={item.ja} /></span></NavAnchor>)}
        </nav>
        <div className="menu-foot t-mono"><a href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1}>{contact.email}</a><span><LocalizedText en="TOKYO, JAPAN" ja="東京、日本" /></span><LanguageToggle onLanguageChange={() => toggle(false)} /></div>
      </div>
    </div>
  );
}
