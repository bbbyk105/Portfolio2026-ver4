import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Atom,
  Barcode,
  Box,
  Camera,
  ChartColumn,
  Clock,
  Dna,
  FileCheck,
  Globe,
  LayoutGrid,
  Layers,
  Monitor,
  Play,
  ScanLine,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Store,
  Tag,
} from "lucide-react";

/**
 * A schematic per project: what the system does, as stages on a rail.
 *
 * Each figure is four stages — a rounded tile with a line icon — joined by
 * hairline rails, plus whatever the topology needs beyond a straight line:
 * sources merging in, lanes running in parallel, a fan out to many surfaces,
 * a retry path back. The animation (Schematic.tsx) tells the same thing as
 * motion: packets ride the rails, and a stage lights while it works on what
 * arrived. `story` scripts that — beats of hops that run together.
 *
 * Geometry is authored in a 400 × 112 viewBox. Every rail starts and ends
 * exactly on a tile's edge, and every bend is a symmetric S — handles mirror
 * around the midpoint — so the lines read as engineered, not drawn.
 *
 * Icons are Lucide's; swap any `icon` for another component to change a
 * stage's glyph.
 */

export const VIEW = { w: 400, h: 112 } as const;
/** The rail's centre line. */
export const Y = 46;
/** A stage tile's side, and the side of a fanned stage's small tiles. */
export const TILE = 32;
export const MINI = 18;
/** A fanned stage stacks its small tiles this far apart. */
export const FAN_STEP = 24;
/** Labels sit on this baseline. */
export const LABEL_Y = 100;

const HALF = TILE / 2;
/** Parallel lanes run this far above and below the rail. */
const LANE = 16;

export type Stage = {
  x: number;
  label: string;
  icon: LucideIcon;
  /** Rendered as a column of small tiles: one stage served by many surfaces. */
  fan?: LucideIcon[];
};

export type Rail = {
  d: string;
  /** The exceptional route — a retry. Dashed, and never drawn on. */
  dashed?: boolean;
};

/** One packet's journey: along a rail (or none, for a stage simply ticking) to a stage. */
export type Hop = { rail?: number; to: number; back?: boolean };
/** Hops that run at the same time. */
export type Beat = Hop[];

/** A loose end feeding the first stage, with its own small glyph. */
export type Source = { x: number; y: number; icon: LucideIcon };

export type Schematic = {
  stages: Stage[];
  rails: Rail[];
  story: Beat[];
  sources?: Source[];
  /** One line, under the figure, naming what the flow is. */
  caption: string;
};

/** A straight rail between two tiles, edge to edge. */
const run = (a: number, b: number): Rail => ({
  d: `M${a + HALF} ${Y} H${b - HALF}`,
});

/** Leaves tile `a`, bows out to `y`, runs level, and rejoins at tile `b`. */
const lane = (a: number, b: number, y: number): Rail => {
  const x0 = a + HALF;
  const x1 = b - HALF;
  const bend = 32;
  return {
    d:
      `M${x0} ${Y} C${x0 + bend / 2} ${Y} ${x0 + bend / 2} ${y} ${x0 + bend} ${y} ` +
      `H${x1 - bend} C${x1 - bend / 2} ${y} ${x1 - bend / 2} ${Y} ${x1} ${Y}`,
  };
};

/** Leaves the rail at `x0`, bends to `y`, and runs level to `x1`. */
const fan = (x0: number, x1: number, y: number): Rail => {
  const bend = 40;
  return {
    d: `M${x0} ${Y} C${x0 + bend / 2} ${Y} ${x0 + bend / 2} ${y} ${x0 + bend} ${y} H${x1}`,
  };
};

/** A source at `y` merging into the first tile's left edge. */
const merge = (x0: number, x1: number, y: number): Rail => ({
  d: y === Y ? `M${x0} ${Y} H${x1}` : `M${x0} ${y} C${(x0 + x1) / 2} ${y} ${(x0 + x1) / 2} ${Y} ${x1} ${Y}`,
});

export const schematics: Record<string, Schematic> = {
  /* Three ways in, one record out: barcode, label and photo merge into
     intake, then the record is one straight line. */
  caroot: {
    stages: [
      { x: 60, label: "INTAKE", icon: ScanLine },
      { x: 160, label: "NORMALISE", icon: SlidersHorizontal },
      { x: 260, label: "MODEL", icon: Sparkles },
      { x: 360, label: "RECORD", icon: FileCheck },
    ],
    sources: [
      { x: 8, y: Y - 20, icon: Barcode },
      { x: 8, y: Y, icon: Tag },
      { x: 8, y: Y + 20, icon: Camera },
    ],
    rails: [
      merge(18, 60 - HALF, Y - 20),
      merge(18, 60 - HALF, Y),
      merge(18, 60 - HALF, Y + 20),
      run(60, 160),
      run(160, 260),
      run(260, 360),
    ],
    story: [
      [
        { rail: 0, to: 0 },
        { rail: 1, to: 0 },
        { rail: 2, to: 0 },
      ],
      [{ rail: 3, to: 1 }],
      [{ rail: 4, to: 2 }],
      [{ rail: 5, to: 3 }],
    ],
    caption: "Barcode, label and photo intake resolved to one nutrition record.",
  },

  /* Folding runs dispatched in parallel — three lanes out of PREDICT — and
     reconciled at VALIDATE before release. */
  protein: {
    stages: [
      { x: 40, label: "SEQUENCE", icon: Dna },
      { x: 146, label: "PREDICT", icon: Box },
      { x: 254, label: "VALIDATE", icon: ShieldCheck },
      { x: 360, label: "STRUCTURE", icon: Atom },
    ],
    rails: [
      run(40, 146),
      lane(146, 254, Y - LANE),
      run(146, 254),
      lane(146, 254, Y + LANE),
      run(254, 360),
    ],
    story: [
      [{ to: 0 }],
      [{ rail: 0, to: 1 }],
      [
        { rail: 1, to: 2 },
        { rail: 2, to: 2 },
        { rail: 3, to: 2 },
      ],
      [{ rail: 4, to: 3 }],
    ],
    caption: "Folding runs dispatched in parallel and reconciled before release.",
  },

  /* One core, many surfaces: the edge fans out to a column of front ends. */
  commerce: {
    stages: [
      { x: 40, label: "CATALOG", icon: LayoutGrid },
      { x: 146, label: "SERVICES", icon: Layers },
      { x: 254, label: "EDGE", icon: Globe },
      { x: 360, label: "STOREFRONT", icon: Store, fan: [Monitor, Smartphone, Store] },
    ],
    rails: [
      run(40, 146),
      run(146, 254),
      fan(254 + HALF, 360 - MINI / 2, Y - FAN_STEP),
      { d: `M${254 + HALF} ${Y} H${360 - MINI / 2}` },
      fan(254 + HALF, 360 - MINI / 2, Y + FAN_STEP),
    ],
    story: [
      [{ to: 0 }],
      [{ rail: 0, to: 1 }],
      [{ rail: 1, to: 2 }],
      [
        { rail: 2, to: 3 },
        { rail: 3, to: 3 },
        { rail: 4, to: 3 },
      ],
    ],
    caption: "A single commerce core rendered by any number of front ends.",
  },

  /* The only figure with a cycle: what OBSERVE catches goes back to EXECUTE
     on the dashed path, while the rest carries on to the report. */
  workflow: {
    stages: [
      { x: 40, label: "SCHEDULE", icon: Clock },
      { x: 146, label: "EXECUTE", icon: Play },
      { x: 254, label: "OBSERVE", icon: Activity },
      { x: 360, label: "REPORT", icon: ChartColumn },
    ],
    rails: [
      run(40, 146),
      run(146, 254),
      run(254, 360),
      {
        d: `M254 ${Y + HALF} C254 ${Y + 28} 248 ${Y + 36} 236 ${Y + 36} H164 C152 ${Y + 36} 146 ${Y + 28} 146 ${Y + HALF}`,
        dashed: true,
      },
    ],
    story: [
      [{ to: 0 }],
      [{ rail: 0, to: 1 }],
      [{ rail: 1, to: 2 }],
      [
        { rail: 2, to: 3 },
        { rail: 3, to: 1, back: true },
      ],
    ],
    caption: "Jobs are watched while they run, and failures re-enter the queue.",
  },
};
