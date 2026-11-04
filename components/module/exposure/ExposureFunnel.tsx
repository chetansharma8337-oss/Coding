"use client";

import { motion, useReducedMotion } from "motion/react";
import { fade } from "@/lib/springs";

// Hero visual: how a raw finding count narrows to the handful worth working today. Each stage keeps only
// what the next signal says matters. Sample figures.
const stages = [
  { n: 8214, label: "Open findings", sub: "Everything the scanners report" },
  { n: 1906, label: "Reachable", sub: "From the internet or inside" },
  { n: 211, label: "Known exploited", sub: "On CISA KEV or your intel" },
  { n: 37, label: "On critical assets", sub: "Weighted by the business" },
  { n: 4, label: "On a validated path", sub: "Proven by a test" },
];

export function ExposureFunnel() {
  const reduce = useReducedMotion();
  return (
    <figure data-nav-tone="light" className="on-light mx-auto max-w-[1100px] rounded-3xl bg-bone p-6 text-ink shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="caption-3 text-slate">From findings to the work that matters</span>
        <figcaption className="caption-5 text-slate">Illustrative, sample data</figcaption>
      </div>
      <ol className="mt-6 grid gap-4 sm:grid-cols-5 sm:gap-3">
        {stages.map((s, i) => (
          <motion.li
            key={s.label}
            className={`flex flex-col rounded-2xl p-4 ${i === stages.length - 1 ? "bg-ink text-bone" : "bg-mist"}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { y: { duration: 0 }, opacity: fade } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.7 + i * 0.12 }}
          >
            <span className="heading-4 tabular-nums">{s.n.toLocaleString("en-US")}</span>
            <span className="title-4 mt-2">{s.label}</span>
            <span className={`caption-5 mt-1 ${i === stages.length - 1 ? "text-ash-grey" : "text-graphite"}`}>{s.sub}</span>
            <span className={`mt-4 block h-1.5 overflow-hidden rounded-full ${i === stages.length - 1 ? "bg-bone/20" : "bg-ash-grey/50"}`} aria-hidden="true">
              <motion.span
                className={`block h-full origin-left rounded-full ${i === stages.length - 1 ? "bg-bone" : "bg-ink"}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: Math.max(0.04, Math.log10(s.n + 1) / Math.log10(stages[0].n + 1)) }}
                transition={reduce ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.9 + i * 0.12 }}
              />
            </span>
          </motion.li>
        ))}
      </ol>
      <p className="caption-5 mt-4 text-slate">Bar lengths on a log scale.</p>
    </figure>
  );
}
