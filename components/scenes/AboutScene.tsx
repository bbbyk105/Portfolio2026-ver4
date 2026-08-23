"use client";

import { useRef } from "react";
import { about } from "@/lib/content";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

/**
 * Not a profile block: a small identity stamp on the left and a statement
 * large enough to be the page, revealed a line at a time.
 */
export default function AboutScene() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const q = gsap.utils.selector(el);

      gsap.from(q(".about-statement .line-mask > span"), {
        yPercent: 110,
        duration: DUR.reveal,
        ease: EASE.enter,
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 65%" },
      });
      gsap.from(q(".soft-in"), {
        opacity: 0,
        duration: DUR.swap,
        ease: EASE.glide,
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 62%" },
      });
    }, el);

    return () => mm.revert();
  }, []);

  return (
    <section id="about" className="scene" ref={root}>
      <div className="about-grid">
        <div className="stack-tight soft-in">
          <span className="tick" />
          {about.identity.map((line, i) => (
            <p
              key={line}
              className="t-mono"
              style={{ color: i === 0 ? "var(--white)" : "var(--dim)" }}
            >
              {line}
            </p>
          ))}
        </div>

        <div>
          <h2 className="t-display about-statement">
            {about.statement.map((line) => (
              <span className="line-mask" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
          <div
            className="stack-tight"
            style={{ marginTop: "clamp(2.5rem, 8vh, 6rem)", maxWidth: "46ch" }}
          >
            {about.paragraphs.map((p) => (
              <p className="t-body soft-in" key={p}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
