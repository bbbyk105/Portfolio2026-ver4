import type Lenis from "lenis";

/**
 * The single Lenis instance, shared so the menu can freeze the page behind it
 * without prop-drilling a ref through the tree.
 */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const lockScroll = () => instance?.stop();
export const unlockScroll = () => instance?.start();
export const scrollToTarget = (target: string) =>
  instance?.scrollTo(target, { duration: 1.1 });
