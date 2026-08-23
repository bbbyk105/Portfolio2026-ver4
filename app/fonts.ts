/**
 * Typeface definitions for the whole site — the single place fonts are declared.
 *
 * The screenshot baseline uses a tight neo-grotesque for display and a
 * technical monospace for every label / meta line. Nothing else is added.
 * Swapping a face here propagates everywhere through the CSS variables.
 */
import { Inter, JetBrains_Mono } from "next/font/google";

export const display = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});
