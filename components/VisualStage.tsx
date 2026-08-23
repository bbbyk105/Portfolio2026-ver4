"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, MQ } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import HeroGeometry from "./stage/HeroGeometry";
import CaRootVisual from "./stage/CaRootVisual";
import ProteinVisual from "./stage/ProteinVisual";
import CommerceVisual from "./stage/CommerceVisual";
import WorkflowVisual from "./stage/WorkflowVisual";

/**
 * The stage is the spine of the site.
 *
 * It is a single fixed, viewport-sized surface holding every project visual.
 * The document scrolls underneath it; the imagery never scrolls, it is
 * transformed. Each handoff overlaps the one before it — the outgoing visual
 * is still on screen, blurring and scaling past the camera, while the next
 * one is already resolving out of it — so the visuals read as one object
 * being reshaped rather than five pictures being swapped.
 *
 * All scroll work lives in one `gsap.matchMedia()` so desktop, mobile and
 * reduced-motion each get a timeline built for them, and one `revert()`
 * tears every ScrollTrigger down.
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
        const motionOf = (layer: Element[]) =>
          layer.map((n) => n.querySelector(".layer-motion") as Element);

        /* ── Reduced motion ───────────────────────────────────────────
           No scrubbing, no travel. Each visual simply belongs to its
           scene and crossfades when that scene owns the viewport, which
           leaves a finished, static composition at every scroll stop. */
        if (reduced) {
          gsap.set([hero, caroot, protein, commerce, workflow], {
            autoAlpha: 0,
          });
          gsap.set(hero, { autoAlpha: 1 });

          const pairs: [Element[], string][] = [
            [hero, "#hero"],
            [caroot, "#p-caroot"],
            [protein, "#p-protein"],
            [commerce, "#p-commerce"],
            [workflow, "#p-workflow"],
          ];
          pairs.forEach(([layer, scene]) => {
            ScrollTrigger.create({
              trigger: scene,
              start: "top 60%",
              end: "bottom 40%",
              onToggle: ({ isActive }) =>
                gsap.to(layer, {
                  autoAlpha: isActive ? 1 : 0,
                  duration: 0.4,
                  overwrite: true,
                }),
            });
          });
          return;
        }

        /* Amplitude scale — mobile keeps the art direction but travels less. */
        const k = desktop ? 1 : 0.5;

        gsap.set([caroot, protein, commerce, workflow], { autoAlpha: 0 });
        gsap.set(hero, { autoAlpha: 1 });
        gsap.set(motionOf(hero), { scale: 0.88, rotate: -0.6 });

        /* ── HERO ───────────────────────────────────────────────────
           The camera pushes into the object until it passes the lens. */
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(
            motionOf(hero),
            {
              // No blur here on purpose: this layer is the largest thing on
              // the page and animating `filter` on it forces a full repaint
              // every frame (measured at ~17ms). Scale and opacity alone
              // carry the push past the lens, and they stay on the compositor.
              scale: 1 + 0.62 * k,
              y: vh(-0.06 * k),
              rotate: 2.6 * k,
              ease: "none",
              duration: 1,
            },
            0,
          )
          .to(hero, { autoAlpha: 0, ease: "none", duration: 0.34 }, 0.64);

        /* ── HERO → CAROOT ──────────────────────────────────────────
           The flow graphic resolves out of the still-visible hero object:
           same origin, same blur budget, opposite direction. The clip-path
           wipe makes the routing lines look drawn rather than faded in. */
        gsap.fromTo(
          caroot,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#p-caroot",
              start: "top 92%",
              end: "top 30%",
              scrub: 1,
            },
          },
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
            scrollTrigger: {
              trigger: "#p-caroot",
              start: "top 92%",
              end: "top 18%",
              scrub: 1,
            },
          },
        );

        /* CaRoot travel — the flow drifts across the frame, left to right. */
        gsap.fromTo(
          motionOf(caroot),
          { x: vw(0.05 * k) },
          {
            x: vw(-0.05 * k),
            scale: 1 + 0.06 * k,
            ease: "none",
            scrollTrigger: {
              trigger: "#p-caroot",
              start: "top 18%",
              end: "bottom 62%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );

        /* CaRoot → Protein: the flow breaks apart. Two dim copies diverge
           and blur out while the cloud converges over the same centre. */
        const dissolve = gsap.timeline({
          scrollTrigger: {
            trigger: "#p-caroot",
            start: "bottom 62%",
            end: "bottom 6%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        dissolve
          .to(
            motionOf(caroot),
            {
              scale: 1 + 0.18 * k,
              filter: "blur(12px)",
              ease: "none",
              duration: 1,
            },
            0,
          )
          .to(caroot, { autoAlpha: 0, ease: "none", duration: 0.75 }, 0.25)
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
          {
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#p-protein",
              start: "top 95%",
              end: "top 40%",
              scrub: 1,
            },
          },
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
            scrollTrigger: {
              trigger: "#p-protein",
              start: "top 95%",
              end: "top 22%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
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
            scrollTrigger: {
              trigger: "#p-protein",
              start: "top 22%",
              end: "bottom 55%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
        gsap.to(motionOf(protein), {
          scale: 0.92,
          filter: "blur(9px)",
          ease: "none",
          scrollTrigger: {
            trigger: "#p-protein",
            start: "bottom 55%",
            end: "bottom 4%",
            scrub: 1,
          },
        });
        gsap.to(protein, {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#p-protein",
            start: "bottom 42%",
            end: "bottom 4%",
            scrub: 1,
          },
        });

        /* ── COMMERCE ───────────────────────────────────────────────
           Three copies of the hero object assemble, breathe apart under
           scroll, then separate for good on the way out. */
        const modA = q(".module-a");
        const modB = q(".module-b");
        const modC = q(".module-c");

        gsap.fromTo(
          commerce,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#p-commerce",
              start: "top 95%",
              end: "top 45%",
              scrub: 1,
            },
          },
        );
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#p-commerce",
              start: "top 95%",
              end: "top 20%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            motionOf(commerce),
            { scale: 1.25, filter: "blur(8px)" },
            { scale: 1, filter: "blur(0px)", ease: "none", duration: 1 },
            0,
          )
          .fromTo(
            modB,
            { x: vw(-0.16 * k), y: vh(0.1 * k) },
            { x: 0, y: 0, ease: "none", duration: 1 },
            0,
          )
          .fromTo(
            modC,
            { x: vw(0.15 * k), y: vh(-0.11 * k) },
            { x: 0, y: 0, ease: "none", duration: 1 },
            0,
          );

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#p-commerce",
              start: "top 20%",
              end: "bottom 58%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(modA, { x: -20 * k, ease: "none", duration: 1 }, 0)
          .to(modB, { y: 15 * k, ease: "none", duration: 1 }, 0)
          .to(modC, { scale: 1 + 0.06 * k, ease: "none", duration: 1 }, 0)
          .to(
            motionOf(commerce),
            { rotate: 1.4 * k, y: vh(-0.03 * k), ease: "none", duration: 1 },
            0,
          );

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#p-commerce",
              start: "bottom 58%",
              end: "bottom 6%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(modA, { x: vw(-0.1 * k), ease: "none", duration: 1 }, 0)
          .to(modB, { x: vw(0.09 * k), y: vh(0.05 * k), ease: "none", duration: 1 }, 0)
          .to(modC, { y: vh(-0.07 * k), ease: "none", duration: 1 }, 0)
          .to(
            motionOf(commerce),
            { filter: "blur(9px)", ease: "none", duration: 1 },
            0,
          )
          .to(commerce, { autoAlpha: 0, ease: "none", duration: 0.7 }, 0.3);

        /* ── WORKFLOW ───────────────────────────────────────────────
           Drawn in from the left as an infrastructure diagram, never as a
           screenshot: it lands in open space and the typography arrives
           afterwards, over it. */
        gsap.fromTo(
          workflow,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#p-workflow",
              start: "top 76%",
              end: "top 40%",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          motionOf(workflow),
          {
            clipPath: "inset(0% 100% 0% 0%)",
            x: vw(0.06 * k),
            scale: 0.96,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            x: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#p-workflow",
              start: "top 76%",
              end: "top 18%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
        gsap.to(motionOf(workflow), {
          scale: 1 + 0.09 * k,
          x: vw(-0.04 * k),
          y: vh(-0.03 * k),
          ease: "none",
          scrollTrigger: {
            trigger: "#p-workflow",
            start: "top 20%",
            end: "bottom 52%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#p-workflow",
              start: "bottom 52%",
              end: "bottom top",
              scrub: 1,
            },
          })
          .to(
            motionOf(workflow),
            { filter: "blur(8px)", scale: 1.16, ease: "none", duration: 1 },
            0,
          )
          .to(workflow, { autoAlpha: 0, ease: "none", duration: 0.8 }, 0.2);
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
    </div>
  );
}
