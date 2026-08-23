"use client";

import { useEffect, useRef } from "react";
import { nav } from "@/lib/content";
import { gsap, ScrollTrigger, EASE } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

/**
 * Hairline navigation set in `mix-blend-mode: difference` so it inverts
 * against whatever passes underneath instead of sitting on its own bar.
 */
export default function GlobalNav() {
  const root = useRef<HTMLElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // The role line is only useful while the hero is on screen.
      gsap.to(".nav-role", {
        opacity: 0,
        ease: EASE.glide,
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=60%",
          scrub: 1,
        },
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <header className="nav" ref={root}>
      <div className="nav-mark t-mono">
        <span>BYAKKO KONDO</span>
        <span className="nav-role block" style={{ color: "var(--dim)" }}>
          ENGINEER / CREATIVE DEVELOPER
        </span>
      </div>
      <nav className="nav-links t-mono" aria-label="Primary">
        {nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
