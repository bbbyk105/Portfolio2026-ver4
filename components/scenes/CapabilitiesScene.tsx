"use client";

import { useRef, useState } from "react";
import { capabilityGroups } from "@/lib/content";
import { brandIcons } from "@/lib/icons";
import { gsap, MQ, EASE, DUR } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import SectionHead from "@/components/SectionHead";
import BrandIcon from "@/components/BrandIcon";

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
    }, el);
    return () => {
      mm.revert();
    };
  }, []);

  useIsoLayoutEffect(() => {
    const el = swap.current;
    if (!el || !touched.current || window.matchMedia(MQ.reduced).matches) return;
    const chips = el.querySelectorAll(".cap-chip");
    const tl = gsap.timeline();
    tl.fromTo(
      chips,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: DUR.micro, ease: EASE.glide, stagger: 0.05 },
    );
    return () => {
      tl.kill();
    };
  }, [active]);

  const group = capabilityGroups[active];

  return (
    <section id="capabilities" className="scene" ref={root}>
      <SectionHead index="03" label="CAPABILITIES" note="STACK" />
      <h2 className="t-display cap-heading">
        <span className="line-mask"><span>SYSTEM</span></span>
        <span className="line-mask"><span className="t-faint">CAPABILITIES.</span></span>
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
              <span className="cap-tab-count">{String(g.items.length).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div className="cap-panel cap-reveal" role="tabpanel">
          <div className="cap-swap" ref={swap} key={group.slug}>
            <p className="cap-panel-head t-mono">
              <span className="cap-selected">SELECTED / </span>
              <span className="cap-command">{`$ stack --${group.slug}`}</span>
            </p>
            <div className="cap-chips">
              {group.items.map((term) => (
                <span className="cap-chip t-mono" key={term}>
                  {brandIcons[term] ? <BrandIcon src={brandIcons[term]} size={14} /> : null}
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
