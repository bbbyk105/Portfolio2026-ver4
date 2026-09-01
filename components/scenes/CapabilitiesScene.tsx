"use client";

import { useRef, useState } from "react";
import { capabilityGroups } from "@/lib/content";
import { brandIcons } from "@/lib/icons";
import { gsap, ScrollTrigger, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { resetTyped, typeLines } from "@/lib/typing";
import SectionHead from "@/components/SectionHead";
import BrandIcon from "@/components/BrandIcon";

/**
 * Daytona's "Programmatic Control" section: a tab list on the left, a framed
 * panel on the right. The list picks a group, the panel answers with that
 * group's stack as a `$ stack --<group>` readout of chips. On narrow screens
 * the list collapses into a scrollable row of pills above the panel.
 *
 * Motion: the heading and the two columns reveal on scroll. The panel's
 * contents behave like a terminal — the prompt line types itself and the
 * chips answer it — once as the section arrives and again on every tab
 * switch. The swap is gated on a real click so neither first paint nor a
 * StrictMode remount plays it.
 */

/** The prompt types, then the chips answer. Built paused; the caller cues it. */
function panelIn(scope: HTMLElement) {
  const head = scope.querySelector(".cap-panel-head");
  const chips = scope.querySelectorAll(".cap-chip");
  const tl = gsap.timeline({ paused: true });

  let at = 0;
  if (head) {
    resetTyped([head]);
    at = typeLines(tl, [head], 0.028);
  }
  tl.fromTo(
    chips,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: DUR.micro, ease: EASE.glide, stagger: 0.06 },
    at + 0.1,
  );
  return tl;
}

export default function CapabilitiesScene() {
  const root = useRef<HTMLElement>(null);
  const swap = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [active, setActive] = useState(0);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const q = gsap.utils.selector(el);

      gsap.from(q(".cap-heading .line-mask > span"), {
        yPercent: 108,
        duration: DUR.reveal,
        ease: EASE.enter,
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 74%" },
      });
      gsap.from(q(".cap-reveal"), {
        y: 36,
        opacity: 0,
        duration: DUR.reveal,
        ease: EASE.enter,
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 68%" },
      });

      // The panel's first readout runs once the panel itself has risen.
      const panel = swap.current;
      if (panel) {
        const tl = panelIn(panel);
        ScrollTrigger.create({
          trigger: el,
          start: "top 68%",
          once: true,
          onEnter: () => gsap.delayedCall(0.5, () => tl.play()),
        });
      }
    }, el);

    return () => mm.revert();
  }, []);

  useIsoLayoutEffect(() => {
    const el = swap.current;
    if (!el || !touched.current) return;
    if (window.matchMedia(MQ.reduced).matches) return;

    const tl = panelIn(el);
    tl.play();
    return () => {
      tl.kill();
    };
  }, [active]);

  const group = capabilityGroups[active];

  return (
    <section id="capabilities" className="scene" ref={root}>
      <SectionHead index="03" label="CAPABILITIES" note="STACK" />
      <h2 className="t-display cap-heading">
        <span className="line-mask">
          <span>SYSTEM</span>
        </span>
        <span className="line-mask">
          <span className="t-faint">CAPABILITIES.</span>
        </span>
      </h2>

      <div className="cap-layout">
        <div className="cap-tabs cap-reveal" role="tablist" aria-label="Stack groups">
          {capabilityGroups.map((g, i) => (
            <button
              key={g.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`cap-tab t-mono${i === active ? " is-active" : ""}`}
              onClick={() => {
                touched.current = true;
                setActive(i);
              }}
            >
              <span className="cap-tab-label">{g.label}</span>
              <span className="cap-tab-count">
                {String(g.items.length).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>

        <div className="cap-panel cap-reveal" role="tabpanel">
          <div className="cap-swap" ref={swap} key={group.slug}>
            <p className="cap-panel-head t-mono typed">
              <span className="typed-src">{`$ stack --${group.slug}`}</span>
              <span className="typed-caret" aria-hidden="true" />
            </p>
            <div className="cap-chips">
              {group.items.map((term) => (
                <span className="cap-chip t-mono" key={term}>
                  {brandIcons[term] ? (
                    <BrandIcon src={brandIcons[term]} size={14} />
                  ) : null}
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
