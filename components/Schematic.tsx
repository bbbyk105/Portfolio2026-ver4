"use client";

import { useRef } from "react";
import {
  schematics,
  VIEW,
  Y,
  TILE,
  MINI,
  FAN_STEP,
  LABEL_Y,
} from "@/lib/schematics";
import { gsap, ScrollTrigger, MQ, EASE } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

const BLUE = "#47b5ff";
const TILE_STROKE = "rgba(255, 255, 255, 0.55)";
const ICON_COLOR = "rgba(255, 255, 255, 0.85)";

/** How long a stage stays lit while it works on what arrived. */
const WORK = 0.55;
/** The widest beat (a fan or a merge) runs this many packets at once. */
const PACKETS = 3;

/**
 * A stage receiving a packet: the tile and its glyph go blue, the glyph gives
 * a small nod, a ring breathes off the tile, and after the work is done the
 * colour settles back. Nothing here scales a shape — rings grow by radius,
 * the nod is a translate — so nothing can drift off its centre.
 */
function light(tl: gsap.core.Timeline, stage: Element, at: number) {
  const small = stage.classList.contains("sch-stage--fan");
  const tiles = stage.querySelectorAll(".sch-tile");
  const glyphs = stage.querySelectorAll(".sch-icon svg");
  const nods = stage.querySelectorAll(".sch-icon");
  const rings = stage.querySelectorAll(".sch-ring");

  tl.to(tiles, { stroke: BLUE, duration: 0.12, ease: "power2.out" }, at)
    .to(glyphs, { color: BLUE, duration: 0.12, ease: "power2.out" }, at)
    .fromTo(
      nods,
      { y: 0 },
      {
        y: small ? -1 : -1.6,
        duration: 0.16,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        immediateRender: false,
      },
      at,
    )
    .fromTo(
      rings,
      { attr: { r: small ? MINI / 2 : TILE / 2 }, opacity: 0.55 },
      {
        attr: { r: small ? MINI / 2 + 8 : TILE / 2 + 11 },
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        immediateRender: false,
      },
      at,
    )
    .to(tiles, { stroke: TILE_STROKE, duration: 0.5, ease: "power2.inOut" }, at + WORK)
    .to(glyphs, { color: ICON_COLOR, duration: 0.5, ease: "power2.inOut" }, at + WORK);
}

/**
 * The project's system, drawn as it arrives and then kept running.
 *
 * Entrance, once, as the card scrolls in: rails draw left to right, tiles
 * rise into place a beat apart, labels settle last. Then the loop: packets
 * ride the rails — merging in, running in parallel, fanning out, retrying —
 * and each stage lights while it works on what reached it. Under reduced
 * motion the figure is simply complete and still.
 */
export default function Schematic({ id, index }: { id: string; index: number }) {
  const root = useRef<SVGSVGElement>(null);
  const s = schematics[id];
  /* One filter id per instance — several schematics share the page. */
  const glowId = `sch-glow-${id}`;

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      const rails = Array.from(el.querySelectorAll<SVGPathElement>(".sch-rail"));
      const drawn = rails.filter((r) => !r.classList.contains("sch-rail--dashed"));
      const dashed = rails.filter((r) => r.classList.contains("sch-rail--dashed"));
      const stages = Array.from(el.querySelectorAll(".sch-stage"));
      const sources = el.querySelectorAll(".sch-source");
      const labels = el.querySelectorAll(".sch-label");
      const packets = Array.from(
        el.querySelectorAll(".sch-packet:not(.sch-packet--back)"),
      );
      const back = el.querySelector(".sch-packet--back");

      /* ── The loop: the story, beat by beat ── */
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1 });
      let t = 0;
      for (const beat of s.story) {
        /* A stage lights once per beat, when the last packet bound for it
           lands — three sources merging is one arrival, not three flashes. */
        const arrivals = new Map<number, number>();
        let n = 0;

        for (const hop of beat) {
          let at = t;
          if (hop.rail !== undefined) {
            const path = rails[hop.rail];
            const packet = hop.back ? back : packets[n++ % PACKETS];
            if (packet) {
              const dur = 0.35 + path.getTotalLength() / 150;
              loop
                .fromTo(
                  packet,
                  { opacity: 0 },
                  { opacity: 1, duration: 0.14, ease: "none", immediateRender: false },
                  at,
                )
                .to(
                  packet,
                  {
                    motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
                    duration: dur,
                    ease: hop.back ? "power1.inOut" : "power2.inOut",
                  },
                  at,
                )
                .to(packet, { opacity: 0, duration: 0.12, ease: "none" }, at + dur - 0.08);
              at += dur;
            }
          }
          arrivals.set(hop.to, Math.max(arrivals.get(hop.to) ?? 0, at));
        }

        let end = t;
        arrivals.forEach((at, i) => {
          if (stages[i]) light(loop, stages[i], at);
          end = Math.max(end, at + WORK);
        });
        /* The next packet leaves while the stage is still lit. */
        t = end - 0.15;
      }

      /* The retry path's dashes march the whole time it is visible. Dash
         "3 4" has a period of 7, so an offset of -7 loops seamlessly. */
      if (dashed.length > 0) {
        gsap.to(dashed, { strokeDashoffset: -7, duration: 1.1, ease: "none", repeat: -1 });
      }

      /* ── The entrance, once ── */
      const enter = gsap.timeline({ paused: true, onComplete: () => loop.play() });
      enter.fromTo(
        drawn,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: 0.1,
          immediateRender: true,
        },
        0,
      );
      enter.fromTo(
        stages,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.9, ease: EASE.enter, stagger: 0.12, immediateRender: true },
        0.1,
      );
      if (sources.length > 0) {
        enter.fromTo(
          sources,
          { opacity: 0, x: -4 },
          { opacity: 1, x: 0, duration: 0.7, ease: EASE.enter, stagger: 0.06, immediateRender: true },
          0.15,
        );
      }
      if (dashed.length > 0) {
        enter.fromTo(
          dashed,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "none", immediateRender: true },
          0.7,
        );
      }
      enter.fromTo(
        labels,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.7, ease: EASE.glide, stagger: 0.08, immediateRender: true },
        0.55,
      );

      ScrollTrigger.create({
        trigger: el,
        start: "top 84%",
        once: true,
        onEnter: () => enter.play(),
      });
    });

    return () => mm.revert();
  }, [id, s]);

  return (
    <figure className="schematic">
      <div className="schematic-panel panel">
        <p className="schematic-head t-mono" aria-hidden="true">
          FIG.{String(index + 1).padStart(2, "0")} — SYSTEM FLOW
        </p>
        <svg
          ref={root}
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          role="img"
          aria-label={s.caption}
        >
          <defs>
            <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Rails. The retry path keeps its own dash pattern, so it can't
              carry the draw-on and fades in instead. */}
          {s.rails.map((r, i) =>
            r.dashed ? (
              <path key={i} className="sch-rail sch-rail--dashed" d={r.d} />
            ) : (
              <path key={i} className="sch-rail sch-rail--draw" d={r.d} pathLength={1} />
            ),
          )}

          {/* Sources: the loose ends feeding the first stage. The outer group
              places the glyph; the inner one is what the entrance moves. */}
          {s.sources?.map((src, i) => {
            const Icon = src.icon;
            return (
              <g key={i} transform={`translate(${src.x - 5} ${src.y - 5})`}>
                <g className="sch-source">
                  <Icon size={10} strokeWidth={1.75} />
                </g>
              </g>
            );
          })}

          {/* Stages. A fanned stage is a column of small tiles. */}
          {s.stages.map((stage) =>
            stage.fan ? (
              <g className="sch-stage sch-stage--fan" key={stage.label}>
                {stage.fan.map((Icon, j) => {
                  const cy = Y + (j - (stage.fan!.length - 1) / 2) * FAN_STEP;
                  return (
                    <g key={j}>
                      <circle className="sch-ring" cx={stage.x} cy={cy} r={MINI / 2} opacity="0" />
                      <rect
                        className="sch-tile"
                        x={stage.x - MINI / 2}
                        y={cy - MINI / 2}
                        width={MINI}
                        height={MINI}
                        rx={5}
                      />
                      <g transform={`translate(${stage.x - 5} ${cy - 5})`}>
                        <g className="sch-icon">
                          <Icon size={10} strokeWidth={1.75} />
                        </g>
                      </g>
                    </g>
                  );
                })}
              </g>
            ) : (
              <g className="sch-stage" key={stage.label}>
                <circle className="sch-ring" cx={stage.x} cy={Y} r={TILE / 2} opacity="0" />
                <rect
                  className="sch-tile"
                  x={stage.x - TILE / 2}
                  y={Y - TILE / 2}
                  width={TILE}
                  height={TILE}
                  rx={8}
                />
                <g transform={`translate(${stage.x - 8} ${Y - 8})`}>
                  <g className="sch-icon">
                    <stage.icon size={16} strokeWidth={1.5} />
                  </g>
                </g>
              </g>
            ),
          )}

          {/* Packets: hidden until the loop moves them. */}
          {Array.from({ length: PACKETS }, (_, i) => (
            <circle key={i} className="sch-packet" r={2.6} opacity="0" filter={`url(#${glowId})`} />
          ))}
          <circle className="sch-packet sch-packet--back" r={2.2} opacity="0" />

          {s.stages.map((stage) => (
            <text key={stage.label} className="sch-label" x={stage.x} y={LABEL_Y}>
              {stage.label}
            </text>
          ))}
        </svg>
      </div>
      <figcaption className="t-mono schematic-caption">{s.caption}</figcaption>
    </figure>
  );
}
