import NavAnchor from "@/components/NavAnchor";
import { contact, nav } from "@/lib/content";

/** The sitemap / contact grid the site closes with, and the base line. */
export default function SiteFooter() {
  return (
    <>
      <div className="footer-grid t-mono">
        <div className="footer-col">
          <p className="footer-title">SITEMAP</p>
          <NavAnchor href="/#hero">HOME</NavAnchor>
          {nav.map((item) => (
            <NavAnchor key={item.href} href={item.href}>
              {item.label}
            </NavAnchor>
          ))}
        </div>
        <div className="footer-col">
          <p className="footer-title">CONTACT</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <p>TOKYO, JAPAN</p>
        </div>
      </div>

      <div className="footer-base t-mono">
        <span>© 2026 BYAKKO KONDO</span>
        <span>TOKYO, JAPAN</span>
      </div>
    </>
  );
}
