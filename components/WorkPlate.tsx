import Image from "next/image";
import type { Work } from "@/lib/works";

/**
 * A capture of the live site in a window on the dot grid — the code
 * window's sibling: dots, the host name, then the screen. The mobile plate
 * is the same at phone proportions. Without a capture the plate carries the
 * name in display type instead of an empty screen.
 */
export default function WorkPlate({
  work,
  kind = "desktop",
  priority = false,
  sizes,
}: {
  work: Work;
  kind?: "desktop" | "mobile";
  priority?: boolean;
  sizes?: string;
}) {
  const host = new URL(work.url).host;
  const src = work.screens?.[kind];

  return (
    <div className={`plate plate--${kind}`}>
      {kind === "desktop" ? (
        <div className="plate-chrome t-mono" aria-hidden="true">
          <span className="code-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="plate-url">{host}</span>
        </div>
      ) : null}
      <div className="plate-screen">
        {src ? (
          <Image
            src={src}
            alt={`${work.name} — ${kind} view of ${host}`}
            fill
            sizes={
              sizes ??
              (kind === "desktop"
                ? "(max-width: 899px) 92vw, 60vw"
                : "(max-width: 899px) 60vw, 22vw")
            }
            priority={priority}
            className="plate-img"
          />
        ) : (
          <div className="plate-blank">
            <span className="t-display plate-mark">{work.name}</span>
            <span className="t-mono">{host}</span>
          </div>
        )}
      </div>
    </div>
  );
}
