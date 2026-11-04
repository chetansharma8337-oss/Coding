"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import { fade, spring } from "@/lib/springs";

// icon is a rendered element (not a component), so server pages can pass it to this client component.
export type TabItem = { icon: React.ReactNode; title: string; summary: string; points: string[]; visual?: React.ReactNode };

// A capability explorer: pick a capability on the left, its detail settles in on the right. Proper tabs
// (arrow keys move between them), and the panel enters from the direction of travel.
export function CapabilityTabs({ items, label }: { items: TabItem[]; label: string }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = items.length;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + n) % n : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };
  const item = items[active];

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div role="tablist" aria-label={label} aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-2 lg:col-span-5 lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`press group relative flex min-w-[240px] shrink-0 items-start gap-4 rounded-2xl border p-4 text-left lg:min-w-0 ${
                on ? "border-ink bg-ink text-bone" : "border-ash-grey bg-bone hover:border-ink"
              }`}
            >
              <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 [&>svg]:size-6">
                {t.icon}
              </span>
              <span>
                <span className="title-3 block">{t.title}</span>
                <span className={`body-6 mt-1 block ${on ? "text-ash-grey" : "text-graphite"}`}>{t.summary}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        className="relative overflow-hidden rounded-3xl border border-ash-grey bg-mist p-6 sm:p-8 lg:col-span-7"
      >
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={item.title}
            custom={dir}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: dir * 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: dir * -16 }}
            transition={reduce ? fade : spring.ui}
          >
            <h3 className="heading-5">{item.title}</h3>
            <ul className="mt-6 space-y-3">
              {item.points.map((pt) => (
                <li key={pt} className="body-3 flex gap-3 text-graphite">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink" />
                  {pt}
                </li>
              ))}
            </ul>
            {item.visual ? <div className="mt-8">{item.visual}</div> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
