import NavAnchor from "@/components/NavAnchor";
import LocalizedText from "@/components/LocalizedText";
import { contact } from "@/lib/content";

const links = [
  { href: "/works", en: "WORK", ja: "実績" },
  { href: "/about", en: "ABOUT", ja: "プロフィール" },
  { href: "/contact", en: "CONTACT", ja: "お問い合わせ" },
];

export default function SiteFooter() {
  return (
    <>
      <div className="footer-grid t-mono">
        <div className="footer-col">
          <p className="footer-title"><LocalizedText en="SITEMAP" ja="サイトマップ" /></p>
          <NavAnchor href="/#hero"><LocalizedText en="HOME" ja="ホーム" /></NavAnchor>
          {links.map((item) => <NavAnchor key={item.href} href={item.href}><LocalizedText en={item.en} ja={item.ja} /></NavAnchor>)}
        </div>
        <div className="footer-col">
          <p className="footer-title"><LocalizedText en="CONTACT" ja="お問い合わせ" /></p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <p><LocalizedText en="TOKYO, JAPAN" ja="東京、日本" /></p>
        </div>
      </div>
      <div className="footer-base t-mono"><span>© 2026 BYAKKO KONDO</span><span><LocalizedText en="TOKYO, JAPAN" ja="東京、日本" /></span></div>
    </>
  );
}
