type Props = {
  src: string;
  /** Decorative by default — the term label always sits beside the icon. */
  alt?: string;
  size?: number;
  className?: string;
};

/**
 * A bundled monochrome brand mark. Plain <img>: the files are tiny local
 * SVGs, so next/image would add a wrapper and an optimisation round-trip
 * for nothing.
 */
export default function BrandIcon({ src, alt = "", size = 16, className }: Props) {
  return (
    // Local SVG asset; the wrapper next/image inserts is not wanted here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : "true"}
      width={size}
      height={size}
      className={className}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
