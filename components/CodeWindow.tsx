"use client";

import { useRef, useState } from "react";
import type { Snippet } from "@/lib/content";
import { tokenize } from "@/lib/highlight";
import { brandIcons } from "@/lib/icons";
import { gsap, ScrollTrigger, MQ } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { resetTyped, typeLines } from "@/lib/typing";
import BrandIcon from "./BrandIcon";

/**
 * Daytona's core unit: the bordered code window. A tab row (only when more
 * than one snippet is supplied), a chrome bar with dots and the filename,
 * then the numbered, token-coloured source.
 *
 * Motion: the source types itself in the first time the window scrolls into
 * view — a caret walking each line, then blinking on the last — and again,
 * at once, whenever a tab is switched. `typeDelay` lets a parent hold the
 * first pass until its own entrance has landed. The tokens are in the DOM
 * throughout; see lib/typing.ts for how the reveal works without touching
 * the text.
 *
 * Switching tabs remounts the body (keyed on the filename), and the CSS
 * `code-in` animation replays — a short rise-and-settle under the typing.
 */
export default function CodeWindow({
  tabs,
  className,
  typeDelay = 0,
}: {
  tabs: Snippet[];
  className?: string;
  /** Seconds to hold the first typing pass once the window is in view. */
  typeDelay?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  /* The first pass waits for the window to scroll in; later passes (tab
     switches) are a response to a click and start immediately. */
  const played = useRef(false);
  const snippet = tabs[active];

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const lines = Array.from(el.querySelectorAll(".code-line"));
      resetTyped(lines);

      const tl = gsap.timeline({ paused: true });
      typeLines(tl, lines);

      if (played.current) {
        tl.play();
        return;
      }
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          played.current = true;
          gsap.delayedCall(typeDelay, () => tl.play());
        },
      });
    });

    return () => mm.revert();
  }, [snippet, typeDelay]);

  return (
    <div className={`code-window${className ? ` ${className}` : ""}`} ref={root}>
      {tabs.length > 1 ? (
        <div className="code-tabs" role="tablist" aria-label="Language">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`code-tab t-mono${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              {brandIcons[tab.label] ? (
                <BrandIcon src={brandIcons[tab.label]} size={12} />
              ) : null}
              {tab.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="code-chrome">
        <span className="code-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="code-file t-mono">{snippet.filename}</span>
      </div>

      <pre className="code-body code-anim" key={snippet.filename}>
        <code>
          {snippet.lines.map((line, i) => {
            const tokens = tokenize(line);
            return (
              <span className="code-line typed" key={i}>
                <span className="code-ln" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="code-src typed-src">
                  {tokens.length > 0
                    ? tokens.map((tok, j) =>
                        tok.cls ? (
                          <span key={j} className={`tok-${tok.cls}`}>
                            {tok.text}
                          </span>
                        ) : (
                          tok.text
                        ),
                      )
                    : " "}
                </span>
                <span className="code-caret typed-caret" aria-hidden="true" />
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
