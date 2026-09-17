"use client";

import Link from "next/link";
import { useRef } from "react";
import { contact } from "@/lib/content";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import SectionHead from "@/components/SectionHead";
import SiteFooter from "@/components/SiteFooter";

export default function ContactScene() {
  const root = useRef<HTMLElement>(null);
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const q = gsap.utils.selector(el);
      gsap.from(q(".contact-type .line-mask > span"), { yPercent: 110, duration: DUR.reveal, ease: EASE.enter, stagger: 0.09, scrollTrigger: { trigger: el, start: "top 72%" } });
      q(".contact-rail, .footer-grid, .footer-base").forEach((node) => gsap.from(node, { opacity: 0, y: 18, duration: DUR.swap, ease: EASE.glide, scrollTrigger: { trigger: node, start: "top 92%" } }));
    }, el);
    return () => mm.revert();
  }, []);

  return (
    <section id="contact" className="scene contact" ref={root}>
      <SectionHead index="04" label="CONTACT" />
      <h2 className="t-display contact-type">{contact.lines.map((line) => <span className="line-mask" key={line}><span>{line}</span></span>)}</h2>
      <div className="contact-rail">
        <a className="contact-mail" href={`mailto:${contact.email}`}>{contact.email}</a>
        <div className="contact-social" style={{ marginLeft: "auto" }}>
          <Link href="/contact" className="pill t-mono">CONTACT FORM</Link>
          {contact.links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="pill t-mono">{l.label}</a>)}
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}
