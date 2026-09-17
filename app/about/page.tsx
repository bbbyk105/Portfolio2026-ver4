import type { Metadata } from "next";
import Link from "next/link";
import PageChrome from "@/components/PageChrome";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About — Byakko Kondo",
  description: "About Byakko Kondo — engineer and creative developer working across product development, web, research software and automation.",
};

const timeline = [
  { year: "UNIVERSITY", title: "GAKUSHUIN UNIVERSITY / OKADA LAB", body: "Studied life science and worked on software for protein-structure analysis, comparing structures through inter-carbon distances and automating structural-data retrieval and processing from sources including UniProt and PDB." },
  { year: "EARLY CAREER", title: "LETTERFAN / DRUMROLL", body: "Gained practical development experience through internships at Letterfan and Drumroll before moving into independent client work." },
  { year: "2025—", title: "FREELANCE ENGINEER", body: "Designing and building production websites, commerce experiences, automation workflows and digital systems for clients. Work spans requirements, information architecture, UI/UX, frontend and backend implementation, deployment and ongoing operation." },
  { year: "2026—", title: "PRODUCT DEVELOPMENT", body: "Building CaRoot, a personal calorie and nutrition management product, from planning and UI/UX through mobile development, backend systems, AI features, data design and release operations." },
  { year: "2026.08—", title: "NPO PROUD / DIRECTOR", body: "Supporting IT and web initiatives as a director, including website development and a monitoring-service project for older adults, with responsibility spanning product and project coordination." },
];

export default function AboutPage() {
  return (
    <>
      <PageChrome />
      <main className="doc">
        <section className="scene page-intro">
          <SectionHead index="01" label="ABOUT" note="BYAKKO KONDO — TOKYO, JAPAN" />
          <Reveal>
            <h1 className="t-display page-title">
              <span className="line-mask"><span>ENGINEER,</span></span>
              <span className="line-mask"><span className="t-faint">DESIGNER, BUILDER.</span></span>
            </h1>
            <p className="t-body page-lede soft-in">I work across product development, web engineering, research software and workflow automation — taking ideas from requirements and structure through design, implementation and operation.</p>
          </Reveal>
        </section>

        <section className="scene work-body">
          <Reveal className="work-section">
            <SectionHead index="02" label="PROFILE" />
            <div className="brief">
              <p className="t-body soft-in">My background began in life science at Gakushuin University. In the Okada Lab, I worked on protein-structure analysis using inter-carbon distances and developed software to automate parts of the structural-data workflow.</p>
              <p className="t-body soft-in">After internships at Letterfan and Drumroll, I moved into freelance engineering. Today my work ranges from mobile products and corporate websites to commerce, backend integrations and automation. I prefer to stay involved across the full path from understanding the problem to shipping and maintaining the final system.</p>
              <p className="t-body soft-in">Alongside client work, I develop my own products including CaRoot. Since August 2026, I have also served as a director of NPO Proud, supporting its IT and web initiatives and helping coordinate development of a monitoring service for older adults.</p>
            </div>
          </Reveal>

          <Reveal className="work-section">
            <SectionHead index="03" label="JOURNEY" />
            <ol className="built t-body">
              {timeline.map((item, i) => (
                <li key={item.title} className="soft-in">
                  <span className="built-n t-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span><span className="t-mono">{item.year}</span><br /><strong>{item.title}</strong><br />{item.body}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="work-section">
            <SectionHead index="04" label="WHAT I DO" />
            <div className="brief">
              <p className="t-body soft-in">Product planning and information architecture. UI/UX and frontend engineering. Mobile application development. Backend and API integration. Research software and data pipelines. Workflow automation. Deployment, SEO and ongoing product operation.</p>
            </div>
          </Reveal>
        </section>

        <section className="scene work-next">
          <Reveal>
            <Link href="/works" className="next-link soft-in"><span className="t-mono next-label">SELECTED PROJECTS</span><span className="t-display next-name">VIEW WORK</span><span className="t-mono next-arrow">→</span></Link>
            <Link href="/contact" className="t-mono all-link soft-in">GET IN TOUCH →</Link>
          </Reveal>
        </section>
        <footer className="scene site-foot"><SiteFooter /></footer>
      </main>
    </>
  );
}
