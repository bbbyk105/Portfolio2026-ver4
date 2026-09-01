/**
 * Typeface definitions for the whole site — the single place fonts are declared.
 *
 * Daytona's pairing: Geist for display, IBM Plex Mono for every label / meta
 * line and body copy. Nothing else is added. Swapping a face here propagates
 * everywhere through the CSS variables.
 */
import { Geist, IBM_Plex_Mono } from "next/font/google";

export const display = Geist({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});
