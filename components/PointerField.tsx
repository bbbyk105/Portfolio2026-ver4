"use client";

import { useEffect } from "react";

/**
 * Publishes a single, eased pointer position as `--pointer-x` / `--pointer-y`
 * (both -1 → 1) on the document element.
 *
 * One listener and one rAF loop for the whole site: the visuals read the
 * variables straight from CSS, so pointer parallax costs zero React renders
 * and zero per-element JavaScript.
 */
export default function PointerField() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    const root = document.documentElement;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let idle = true;

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
      if (idle) {
        idle = false;
        frame = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      // Critically damped enough that the visuals never overshoot.
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      root.style.setProperty("--pointer-x", x.toFixed(4));
      root.style.setProperty("--pointer-y", y.toFixed(4));

      if (Math.abs(targetX - x) < 0.0008 && Math.abs(targetY - y) < 0.0008) {
        idle = true; // park the loop until the pointer moves again
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
    };
  }, []);

  return null;
}
