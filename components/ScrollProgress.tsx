"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

const SECTIONS: [string, string][] = [
  ["#hero", "BUILD DIGITAL SYSTEMS"],
  ["#p-caroot", "WORK — CAROOT"],
  ["#p-protein", "WORK — PROTEIN STRUCTURE"],
  ["#p-commerce", "WORK — CLIENT COMMERCE"],
  ["#p-workflow", "WORK — WORKFLOW SYSTEMS"],
  ["#about", "ABOUT"],
  ["#capabilities", "SYSTEM CAPABILITIES"],
  ["#contact", "CONTACT"],
];

/**
 * A hairline at the foot of the viewport that fills with scroll position, and
 * the name of whatever is currently on screen.
 *
 * Most of this page holds its type still while the imagery moves, and without
 * a position readout that reads as a page that has stopped responding. The
 * label is written straight to the DOM — a React state update per scroll frame
 * would be the most expensive thing on the page.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const barEl = bar.current;
    const labelEl = label.current;
    if (!barEl || !labelEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barEl,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
    });

    const triggers = SECTIONS.map(([sel, name]) =>
      ScrollTrigger.create({
        trigger: sel,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: ({ isActive }) => {
          if (isActive) labelEl.textContent = name;
        },
      }),
    );

    return () => {
      triggers.forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <div className="progress" aria-hidden="true">
      <span className="progress-label t-mono" ref={label}>
        BUILD DIGITAL SYSTEMS
      </span>
      <span className="progress-track">
        <span className="progress-bar" ref={bar} />
      </span>
    </div>
  );
}
