"use client";

import { motion, useReducedMotion } from "motion/react";
import { fade } from "@/lib/springs";

// Hero visual: the problem in one glance. Five tools report five different asset counts; the merged
// inventory is a sixth, smaller number, because duplicates collapse and every record gets one identity.
const rows = [
  { source: "Vulnerability Scanner", count: 4312 },
  { source: "CMDB", count: 3870 },
  { source: "Endpoint Agents", count: 3401 },
  { source: "Directory", count: 5106 },
  { source: "Cloud Accounts", count: 1944 },
];
const merged = 4688;
const max = 5106;

export function AssetCounts() {
  const reduce = useReducedMotion();
  return (
    <figure data-nav-tone="light" className="on-light rounded-3xl bg-bone p-6 text-ink shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="caption-3 text-slate">Assets Reported by Data Source</span>
        <figcaption className="caption-5 text-slate">Sample data</figcaption>
      </div>
      <ul className="mt-6 space-y-4">
        {rows.map((r, i) => (
          <li key={r.source}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="body-5">{r.source}</span>
              <span className="caption-6 font-mono tabular-nums text-graphite">{r.count.toLocaleString("en-US")}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist" aria-hidden="true">
              <motion.div
                className="h-full origin-left rounded-full bg-ash-grey"
                style={{ width: `${(r.count / max) * 100}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={reduce ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 + i * 0.08 }}
              />
            </div>
          </li>
        ))}
      </ul>
      <motion.div
        className="mt-6 rounded-2xl bg-ink p-4 text-bone"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { y: { duration: 0 }, opacity: fade } : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="body-4">ASH-V Asset Inventory</span>
          <span className="caption-6 font-mono tabular-nums">{merged.toLocaleString("en-US")}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-bone/15" aria-hidden="true">
          <motion.div
            className="h-full origin-left rounded-full bg-bone"
            style={{ width: `${(merged / max) * 100}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
          />
        </div>
        <p className="caption-5 mt-3 text-ash-grey">Duplicate records consolidated. 211 unmanaged assets identified.</p>
      </motion.div>
    </figure>
  );
}
