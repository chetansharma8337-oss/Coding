"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { fade } from "@/lib/springs";

// Hero visual: one finding picking up everything it needs to get fixed, one line at a time.
const lines = [
  { k: "Finding", v: "CVE-2021-44228 on billing-api-04", from: "Source: Threat Exposure Management, priority rank 3" },
  { k: "Asset Owner", v: "Payments", from: "Source: Asset record" },
  { k: "Due Date", v: "14 days", from: "Remediation policy: CISA KEV, high-criticality asset" },
  { k: "Deployment", v: "Rings 0 to 3", from: "Maintenance window: Payments, 22:00" },
  { k: "Closure Condition", v: "Verification scan passed", from: "A status change alone does not close the task" },
];

export function RoutingCard() {
  const reduce = useReducedMotion();
  return (
    <figure data-nav-tone="light" className="on-light rounded-3xl bg-bone p-6 text-ink shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="caption-3 text-slate">Remediation Task</span>
        <figcaption className="caption-5 text-slate">Sample data</figcaption>
      </div>
      <ol className="mt-6">
        {lines.map((l, i) => (
          <motion.li
            key={l.k}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { y: { duration: 0 }, opacity: fade } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 + i * 0.18 }}
          >
            <div className={`rounded-2xl p-4 ${i === lines.length - 1 ? "bg-ink text-bone" : "bg-mist"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className={`caption-3 ${i === lines.length - 1 ? "text-ash-grey" : "text-slate"}`}>{l.k}</span>
                <span className="body-4">{l.v}</span>
              </div>
              <p className={`caption-5 mt-1 text-right ${i === lines.length - 1 ? "text-ash-grey" : "text-graphite"}`}>{l.from}</p>
            </div>
            {i < lines.length - 1 ? <ArrowDown weight="bold" className="mx-auto my-1 size-4 text-slate" aria-hidden="true" /> : null}
          </motion.li>
        ))}
      </ol>
    </figure>
  );
}
