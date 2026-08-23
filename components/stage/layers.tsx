import type { CSSProperties, ReactNode } from "react";

type LayerProps = {
  id: string;
  children: ReactNode;
  /** Where the visual settles inside the viewport-sized stage. */
  place?: CSSProperties;
  /** Pointer-parallax amplitude for this layer. */
  pointer?: CSSProperties;
};

/**
 * A single stage layer. Three nested nodes on purpose:
 *   .layer          — placement + opacity, owned by the scene handoffs
 *   .layer-pointer  — pointer parallax, owned by CSS variables
 *   .layer-motion   — scroll transforms, owned by GSAP
 * Splitting the writers keeps them from clobbering one matrix.
 */
export function Layer({ id, children, place, pointer }: LayerProps) {
  return (
    <div className="layer" data-layer={id} style={place}>
      <div className="layer-pointer" style={pointer}>
        <div className="layer-motion">{children}</div>
      </div>
    </div>
  );
}
