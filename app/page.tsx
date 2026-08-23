import GlobalNav from "@/components/GlobalNav";
import VisualStage from "@/components/VisualStage";
import SmoothScroll from "@/components/SmoothScroll";
import PointerField from "@/components/PointerField";
import ScrollProgress from "@/components/ScrollProgress";
import HeroScene from "@/components/scenes/HeroScene";
import ProjectScene from "@/components/scenes/ProjectScene";
import AboutScene from "@/components/scenes/AboutScene";
import CapabilitiesScene from "@/components/scenes/CapabilitiesScene";
import ContactScene from "@/components/scenes/ContactScene";
import { projects } from "@/lib/content";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <PointerField />
      <GlobalNav />
      <ScrollProgress />

      {/* Fixed imagery for the whole hero → work sequence. */}
      <VisualStage />

      <main className="doc">
        <HeroScene />

        <div id="work">
          {projects.map((project) => (
            <ProjectScene key={project.id} project={project} />
          ))}
        </div>

        <AboutScene />
        <CapabilitiesScene />
        <ContactScene />
      </main>
    </>
  );
}
