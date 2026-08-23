import Visual from "./Visual";
import { Layer } from "./layers";

/**
 * The routing graphic, held far back behind the capabilities field. It is the
 * only visual after the work sequence, and it stays a background: low opacity,
 * slow drift, no blur. The About statement is left clean on purpose — the
 * workflow diagram is still defocusing out behind it there, and a second
 * graphic under type that large only muddies it.
 */
export default function CapabilitiesVisual() {
  return (
    <Layer
      id="capabilities"
      pointer={{ "--px": "4px", "--py": "4px" } as React.CSSProperties}
    >
      <Visual
        name="workflow-routing"
        width={1448}
        height={1086}
        className="v-about"
      />
    </Layer>
  );
}
