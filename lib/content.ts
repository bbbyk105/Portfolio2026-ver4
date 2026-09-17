/**
 * Portfolio copy. Keep project descriptions grounded in work that was actually
 * built or researched; avoid placeholder technologies and invented claims.
 */

export type Snippet = {
  label: string;
  filename: string;
  lines: string[];
};

export type Project = {
  id: "caroot" | "protein" | "commerce" | "workflow";
  title: string[];
  meta: string[];
  year: string;
  statement: string;
  notes: string[];
  wide?: boolean;
  code: Snippet;
};

export const projects: Project[] = [
  {
    id: "caroot",
    title: ["CaRoot"],
    meta: ["CALORIE MANAGEMENT", "MOBILE APP"],
    year: "2026",
    statement:
      "A personal calorie and meal management app that uses AI to make everyday food logging easier.",
    notes: ["Food photo", "Barcode / label", "Nutrition"],
    wide: true,
    code: {
      label: "TypeScript",
      filename: "caroot.ts",
      lines: [
        'const meal = await analyseFood(photo);',
        "",
        "const nutrition = await estimateNutrition(meal);",
        "await saveMeal(nutrition);",
      ],
    },
  },
  {
    id: "protein",
    title: ["PROTEIN", "STRUCTURE", "ANALYSIS"],
    meta: ["UNIVERSITY RESEARCH", "STRUCTURAL BIOLOGY"],
    year: "2025—2026",
    statement:
      "University research development for comparing protein structures through inter-carbon distances, with automated retrieval and processing of structural data from UniProt and PDB.",
    notes: ["UniProt / PDB", "Cα distances", "Structure analysis"],
    code: {
      label: "Python",
      filename: "structure_analysis.py",
      lines: [
        "structures = fetch_pdb_structures(uniprot_id)",
        "",
        "coordinates = extract_ca_coordinates(structures)",
        "distances = pairwise_distances(coordinates)",
        "compare_structures(distances)",
      ],
    },
  },
  {
    id: "commerce",
    title: ["WEB /", "COMMERCE", "PROJECTS"],
    meta: ["CLIENT WORK", "WEB DEVELOPMENT"],
    year: "2025—2026",
    statement:
      "Web and commerce development for client projects, from information architecture and frontend implementation to CMS and checkout integration.",
    notes: ["Next.js", "microCMS", "Stripe"],
    code: {
      label: "TypeScript",
      filename: "web.ts",
      lines: [
        'const content = await cms.getList({ endpoint: "products" });',
        "",
        "export const products = content.contents;",
      ],
    },
  },
  {
    id: "workflow",
    title: ["AUTOMATION", "SYSTEMS"],
    meta: ["WORKFLOW AUTOMATION", "API INTEGRATION"],
    year: "2025—2026",
    statement:
      "Automation work connecting APIs and data-processing steps for research and operational workflows.",
    notes: ["Python", "FastAPI", "n8n"],
    wide: true,
    code: {
      label: "Python",
      filename: "pipeline.py",
      lines: [
        "data = fetch_source(identifier)",
        "",
        "result = process(data)",
        "return result",
      ],
    },
  },
];

export const hero = {
  eyebrow: "BYAKKO KONDO — ENGINEER / CREATIVE DEVELOPER",
  lines: ["BUILD DIGITAL", "SYSTEMS."],
  intro:
    "I design and build digital products, web experiences, and automation systems from research prototypes to production services.",
  ctas: [
    { label: "VIEW WORK", href: "#work" },
    { label: "GET IN TOUCH", href: "#contact" },
  ],
  tabs: [
    {
      label: "TypeScript",
      filename: "product.ts",
      lines: [
        'import { build } from "./product";',
        "",
        'const product = build({ base: "Tokyo", year: 2026 });',
        "await product.design();",
        "await product.ship();",
      ],
    },
    {
      label: "Python",
      filename: "research.py",
      lines: [
        "structures = fetch_structures(uniprot_id)",
        "",
        "distances = analyse(structures)",
        "export_results(distances)",
      ],
    },
  ] as Snippet[],
};

export const work = {
  headline: ["SELECTED WORK,", "2025—2026."],
};

export const marquee = {
  label: "TOOLS & TECHNOLOGIES",
};

export const about = {
  statement: ["I BUILD", "PRODUCTS FROM", "IDEA TO", "IMPLEMENTATION."],
  identity: ["BYAKKO KONDO", "ENGINEER / CREATIVE DEVELOPER", "TOKYO, JAPAN"],
  paragraphs: [
    "My work spans mobile apps, web development, research software, and workflow automation. I studied life science at Gakushuin University, where I developed software for protein structure analysis.",
    "Today I work across personal product development and client projects, focusing on practical systems that are clear, reliable, and usable.",
  ],
};

export const capabilities: string[] = [
  "TypeScript",
  "Python",
  "Next.js",
  "React",
  "React Native",
  "Expo",
  "FastAPI",
  "Supabase",
  "PostgreSQL",
  "Docker",
  "microCMS",
  "n8n",
];

export type CapabilityGroup = {
  label: string;
  slug: string;
  items: string[];
};

export const capabilityGroups: CapabilityGroup[] = [
  { label: "LANGUAGES", slug: "languages", items: ["TypeScript", "Python"] },
  { label: "WEB", slug: "web", items: ["Next.js", "React", "microCMS"] },
  { label: "MOBILE", slug: "mobile", items: ["React Native", "Expo", "Supabase"] },
  { label: "BACKEND / AUTOMATION", slug: "backend", items: ["FastAPI", "PostgreSQL", "Docker", "n8n"] },
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
  { label: "WORK", href: "/works" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
];
