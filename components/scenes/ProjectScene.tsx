"use client";

import { useRef } from "react";
import type { Project } from "@/lib/content";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

/**
 * One project. The imagery for it lives on the fixed stage — this component
 * owns only the typography and the rate at which it travels, which is what
 * separates foreground from background as the camera moves.
 *
 * Workflow is the exception: its diagram is alone in the frame first and the
 * type climbs into it, so its title is scroll-driven rather than revealed.
 */
export default function ProjectScene({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  const id = project.id;

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as Record<string, boolean>;
      const k = desktop ? 1 : 0.55;
      const q = gsap.utils.selector(el);
      const vh = (n: number) => () => window.innerHeight * n;

      if (id === "workflow") {
        gsap.fromTo(
          q(".project-block"),
          { y: vh(0.42 * k), opacity: 0.25 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "top 6%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      } else {
        gsap.from(q(".project-title .hero-line, .project-title span > span"), {
          yPercent: 106,
          duration: DUR.reveal,
          ease: EASE.enter,
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 62%" },
        });
        gsap.from(q(".soft-in"), {
          opacity: 0,
          duration: DUR.swap,
          ease: EASE.glide,
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 58%" },
        });
      }

      // Midground drift: the type moves slower than the visual behind it.
      gsap.to(q(".project-block"), {
        y: vh(-0.08 * k),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => mm.revert();
  }, [id]);

  return (
    <section
      id={`p-${id}`}
      className={`scene scene--tall project project--${id}`}
      ref={root}
      aria-labelledby={`h-${id}`}
    >
      <div className="scene-sticky">
        <div className="project-block stack-tight">
          <div className="project-lede soft-in">
            <p className="project-meta t-mono">{project.meta.join("  /  ")}</p>
            <p className="t-mono" style={{ color: "var(--dimmer)" }}>
              {project.year}
            </p>
          </div>

          <h2 className="t-display project-title" id={`h-${id}`}>
            {project.title.map((line) => (
              <span className="line-mask" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>

          <p className="project-statement t-body soft-in">
            {project.statement}
          </p>

          <ul className="project-notes t-mono soft-in">
            {project.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
