import Visual from "./Visual";
import { Layer } from "./layers";

/**
 * The routing graphic plus two dimmer copies. On the way out the copies
 * drift apart and blur, so the flow appears to break into particles just as
 * the protein cloud converges on top of it.
 */
export default function CaRootVisual() {
  return (
    <Layer
      id="caroot"
      pointer={{ "--px": "8px", "--py": "6px" } as React.CSSProperties}
    >
      <div style={{ position: "relative" }}>
        <Visual
          name="caroot-flow"
          width={1536}
          height={1024}
          className="v-caroot caroot-main"
        />
        <div className="shard caroot-shard-a" aria-hidden>
          <Visual
            name="caroot-flow"
            width={1536}
            height={1024}
            className="v-caroot"
          />
        </div>
        <div className="shard caroot-shard-b" aria-hidden>
          <Visual
            name="caroot-flow"
            width={1536}
            height={1024}
            className="v-caroot"
          />
        </div>
      </div>
    </Layer>
  );
}
