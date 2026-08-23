"use client";

import { useRef } from "react";
import type { Project } from "@/lib/content";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import Schematic from "@/components/Schematic";

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

      /* Scrolling in has to visibly move something. The block rises into
         place under scrub, holds while the scene owns the viewport, then
         fades as it leaves so it never slides under the navigation.
         Position only on the way in — fading body copy across a whole scene
         leaves it washed out for most of the time it is being read. */
      gsap.fromTo(
        q(".project-block"),
        { y: vh(0.12 * k) },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            end: "top 42%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.to(q(".project-block"), {
        opacity: 0,
        y: vh(-0.06 * k),
        ease: "none",
        scrollTrigger: {
          // Starts exactly when the sticky releases, so the block is gone
          // before it can travel up under the navigation.
          trigger: el,
          start: "bottom bottom",
          end: "bottom 68%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Workflow's diagram is alone in the frame first; its type climbs in
      // afterwards, so it gets a longer approach than the others.
      if (id === "workflow") {
        gsap.fromTo(
          q(".project-title"),
          { y: vh(0.16 * k) },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "top 20%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      } else {
        gsap.from(q(".project-title .line-mask > span"), {
          yPercent: 106,
          duration: DUR.reveal,
          ease: EASE.enter,
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 72%" },
        });
      }
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
          <div className="project-lede">
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

          <p className="project-statement t-body">
            {project.statement}
          </p>

          <Schematic id={project.id} />
        </div>
      </div>
    </section>
  );
}
