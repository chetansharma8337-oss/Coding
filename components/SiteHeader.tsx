"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { modules } from "@/lib/modules";
import { fade, spring } from "@/lib/springs";
import { ModuleIcon } from "./ModuleIcon";

const sections = [
  { href: "/#approach", label: "Approach" },
  { href: "/#flow", label: "How it works" },
];

type Tone = "dark" | "light";

// The header is glass, so its ink follows whatever is underneath it. Dark surfaces mark themselves with
// data-nav-tone="dark" (and light surfaces inside them with "light"); anything unmarked counts as light.
// Clip paths count too, so when the hero image folds into a card and leaves white page under the header,
// the header turns light with it.
function toneAt(x: number, y: number): Tone {
  for (const el of document.elementsFromPoint(x, y)) {
    const tone = el.closest("[data-nav-tone]")?.getAttribute("data-nav-tone");
    if (tone === "dark" || tone === "light") return tone;
  }
  return "light";
}

// Clear glass with white ink only reads when everything behind the bar is dark; the light glass reads over
// anything. So the bar samples across its width, at its middle and just above its bottom edge, and goes dark
// only when every sample is dark: a light surface sliding up under the bar turns it light straight away.
function toneUnder(rect: DOMRect): Tone {
  const w = window.innerWidth;
  const ys = [rect.top + rect.height / 2, rect.bottom - 2];
  return ys.every((y) => [0.12, 0.5, 0.88].every((f) => toneAt(w * f, y) === "dark")) ? "dark" : "light";
}

// Pages that open on a dark hero start dark, so the first paint already matches.
const opensDark = (path: string) => path === "/" || path.startsWith("/platform/");

const menuList = {
  open: { transition: { staggerChildren: 0.03, delayChildren: 0.04 } },
  closed: {},
};
const menuItem = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -8 },
};

export function SiteHeader({ logo }: { logo: React.ReactNode }) {
  const [platformOpen, setPlatformOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [tone, setTone] = useState<Tone>(opensDark(pathname) ? "dark" : "light");
  const headerRef = useRef<HTMLElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const platformButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    setPlatformOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = headerRef.current?.getBoundingClientRect();
      if (r) setTone(toneUnder(r));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (platformOpen) {
        setPlatformOpen(false);
        platformButton.current?.focus();
      }
      if (menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    function onPointer(e: PointerEvent) {
      if (platformOpen && platformRef.current && !platformRef.current.contains(e.target as Node)) {
        setPlatformOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [platformOpen, menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => {
    setPlatformOpen(false);
    setMenuOpen(false);
  };

  // With the mobile sheet open, the header joins the sheet's light glass.
  const shown: Tone = menuOpen ? "light" : tone;

  return (
    <header ref={headerRef} data-tone={shown} className={`nav-glass sticky top-0 z-50 ${shown === "dark" ? "on-dark" : ""}`}>
      <div className="page-x flex h-[var(--header-h)] items-center justify-between gap-6">
        {logo}

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <div ref={platformRef} className="relative">
            <button
              ref={platformButton}
              type="button"
              aria-expanded={platformOpen}
              aria-controls="platform-menu"
              onClick={() => setPlatformOpen((v) => !v)}
              className="nav-link inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[1rem] aria-expanded:opacity-100"
            >
              Platform
              <svg
                viewBox="0 0 12 12"
                className={`size-3 transition-transform duration-300 ease-[var(--ease-settle)] ${platformOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M2.5 4.5L6 8l3.5-3.5" />
              </svg>
            </button>
            <AnimatePresence>
              {platformOpen ? (
                <motion.div
                  id="platform-menu"
                  // Grows out of the Platform button and comes into focus, then leaves the same way it came.
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -6, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -6, filter: "blur(6px)" }}
                  transition={reduce ? fade : spring.ui}
                  style={{ transformOrigin: "50% 0%" }}
                  className="material-light on-light absolute left-1/2 top-[calc(100%+12px)] w-[640px] -translate-x-1/2 rounded-[22.5px] border border-ash-grey/70 p-3 text-ink"
                >
                  {/* Popover: the one place a shadow is allowed, since it floats above page content. */}
                  <ul className="grid grid-cols-2 gap-1">
                    {modules.map((m) => (
                      <li key={m.slug}>
                        <Link
                          href={`/platform/${m.slug}`}
                          onClick={close}
                          className="press flex gap-3 rounded-[12px] p-3 hover:bg-ink/5"
                        >
                          <ModuleIcon slug={m.slug} className="mt-0.5 size-5 shrink-0" />
                          <span>
                            <span className="block text-[0.9375rem] font-semibold leading-snug">{m.name}</span>
                            <span className="mt-1 block text-[0.8125rem] leading-[1.45] text-graphite">{m.line}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="nav-link inline-flex min-h-11 items-center rounded-full px-4 text-[1rem]">
              {s.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#walkthrough" className={`pill hidden sm:inline-flex ${shown === "dark" ? "pill-light !border-bone" : "pill-dark"}`}>
            Book a walkthrough
          </Link>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="pill min-h-11 border border-current/40 px-4 text-[0.9375rem] md:hidden"
          >
            {/* The label crossfades in place, so the control stays put while its meaning changes. */}
            <span className="grid">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={menuOpen ? "close" : "menu"}
                  className="[grid-area:1/1]"
                  initial={{ opacity: 0, y: reduce ? 0 : menuOpen ? 6 : -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : menuOpen ? -6 : 6 }}
                  transition={reduce ? fade : spring.ui}
                >
                  {menuOpen ? "Close" : "Menu"}
                </motion.span>
              </AnimatePresence>
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            // Drops from the header it belongs to and rises back into it on close.
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={reduce ? fade : spring.ui}
            className="material-sheet on-light absolute inset-x-0 top-full h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain text-ink md:hidden"
            data-lenis-prevent
          >
            <motion.nav aria-label="Mobile" className="page-x pb-24 pt-4" variants={menuList} initial="closed" animate="open">
              <motion.p variants={menuItem} transition={spring.ui} className="micro-label text-slate">
                Platform
              </motion.p>
              <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
                {modules.map((m) => (
                  <motion.li key={m.slug} variants={menuItem} transition={reduce ? fade : spring.ui}>
                    <Link
                      href={`/platform/${m.slug}`}
                      onClick={close}
                      className="flex min-h-14 items-center gap-3 py-3 transition-opacity duration-100 active:opacity-50"
                    >
                      <ModuleIcon slug={m.slug} className="size-5 shrink-0 text-graphite" />
                      <span className="text-[1.0625rem]">{m.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <ul className="mt-6 space-y-1">
                {sections.map((s) => (
                  <motion.li key={s.href} variants={menuItem} transition={reduce ? fade : spring.ui}>
                    <Link
                      href={s.href}
                      onClick={close}
                      className="flex min-h-12 items-center text-[1.0625rem] transition-opacity duration-100 active:opacity-50"
                    >
                      {s.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div variants={menuItem} transition={reduce ? fade : spring.ui}>
                <Link href="/#walkthrough" onClick={close} className="pill pill-dark mt-8 w-full">
                  Book a walkthrough
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
