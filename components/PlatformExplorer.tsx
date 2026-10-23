"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { modules } from "@/lib/modules";
import { ModuleIcon } from "./ModuleIcon";
import { ProductFrame } from "./ProductFrame";
import { previewFor } from "./previews/Previews";

// A tablist rather than six identical cards: the modules are peers, and seeing each one's working
// surface says more than an icon and a sentence would. Arrow keys move between tabs (WAI-ARIA tabs pattern).
export function PlatformExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const current = modules[active];
  const { label, Component } = previewFor[current.slug];

  function onKeyDown(e: React.KeyboardEvent) {
    const last = modules.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
      <div
        role="tablist"
        aria-label="ASH-V modules"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex flex-col gap-1 rounded-[20px] bg-mist p-2 sm:p-3"
      >
        {modules.map((m, i) => {
          const selected = i === active;
          return (
            <button
              key={m.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${m.slug}`}
              aria-selected={selected}
              aria-controls={`panel-${m.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group flex w-full items-start gap-4 rounded-[12px] px-4 py-4 text-left transition-colors duration-200 ${
                selected ? "bg-bone ring-1 ring-ash-grey" : "hover:bg-bone/70"
              }`}
            >
              <ModuleIcon
                slug={m.slug}
                className={`mt-0.5 size-6 shrink-0 transition-opacity ${selected ? "opacity-100" : "opacity-70"}`}
              />
              <span className="min-w-0">
                <span className={`block text-[16px] font-semibold leading-snug ${selected ? "text-ink" : "text-ink/80"}`}>
                  {m.name}
                </span>
                <span
                  className={`mt-1 block text-[14px] leading-[1.5] text-graphite ${selected ? "" : "hidden sm:block"}`}
                >
                  {m.line}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${current.slug}`}
        aria-labelledby={`tab-${current.slug}`}
        className="min-w-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.slug}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductFrame label={label} flat>
              <Component />
            </ProductFrame>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[46ch] text-[15px] leading-[1.55] text-graphite">{current.intro.split(". ")[0]}.</p>
              <Link href={`/platform/${current.slug}`} className="pill pill-light shrink-0">
                Read about {current.short}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
