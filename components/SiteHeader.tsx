"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { modules } from "@/lib/modules";
import { solutions } from "@/lib/solutions";
import { fade, spring } from "@/lib/springs";
import { ModuleIcon } from "./ModuleIcon";
import { SolutionIcon } from "./SolutionIcon";

const pages = [
  { href: "/frameworks", label: "Frameworks" },
  { href: "/resources", label: "Resources" },
  { href: "/company", label: "Company" },
];

type Tone = "dark" | "light";
type Menu = "platform" | "solutions" | null;

// The bar is glass, so its ink follows whatever is underneath it. Dark surfaces mark themselves with
// data-nav-tone="dark" (and light surfaces inside them with "light"); anything unmarked counts as light.
function toneAt(x: number, y: number): Tone {
  for (const el of document.elementsFromPoint(x, y)) {
    const tone = el.closest("[data-nav-tone]")?.getAttribute("data-nav-tone");
    if (tone === "dark" || tone === "light") return tone;
  }
  return "light";
}

// Clear glass with white ink only reads when everything behind the bar is dark; the light glass reads over
// anything. So the bar samples across its own width and goes dark only when every sample is dark.
function toneUnder(rect: DOMRect): Tone {
  const ys = [rect.top + rect.height / 2, rect.bottom - 2];
  const xs = [0.08, 0.5, 0.92].map((f) => rect.left + rect.width * f);
  return ys.every((y) => xs.every((x) => toneAt(x, y) === "dark")) ? "dark" : "light";
}

// Pages that open on a dark photograph start dark, so the first paint already matches.
const opensDark = (path: string) =>
  path === "/" ||
  path.startsWith("/platform") ||
  path.startsWith("/solutions") ||
  ["/company", "/frameworks", "/resources", "/walkthrough"].includes(path);

const isCurrent = (path: string, href: string) => path === href || path.startsWith(`${href}/`);

export function SiteHeader({ logo }: { logo: React.ReactNode }) {
  const [menu, setMenu] = useState<Menu>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  // The sheet starts below wherever the bar actually is: lower at the top of the page, under the promo strip.
  const [sheetTop, setSheetTop] = useState(0);
  const pathname = usePathname();
  const [tone, setTone] = useState<Tone>(opensDark(pathname) ? "dark" : "light");
  const barRef = useRef<HTMLDivElement>(null);
  const menusRef = useRef<HTMLDivElement>(null);
  const sheetButton = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMenu(null);
    setSheetOpen(false);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = barRef.current?.getBoundingClientRect();
      if (r) setTone(toneUnder(r));
    };
    // Throttled through requestAnimationFrame: at most one sample per frame (B7).
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
      if (menu) {
        document.getElementById(`${menu}-button`)?.focus();
        setMenu(null);
      }
      if (sheetOpen) {
        setSheetOpen(false);
        sheetButton.current?.focus();
      }
    }
    function onPointer(e: PointerEvent) {
      if (menu && menusRef.current && !menusRef.current.contains(e.target as Node)) setMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menu, sheetOpen]);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const close = () => {
    setMenu(null);
    setSheetOpen(false);
  };

  // With the mobile sheet open, the bar joins the sheet's light surface.
  const shown: Tone = sheetOpen ? "light" : tone;
  const dropdown = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: fade }
    : {
        initial: { opacity: 0, y: -8, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.98 },
        transition: spring.ui,
      };

  // B7 link entrance: 24px rise with a fade, 60ms apart, the whole sequence capped at 400ms.
  const sheetItems = 1 + modules.length + 1 + solutions.length + pages.length + 1;
  const stagger = Math.min(0.06, 0.4 / sheetItems);
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: reduce ? fade : spring.ui },
  };

  const trigger = (key: Exclude<Menu, null>, label: string, current: boolean) => (
    <button
      id={`${key}-button`}
      type="button"
      aria-expanded={menu === key}
      aria-controls={`${key}-menu`}
      aria-current={current ? "page" : undefined}
      onClick={() => setMenu((m) => (m === key ? null : key))}
      className="nav-link body-5 inline-flex min-h-10 items-center gap-1 rounded-xl px-3 aria-expanded:opacity-100"
    >
      {label}
      <CaretDown
        weight="bold"
        aria-hidden="true"
        className={`size-3 transition-transform duration-500 ease-[var(--ease-settle)] ${menu === key ? "rotate-180" : ""}`}
      />
    </button>
  );

  return (
    <header className="pointer-events-none sticky top-0 z-50 h-[var(--header-h)] px-3 pt-3">
      <div ref={menusRef} className="relative mx-auto w-full max-w-[1200px] lg:w-fit">
        <div
          ref={barRef}
          data-tone={shown}
          className={`nav-glass pointer-events-auto relative flex h-14 items-center justify-between gap-4 rounded-2xl pl-4 pr-2 ${
            shown === "dark" ? "on-dark" : ""
          }`}
        >
          {logo}

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {trigger("platform", "Platform", pathname.startsWith("/platform"))}
            {trigger("solutions", "Solutions", pathname.startsWith("/solutions"))}
            {pages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                aria-current={isCurrent(pathname, p.href) ? "page" : undefined}
                className="nav-link body-5 inline-flex min-h-10 items-center rounded-xl px-3"
              >
                {p.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/walkthrough"
              aria-current={pathname === "/walkthrough" ? "page" : undefined}
              className={`btn btn-sm hidden sm:inline-flex ${shown === "dark" ? "btn-light" : "btn-dark"}`}
            >
              Book a walkthrough
            </Link>
            <button
              ref={sheetButton}
              type="button"
              aria-expanded={sheetOpen}
              aria-controls="mobile-menu"
              aria-label={sheetOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                setSheetTop(Math.round(barRef.current?.getBoundingClientRect().bottom ?? 0));
                setSheetOpen((v) => !v);
              }}
              className="relative flex size-11 items-center justify-center rounded-xl lg:hidden"
            >
              {/* Two lines that turn into a cross, on the base curve, instead of swapping icons. */}
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-[var(--ease-settle)] ${
                    sheetOpen ? "translate-y-[5.25px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-[var(--ease-settle)] ${
                    sheetOpen ? "-translate-y-[5.25px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu === "platform" ? (
            <motion.div
              key="platform"
              id="platform-menu"
              {...dropdown}
              style={{ transformOrigin: "50% 0%" }}
              className="material-light on-light pointer-events-auto absolute left-1/2 top-[calc(100%+8px)] hidden w-[720px] -translate-x-1/2 rounded-3xl border border-ash-grey/70 p-2 text-ink lg:block"
            >
              <ul className="grid grid-cols-2 gap-1">
                {modules.map((m) => (
                  <li key={m.slug}>
                    <Link
                      href={`/platform/${m.slug}`}
                      onClick={close}
                      aria-current={pathname === `/platform/${m.slug}` ? "page" : undefined}
                      className="press flex gap-3 rounded-2xl p-3 hover:bg-ink/5 aria-[current=page]:bg-ink/5"
                    >
                      <ModuleIcon slug={m.slug} className="mt-0.5 size-6 shrink-0" />
                      <span>
                        <span className="title-4 block">{m.name}</span>
                        <span className="caption-5 mt-1 block text-graphite">{m.line}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/platform"
                onClick={close}
                className="press mt-1 flex items-center justify-between rounded-2xl bg-mist p-3 hover:bg-ink/5"
              >
                <span className="title-4">Platform overview</span>
                <span className="caption-5 text-graphite">How the six modules share one record</span>
              </Link>
            </motion.div>
          ) : null}
          {menu === "solutions" ? (
            <motion.div
              key="solutions"
              id="solutions-menu"
              {...dropdown}
              style={{ transformOrigin: "50% 0%" }}
              className="material-light on-light pointer-events-auto absolute left-1/2 top-[calc(100%+8px)] hidden w-[480px] -translate-x-1/2 rounded-3xl border border-ash-grey/70 p-2 text-ink lg:block"
            >
              <ul className="grid gap-1">
                {solutions.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/solutions/${s.slug}`}
                      onClick={close}
                      aria-current={pathname === `/solutions/${s.slug}` ? "page" : undefined}
                      className="press flex gap-3 rounded-2xl p-3 hover:bg-ink/5 aria-[current=page]:bg-ink/5"
                    >
                      <SolutionIcon slug={s.slug} className="mt-0.5 size-6 shrink-0" />
                      <span>
                        <span className="title-4 block">{s.role}</span>
                        <span className="caption-5 mt-1 block text-graphite">{s.line}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {sheetOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fade}
            className="material-sheet on-light pointer-events-auto fixed inset-0 -z-10 overflow-y-auto overscroll-contain text-ink lg:hidden"
            style={{ paddingTop: sheetTop + 8 }}
            data-lenis-prevent
          >
            <motion.nav
              aria-label="Mobile"
              className="page-x pb-24 pt-4"
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: stagger }}
            >
              <motion.p variants={item} className="caption-3 text-slate">
                Platform
              </motion.p>
              <ul className="mt-2">
                {modules.map((m) => (
                  <motion.li key={m.slug} variants={item}>
                    <Link
                      href={`/platform/${m.slug}`}
                      onClick={close}
                      aria-current={pathname === `/platform/${m.slug}` ? "page" : undefined}
                      className="title-2 flex min-h-12 items-center gap-3 border-b border-ink/10 aria-[current=page]:font-semibold"
                    >
                      <ModuleIcon slug={m.slug} className="size-6 shrink-0 text-graphite" />
                      {m.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.p variants={item} className="caption-3 mt-8 text-slate">
                Solutions
              </motion.p>
              <ul className="mt-2">
                {solutions.map((s) => (
                  <motion.li key={s.slug} variants={item}>
                    <Link
                      href={`/solutions/${s.slug}`}
                      onClick={close}
                      aria-current={pathname === `/solutions/${s.slug}` ? "page" : undefined}
                      className="title-2 flex min-h-12 items-center gap-3 border-b border-ink/10 aria-[current=page]:font-semibold"
                    >
                      <SolutionIcon slug={s.slug} className="size-6 shrink-0 text-graphite" />
                      {s.role}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <ul className="mt-8">
                {[{ href: "/platform", label: "Platform overview" }, ...pages].map((p) => (
                  <motion.li key={p.href} variants={item}>
                    <Link
                      href={p.href}
                      onClick={close}
                      aria-current={pathname === p.href ? "page" : undefined}
                      className="heading-6 flex min-h-12 items-center aria-[current=page]:underline aria-[current=page]:underline-offset-8"
                    >
                      {p.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div variants={item}>
                <Link href="/walkthrough" onClick={close} className="btn btn-dark mt-8 w-full">
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
