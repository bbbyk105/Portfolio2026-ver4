import type { Metadata } from "next";
import Link from "next/link";
import PageChrome from "@/components/PageChrome";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import WorkPlate from "@/components/WorkPlate";
import SiteFooter from "@/components/SiteFooter";
import { works } from "@/lib/works";

export const metadata: Metadata = {
  title: "Works — Byakko Kondo",
  description:
    "Five products in production: a nutrition app, a precision-machining company, a legal office, an organic tea store and a kimono studio — designed and built end to end.",
};

/**
 * The register of shipped work. Each row is one product in production:
 * its index, name and sector, the one-line statement, and a capture of the
 * live site in a window. The whole row is the link to its case study.
 */
export default function WorksPage() {
  return (
    <>
      <PageChrome />
      <main className="doc">
        <section className="scene page-intro">
          <SectionHead index="05" label="WORKS" note="FIVE PRODUCTS IN PRODUCTION" />
          <Reveal>
            <h1 className="t-display page-title">
              <span className="line-mask">
                <span>SHIPPED,</span>
              </span>
              <span className="line-mask">
                <span className="t-faint">AND LIVE.</span>
              </span>
            </h1>
            <p className="t-body page-lede soft-in">
              Products and sites I designed and built end to end, from the
              information architecture to the deploy — each one live, each one
              in use. Open a case study for what was built and how.
            </p>
          </Reveal>
        </section>

        <section className="scene ledger-scene" aria-label="Works">
          <ol className="ledger">
            {works.map((work, i) => (
              <li key={work.slug} className="ledger-row">
                <Reveal>
                  <Link href={`/works/${work.slug}`} className="ledger-link">
                    <div className="ledger-meta">
                      <p className="t-mono ledger-kicker soft-in">
                        <span>{work.index}</span>
                      </p>
                      <h2 className="t-display ledger-name">
                        <span className="line-mask">
                          <span>{work.name}</span>
                        </span>
                      </h2>
                      <p className="t-mono ledger-tags soft-in">
                        {work.sector} — {work.year}
                      </p>
                      <p className="t-body ledger-statement soft-in">{work.statement}</p>
                      <span className="t-mono ledger-cta soft-in">
                        CASE STUDY <span aria-hidden="true">→</span>
                      </span>
                    </div>
                    <div className="ledger-plate soft-in">
                      <WorkPlate work={work} priority={i < 2} />
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <footer className="scene site-foot">
          <SiteFooter />
        </footer>
      </main>
    </>
  );
}
