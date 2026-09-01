/**
 * Every string on the page. Copy carried over from the current site so the
 * redesign changes art direction, not content.
 */

export type Snippet = {
  /** Tab label (also the language name). */
  label: string;
  filename: string;
  /** One entry per rendered line; keep them short — the window never wraps. */
  lines: string[];
};

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
  /** Wide cards span both columns of the work grid. */
  wide?: boolean;
  /** The snippet the card's code window runs. */
  code: Snippet;
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
    wide: true,
    code: {
      label: "Python",
      filename: "pipeline.py",
      lines: [
        "from caroot import Pipeline",
        "",
        'pipe = Pipeline(sources=["barcode", "label", "photo"])',
        "record = pipe.normalise().model().record()",
        "pipe.deliver(record)",
      ],
    },
  },
  {
    id: "protein",
    title: ["PROTEIN", "STRUCTURE", "AUTOMATION"],
    meta: ["RESEARCH AUTOMATION", "STRUCTURAL BIOLOGY"],
    year: "2026",
    statement:
      "Automated protein structure prediction workflows with intelligent orchestration.",
    notes: ["Prediction", "Orchestration", "Validation"],
    code: {
      label: "Python",
      filename: "fold.py",
      lines: [
        "from byakko import fold",
        "",
        'job = fold.predict(sequence, model="v3")',
        "job.validate()",
        "fold.publish(job.structure)",
      ],
    },
  },
  {
    id: "commerce",
    title: ["CLIENT", "COMMERCE", "PLATFORM"],
    meta: ["PLATFORM ENGINEERING", "COMPOSABLE SYSTEMS"],
    year: "2025",
    statement:
      "Composable commerce platform built for scale, flexibility, and developer velocity.",
    notes: ["Storefront", "Services", "Edge"],
    code: {
      label: "TypeScript",
      filename: "storefront.ts",
      lines: [
        'import { compose } from "@byakko/commerce";',
        "",
        "export const storefront = compose({",
        '  services: ["catalog", "cart", "checkout"],',
        "  edge: true,",
        "});",
      ],
    },
  },
  {
    id: "workflow",
    title: ["WORKFLOW", "SYSTEMS"],
    meta: ["INTERNAL SYSTEMS", "INFRASTRUCTURE"],
    year: "2025",
    statement:
      "Operational infrastructure for monitoring, scheduling, and managing distributed jobs.",
    notes: ["Schedule", "Observe", "Recover"],
    wide: true,
    code: {
      label: "Go",
      filename: "scheduler.go",
      lines: [
        "sched := workflow.NewScheduler()",
        "",
        "sched.Every(schedule.Minute, jobs.Observe)",
        "sched.On(jobs.Failed, jobs.Recover)",
        "sched.Run()",
      ],
    },
  },
];

export const hero = {
  eyebrow: "BYAKKO KONDO — ENGINEER / CREATIVE DEVELOPER",
  /** Two-line headline; the last line is set faint, Daytona's gray second act. */
  lines: ["BUILD DIGITAL", "SYSTEMS."],
  intro:
    "I design and build scalable digital systems at the intersection of infrastructure, intelligence, and experience.",
  ctas: [
    { label: "VIEW WORK", href: "#work" },
    { label: "GET IN TOUCH", href: "#contact" },
  ],
  /** The hero code window's language tabs — Daytona's hero signature. */
  tabs: [
    {
      label: "TypeScript",
      filename: "system.ts",
      lines: [
        'import { System } from "@byakko/core";',
        "",
        'const system = new System({ base: "Tokyo", year: 2026 });',
        "await system.design();",
        'await system.build(["infra", "intelligence", "experience"]);',
        "system.ship();",
      ],
    },
    {
      label: "Python",
      filename: "system.py",
      lines: [
        "from byakko import System",
        "",
        'system = System(base="Tokyo", year=2026)',
        "system.design()",
        'system.build(["infra", "intelligence", "experience"])',
        "system.ship()",
      ],
    },
    {
      label: "Go",
      filename: "system.go",
      lines: [
        "package main",
        "",
        "func main() {",
        '    s := byakko.NewSystem("Tokyo", 2026)',
        "    s.Design()",
        '    s.Build("infra", "intelligence", "experience")',
        "    s.Ship()",
        "}",
      ],
    },
  ] as Snippet[],
};

export const work = {
  headline: ["SELECTED SYSTEMS,", "2025—2026."],
};

export const marquee = {
  label: "STACK IN PRODUCTION",
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
 * The flat term list feeds the marquee; the grouped view feeds the
 * capabilities tabs. Keep the two in step — same terms in both.
 */
export const capabilities: string[] = [
  "TypeScript",
  "Python",
  "Go",
  "Next.js",
  "React",
  "FastAPI",
  "Supabase",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Terraform",
  "Kubernetes",
];

export type CapabilityGroup = {
  label: string;
  /** Lowercase single word — the panel shows it as `$ stack --<slug>`. */
  slug: string;
  items: string[];
};

export const capabilityGroups: CapabilityGroup[] = [
  { label: "LANGUAGES", slug: "languages", items: ["TypeScript", "Python", "Go"] },
  { label: "FRAMEWORKS", slug: "frameworks", items: ["Next.js", "React", "FastAPI"] },
  { label: "PLATFORM", slug: "platform", items: ["Supabase", "PostgreSQL", "Docker"] },
  {
    label: "INFRASTRUCTURE",
    slug: "infra",
    items: ["AWS", "Terraform", "Kubernetes"],
  },
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

/** Site navigation. Home sections carry the leading slash so they resolve
    from every page; on the home page itself they still scroll smoothly. */
export const nav = [
  { label: "WORK", href: "/works" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
];
