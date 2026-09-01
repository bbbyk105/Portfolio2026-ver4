"use client";

import { useCallback, useRef, useState } from "react";
import { nav, contact } from "@/lib/content";
import { gsap, EASE, DUR, MQ } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { lockScroll, unlockScroll } from "@/lib/lenisRef";
import NavAnchor from "@/components/NavAnchor";

/**
 * Hairline navigation set in `mix-blend-mode: difference` so it inverts
 * against whatever passes underneath instead of sitting on its own bar.
 *
 * Under 900px the links collapse into a menu. The open/close timeline is built
 * once, paused, and then played or reversed — rebuilding it per toggle is what
 * makes a menu stutter when it is tapped twice quickly.
 */
export default function GlobalNav() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(MQ.reduced).matches;

      const t = gsap.timeline({ paused: true });
      t.set(".menu", { pointerEvents: "auto" })
        .fromTo(
          ".menu",
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: reduced ? 0.001 : 0.62,
            ease: EASE.swap,
          },
          0,
        )
        .fromTo(
          ".menu-item",
          { yPercent: 118 },
          {
            yPercent: 0,
            duration: reduced ? 0.001 : 0.72,
            ease: EASE.enter,
            stagger: reduced ? 0 : 0.06,
          },
          reduced ? 0 : 0.16,
        )
        .fromTo(
          ".menu-foot",
          { opacity: 0 },
          { opacity: 1, duration: reduced ? 0.001 : 0.5 },
          reduced ? 0 : 0.4,
        )
        // The bars cross into an X on the same clock as the panel.
        .to(
          ".burger-top",
          { y: 4, rotate: 45, duration: reduced ? 0.001 : 0.4, ease: EASE.swap },
          0,
        )
        .to(
          ".burger-bottom",
          { y: -4, rotate: -45, duration: reduced ? 0.001 : 0.4, ease: EASE.swap },
          0,
        );

      tl.current = t;

      // The chrome arrives after the headline has started — top-down and
      // lightly, so it never competes with the hero's own entrance.
      // The links fade as one block, not one by one: `.nav-links a` carries a
      // CSS opacity and a transition of its own, and a `from` tween reading
      // that mid-transition is what used to leave them stranded at zero.
      if (!reduced) {
        gsap.from([".nav-mark", ".nav-links", ".nav-cta", ".burger"], {
          opacity: 0,
          y: -6,
          duration: DUR.swap,
          ease: EASE.glide,
          stagger: 0.06,
          delay: 0.4,
        });
      }
    }, el);

    // Hero animations run on load; make sure the panel starts hidden.
    gsap.set(q(".menu"), { pointerEvents: "none" });

    return () => {
      ctx.revert();
      tl.current = null;
      document.documentElement.classList.remove("menu-open");
    };
  }, []);

  const toggle = useCallback((next: boolean) => {
    setOpen(next);
    const t = tl.current;
    if (!t) return;
    // Lenis alone is not enough: reduced-motion visitors have no Lenis at
    // all, and the page would still scroll behind the panel.
    document.documentElement.classList.toggle("menu-open", next);
    if (next) {
      lockScroll();
      t.play();
    } else {
      t.reverse();
      unlockScroll();
    }
  }, []);

  useIsoLayoutEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggle(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, toggle]);

  return (
    <div ref={root}>
      <header className="nav">
        <div className="nav-mark t-mono">
          <NavAnchor
            href="/#hero"
            className="nav-home"
            aria-label="Byakko Kondo — home"
          >
            <span className="nav-glyph" aria-hidden="true" />
            BYAKKO KONDO
          </NavAnchor>
          <span className="nav-role block" style={{ color: "var(--dim)" }}>
            ENGINEER / CREATIVE DEVELOPER
          </span>
        </div>

        <div className="nav-right">
          <nav className="nav-links t-mono" aria-label="Primary">
            {nav.map((item) => (
              <NavAnchor key={item.href} href={item.href}>
                {item.label}
              </NavAnchor>
            ))}
          </nav>

          <NavAnchor className="nav-cta t-mono" href="/#contact">
            GET IN TOUCH
          </NavAnchor>
        </div>

        <button
          type="button"
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => toggle(!open)}
        >
          <span className="burger-top" />
          <span className="burger-bottom" />
        </button>
      </header>

      <div id="site-menu" className="menu" hidden={false} aria-hidden={!open}>
        <nav className="menu-list" aria-label="Menu">
          {/* The wordmark is the way home on desktop; in the panel it needs
              saying, since the panel is the whole screen. */}
          <NavAnchor
            href="/#hero"
            className="menu-line"
            tabIndex={open ? 0 : -1}
            onClick={() => toggle(false)}
          >
            <span className="menu-item t-display">HOME</span>
          </NavAnchor>
          {nav.map((item) => (
            <NavAnchor
              key={item.href}
              href={item.href}
              className="menu-line"
              tabIndex={open ? 0 : -1}
              onClick={() => toggle(false)}
            >
              <span className="menu-item t-display">{item.label}</span>
            </NavAnchor>
          ))}
        </nav>
        <div className="menu-foot t-mono">
          <a href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1}>
            {contact.email}
          </a>
          <span>TOKYO, JAPAN</span>
        </div>
      </div>
    </div>
  );
}
