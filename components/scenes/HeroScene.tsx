"use client";

import { useRef } from "react";
import { hero } from "@/lib/content";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

/**
 * Both planes render the identical wordmark so their line boxes cannot drift
 * apart; each plane just hides the lines that belong to the other one.
 */
function Wordmark({ plane }: { plane: "front" | "back" }) {
  const back = plane === "back";
  const Tag = back ? "div" : "h1";
  return (
    <Tag className="t-display hero-type">
      <span className="line-mask">
        <span className={`hero-line hl-build ${back ? "hl-ghost" : ""}`}>
          {hero.lines[0]}
        </span>
      </span>
      <span className="line-mask">
        <span className={`hero-line hl-digital ${back ? "hl-ghost" : ""}`}>
          {hero.lines[1]}
        </span>
      </span>
      <span className="line-mask hero-line--indent">
        <span
          className={`hero-line hl-systems t-outline ${back ? "" : "hl-ghost"}`}
        >
          {hero.lines[2]}
        </span>
      </span>
    </Tag>
  );
}

function HeroMeta({ ghost = false }: { ghost?: boolean }) {
  return (
    <div
      className="hero-meta hero-fade stack-tight"
      style={ghost ? { visibility: "hidden" } : undefined}
    >
      <span className="tick" />
      <p className="t-mono t-blue" style={{ letterSpacing: "0.22em" }}>
        {hero.name}
      </p>
      <p className="t-body">{hero.intro}</p>
    </div>
  );
}

/**
 * The hero is typography, not a two-column layout: the wordmark is the
 * composition and the architectural object sits inside it.
 *
 * Under scroll the three lines separate at different rates — the only
 * parallax on the page that is doing real work, because it is what opens
 * the gap the object travels through.
 */
export default function HeroScene() {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as Record<string, boolean>;
      const k = desktop ? 1 : 0.5;
      const q = gsap.utils.selector(el);
      const vw = (n: number) => () => window.innerWidth * n;
      const vh = (n: number) => () => window.innerHeight * n;

      // Settle in once, on load — the only entrance animation on the site.
      gsap.from(q(".hero-line"), {
        yPercent: 108,
        duration: DUR.reveal,
        ease: EASE.enter,
        stagger: 0.09,
      });
      gsap.from(q(".hero-fade"), {
        opacity: 0,
        duration: DUR.reveal,
        ease: EASE.glide,
        delay: 0.35,
        stagger: 0.08,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(q(".hl-build"), { x: vw(-0.06 * k), ease: "none", duration: 1 }, 0)
        .to(q(".hl-digital"), { x: vw(0.07 * k), ease: "none", duration: 1 }, 0)
        .to(
          q(".hl-systems"),
          { y: vh(-0.14 * k), scale: 1 + 0.08 * k, ease: "none", duration: 1 },
          0,
        )
        .to(q(".hero-fade"), { opacity: 0, ease: "none", duration: 0.45 }, 0)
        .to(q(".rules span"), { y: vh(-0.06 * k), ease: "none", duration: 1 }, 0)
        .to(q(".type-plane"), { autoAlpha: 0, ease: "none", duration: 0.28 }, 0.68);
    }, el);

    return () => mm.revert();
  }, []);

  return (
    <div className="hero-root" ref={root}>
      {/* Behind the object */}
      <div className="type-plane type-plane--back" aria-hidden="true">
        <div className="rules">
          <span style={{ left: "18%" }} />
          <span style={{ left: "50%" }} />
          <span style={{ left: "82%" }} />
        </div>
        <Wordmark plane="back" />
        <HeroMeta ghost />
      </div>

      {/* In front of the object */}
      <div className="type-plane type-plane--front">
        <Wordmark plane="front" />

        <HeroMeta />

        <p className="hero-scroll t-mono hero-fade">SCROLL</p>
      </div>

      {/* Scroll runway for the hero timeline. */}
      <section id="hero" className="scene hero" aria-hidden="true" />
    </div>
  );
}
