"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

/**
 * A section header in the Daytonesque sense: a hairline rule carrying a mono
 * kicker on the left (index — label) and an optional note on the right. It is
 * chrome, not content — it wipes in from the left as it arrives, rule and
 * labels together, like a line being ruled, and then stays put while the
 * scene under it animates.
 */
export default function SectionHead({
  index,
  label,
  note,
  link,
}: {
  index: string;
  label: string;
  note?: string;
  /** A link in the note's slot — "ALL WORKS →" under a selection. */
  link?: { label: string; href: string };
}) {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: DUR.reveal,
          ease: EASE.enter,
          scrollTrigger: { trigger: el, start: "top 88%" },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="section-head" ref={root}>
      <p className="kicker t-mono">
        <span className="kicker-sq" aria-hidden="true" />
        {index} — {label}
      </p>
      {link ? (
        <Link href={link.href} className="section-head-note section-head-link t-mono">
          {link.label}
        </Link>
      ) : note ? (
        <p className="section-head-note t-mono">{note}</p>
      ) : null}
    </div>
  );
}
