"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * A site link that knows where it is. Home-section links are written as
 * "/#about" so they resolve from every route; on the home page itself they
 * become plain "#about" anchors, which is what Lenis smooth-scrolls (a
 * client-side push to the same path would jump instead). Everything else is
 * a normal <Link>.
 */
export default function NavAnchor({
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const pathname = usePathname();
  if (href.startsWith("/#") && pathname === "/") {
    return <a href={href.slice(1)} {...props} />;
  }
  return <Link href={href} {...props} />;
}
