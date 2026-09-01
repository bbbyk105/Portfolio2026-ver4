"use client";

import { useRef } from "react";
import { work } from "@/lib/content";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import SectionHead from "@/components/SectionHead";

/**
 * The work section's opening beat: the chrome header, then the section-scale
 * headline — white statement, faint second line, the same shape as Daytona's
 * section titles. Revealed a line at a time as it scrolls in.
 */
export default function WorkIntro() {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const q = gsap.utils.selector(el);
      gsap.from(q(".section-title .line-mask > span"), {
        yPercent: 108,
        duration: DUR.reveal,
        ease: EASE.enter,
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 78%" },
      });
    }, el);

    return () => mm.revert();
  }, []);

  return (
    <div className="work-intro" ref={root}>
      <SectionHead
        index="01"
        label="WORK"
        link={{ label: "ALL WORKS →", href: "/works" }}
      />
      <h2 className="t-display section-title">
        {work.headline.map((line, i) => (
          <span className="line-mask" key={line}>
            <span className={i === work.headline.length - 1 ? "t-faint" : ""}>
              {line}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
