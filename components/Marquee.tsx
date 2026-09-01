import { capabilities, marquee } from "@/lib/content";
import { brandIcons } from "@/lib/icons";
import BrandIcon from "@/components/BrandIcon";

/**
 * Daytona's logo strip: a small centred label over an endless ticker of
 * brand marks. Two identical halves make the -50% loop seamless. Pure CSS —
 * no JS, and it stands still under reduced motion. Decorative, so hidden
 * from assistive tech; the same terms are read out for real in the
 * capabilities section.
 */
export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <p className="marquee-label t-mono">{marquee.label}</p>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((half) => (
            <div className="marquee-half" key={half}>
              {capabilities.map((term) => (
                <span className="marquee-item t-mono" key={term}>
                  {brandIcons[term] ? (
                    <BrandIcon src={brandIcons[term]} size={15} />
                  ) : null}
                  {term}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
