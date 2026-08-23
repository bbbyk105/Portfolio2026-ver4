import Visual from "./Visual";
import { Layer } from "./layers";

/**
 * The same architectural object as the hero, shown as three offset modules.
 * Reusing the object is deliberate: the commerce platform reads as the
 * hero geometry taken apart rather than a new picture.
 */
export default function CommerceVisual() {
  return (
    <Layer
      id="commerce"
      place={{
        justifyItems: "end",
        alignItems: "end",
        paddingRight: "clamp(1rem, 6vw, 7rem)",
        paddingBottom: "clamp(2rem, 10vh, 8rem)",
      }}
      pointer={{ "--px": "6px", "--py": "6px" } as React.CSSProperties}
    >
      <div className="module-stack">
        <div className="module module-c">
          <Visual
            name="hero-object"
            width={1448}
            height={1086}
            className="v-commerce"
          />
        </div>
        <div className="module module-b">
          <Visual
            name="hero-object"
            width={1448}
            height={1086}
            className="v-commerce"
          />
        </div>
        <div className="module module-a">
          <Visual
            name="hero-object"
            width={1448}
            height={1086}
            className="v-commerce"
          />
        </div>
      </div>
    </Layer>
  );
}
