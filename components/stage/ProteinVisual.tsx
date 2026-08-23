import Visual from "./Visual";
import { Layer } from "./layers";

export default function ProteinVisual() {
  return (
    <Layer
      id="protein"
      pointer={
        { "--px": "7px", "--py": "7px", "--ry": "1.6deg" } as React.CSSProperties
      }
    >
      <Visual
        name="protein-cloud"
        width={1448}
        height={1086}
        className="v-protein"
      />
    </Layer>
  );
}
