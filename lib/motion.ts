import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  // registerPlugin is idempotent, so a second module evaluation is harmless.
  // MotionPath carries the schematics' packets along their rails.
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  // Mobile browsers resize the viewport as the URL bar collapses; refreshing
  // every ScrollTrigger on that is what makes pinned scenes jump.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, MotionPathPlugin };

/**
 * One easing vocabulary for the whole site. Nothing uses a raw CSS
 * `transition: all` — every curve comes from here.
 *
 *  glide  — scrubbed scroll motion settling into place
 *  enter  — an element arriving from off-stage
 *  swap   — a scene handing over to the next one
 */
export const EASE = {
  glide: "power2.out",
  enter: "expo.out",
  swap: "power3.inOut",
} as const;

export const DUR = {
  reveal: 1.1,
  swap: 0.8,
  micro: 0.45,
} as const;

/** Media queries shared by every `gsap.matchMedia()` call. */
export const MQ = {
  desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

/**
 * Scrubbed scroll timeline. `scrub: 1` gives the whole site the same slight
 * inertia so scenes feel driven by a camera rather than snapped to the wheel.
 */
export const scrub = (
  trigger: Element | string,
  start: string,
  end: string,
): ScrollTrigger.Vars => ({
  trigger,
  start,
  end,
  scrub: 1,
});
