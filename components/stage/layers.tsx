import type { CSSProperties, ReactNode } from "react";

type LayerProps = {
  id: string;
  children: ReactNode;
  /** Pointer-parallax amplitude for this layer. */
  pointer?: CSSProperties;
};

/**
 * A single stage layer. Three nested nodes on purpose:
 *   .layer          — placement + opacity, owned by the scene handoffs
 *   .layer-pointer  — pointer parallax, owned by CSS variables
 *   .layer-motion   — scroll transforms, owned by GSAP
 * Splitting the writers keeps them from clobbering one matrix.
 *
 * Placement lives in CSS (`.layer--<id>`) rather than in an inline style so a
 * media query can move it. On a narrow screen the type and the visual share
 * one column instead of sitting side by side, and the visual has to get out
 * of the way — an inline style would win against that.
 */
export function Layer({ id, children, pointer }: LayerProps) {
  return (
    <div className={`layer layer--${id}`} data-layer={id}>
      <div className="layer-pointer" style={pointer}>
        <div className="layer-motion">{children}</div>
      </div>
    </div>
  );
}
