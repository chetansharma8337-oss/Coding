"use client";

import { motion, useReducedMotion } from "motion/react";
import { modules } from "@/lib/modules";
import { fade, spring } from "@/lib/springs";
import { ModuleIcon } from "./ModuleIcon";

// The platform in one picture: a single asset record in the middle, the six modules around it, each saying
// what it reads from the record and what it writes back. The record settles first, then the modules arrive
// from the side they sit on. Transform and opacity only.
const io: Record<string, { reads: string; writes: string }> = {
  "asset-intelligence": { reads: "Data source records from scanners, cloud accounts, agents and the directory", writes: "Asset owner, asset criticality, data sources" },
  "threat-exposure-management": { reads: "Asset criticality, reachability, CISA KEV status", writes: "Priority rank in the Exposure Queue" },
  "vulnerability-patch-management": { reads: "Asset owner and prioritized findings", writes: "Deployment ring, verified closure" },
  "automated-penetration-testing": { reads: "Prioritized findings within the test scope", writes: "Validated attack paths" },
  "third-party-risk-management": { reads: "Vendor access to the asset", writes: "Vendor tier and vendor evidence" },
  grc: { reads: "Evidence records from every module", writes: "Control status" },
};

const record = [
  ["Asset", "fin-db-02"],
  ["Asset Owner", "Finance IT"],
  ["Asset Criticality", "High"],
  ["Data Sources", "CMDB, Scanner"],
  ["Open Findings", "2, rank 1 validated"],
  ["Controls", "VM-01, AM-02"],
];

export function OneRecord() {
  const reduce = useReducedMotion();
  const left = modules.slice(0, 3);
  const right = modules.slice(3);

  const Card = ({ slug, side, i }: { slug: (typeof modules)[number]["slug"]; side: -1 | 1; i: number }) => {
    const m = modules.find((x) => x.slug === slug)!;
    return (
      <motion.li
        initial={{ opacity: 0, x: side * 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={reduce ? { x: { duration: 0 }, opacity: fade } : { ...spring.reveal, delay: 0.3 + i * 0.08 }}
        className="rounded-2xl border border-ash-grey bg-bone p-4"
      >
        <div className="flex items-center gap-3">
          <ModuleIcon slug={m.slug} className="size-6 shrink-0" />
          <span className="title-4">{m.name}</span>
        </div>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
          <dt className="caption-4 text-slate">Reads</dt>
          <dd className="caption-5 text-graphite">{io[m.slug].reads}</dd>
          <dt className="caption-4 text-slate">Writes</dt>
          <dd className="caption-5 text-graphite">{io[m.slug].writes}</dd>
        </dl>
      </motion.li>
    );
  };

  return (
    <div className="grid items-center gap-4 lg:grid-cols-[1fr_minmax(0,0.9fr)_1fr]">
      <ul className="order-2 grid gap-4 lg:order-1">
        {left.map((m, i) => (
          <Card key={m.slug} slug={m.slug} side={-1} i={i} />
        ))}
      </ul>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={reduce ? { scale: { duration: 0 }, opacity: fade } : spring.reveal}
        data-nav-tone="dark"
        className="on-dark order-1 rounded-3xl bg-ink p-6 text-bone lg:order-2 lg:p-8"
      >
        <p className="caption-3 text-ash-grey">Asset Record</p>
        <dl className="mt-6 divide-y divide-bone/15">
          {record.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="caption-2 text-ash-grey">{k}</dt>
              <dd className={`body-5 text-right ${k === "Asset" || k === "Controls" ? "font-mono" : ""}`}>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="caption-5 mt-6 text-ash-grey">Sample data</p>
      </motion.div>
      <ul className="order-3 grid gap-4">
        {right.map((m, i) => (
          <Card key={m.slug} slug={m.slug} side={1} i={i + 3} />
        ))}
      </ul>
    </div>
  );
}
