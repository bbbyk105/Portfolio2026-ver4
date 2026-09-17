import NavAnchor from "@/components/NavAnchor";
import { contact } from "@/lib/content";

const links = [
  { href: "/#hero", label: "HOME", index: "01" },
  { href: "/works", label: "WORKS", index: "02" },
  { href: "/about", label: "ABOUT", index: "03" },
  { href: "/contact", label: "CONTACT", index: "04" },
];

export default function SiteFooter() {
  return (
    <>
      <div className="footer-head">
        <p className="footer-eyebrow t-mono">NAVIGATION / CONTACT</p>
        <p className="footer-statement t-display">LET&apos;S MAKE<br /><span className="t-faint">SOMETHING GOOD.</span></p>
      </div>

      <div className="footer-grid t-mono">
        <nav className="footer-nav" aria-label="Footer navigation">
          {links.map((item) => (
            <NavAnchor key={item.href} href={item.href} className="footer-nav-link">
              <span className="footer-nav-index">{item.index}</span>
              <span className="footer-nav-label">{item.label}</span>
              <span className="footer-nav-arrow" aria-hidden="true">↗</span>
            </NavAnchor>
          ))}
        </nav>

        <div className="footer-contact">
          <p className="footer-title">GET IN TOUCH</p>
          <a className="footer-mail" href={`mailto:${contact.email}`}>{contact.email}</a>
          <div className="footer-meta">
            <span>TOKYO, JAPAN</span>
            <span>AVAILABLE FOR PROJECTS</span>
          </div>
        </div>
      </div>

      <div className="footer-base t-mono">
        <span>© 2026 BYAKKO KONDO</span>
        <a href="#top" aria-label="Back to top">BACK TO TOP ↑</a>
      </div>
    </>
  );
}
