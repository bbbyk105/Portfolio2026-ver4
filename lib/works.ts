/**
 * Shipped work — products and sites in production, one entry per case study.
 *
 * Copy is written from the live sites and the project repositories. Years
 * are the year the current site went live; edit here if a client's record
 * says otherwise. `screens` are captures of the live site (public/works);
 * an entry without them renders a typographic plate instead.
 */
export type Work = {
  slug: string;
  /** Register index, W.01 onwards. */
  index: string;
  name: string;
  /** Display title, split into the lines it is typeset on. */
  title: string[];
  client: string;
  sector: string;
  place?: string;
  role: string;
  year: string;
  url: string;
  /** One line under the title: what it is, for whom. */
  statement: string;
  /** The brief, in two or three short paragraphs. */
  brief: string[];
  /** What was built, one item per line. */
  built: string[];
  stack: string[];
  screens?: { desktop: string; mobile: string };
};

export const works: Work[] = [
  {
    slug: "caroot",
    index: "W.01",
    name: "CaRoot",
    title: ["CaRoot"],
    client: "CaRoot — own product",
    sector: "Consumer app / Nutrition",
    place: "iOS & Android",
    role: "Product, design, engineering",
    year: "2026",
    url: "https://www.caroot.app",
    statement:
      "A calm nutrition tracker: photograph a meal, get calories and PFC, and get on with your day.",
    brief: [
      "CaRoot is a food-logging app built around one idea — the record should be quiet. A photo is enough: the app identifies the dish and estimates calories, protein, fat and carbohydrate. No streak guilt, no confetti, no feed. The numbers remain.",
      "It is local-first. Every log is written to the device before anything else, and synced once you sign in, so it works on the train and in the basement gym. Barcodes resolve against Open Food Facts; the food database starts from Japan's standard tables — around 2,500 items — and grows with what users add.",
      "The marketing site is a separate Next.js build, kept to the same register: one headline, the screens, a waitlist.",
    ],
    built: [
      "iOS and Android app in Expo + React Native, local-first store with Supabase sync",
      "AI photo recognition: dish → estimate → editable record",
      "Barcode scanning against Open Food Facts",
      "Weight and hydration tracking, weekly reports, streaks with freeze days",
      "Reminders that stop the moment a meal is logged",
      "Japanese / English, metric / imperial",
      "Marketing site in Next.js with GSAP and Lenis, waitlist capture",
    ],
    stack: ["Expo", "React Native", "TypeScript", "Supabase", "Next.js", "GSAP"],
    screens: { desktop: "/works/caroot.webp", mobile: "/works/caroot-mobile.webp" },
  },
  {
    slug: "hakuho",
    index: "W.02",
    name: "Hakuho",
    title: ["HAKUHO"],
    client: "Hakuho Inc. — 株式会社白萌",
    sector: "Manufacturing / Precision machining",
    place: "Shimizu, Shizuoka",
    role: "Architecture, design, build, copy",
    year: "2026",
    url: "https://www.hakuhofactory.com",
    statement:
      "A precision-machining company's site rebuilt to answer one question: can they make my part?",
    brief: [
      "Hakuho machines precision parts in Shizuoka — lathe, machining centre, wire EDM — from one-off prototypes to repeat lots: over 24,000 parts a year for more than 200 clients. The previous site introduced the company. This one lets a procurement engineer decide.",
      "Services, capabilities (materials, sizes, lots, tolerances, secondary processes), equipment, quality assurance and case studies are structured as data rather than prose, and the primary action on every page is a quote request with the drawing attached — PDF, DXF, DWG, STEP or IGES.",
      "The hero is a technical drawing, because that is what the customer has in hand.",
    ],
    built: [
      "Information architecture built around the quote decision",
      "Drawing-upload quote form (PDF / DXF / DWG / STEP / IGES) delivered through Resend",
      "Capability tables: materials, sizes, lots, tolerances, secondary processes",
      "Case studies, equipment and QA sections generated from structured data",
      "Motion with GSAP and Lenis, kept to the blueprint hero",
      "Jest test suite; canonical URLs and sitemap on the new domain",
    ],
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Resend", "Jest"],
    screens: { desktop: "/works/hakuho.webp", mobile: "/works/hakuho-mobile.webp" },
  },
  {
    slug: "goodwill-legal",
    index: "W.03",
    name: "Goodwill Legal",
    title: ["GOODWILL", "LEGAL"],
    client: "行政書士グッドウィル法務事務所",
    sector: "Professional services / Legal",
    place: "Sapporo, Hokkaido",
    role: "Design, build, CMS, forms",
    year: "2026",
    url: "https://goodwill-legal.jp",
    statement:
      "A Sapporo legal office's site, written so that someone worried about an inheritance can take the first step.",
    brief: [
      "Goodwill is a licensed administrative scrivener and SME consultant in Sapporo's Shiroishi ward: wills, inheritance and estate division, and subsidy applications for small businesses. The people arriving are usually anxious, so the site is quiet and specific — what the free first hour covers, the five steps that follow, the fee structure up front.",
      "Articles are written as serialised columns, so the CMS carries a reading order separate from the publish date. The contact form runs as a Server Action: one email to the office with the attachments, one automatic receipt to the sender.",
    ],
    built: [
      "Service pages for wills, inheritance and subsidy support",
      "microCMS column with a reading-order field for serialised articles",
      "Server Action contact form with attachments, office notification and auto-reply via Resend",
      "Consultation flow, access map and office profile",
      "Editorial typography: serif display, hairline rules, a single accent",
    ],
    stack: ["Next.js", "React", "TypeScript", "microCMS", "Resend", "GSAP"],
    screens: { desktop: "/works/goodwill.webp", mobile: "/works/goodwill-mobile.webp" },
  },
  {
    slug: "jurakuen",
    index: "W.04",
    name: "Jurakuen",
    title: ["JURAKUEN"],
    client: "聚楽苑 — Jurakuen",
    sector: "Commerce / Organic tea",
    place: "Fuji, Shizuoka",
    role: "Design, build, checkout, i18n, SEO",
    year: "2025",
    url: "https://www.jurakuen.com",
    statement:
      "An organic tea garden at the foot of Mt Fuji — the first JAS-certified in the city — selling direct, in two languages.",
    brief: [
      "Jurakuen has grown tea for a century and was the first garden in Fuji City to earn organic JAS certification: no pesticides, no chemical fertiliser, volcanic soil and spring water. The site is photographic and unhurried, with the product — sencha, hōjicha, matcha — always in frame.",
      "Checkout is Stripe. The catalogue and every page exist in Japanese and English through next-intl, and search was treated as structure: canonical URLs per locale, product and breadcrumb JSON-LD, cart and checkout pages kept out of the index, and a sitemap generated from the product data.",
    ],
    built: [
      "Storefront with cart and Stripe checkout",
      "Japanese / English with next-intl, canonical URLs per locale",
      "Product pages with Product and BreadcrumbList JSON-LD",
      "Organic JAS certification and producer story pages",
      "Instagram feed, FAQ, contact by email",
      "Sitemap generated from product data; cart flow set noindex",
    ],
    stack: ["Next.js", "React", "TypeScript", "Stripe", "next-intl", "Framer Motion"],
    screens: { desktop: "/works/jurakuen.webp", mobile: "/works/jurakuen-mobile.webp" },
  },
  {
    slug: "dmc-fuji",
    index: "W.05",
    name: "DMC Fuji",
    title: ["DMC", "FUJI"],
    client: "DMC LLC — DMC FUJI",
    sector: "Studio / Kimono photography",
    place: "Fuji, Shizuoka",
    role: "Design, build, gallery, i18n",
    year: "2025",
    url: "https://www.dmc123.jp",
    statement:
      "A kimono studio under Mt Fuji: the robe, the shoot, and the room it happens in — read in Japanese or English.",
    brief: [
      "DMC Fuji dresses visitors in ceremonial kimono and photographs them against Mt Fuji and the tea fields — coming-of-age, shichi-go-san, bridal, anniversaries. Three things are sold at once: the wardrobe and the shoot as the Hanayume plan, Chloe as a studio for hire, and matcha in the antique café in the same building. The site had to make all three legible without reading as three sites.",
      "The gallery is served from Supabase Storage, the blog and page copy are managed in microCMS, every page runs in Japanese and English through next-intl, and enquiries go out by email. Booking hands over to the studio's existing reservation system.",
    ],
    built: [
      "Service pages for the Hanayume plan, the Chloe rental studio and the café",
      "Photo gallery served from Supabase Storage",
      "Blog and page copy managed in microCMS",
      "Japanese / English with next-intl",
      "Booking flow, access and FAQ; enquiries by email",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "microCMS", "next-intl"],
    screens: { desktop: "/works/dmc-fuji.webp", mobile: "/works/dmc-fuji-mobile.webp" },
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
