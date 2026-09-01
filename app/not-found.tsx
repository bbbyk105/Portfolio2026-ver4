import type { Metadata } from "next";
import Link from "next/link";
import PageChrome from "@/components/PageChrome";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import CodeWindow from "@/components/CodeWindow";
import SiteFooter from "@/components/SiteFooter";
import type { Snippet } from "@/lib/content";

export const metadata: Metadata = {
  title: "404 — Byakko Kondo",
  description: "No route is registered at this address.",
};

/** The request that failed, told the way every other figure on the site is. */
const trace: Snippet = {
  label: "TypeScript",
  filename: "not-found.ts",
  lines: [
    "const route = resolve(request.path)",
    "",
    "// nothing is registered at this path",
    "if (!route) return notFound() // 404",
  ],
};

/**
 * The 404. Same document furniture as every other page — chrome, a ruled
 * section header, the two-line headline with its faint second line — with
 * the failed lookup typed out beside it, so the dead end still reads as
 * part of the system rather than a browser error.
 */
export default function NotFound() {
  return (
    <>
      <PageChrome />
      <main className="doc">
        <section className="scene page-intro nf-scene">
          <SectionHead index="404" label="NOT FOUND" note="NO ROUTE MATCHED" />

          <div className="nf-grid">
            <Reveal>
              <h1 className="t-display page-title nf-title">
                <span className="line-mask">
                  <span>PAGE NOT</span>
                </span>
                <span className="line-mask">
                  <span className="t-faint">FOUND.</span>
                </span>
              </h1>
              <p className="t-body page-lede soft-in">
                Nothing is registered at this address. It was renamed, moved,
                or never shipped in the first place. Everything that is live is
                one link away.
              </p>
              <div className="nf-actions soft-in">
                <Link href="/" className="btn btn--primary t-mono">
                  BACK HOME
                </Link>
                <Link href="/works" className="btn btn--ghost t-mono">
                  SEE THE WORK <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>

            <Reveal className="nf-figure">
              <CodeWindow tabs={[trace]} className="soft-in" typeDelay={0.3} />
            </Reveal>
          </div>
        </section>

        <footer className="scene site-foot">
          <SiteFooter />
        </footer>
      </main>
    </>
  );
}
