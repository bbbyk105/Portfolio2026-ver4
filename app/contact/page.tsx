import type { Metadata } from "next";
import PageChrome from "@/components/PageChrome";
import SectionHead from "@/components/SectionHead";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";
import LocalizedText from "@/components/LocalizedText";

export const metadata: Metadata = {
  title: "Contact — Byakko Kondo",
  description: "Contact Byakko Kondo about product development, web engineering and digital projects.",
};

export default function ContactPage() {
  return (
    <>
      <PageChrome />
      <main className="doc">
        <section className="scene page-intro">
          <SectionHead index="01" label="CONTACT" note="PROJECTS / COLLABORATION / ENQUIRIES" />
          <h1 className="t-display page-title"><span className="line-mask"><span>LET&apos;S BUILD</span></span><span className="line-mask"><span className="t-faint">SOMETHING.</span></span></h1>
          <p className="t-body page-lede"><LocalizedText en="Tell me what you are working on, what you need, and where the project currently stands. I will reply by email." ja="取り組んでいること、必要としていること、現在のプロジェクト状況をお聞かせください。メールでご返信します。" /></p>
        </section>

        <section className="scene work-body">
          <div className="work-section">
            <SectionHead index="02" label="ENQUIRY" />
            <ContactForm />
          </div>
          <div className="work-section">
            <SectionHead index="03" label="DIRECT" />
            <div className="brief"><p className="t-body"><LocalizedText en="Prefer email? " ja="メールで直接ご連絡いただく場合はこちら。" /><a className="spec-link" href="mailto:byakkokondo@gmail.com">byakkokondo@gmail.com ↗</a></p></div>
          </div>
        </section>
        <footer className="scene site-foot"><SiteFooter /></footer>
      </main>
    </>
  );
}
