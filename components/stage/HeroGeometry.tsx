import Visual from "./Visual";
import { Layer } from "./layers";

export default function HeroGeometry() {
  return (
    <Layer
      id="hero"
      pointer={
        {
          "--px": "10px",
          "--py": "10px",
          "--rx": "2deg",
          "--ry": "3deg",
        } as React.CSSProperties
      }
    >
      <Visual
        name="hero-object"
        width={1448}
        height={1086}
        className="v-hero"
        priority
      />
    </Layer>
  );
}
