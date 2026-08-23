/**
 * Every string on the page. Copy carried over from the current site so the
 * redesign changes art direction, not content.
 */

export type Project = {
  id: "caroot" | "protein" | "commerce" | "workflow";
  /** Display title, split into the lines it is typeset on. */
  title: string[];
  /** Two or three micro-labels shown above the title. */
  meta: string[];
  year: string;
  statement: string;
  /** Short technical notes set as a hairline list beside the statement. */
  notes: string[];
};

export const projects: Project[] = [
  {
    id: "caroot",
    title: ["CaRoot"],
    meta: ["AI HEALTH SYSTEM", "DATA PIPELINES"],
    year: "2026",
    statement:
      "Scalable data pipelines and processing infrastructure for biological research platforms.",
    notes: ["Ingest", "Reasoning", "Delivery"],
  },
  {
    id: "protein",
    title: ["PROTEIN", "STRUCTURE", "AUTOMATION"],
    meta: ["RESEARCH AUTOMATION", "STRUCTURAL BIOLOGY"],
    year: "2026",
    statement:
      "Automated protein structure prediction workflows with intelligent orchestration.",
    notes: ["Prediction", "Orchestration", "Validation"],
  },
  {
    id: "commerce",
    title: ["CLIENT", "COMMERCE", "PLATFORM"],
    meta: ["PLATFORM ENGINEERING", "COMPOSABLE SYSTEMS"],
    year: "2025",
    statement:
      "Composable commerce platform built for scale, flexibility, and developer velocity.",
    notes: ["Storefront", "Services", "Edge"],
  },
  {
    id: "workflow",
    title: ["WORKFLOW", "SYSTEMS"],
    meta: ["INTERNAL SYSTEMS", "INFRASTRUCTURE"],
    year: "2025",
    statement:
      "Operational infrastructure for monitoring, scheduling, and managing distributed jobs.",
    notes: ["Schedule", "Observe", "Recover"],
  },
];

export const hero = {
  lines: ["BUILD", "DIGITAL", "SYSTEMS."],
  name: "BYAKKO KONDO",
  role: "ENGINEER / CREATIVE DEVELOPER",
  intro:
    "I design and build scalable digital systems at the intersection of infrastructure, intelligence, and experience.",
};

export const about = {
  statement: ["I ARCHITECT", "SYSTEMS THAT", "TURN COMPLEXITY", "INTO CLARITY."],
  identity: ["BYAKKO KONDO", "ENGINEER / CREATIVE DEVELOPER", "TOKYO, JAPAN"],
  paragraphs: [
    "I architect and build systems that turn complexity into clarity. My work spans infrastructure, developer tooling, and AI-driven automation.",
    "I care about performance, precision, and the details that make systems reliable and usable.",
  ],
};

/**
 * Capabilities are placed spatially rather than tabulated — the `column`
 * value is only a hint for where a term settles in the field.
 */
export const capabilities: { label: string; column: 0 | 1 | 2 | 3 }[] = [
  { label: "TypeScript", column: 0 },
  { label: "Python", column: 0 },
  { label: "Go", column: 0 },
  { label: "Next.js", column: 1 },
  { label: "React", column: 1 },
  { label: "FastAPI", column: 1 },
  { label: "Supabase", column: 2 },
  { label: "PostgreSQL", column: 2 },
  { label: "Docker", column: 2 },
  { label: "AWS", column: 3 },
  { label: "Terraform", column: 3 },
  { label: "Kubernetes", column: 3 },
];

export const contact = {
  lines: ["LET'S", "BUILD", "SOMETHING."],
  email: "hello@byakko.dev",
  links: [
    { label: "GITHUB", href: "https://github.com/bbbyk105" },
    { label: "X", href: "https://x.com/" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/" },
  ],
};

export const nav = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];
