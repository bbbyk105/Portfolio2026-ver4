import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageChrome from "@/components/PageChrome";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import WorkPlate from "@/components/WorkPlate";
import BrandIcon from "@/components/BrandIcon";
import SiteFooter from "@/components/SiteFooter";
import { brandIcons } from "@/lib/icons";
import { works, getWork } from "@/lib/works";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: `${work.name} — Works — Byakko Kondo`,
    description: work.statement,
    openGraph: { title: `${work.name} — Byakko Kondo`, description: work.statement },
  };
}

/**
 * One case study: the spec sheet first — client, sector, role, year, stack,
 * the live URL — then the site itself at desktop and phone size, then the
 * brief, what was built, and the stack. Closes with the next entry in the
 * register so the reader keeps moving.
 */
export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const at = works.indexOf(work);
  const next = works[(at + 1) % works.length];
  const host = new URL(work.url).host;

  return (
    <>
      <PageChrome />
      <main className="doc">
        <section className="scene page-intro work-hero">
          <Reveal>
            <p className="t-mono work-kicker soft-in">
              <span>
                <Link href="/works">WORKS</Link>
                {`  /  ${work.index} — ${work.sector.toUpperCase()}`}
              </span>
              <span>{work.year}</span>
            </p>
            <h1 className="t-display work-title">
              {work.title.map((line) => (
                <span className="line-mask" key={line}>
                  <span>{line}</span>
                </span>
              ))}
            </h1>
            <p className="t-body work-statement soft-in">{work.statement}</p>

            <dl className="spec t-mono soft-in">
              <div>
                <dt>CLIENT</dt>
                <dd>{work.client}</dd>
              </div>
              <div>
                <dt>SECTOR</dt>
                <dd>
                  {work.sector}
                  {work.place ? ` · ${work.place}` : ""}
                </dd>
              </div>
              <div>
                <dt>ROLE</dt>
                <dd>{work.role}</dd>
              </div>
              <div>
                <dt>YEAR</dt>
                <dd>{work.year}</dd>
              </div>
              <div>
                <dt>STACK</dt>
                <dd>{work.stack.join(" / ")}</dd>
              </div>
              <div>
                <dt>LIVE</dt>
                <dd>
                  <a href={work.url} target="_blank" rel="noreferrer" className="spec-link">
                    {host} <span aria-hidden="true">↗</span>
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </section>

        <section className="scene work-plates" aria-label="Screens">
          <Reveal className="work-plates-grid">
            <div className="soft-in">
              <WorkPlate work={work} priority />
            </div>
            <div className="soft-in">
              <WorkPlate work={work} kind="mobile" />
            </div>
          </Reveal>
        </section>

        <section className="scene work-body">
          <Reveal className="work-section">
            <SectionHead index="01" label="BRIEF" />
            <div className="brief">
              {work.brief.map((p) => (
                <p className="t-body soft-in" key={p}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="work-section">
            <SectionHead index="02" label="BUILT" />
            <ol className="built t-body">
              {work.built.map((item, i) => (
                <li key={item} className="soft-in">
                  <span className="built-n t-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="work-section">
            <SectionHead index="03" label="STACK" />
            <div className="cap-chips">
              {work.stack.map((term) => (
                <span className="cap-chip t-mono soft-in" key={term}>
                  {brandIcons[term] ? <BrandIcon src={brandIcons[term]} size={14} /> : null}
                  {term}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="scene work-next" aria-label="Next">
          <Reveal>
            <Link href={`/works/${next.slug}`} className="next-link soft-in">
              <span className="t-mono next-label">NEXT — {next.index}</span>
              <span className="t-display next-name">{next.name}</span>
              <span className="t-mono next-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link href="/works" className="t-mono all-link soft-in">
              ALL WORKS
            </Link>
          </Reveal>
        </section>

        <footer className="scene site-foot">
          <SiteFooter />
        </footer>
      </main>
    </>
  );
}
