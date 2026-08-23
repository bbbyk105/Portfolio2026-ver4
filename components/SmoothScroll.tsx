"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { setLenis } from "@/lib/lenisRef";

/**
 * Drives the page with Lenis and hands every frame to GSAP's ticker, so
 * smoothing and ScrollTrigger read from the same clock. Without this the
 * scrubbed timelines sit a frame behind the scroll position and judder.
 *
 * The smoothing is deliberately light. A long duration here reads as the page
 * refusing to move, which is the opposite of what smoothing is for.
 *
 * Disabled entirely under `prefers-reduced-motion`.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.14,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      smoothWheel: true,
    });
    setLenis(lenis);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links have to go through Lenis or they fight the smoothing.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.1 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
