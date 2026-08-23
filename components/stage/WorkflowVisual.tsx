import Visual from "./Visual";
import { Layer } from "./layers";

export default function WorkflowVisual() {
  return (
    <Layer
      id="workflow"
      pointer={{ "--px": "5px", "--py": "5px" } as React.CSSProperties}
    >
      <Visual
        name="workflow-diagram"
        width={1536}
        height={1024}
        className="v-workflow"
      />
    </Layer>
  );
}
