"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

export type Step = { title: string; body: string; meta?: string };

function Row({ step, i, onActive, active }: { step: Step; i: number; onActive: (i: number) => void; active: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  return (
    <li ref={ref} className="relative pb-12 pl-16 last:pb-0 sm:pl-20">
      <span
        className={`body-4 absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-settle)] sm:size-12 ${
          active ? "border-ink bg-ink text-bone" : "border-ash-grey bg-bone text-slate"
        }`}
      >
        {String(i + 1).padStart(2, "0")}
      </span>
      <div className={`transition-opacity duration-500 ease-[var(--ease-settle)] ${active ? "opacity-100" : "opacity-50"}`}>
        {step.meta ? <p className="caption-3 text-slate">{step.meta}</p> : null}
        <h3 className="heading-5 mt-1">{step.title}</h3>
        <p className="body-3 mt-2 max-w-[52ch] text-graphite">{step.body}</p>
      </div>
    </li>
  );
}

// A vertical timeline whose rail fills as you scroll (scaleY), and whose step in the middle of the screen
// is the lit one. Reduced motion shows every step lit and the rail full.
export function ScrollSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 50%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute bottom-6 left-5 top-6 w-px bg-ash-grey sm:left-6" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-6 left-5 top-6 w-px origin-top bg-ink sm:left-6"
        style={{ scaleY: reduce ? 1 : fill }}
      />
      {steps.map((s, i) => (
        <Row key={s.title} step={s} i={i} onActive={setActive} active={reduce || i <= active} />
      ))}
    </ol>
  );
}
