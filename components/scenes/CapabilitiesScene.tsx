"use client";

import { useRef } from "react";
import { capabilities } from "@/lib/content";
import { gsap, MQ } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

/**
 * A field, not a skills grid — the terms are set at micro scale, offset off a
 * shared baseline, and drift apart very slightly as the page passes them.
 */
export default function CapabilitiesScene() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as Record<string, boolean>;
      if (!desktop) return;
      const q = gsap.utils.selector(el);

      gsap.to(q(".cap-col"), {
        y: (i: number) => [-38, 18, -22, 30][i % 4],
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, el);

    return () => mm.revert();
  }, []);

  const columns = [0, 1, 2, 3].map((c) =>
    capabilities.filter((t) => t.column === c),
  );

  return (
    <section id="capabilities" className="scene cap" ref={root}>
      <h2 className="t-display cap-heading">
        SYSTEM
        <br />
        CAPABILITIES
      </h2>
      <div className="cap-field">
        {columns.map((col, i) => (
          <div className="cap-col" key={i}>
            {col.map((term) => (
              <span className="cap-term t-mono" key={term.label}>
                {term.label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
