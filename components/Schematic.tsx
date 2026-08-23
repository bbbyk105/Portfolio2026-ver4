"use client";

import { useRef } from "react";
import { schematics, SPINE_Y } from "@/lib/schematics";
import { gsap, MQ } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

/**
 * The project's system, drawn by scroll.
 *
 * Every solid stroke starts undrawn; as the scene is scrolled the spine draws
 * from the first node to the last and a marker rides along it, so scrolling
 * reads as advancing through the pipeline. The dashed exception path can't be
 * stroke-drawn — its dash pattern is doing other work — so it fades in on the
 * same clock instead. Under reduced motion the diagram is simply complete.
 */
export default function Schematic({ id }: { id: string }) {
  const root = useRef<SVGSVGElement>(null);
  const s = schematics[id];

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    const mm = gsap.matchMedia();

    mm.add(MQ.reduced, () => {
      gsap.set(q(".sch-draw"), { strokeDashoffset: 0 });
      gsap.set([q(".sch-node"), q(".sch-dot"), q(".sch-dash")], {
        opacity: 1,
        scale: 1,
      });
      gsap.set(q(".sch-marker"), { opacity: 0 });
    });

    mm.add(MQ.motion, () => {
      const scene = el.closest("section");
      if (!scene) return;

      const last = s.nodes[s.nodes.length - 1].x;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top 78%",
            // Complete and readable while the scene still holds the viewport.
            end: "top 34%",
            scrub: 0.6,
          },
        })
        .fromTo(
          q(".sch-draw"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: "none", duration: 1, stagger: 0.05 },
          0,
        )
        .fromTo(
          [q(".sch-node"), q(".sch-dot")],
          { opacity: 0, scale: 0.4 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            duration: 0.22,
            stagger: 0.2,
            transformOrigin: "center",
          },
          0.05,
        )
        .fromTo(
          q(".sch-dash"),
          { opacity: 0 },
          { opacity: 1, ease: "none", duration: 0.35 },
          0.55,
        )
        .fromTo(
          q(".sch-marker"),
          { opacity: 0, attr: { cx: s.nodes[0].x } },
          { opacity: 1, attr: { cx: last }, ease: "none", duration: 1 },
          0,
        )
        .to(q(".sch-marker"), { opacity: 0, duration: 0.1 }, 0.94);
    });

    return () => mm.revert();
  }, [id, s]);

  const spine = s.nodes
    .slice(0, -1)
    .map((n, i) => `M${n.x} ${SPINE_Y} H${s.nodes[i + 1].x}`)
    .join(" ");

  return (
    <figure className="schematic">
      <svg
        ref={root}
        viewBox="0 0 400 96"
        role="img"
        aria-label={s.caption}
        preserveAspectRatio="xMinYMid meet"
      >
        <path className="sch-line sch-draw" d={spine} pathLength={1} />

        {s.extra?.map((p, i) =>
          p.dashed ? (
            <path key={i} className="sch-line sch-dash" d={p.d} />
          ) : (
            <path key={i} className="sch-line sch-draw" d={p.d} pathLength={1} />
          ),
        )}

        {s.dots?.map((d, i) => (
          <circle key={i} className="sch-dot" cx={d.x} cy={d.y} r="2.4" />
        ))}

        {s.nodes.map((n) => {
          const cls = `sch-node${n.accent ? " sch-accent" : ""}`;
          if (n.kind === "store") {
            return (
              <g className={cls} key={n.label}>
                <rect x={n.x - 7} y={SPINE_Y - 7} width="14" height="14" rx="1" />
                <line x1={n.x - 7} y1={SPINE_Y - 2.4} x2={n.x + 7} y2={SPINE_Y - 2.4} />
                <line x1={n.x - 7} y1={SPINE_Y + 2.4} x2={n.x + 7} y2={SPINE_Y + 2.4} />
              </g>
            );
          }
          if (n.kind === "sink") {
            return (
              <g className={cls} key={n.label}>
                <circle cx={n.x} cy={SPINE_Y} r="7" />
                <circle cx={n.x} cy={SPINE_Y} r="2.4" className="sch-fill" />
              </g>
            );
          }
          return (
            <g className={cls} key={n.label}>
              <rect x={n.x - 7} y={SPINE_Y - 7} width="14" height="14" rx="1" />
            </g>
          );
        })}

        <circle className="sch-marker" cx={s.nodes[0].x} cy={SPINE_Y} r="3.2" />

        {s.nodes.map((n, i) => (
          <text
            key={n.label}
            className="sch-label"
            x={n.x}
            y={88}
            textAnchor={
              i === 0 ? "start" : i === s.nodes.length - 1 ? "end" : "middle"
            }
            dx={i === 0 ? -7 : i === s.nodes.length - 1 ? 7 : 0}
          >
            {n.label}
          </text>
        ))}
      </svg>
      <figcaption className="t-mono schematic-caption">{s.caption}</figcaption>
    </figure>
  );
}
