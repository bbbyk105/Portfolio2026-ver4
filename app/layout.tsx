import type { Metadata, Viewport } from "next";
import { display, mono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Byakko Kondo — Engineer / Creative Developer",
  description:
    "I design and build scalable digital systems at the intersection of infrastructure, intelligence, and experience.",
  openGraph: {
    title: "Byakko Kondo — Engineer / Creative Developer",
    description:
      "Scalable digital systems at the intersection of infrastructure, intelligence, and experience.",
    type: "website",
    locale: "en",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
