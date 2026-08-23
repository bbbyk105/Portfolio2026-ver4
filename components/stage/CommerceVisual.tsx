import Visual from "./Visual";
import { Layer } from "./layers";

/**
 * The modular structure, split into its two halves by clip-path rather than
 * by two different files. Both halves are the same image at the same size,
 * so when they sit at x: 0 they compose the original exactly — which is what
 * lets the modules pull apart and lock back together under scroll without a
 * seam.
 */
export default function CommerceVisual() {
  return (
    <Layer
      id="commerce"
      place={{
        justifyItems: "end",
        alignItems: "end",
        paddingRight: "clamp(1rem, 5vw, 6rem)",
        paddingBottom: "clamp(2rem, 10vh, 8rem)",
      }}
      pointer={{ "--px": "6px", "--py": "6px" } as React.CSSProperties}
    >
      <div className="module-stack">
        {/* right cluster */}
        <div className="module module-b">
          <Visual
            name="commerce-modules"
            width={1448}
            height={1086}
            className="v-commerce"
            style={{ clipPath: "inset(0 0 0 34%)" }}
          />
        </div>
        {/* left block */}
        <div className="module module-a">
          <Visual
            name="commerce-modules"
            width={1448}
            height={1086}
            className="v-commerce"
            style={{ clipPath: "inset(0 66% 0 0)" }}
          />
        </div>
      </div>
    </Layer>
  );
}
