"use client";

import { useRef } from "react";
import { hero } from "@/lib/content";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import CodeWindow from "@/components/CodeWindow";

/**
 * Daytona's hero shape: everything centred — eyebrow, two-line headline (the
 * second line set faint), one paragraph, two pill buttons — with a tabbed
 * code window below instead of any imagery beside the type. A blue glow sits
 * behind the headline the way Daytona's hero glows behind its own.
 *
 * Motion: the lines rise out of their masks on load, the chrome fades up
 * after them, and the window arrives last — then types its source once it
 * has landed. The glow behind the head breathes. On scroll the head drifts
 * away and yields the viewport to the window, which itself stays put.
 */
export default function HeroScene() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const q = gsap.utils.selector(el);

      // Settle in once, on load — the only entrance animation on the site.
      const tl = gsap.timeline({ defaults: { ease: EASE.enter } });
      tl.from(q(".hero-line"), {
        yPercent: 112,
        duration: DUR.reveal,
        stagger: 0.1,
      })
        .from(
          q(".hero-fade"),
          {
            opacity: 0,
            y: 18,
            duration: DUR.swap,
            ease: EASE.glide,
            stagger: 0.08,
          },
          0.45,
        )
        .from(
          q(".hero-panel"),
          { opacity: 0, y: 72, scale: 0.985, duration: 1.3 },
          0.6,
        )
        .from(
          q(".hero-glow"),
          { opacity: 0, duration: 1.8, ease: "power1.out" },
          0.25,
        );

      // The glow breathes — slow enough to be felt rather than watched.
      gsap.to(q(".hero-glow"), {
        scale: 1.12,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // The head yields the viewport as the window takes it over. The window
      // itself never drifts — a floating panel reads as a bug, not as motion.
      gsap.to(q(".hero-head"), {
        yPercent: -12,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "42% top",
          scrub: 0.6,
        },
      });
    }, el);

    return () => mm.revert();
  }, []);

  return (
    <section id="hero" className="hero" ref={root}>
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-head">
        <p className="hero-eyebrow t-mono hero-fade">
          <span className="kicker-sq" aria-hidden="true" />
          {hero.eyebrow}
        </p>

        <h1 className="t-display hero-type">
          {hero.lines.map((line, i) => (
            <span className="line-mask" key={line}>
              <span
                className={`hero-line${i === hero.lines.length - 1 ? " t-faint" : ""}`}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="t-body hero-intro hero-fade">{hero.intro}</p>

        <div className="hero-ctas hero-fade">
          {hero.ctas.map((cta, i) => (
            <a
              key={cta.href}
              className={`btn t-mono ${i === 0 ? "btn--primary" : "btn--ghost"}`}
              href={cta.href}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>

      <div className="hero-code">
        <CodeWindow tabs={hero.tabs} className="hero-panel" typeDelay={1.2} />
      </div>
    </section>
  );
}
