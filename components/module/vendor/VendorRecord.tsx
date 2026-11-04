"use client";

import { motion, useReducedMotion } from "motion/react";
import { fade } from "@/lib/springs";

// Hero visual: a vendor record that starts from access, not from a questionnaire.
const rows = [
  { k: "Can reach", v: "hr-app-01 (API key), payroll export bucket", mono: false },
  { k: "Data", v: "Employee bank details, regulated" },
  { k: "Tier", v: "1, set by access and data" },
  { k: "Evidence", v: "SOC 2 Type II, expires in 41 days" },
  { k: "Internal owner", v: "Head of People Operations" },
  { k: "Open findings", v: "1, MFA not enforced for admin users" },
];

export function VendorRecord() {
  const reduce = useReducedMotion();
  return (
    <figure data-nav-tone="light" className="on-light rounded-3xl bg-bone p-6 text-ink shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="caption-3 text-slate">Vendor record</p>
          <p className="heading-5 mt-2">Payfield</p>
          <p className="body-6 text-graphite">Payroll provider</p>
        </div>
        <span className="caption-6 rounded-full bg-ink px-3 py-1 text-bone">Tier 1</span>
      </div>
      <dl className="mt-6 divide-y divide-ash-grey">
        {rows.map((r, i) => (
          <motion.div
            key={r.k}
            className="grid gap-1 py-3 sm:grid-cols-[130px_1fr]"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reduce ? { x: { duration: 0 }, opacity: fade } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 + i * 0.12 }}
          >
            <dt className="caption-2 text-slate">{r.k}</dt>
            <dd className="body-5">{r.v}</dd>
          </motion.div>
        ))}
      </dl>
      <figcaption className="caption-5 mt-4 text-slate">Illustrative vendor, sample data</figcaption>
    </figure>
  );
}
