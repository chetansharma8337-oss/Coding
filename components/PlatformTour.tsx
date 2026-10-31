"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { modules, type PlatformModule } from "@/lib/modules";
import { scrollToElement } from "@/lib/scroll";
import { fade, spring } from "@/lib/springs";
import { ModuleIcon } from "./ModuleIcon";
import { ProductFrame } from "./ProductFrame";
import { previewFor } from "./previews/Previews";

// Scrollytelling tour: on desktop the product screen stays pinned while the six modules scroll past,
// and the screen swaps to whichever module is in the middle of the viewport. On phones each module
// shows its own screen inline, because a pinned screen would leave no room for the text.
function Step({ mod, index, active, onActive }: { mod: PlatformModule; index: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-48% 0px -48% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  const { label, Component } = previewFor[mod.slug];

  return (
    <div ref={ref} id={`tour-${mod.slug}`} className="py-10 lg:flex lg:min-h-[78svh] lg:items-center lg:py-0">
      <div className={`transition-colors duration-500 ${active ? "text-ink" : "lg:text-slate"}`}>
        <div className="flex items-center gap-3">
          <ModuleIcon slug={mod.slug} className="size-6" />
          <span className="caption-3">
            {String(index + 1).padStart(2, "0")} / {String(modules.length).padStart(2, "0")}
          </span>
        </div>
        <h3 className="heading-4 lg:heading-3 mt-4 max-w-[16ch]">{mod.name}</h3>
        <p className={`mt-4 max-w-[44ch] body-3 transition-colors duration-500 ${active ? "text-graphite" : "text-graphite lg:text-slate"}`}>
          {mod.intro}
        </p>
        <Link href={`/platform/${mod.slug}`} className="btn btn-outline mt-6">
          Read about {mod.short}
        </Link>
      </div>
      <div className="mt-8 lg:hidden">
        <ProductFrame label={label} flat>
          <Component />
        </ProductFrame>
      </div>
    </div>
  );
}

// Screens travel with the scroll: moving down the list, the next screen rises from below and the old one
// leaves upward; scrolling back reverses that path, so a screen returns the way it left.
const swap = {
  enter: (dir: number) => ({ opacity: 0, y: dir * 60, scale: 0.97 }),
  center: { opacity: 1, y: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, y: dir * -40, scale: 0.98 }),
};

export function PlatformTour() {
  const [{ active, dir }, setState] = useState({ active: 0, dir: 1 });
  const setActive = useCallback(
    (i: number) => setState((cur) => (cur.active === i ? cur : { active: i, dir: i > cur.active ? 1 : -1 })),
    [],
  );
  const reduce = useReducedMotion();
  const mod = modules[active];
  const { label, Component } = previewFor[mod.slug];

  return (
    <div className="grid lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        {modules.map((m, i) => (
          <Step key={m.slug} mod={m} index={i} active={i === active} onActive={setActive} />
        ))}
      </div>
      <div className="hidden lg:col-span-7 lg:block">
        <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] flex-col justify-center gap-3">
          {/* Progress you can act on: each segment takes you to its module, so the bar is also a way to navigate. */}
          <ol className="flex gap-2" aria-label="Modules">
            {modules.map((m, i) => (
              <li key={m.slug} className="flex-1">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(`tour-${m.slug}`);
                    if (el) scrollToElement(el, -(window.innerHeight - el.offsetHeight) / 2);
                  }}
                  aria-current={i === active ? "step" : undefined}
                  className="group flex h-11 w-full items-center"
                >
                  <span className="block h-1 w-full overflow-hidden rounded-full bg-mist transition-[height] duration-200 ease-[var(--ease-settle)] group-hover:h-1.5">
                    <motion.span
                      className="block h-full origin-left rounded-full bg-ink"
                      initial={false}
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      transition={reduce ? { duration: 0 } : spring.ui}
                    />
                  </span>
                  <span className="sr-only">{m.name}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="relative">
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.div
                key={mod.slug}
                custom={dir}
                variants={reduce ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } } : swap}
                initial="enter"
                animate="center"
                exit="exit"
                transition={reduce ? fade : spring.ui}
              >
                <ProductFrame label={label} flat>
                  <Component />
                </ProductFrame>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
