type Props = {
  name:
    | "hero-object"
    | "caroot-flow"
    | "protein-cloud"
    | "commerce-modules"
    | "workflow-diagram"
    | "workflow-routing"
    | "portrait";
  width: number;
  height: number;
  /** Intrinsic width of the @sm variant; both candidates need honest
      descriptors or the browser picks between two identical claims. */
  smWidth?: number;
  /** Override when the rendered size differs from the default stage-era
      guess — a full-width card and a half-width card want different
      candidates. */
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  /** Decorative renders stay nameless; the portrait is content and needs one. */
  alt?: string;
};

/**
 * Raw <img> rather than next/image: every one of these sits inside a GSAP
 * transform chain (parallax on the media, reveals on the card), and the
 * wrapper element next/image inserts gets in the way of it. Intrinsic
 * width/height are declared so the aspect ratio is reserved and nothing
 * shifts when the file lands.
 */
export default function Visual({
  name,
  width,
  height,
  smWidth = 760,
  sizes = "(max-width: 899px) 92vw, 55vw",
  className,
  style,
  priority = false,
  alt = "",
}: Props) {
  return (
    // next/image's wrapper element breaks the transform chain, so the LCP
    // hint below does not apply here — see the note on this component.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/visuals/${name}.webp`}
      srcSet={`/visuals/${name}@sm.webp ${smWidth}w, /visuals/${name}.webp ${width}w`}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      aria-hidden={alt ? undefined : "true"}
      draggable={false}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
    />
  );
}
