import { gsap } from "@/lib/motion";

/**
 * Typewriter for text that is already on the page.
 *
 * Nothing is inserted a character at a time — the tokens are in the DOM with
 * their colours from the first paint. Each `.typed` line carries a `--n`
 * custom property meaning "characters revealed": `.typed-src` clips itself to
 * that many `ch` (exact for a monospace face) and `.typed-caret` sits at the
 * same x. Tweening `--n` with a stepped ease is the whole effect — one tween
 * per line, no per-character spans, and the text stays selectable and
 * readable by assistive tech throughout.
 *
 * The CSS default is `--n: 999` with the caret hidden, so a page without JS,
 * or under reduced motion, simply shows the finished text.
 */

/** Seconds per character. */
export const PER_CHAR = 0.016;

/** Blank lines and line ends are a beat of silence, in seconds. */
const BEAT = 0.16;

/** Every line back to untyped, carets hidden. Call before playing a pass. */
export function resetTyped(lines: Element[]) {
  gsap.set(lines, { "--n": 0 });
  const carets = lines
    .map((line) => line.querySelector(".typed-caret"))
    .filter((c): c is Element => c !== null);
  if (carets.length > 0) gsap.set(carets, { display: "none", opacity: 1 });
}

/**
 * Appends one pass over `lines` to `tl`: the caret lands on a line, the line
 * types out, the caret moves down. When every line is in, the caret stays on
 * the last one and blinks. Returns the time at which the typing itself ends,
 * so a caller can cue what follows without measuring past the endless blink.
 */
export function typeLines(
  tl: gsap.core.Timeline,
  lines: Element[],
  perChar: number = PER_CHAR,
): number {
  let prev: Element | null = null;

  lines.forEach((line) => {
    const src = line.querySelector(".typed-src");
    const caret = line.querySelector(".typed-caret");
    const n = (src?.textContent ?? "").trimEnd().length;

    if (prev) tl.set(prev, { display: "none" });
    if (caret) tl.set(caret, { display: "block" });
    if (n > 0) {
      tl.to(line, { "--n": n, duration: n * perChar, ease: `steps(${n})` });
    } else {
      tl.to({}, { duration: BEAT });
    }
    prev = caret ?? prev;
  });

  const end = tl.duration();

  if (prev) {
    tl.to(
      prev,
      { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" },
      end + BEAT,
    );
  }
  return end;
}
