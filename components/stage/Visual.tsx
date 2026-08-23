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
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  /** Stage renders are decoration; the portrait is content and needs a name. */
  alt?: string;
};

/**
 * Raw <img> rather than next/image: every one of these is driven by GSAP
 * transforms, filters and clip-paths, and the wrapper element next/image
 * inserts gets in the way of the stage's transform chain. Intrinsic
 * width/height are declared so the aspect ratio is reserved and nothing
 * shifts when the file lands.
 */
export default function Visual({
  name,
  width,
  height,
  smWidth = 760,
  className,
  style,
  priority = false,
  alt = "",
}: Props) {
  return (
    // next/image's wrapper element breaks the stage's transform chain, so the
    // LCP hint below does not apply here — see the note on this component.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/visuals/${name}.webp`}
      srcSet={`/visuals/${name}@sm.webp ${smWidth}w, /visuals/${name}.webp ${width}w`}
      sizes="(max-width: 899px) 80vw, 55vw"
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
