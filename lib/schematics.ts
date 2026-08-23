/**
 * A schematic per project: what the system actually does, as nodes and the
 * connections between them.
 *
 * This is the piece that makes the scrolling legible. The renders are
 * atmosphere; these say what is being built, and their strokes are drawn by
 * scroll position — so moving the page visibly walks the pipeline from its
 * first stage to its last instead of only nudging a picture around.
 *
 * Geometry is authored in a 400 x 96 viewBox. Nodes sit on the centre line at
 * SPINE_Y and the spine is generated between consecutive ones; `extra` carries
 * whatever the topology needs beyond a straight line, and `dots` marks the
 * loose ends those paths run to.
 */

export const SPINE_Y = 40;
/** Branch lanes bow out to these, clear of the labels underneath. */
const HI = 16;
const LO = 64;

export type SchematicNode = {
  x: number;
  label: string;
  /** The stage that carries the work — one per diagram, drawn in blue. */
  accent?: boolean;
  /** A store is a stack, a step is a square, a sink is a ring. */
  kind?: "store" | "step" | "sink";
};

export type SchematicPath = {
  d: string;
  /** Dashed paths are the exceptional route: a retry, a fallback. */
  dashed?: boolean;
};

export type Schematic = {
  nodes: SchematicNode[];
  extra?: SchematicPath[];
  /** Loose ends — the open mouths of branches. */
  dots?: { x: number; y: number }[];
  /** One line, under the diagram, naming what the flow is. */
  caption: string;
};

export const schematics: Record<string, Schematic> = {
  /* Three ways in, one record out. */
  caroot: {
    nodes: [
      { x: 40, label: "INTAKE", kind: "store" },
      { x: 150, label: "NORMALISE" },
      { x: 262, label: "MODEL", accent: true },
      { x: 364, label: "RECORD", kind: "sink" },
    ],
    extra: [
      { d: `M24 ${HI} H104 C132 ${HI} 122 ${SPINE_Y} 143 ${SPINE_Y}` },
      { d: `M24 ${LO} H104 C132 ${LO} 122 ${SPINE_Y} 143 ${SPINE_Y}` },
    ],
    dots: [
      { x: 24, y: HI },
      { x: 24, y: LO },
    ],
    caption: "Barcode, label and photo intake resolved to one nutrition record.",
  },

  /* Folding runs dispatched in parallel, reconciled before release. */
  protein: {
    nodes: [
      { x: 40, label: "SEQUENCE", kind: "store" },
      { x: 158, label: "PREDICT", accent: true },
      { x: 268, label: "VALIDATE" },
      { x: 364, label: "STRUCTURE", kind: "sink" },
    ],
    extra: [
      { d: `M62 ${SPINE_Y} C108 ${SPINE_Y} 104 ${HI} 158 ${HI} C214 ${HI} 210 ${SPINE_Y} 246 ${SPINE_Y}` },
      { d: `M62 ${SPINE_Y} C108 ${SPINE_Y} 104 ${LO} 158 ${LO} C214 ${LO} 210 ${SPINE_Y} 246 ${SPINE_Y}` },
    ],
    caption: "Folding runs dispatched in parallel and reconciled before release.",
  },

  /* One core, many surfaces — the point of a composable platform. */
  commerce: {
    nodes: [
      { x: 40, label: "CATALOG", kind: "store" },
      { x: 158, label: "SERVICES", accent: true },
      { x: 262, label: "EDGE" },
      { x: 364, label: "STOREFRONT", kind: "sink" },
    ],
    extra: [
      { d: `M276 ${SPINE_Y} C320 ${SPINE_Y} 316 ${HI} 356 ${HI}` },
      { d: `M276 ${SPINE_Y} C320 ${SPINE_Y} 316 ${LO} 356 ${LO}` },
    ],
    dots: [
      { x: 360, y: HI },
      { x: 360, y: LO },
    ],
    caption: "A single commerce core rendered by any number of front ends.",
  },

  /* The only diagram with a cycle: failure is a first-class path. */
  workflow: {
    nodes: [
      { x: 40, label: "SCHEDULE", kind: "store" },
      { x: 158, label: "EXECUTE", accent: true },
      { x: 268, label: "OBSERVE" },
      { x: 364, label: "REPORT", kind: "sink" },
    ],
    extra: [
      {
        d: `M268 ${SPINE_Y + 8} C268 ${LO} 250 ${LO} 213 ${LO} C176 ${LO} 158 ${LO} 158 ${SPINE_Y + 8}`,
        dashed: true,
      },
    ],
    caption: "Jobs are watched while they run, and failures re-enter the queue.",
  },
};
