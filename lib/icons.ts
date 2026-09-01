/**
 * Term → bundled monochrome brand mark (24×24 SVG, filled #ededed).
 *
 * Brandfetch's Logo API needs a client ID and forbids keyless hotlinking,
 * so the marks are bundled locally — zero runtime dependency, and the
 * monochrome set matches the Daytonesque palette. AWS requested removal
 * from public icon sets, so it intentionally has no mark and renders as
 * a label only.
 */
export const brandIcons: Record<string, string> = {
  TypeScript: "/icons/typescript.svg",
  Python: "/icons/python.svg",
  Go: "/icons/go.svg",
  "Next.js": "/icons/nextdotjs.svg",
  React: "/icons/react.svg",
  FastAPI: "/icons/fastapi.svg",
  Supabase: "/icons/supabase.svg",
  PostgreSQL: "/icons/postgresql.svg",
  Docker: "/icons/docker.svg",
  Terraform: "/icons/terraform.svg",
  Kubernetes: "/icons/kubernetes.svg",
};
