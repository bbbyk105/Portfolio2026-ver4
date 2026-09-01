"use client";

import { useRef } from "react";
import type { Project } from "@/lib/content";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import CodeWindow from "@/components/CodeWindow";
import Schematic from "@/components/Schematic";

/**
 * One project, one card — Daytona's bento unit. The card's media band is a
 * code window running the project's snippet, not a render; the old
 * composition (type pinned left, imagery floating right on a fixed stage)
 * is gone. Wide projects span the whole grid, the rest pair up two to a row.
 *
 * Motion: the card rises into place as it enters, the title keeps its masked
 * line reveal, the copy under it follows a beat later, the code window types
 * its source, and the schematic draws itself as the card is scrolled through.
 * The window itself never drifts: a floating window in an empty band reads
 * as a bug, not as motion.
 */
export default function ProjectScene({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const q = gsap.utils.selector(el);

      gsap.from(el, {
        y: 64,
        opacity: 0,
        duration: DUR.reveal,
        ease: EASE.enter,
        scrollTrigger: { trigger: el, start: "top 86%" },
      });

      gsap.from(q(".project-title .line-mask > span"), {
        yPercent: 106,
        duration: DUR.reveal,
        ease: EASE.enter,
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 74%" },
      });

      // The lede, statement and notes follow the title in, a beat apart.
      gsap.from(q(".project-lede, .project-statement, .project-notes li"), {
        opacity: 0,
        y: 12,
        duration: DUR.swap,
        ease: EASE.glide,
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 72%" },
      });
    }, el);

    return () => mm.revert();
  }, []);

  return (
    <section
      id={`p-${project.id}`}
      className={`project-card${project.wide ? " project-card--wide" : ""}`}
      ref={root}
      aria-labelledby={`h-${project.id}`}
    >
      <div className="card-media">
        <CodeWindow tabs={[project.code]} className="card-code" />
      </div>

      <div className="card-body">
        <div className="project-lede t-mono">
          <span>{`P.0${index + 1} — ${project.meta.join("  /  ")}`}</span>
          <span className="project-year">{project.year}</span>
        </div>

        {/* Wide cards split this row: type on the left, figure on the right.
            Stacked in one column, the body fills a third of the card and the
            rest of the row sits empty. Narrow cards keep the single column. */}
        <div className="card-cols">
          <div className="card-text">
            <h2 className="t-display project-title" id={`h-${project.id}`}>
              {project.title.map((line) => (
                <span className="line-mask" key={line}>
                  <span>{line}</span>
                </span>
              ))}
            </h2>

            <p className="project-statement t-body">{project.statement}</p>

            <ul className="project-notes t-mono">
              {project.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <Schematic id={project.id} index={index} />
        </div>
      </div>
    </section>
  );
}
