# Portfolio 2026 — v4

Byakko Kondo — Engineer / Creative Developer.

A single continuous scroll experience rather than a stack of sections. The
page is black, white and one electric blue; the imagery is a set of
transparent renders that are treated as a motion system, not as pictures
dropped into a layout.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
npm run lint
```

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · GSAP
ScrollTrigger · Lenis.

## How it is built

### The stage

`components/VisualStage.tsx` is the spine. It is one fixed, viewport-sized
surface holding all five project visuals. The document scrolls underneath
it — the imagery never scrolls, it is transformed.

Each handoff **overlaps** the one before it: the outgoing visual is still on
screen, scaling and defocusing past the camera, while the next one is
already resolving out of it. That overlap is what makes the visuals read as
one object being reshaped instead of five pictures being swapped.

- hero → CaRoot: the object pushes past the lens while the routing graphic
  resolves out of the same centre, drawn in with a `clip-path` wipe
- CaRoot → Protein: the flow breaks into diverging copies as the particle
  cloud converges over it
- Protein → Commerce: the cloud collapses and the hero object reassembles as
  three offset modules
- Commerce → Workflow: the modules separate for good and the routing diagram
  draws in from the left

Every layer is three nested nodes, so the two things that write transforms
never fight over one matrix:

```
.layer          placement + opacity   → scene handoffs
.layer-pointer  pointer parallax      → CSS variables
.layer-motion   scroll transforms     → GSAP
```

### Scroll

`SmoothScroll` runs Lenis on GSAP's ticker so smoothing and ScrollTrigger
read from the same clock — without that the scrubbed timelines sit a frame
behind the scroll position and judder.

Every timeline is built inside a single `gsap.matchMedia()` per component,
which gives desktop, mobile and reduced-motion their own version and tears
all of them down with one `revert()`.

Eases live in `lib/motion.ts` (`glide` / `enter` / `swap`) and nothing uses a
`transition: all`.

### Pointer

`PointerField` publishes one eased pointer position as `--pointer-x` /
`--pointer-y` on the document element. The visuals read those straight from
CSS, so the parallax costs zero React renders and no per-element JavaScript,
and the rAF loop parks itself when the pointer stops. Fine pointers only.

### Type

Two faces, declared once in `app/fonts.ts`: a tight neo-grotesque for
display, a technical monospace for every label. The hero wordmark is
typeset **twice**, on two fixed planes either side of the stage — `position:
sticky` always opens a stacking context, which would trap all three lines on
one z-plane and put the architectural object beside the type instead of
inside it. Each plane hides the lines belonging to the other.

### Reduced motion

`prefers-reduced-motion: reduce` drops Lenis, the pointer field and every
scrub. Scene heights collapse to one viewport and the visuals crossfade with
their scene, so the page is a finished static composition at every stop
rather than an animation that has been switched off.

## Performance notes

Measured with a scripted scroll over the production build (software
rasterisation, no GPU — real hardware composites these considerably faster):

| | median frame | p90 |
|---|---|---|
| hero, projects, about, contact | 16.7 ms | 16.7–33 ms |
| transition windows | 33 ms | 50 ms |

`filter: blur()` is by far the most expensive thing on the page. It was
measured at ~17 ms/frame on the hero object alone, so the hero push carries
no blur at all (scale and opacity stay on the compositor) and every
remaining radius was roughly halved. The CaRoot dissolve uses divergence and
opacity instead of blurring three large layers at once.

Visual assets are WebP with a 760 px variant for `srcset`, ~1 MB total for
four full-size renders. They are plain `<img>` rather than `next/image`: the
wrapper element `next/image` inserts breaks the stage's transform chain.
Intrinsic `width`/`height` are declared so nothing shifts on load.

## Structure

```
app/            layout, fonts, global tokens and scene CSS
components/
  VisualStage   the fixed stage and every scroll handoff
  SmoothScroll  Lenis ↔ GSAP ticker
  PointerField  the shared pointer variables
  GlobalNav     hairline nav, mix-blend-mode: difference
  stage/        one component per visual layer
  scenes/       hero, projects, about, capabilities, contact
lib/
  content.ts    every string on the page
  motion.ts     GSAP registration, eases, media queries
public/visuals  the transparent renders
```
