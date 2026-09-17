"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

export default function NavAnchor({ href, onClick, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href:string }) {
  const pathname = usePathname();
  const samePageAnchor = href.startsWith("/#") && pathname === "/";
  const targetHref = samePageAnchor ? href.slice(1) : href;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (samePageAnchor) {
      // Keep section navigation out of browser history: Back should restore the
      // previous page/scroll position instead of replaying every section click.
      const hash = href.slice(1);
      window.history.replaceState(window.history.state, "", hash);
    }
  };

  if (samePageAnchor) return <a href={targetHref} onClick={handleClick} {...props} />;
  return <Link href={href} onClick={handleClick} scroll={href.includes("#") ? false : undefined} {...props} />;
}
