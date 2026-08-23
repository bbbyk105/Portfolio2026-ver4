"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, MQ } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import HeroGeometry from "./stage/HeroGeometry";
import CaRootVisual from "./stage/CaRootVisual";
import ProteinVisual from "./stage/ProteinVisual";
import CommerceVisual from "./stage/CommerceVisual";
import WorkflowVisual from "./stage/WorkflowVisual";
import CapabilitiesVisual from "./stage/CapabilitiesVisual";

/**
 * The stage is the spine of the site.
 *
 * It is a single fixed, viewport-sized surface holding every project visual.
 * The document scrolls underneath it; the imagery never scrolls, it is
 * transformed.
 *
 * Handoffs are cut from one set of ranges shared by every scene, so the
 * overlap between an outgoing and an incoming visual is the same length
 * everywhere: the outgoing one is still on screen, scaling and defocusing
 * past the camera, while the next resolves out of it. Adjacent sections share
 * an edge, so `OUT` on one scene and `IN` on the next are measured against the
 * same line — which is what keeps the overlap window fixed at roughly a third
 * of a viewport rather than drifting with scene length.
 */
export default function VisualStage() {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const q = gsap.utils.selector(el);
    const vw = (n: number) => () => window.innerWidth * n;
    const vh = (n: number) => () => window.innerHeight * n;

    const mm = gsap.matchMedia();

    mm.add(
      { desktop: MQ.desktop, mobile: MQ.mobile, reduced: MQ.reduced },
      (ctx) => {
        const { desktop, reduced } = ctx.conditions as Record<string, boolean>;

        const hero = q('[data-layer="hero"]');
        const caroot = q('[data-layer="caroot"]');
        const protein = q('[data-layer="protein"]');
        const commerce = q('[data-layer="commerce"]');
        const workflow = q('[data-layer="workflow"]');
        const caps = q('[data-layer="capabilities"]');
        const motionOf = (layer: Element[]) =>
          layer.map((n) => n.querySelector(".layer-motion") as Element);

        /* ── Reduced motion ───────────────────────────────────────────
           No scrubbing, no travel. Each visual belongs to its scene and
           crossfades when that scene owns the viewport, leaving a finished
           static composition at every scroll stop. */
        if (reduced) {
          gsap.set(
            [hero, caroot, protein, commerce, workflow, caps],
            { autoAlpha: 0 },
          );
          gsap.set(hero, { autoAlpha: 1 });

          const pairs: [Element[], string][] = [
            [hero, "#hero"],
            [caroot, "#p-caroot"],
            [protein, "#p-protein"],
            [commerce, "#p-commerce"],
            [workflow, "#p-workflow"],
            [caps, "#capabilities"],
          ];
          pairs.forEach(([layer, scene]) => {
            ScrollTrigger.create({
              trigger: scene,
              start: "top 60%",
              end: "bottom 40%",
              onToggle: ({ isActive }) =>
                gsap.to(layer, {
                  // The routing graphic stays a background at any scroll stop.
                  autoAlpha: isActive ? (layer === caps ? 0.32 : 1) : 0,
                  duration: 0.4,
                  overwrite: true,
                }),
            });
          });
          return;
        }

        /* Amplitude scale — mobile keeps the art direction but travels less. */
        const k = desktop ? 1 : 0.5;

        /* One vocabulary of ranges for every handoff. */
        const IN = { start: "top 74%", end: "top 22%" };
        const TRAVEL = { start: "top 22%", end: "bottom 78%" };
        const OUT = { start: "bottom 78%", end: "bottom 38%" };
        const at = (scene: string, r: { start: string; end: string }) => ({
          trigger: scene,
          start: r.start,
          end: r.end,
          scrub: 0.7,
          invalidateOnRefresh: true,
        });

        gsap.set([caroot, protein, commerce, workflow, caps], { autoAlpha: 0 });
        gsap.set(hero, { autoAlpha: 1 });
        gsap.set(motionOf(hero), { scale: 0.88, rotate: -0.6 });

        /* ── HERO ───────────────────────────────────────────────────
           The camera pushes into the object until it passes the lens.
           No blur: this is the largest layer on the page and animating
           `filter` on it forces a full repaint every frame (~17ms measured).
           Scale and opacity alone stay on the compositor. */
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          })
          .to(
            motionOf(hero),
            {
              scale: 1 + 0.62 * k,
              y: vh(-0.06 * k),
              rotate: 2.6 * k,
              ease: "none",
              duration: 1,
            },
            0,
          )
          .to(hero, { autoAlpha: 0, ease: "none", duration: 0.32 }, 0.66);

        /* ── CAROOT ─────────────────────────────────────────────────
           The flow graphic resolves out of the still-visible hero object:
           same origin, same blur budget, opposite direction. The clip-path
           wipe makes the routing lines look drawn rather than faded in. */
        gsap.fromTo(
          caroot,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: "none", scrollTrigger: at("#p-caroot", IN) },
        );
        gsap.fromTo(
          motionOf(caroot),
          {
            scale: 1 + 0.8 * k,
            rotate: -4 * k,
            filter: "blur(10px)",
            clipPath: "inset(0% 100% 0% 0%)",
          },
          {
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: at("#p-caroot", IN),
          },
        );
        gsap.fromTo(
          motionOf(caroot),
          { x: vw(0.05 * k) },
          {
            x: vw(-0.05 * k),
            scale: 1 + 0.06 * k,
            ease: "none",
            scrollTrigger: at("#p-caroot", TRAVEL),
          },
        );

        /* CaRoot → Protein: the flow breaks apart. Two dim copies diverge
           while the cloud converges over the same centre. */
        gsap
          .timeline({ scrollTrigger: at("#p-caroot", OUT) })
          .to(
            motionOf(caroot),
            { scale: 1 + 0.18 * k, filter: "blur(12px)", ease: "none", duration: 1 },
            0,
          )
          .to(caroot, { autoAlpha: 0, ease: "none", duration: 0.7 }, 0.3)
          .fromTo(
            q(".caroot-shard-a"),
            { opacity: 0, x: 0, y: 0, scale: 1 },
            {
              opacity: 0.45,
              x: vw(0.12 * k),
              y: vh(-0.07 * k),
              scale: 1.1,
              ease: "none",
              duration: 1,
            },
            0,
          )
          .fromTo(
            q(".caroot-shard-b"),
            { opacity: 0, x: 0, y: 0, scale: 1 },
            {
              opacity: 0.3,
              x: vw(-0.14 * k),
              y: vh(0.08 * k),
              scale: 0.9,
              ease: "none",
              duration: 1,
            },
            0,
          );

        /* ── PROTEIN ────────────────────────────────────────────────
           Arrives already too large and out of focus, then settles. */
        gsap.fromTo(
          protein,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: "none", scrollTrigger: at("#p-protein", IN) },
        );
        gsap.fromTo(
          motionOf(protein),
          { scale: 1.34, filter: "blur(13px)", x: vw(0.14 * k), rotate: -6 * k },
          {
            scale: 0.82,
            filter: "blur(0px)",
            x: vw(0.1 * k),
            rotate: -3 * k,
            ease: "none",
            scrollTrigger: at("#p-protein", IN),
          },
        );
        gsap.fromTo(
          motionOf(protein),
          { scale: 0.82, rotate: -3 * k, x: vw(0.1 * k) },
          {
            scale: 1.15,
            rotate: 3 * k,
            x: vw(-0.04 * k),
            ease: "none",
            scrollTrigger: at("#p-protein", TRAVEL),
          },
        );
        gsap
          .timeline({ scrollTrigger: at("#p-protein", OUT) })
          .to(
            motionOf(protein),
            { scale: 0.92, filter: "blur(9px)", ease: "none", duration: 1 },
            0,
          )
          .to(protein, { autoAlpha: 0, ease: "none", duration: 0.7 }, 0.3);

        /* ── COMMERCE ───────────────────────────────────────────────
           Two clip-path halves of one structure: they arrive from opposite
           sides, lock together, breathe apart under scroll, then separate
           for good on the way out. */
        const modA = q(".module-a");
        const modB = q(".module-b");

        gsap.fromTo(
          commerce,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: "none", scrollTrigger: at("#p-commerce", IN) },
        );
        gsap
          .timeline({ scrollTrigger: at("#p-commerce", IN) })
          .fromTo(
            motionOf(commerce),
            { scale: 1.25, filter: "blur(9px)" },
            { scale: 1, filter: "blur(0px)", ease: "none", duration: 1 },
            0,
          )
          .fromTo(
            modA,
            { x: vw(-0.14 * k), y: vh(0.07 * k) },
            { x: 0, y: 0, ease: "none", duration: 1 },
            0,
          )
          .fromTo(
            modB,
            { x: vw(0.14 * k), y: vh(-0.08 * k) },
            { x: 0, y: 0, ease: "none", duration: 1 },
            0,
          );

        gsap
          .timeline({ scrollTrigger: at("#p-commerce", TRAVEL) })
          .to(modA, { x: -18 * k, y: 6 * k, ease: "none", duration: 1 }, 0)
          .to(modB, { x: 16 * k, y: -8 * k, ease: "none", duration: 1 }, 0)
          .to(
            motionOf(commerce),
            { rotate: 1.4 * k, y: vh(-0.03 * k), ease: "none", duration: 1 },
            0,
          );

        gsap
          .timeline({ scrollTrigger: at("#p-commerce", OUT) })
          .to(modA, { x: vw(-0.1 * k), y: vh(0.04 * k), ease: "none", duration: 1 }, 0)
          .to(modB, { x: vw(0.1 * k), y: vh(-0.05 * k), ease: "none", duration: 1 }, 0)
          .to(motionOf(commerce), { filter: "blur(9px)", ease: "none", duration: 1 }, 0)
          .to(commerce, { autoAlpha: 0, ease: "none", duration: 0.7 }, 0.3);

        /* ── WORKFLOW ───────────────────────────────────────────────
           Drawn in from the left as an infrastructure diagram, never as a
           screenshot: it lands in open space and the typography arrives
           afterwards, over it. */
        gsap.fromTo(
          workflow,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: "none", scrollTrigger: at("#p-workflow", IN) },
        );
        gsap.fromTo(
          motionOf(workflow),
          { clipPath: "inset(0% 100% 0% 0%)", x: vw(0.06 * k), scale: 0.96 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            x: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: at("#p-workflow", IN),
          },
        );
        gsap.to(motionOf(workflow), {
          scale: 1 + 0.09 * k,
          x: vw(-0.04 * k),
          y: vh(-0.03 * k),
          ease: "none",
          scrollTrigger: at("#p-workflow", TRAVEL),
        });
        gsap
          .timeline({ scrollTrigger: at("#p-workflow", OUT) })
          .to(
            motionOf(workflow),
            { filter: "blur(8px)", scale: 1.16, ease: "none", duration: 1 },
            0,
          )
          .to(workflow, { autoAlpha: 0, ease: "none", duration: 0.8 }, 0.2);

        /* ── CAPABILITIES ───────────────────────────────────────────
           Not a project visual: a background the term field is set over,
           kept dim and slow so it never competes with the type. */
        gsap.fromTo(
          caps,
          { autoAlpha: 0 },
          {
            autoAlpha: 0.32,
            ease: "none",
            scrollTrigger: at("#capabilities", { start: "top 85%", end: "top 35%" }),
          },
        );
        gsap.fromTo(
          motionOf(caps),
          { scale: 1.12, y: vh(0.05 * k) },
          {
            scale: 1,
            y: vh(-0.05 * k),
            ease: "none",
            scrollTrigger: at("#capabilities", {
              start: "top bottom",
              end: "bottom top",
            }),
          },
        );
        gsap.to(caps, {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: at("#capabilities", {
            start: "bottom 60%",
            end: "bottom 15%",
          }),
        });
      },
    );

    // Fonts and images settle after first paint; measure once they have.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts) void document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <div className="stage" ref={root} aria-hidden="true">
      <HeroGeometry />
      <CaRootVisual />
      <ProteinVisual />
      <CommerceVisual />
      <WorkflowVisual />
      <CapabilitiesVisual />
    </div>
  );
}
