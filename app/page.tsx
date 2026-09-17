import Link from "next/link";
import PageChrome from "@/components/PageChrome";
import ScrollProgress from "@/components/ScrollProgress";
import Marquee from "@/components/Marquee";
import HeroScene from "@/components/scenes/HeroScene";
import WorkIntro from "@/components/scenes/WorkIntro";
import ProjectScene from "@/components/scenes/ProjectScene";
import AboutScene from "@/components/scenes/AboutScene";
import CapabilitiesScene from "@/components/scenes/CapabilitiesScene";
import ContactScene from "@/components/scenes/ContactScene";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/content";

export default function Page() {
  return (
    <>
      <PageChrome />
      <ScrollProgress />

      <main className="doc">
        <HeroScene />
        <Marquee />

        <div id="work" className="scene work">
          <WorkIntro />
          <div className="work-grid">
            {projects.map((project, i) => (
              <ProjectScene key={project.id} project={project} index={i} />
            ))}
          </div>

          <Reveal>
            <Link href="/works" className="next-link work-all soft-in">
              <span className="t-mono next-label">FIVE PRODUCTS IN PRODUCTION</span>
              <span className="t-display next-name">ALL WORKS</span>
              <span className="t-mono next-arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>

        <AboutScene />
        <CapabilitiesScene />
        <ContactScene />
      </main>
    </>
  );
}
