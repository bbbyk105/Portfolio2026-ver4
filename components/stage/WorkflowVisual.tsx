import Visual from "./Visual";
import { Layer } from "./layers";

export default function WorkflowVisual() {
  return (
    <Layer
      id="workflow"
      place={{
        justifyItems: "center",
        alignItems: "start",
        paddingTop: "clamp(3rem, 12vh, 9rem)",
        paddingRight: "clamp(0rem, 4vw, 4rem)",
      }}
      pointer={{ "--px": "5px", "--py": "5px" } as React.CSSProperties}
    >
      <Visual
        name="workflow-routing"
        width={1448}
        height={1086}
        className="v-workflow"
      />
    </Layer>
  );
}
