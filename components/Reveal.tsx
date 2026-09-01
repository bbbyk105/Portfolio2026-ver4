"use client";

import { useRef } from "react";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

/**
 * The site's two reveals, for pages assembled from server components: any
 * `.line-mask > span` inside rises out of its mask, anything marked
 * `.soft-in` settles up into place. Both fire once as the block scrolls in.
 */
export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const q = gsap.utils.selector(el);
      const lines = q(".line-mask > span");
      if (lines.length > 0) {
        gsap.from(lines, {
          yPercent: 108,
          duration: DUR.reveal,
          ease: EASE.enter,
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      }
      const soft = q(".soft-in");
      if (soft.length > 0) {
        gsap.from(soft, {
          opacity: 0,
          y: 14,
          duration: DUR.swap,
          ease: EASE.glide,
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      }
    }, el);

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
