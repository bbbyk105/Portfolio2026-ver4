import { useEffect, useLayoutEffect } from "react";

/** `useLayoutEffect` that stays quiet during server rendering. */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
