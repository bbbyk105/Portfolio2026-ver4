"use client";

import { useRef } from "react";
import { contact } from "@/lib/content";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

export default function ContactScene() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const q = gsap.utils.selector(el);
      gsap.from(q(".contact-type .line-mask > span"), {
        yPercent: 110,
        duration: DUR.reveal,
        ease: EASE.enter,
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 72%" },
      });
    }, el);

    return () => mm.revert();
  }, []);

  return (
    <section id="contact" className="scene contact" ref={root}>
      <h2 className="t-display contact-type">
        {contact.lines.map((line) => (
          <span className="line-mask" key={line}>
            <span>{line}</span>
          </span>
        ))}
      </h2>

      <div className="contact-rail">
        <a className="contact-mail" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
        <div className="nav-links t-mono" style={{ marginLeft: "auto" }}>
          {contact.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className="colophon t-mono">
        <span>© 2026 BYAKKO KONDO</span>
        <span>TOKYO, JAPAN</span>
      </div>
    </section>
  );
}
