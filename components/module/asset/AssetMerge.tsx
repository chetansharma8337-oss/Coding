"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { CheckCircle, Circle } from "@phosphor-icons/react/dist/ssr";
import { ModuleIcon } from "@/components/ModuleIcon";
import { NoBreak } from "@/components/NoBreak";
import type { ModuleSlug } from "@/lib/modules";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { useWide } from "@/lib/useWide";

// The Asset Intelligence signature: five tools each see part of the same server, with different spellings and
// one disagreement. As you scroll, the sightings converge and collapse into one record that names the source of
// every field, settles the conflict by precedence, adds owner and criticality, shows the control that is missing,
// and lists what each module reads from it. Desktop pins and scrubs; phones and reduced motion show the steps
// stacked and still. Transform and opacity only.

// The third value marks a field ASH-V matches on; those light up while the caption explains the match.
type Sighting = { source: string; fields: [string, string, boolean?][]; x: number; y: number };

const sightings: Sighting[] = [
  { source: "Cloud Account", fields: [["Instance ID", "i-07c2e19a4b", true], ["Private IP", "10.40.2.17", true], ["Owner Tag", "finance-it"]], x: -400, y: -190 },
  { source: "Vulnerability Scanner", fields: [["Hostname", "FIN-DB-02", true], ["IP Address", "10.40.2.17", true], ["Operating System", "Ubuntu 22.04"]], x: 400, y: -190 },
  { source: "Endpoint Agent", fields: [["Hostname", "fin-db-02", true], ["Operating System", "Ubuntu 22.04.4"], ["Last Check-In", "02:37"]], x: -420, y: 150 },
  { source: "CMDB", fields: [["CI Name", "fin-db-02.corp.local", true], ["Asset Owner", "Finance IT"], ["Asset Criticality", "High"]], x: 420, y: 150 },
  { source: "Directory", fields: [["Computer Object", "fin-db-02$", true], ["OU", "Servers / Finance"], ["Last Logon", "4 Nov 2026"]], x: 0, y: 250 },
];

const record: { k: string; v: string; from: string; note?: string; mono?: boolean }[] = [
  { k: "Asset", v: "fin-db-02", from: "4 data sources", note: "3 hostname variants normalized", mono: true },
  { k: "IP Address", v: "10.40.2.17", from: "Cloud account, scanner", mono: true },
  { k: "Operating System", v: "Ubuntu 22.04.4", from: "Endpoint agent", note: "Takes precedence over scanner: reports the exact build" },
  { k: "Cloud Instance", v: "i-07c2e19a4b", from: "Cloud account", mono: true },
  { k: "Asset Owner", v: "Finance IT", from: "CMDB", note: "Consistent with cloud owner tag" },
  { k: "Asset Criticality", v: "High", from: "CMDB" },
];

const controls = [
  { name: "Endpoint Agent", ok: true },
  { name: "Vulnerability Scanning", ok: true },
  { name: "Backup", ok: false },
];

const readers: { slug: ModuleSlug; reads: string }[] = [
  { slug: "threat-exposure-management", reads: "Asset Criticality" },
  { slug: "vulnerability-patch-management", reads: "Asset Owner" },
  { slug: "automated-penetration-testing", reads: "Test Scope" },
  { slug: "third-party-risk-management", reads: "Vendor Access" },
  { slug: "grc", reads: "Controls" },
];

const captions = [
  "Five data sources each report part of fin-db-02.",
  "Records are matched on shared identifiers: instance ID, IP address and hostname.",
  "Conflicting values are resolved by field precedence, and each field retains its data source.",
  "Asset owner, asset criticality and the backup coverage gap are recorded.",
  "Every module reads the same asset record.",
];

function SightingCard({ s, match }: { s: Sighting; match?: MotionValue<number> }) {
  return (
    <div className="w-60 rounded-2xl border border-ash-grey bg-bone p-4 shadow-[0_16px_32px_-24px_rgb(0_0_0/0.4)]">
      <p className="caption-3 text-slate">{s.source}</p>
      <dl className="mt-3 space-y-1">
        {s.fields.map(([k, v, key]) => (
          <div key={k} className="flex justify-between gap-3">
            <dt className="caption-5 text-slate">{k}</dt>
            <dd className="caption-6 relative font-mono text-ink">
              {key ? (
                <motion.span
                  aria-hidden="true"
                  className="absolute -inset-x-1 -inset-y-0.5 rounded bg-cobalt/15 ring-1 ring-cobalt/40"
                  style={{ opacity: match ?? 0 }}
                />
              ) : null}
              <span className="relative">{v}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function RecordCard({ rowOpacity, extrasOpacity, extrasY, readersOpacity }: {
  rowOpacity?: MotionValue<number>[];
  extrasOpacity?: MotionValue<number>;
  extrasY?: MotionValue<number>;
  readersOpacity?: MotionValue<number>;
}) {
  return (
    <div data-nav-tone="dark" className="on-dark w-full max-w-[460px] rounded-3xl bg-ink p-6 text-bone shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
      <div className="flex items-center justify-between">
        <p className="caption-3 text-ash-grey">Asset Record</p>
        <p className="caption-5 text-ash-grey">5 Data Sources</p>
      </div>
      <dl className="mt-4 divide-y divide-bone/10">
        {record.map((r, i) => (
          <motion.div key={r.k} className="py-2" style={{ opacity: rowOpacity?.[i] }}>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="caption-2 text-ash-grey">{r.k}</dt>
              <dd className={`body-5 text-right ${r.mono ? "font-mono" : ""}`}>{r.v}</dd>
            </div>
            <p className="caption-5 mt-0.5 text-right text-bone/60">
              Source: {r.from}
              {r.note ? ` · ${r.note}` : ""}
            </p>
          </motion.div>
        ))}
      </dl>
      <motion.ul className="mt-4 flex flex-wrap gap-2" style={{ opacity: extrasOpacity, y: extrasY }}>
        {controls.map((c) => (
          <li
            key={c.name}
            className={`caption-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${
              c.ok ? "bg-bone/10 text-bone" : "border border-dashed border-bone/60 text-bone"
            }`}
          >
            {c.ok ? <CheckCircle weight="fill" className="size-3.5" aria-hidden="true" /> : <Circle weight="bold" className="size-3.5" aria-hidden="true" />}
            {c.name}
            {c.ok ? "" : ": Coverage Gap"}
          </li>
        ))}
      </motion.ul>
      <motion.ul className="mt-4 grid grid-cols-5 gap-2 border-t border-bone/10 pt-4" style={{ opacity: readersOpacity }}>
        {readers.map((r) => (
          <li key={r.slug} className="flex flex-col items-center gap-1 text-center">
            <span className="flex size-8 items-center justify-center rounded-lg bg-bone text-ink">
              <ModuleIcon slug={r.slug} className="size-4" />
            </span>
            <span className="caption-5 text-bone/80">{r.reads}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Sightings converge on the centre and fold away.
  const match = useTransform(p, [0.12, 0.2, 0.36, 0.42], [0, 1, 1, 0]);
  const conv = useTransform(p, [0.18, 0.42], [0, 1]);
  const ghostOpacity = useTransform(p, [0, 0.3, 0.4], [1, 1, 0]);
  const cardOpacity = useTransform(p, [0.34, 0.46], [1, 0]);
  const cardScale = useTransform(p, [0.18, 0.46], [1, 0.6]);
  // The record arrives, then its rows, then the extras, then the readers.
  const recOpacity = useTransform(p, [0.38, 0.48], [0, 1]);
  const recScale = useTransform(p, [0.38, 0.5], [0.92, 1]);
  const rowOpacity = record.map((_, i) => useTransform(p, [0.46 + i * 0.03, 0.5 + i * 0.03], [0.15, 1])); // eslint-disable-line react-hooks/rules-of-hooks
  const extrasOpacity = useTransform(p, [0.68, 0.76], [0, 1]);
  const extrasY = useTransform(p, [0.68, 0.76], [16, 0]);
  const readersOpacity = useTransform(p, [0.82, 0.9], [0, 1]);
  const capStops = [0, 0.2, 0.46, 0.66, 0.8, 1];

  return (
    <div ref={ref} className="pin-tall relative h-[360svh]">
      <div className="pin-sticky sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-[var(--header-h)]">
        <div className="page-x relative h-16">
          {captions.map((c, i) => (
            <Caption key={c} text={c} index={i} p={p} from={capStops[i]} to={capStops[i + 1]} />
          ))}
        </div>
        <div className="relative flex-1">
          <div className="absolute left-1/2 top-1/2">
            <motion.div
              aria-hidden="true"
              className="absolute flex size-56 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-dashed border-slate/60 text-center"
              style={{ opacity: ghostOpacity }}
            >
              <span className="caption-6 font-mono text-graphite">fin-db-02</span>
              <span className="caption-5 mt-1 text-slate">5 data source records</span>
            </motion.div>
            {sightings.map((s) => (
              <SightingMotion key={s.source} s={s} conv={conv} opacity={cardOpacity} scale={cardScale} match={match} />
            ))}
            <motion.div className="absolute w-[460px] -translate-x-1/2 -translate-y-1/2" style={{ opacity: recOpacity, scale: recScale }}>
              <RecordCard rowOpacity={rowOpacity} extrasOpacity={extrasOpacity} extrasY={extrasY} readersOpacity={readersOpacity} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Caption({ text, index, p, from, to }: { text: string; index: number; p: MotionValue<number>; from: number; to: number }) {
  const opacity = useTransform(p, index === 0 ? [to - 0.03, to] : [from - 0.03, from, to - 0.03, to], index === 0 ? [1, 0] : index === captions.length - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  return (
    <motion.p className="heading-5 sm:heading-4 absolute inset-x-0 top-0 text-center" style={{ opacity }} aria-hidden={index !== 0}>
      <span className="caption-3 mb-2 block text-slate">Step {index + 1} of {captions.length}</span>
      <NoBreak text={text} />
    </motion.p>
  );
}

function SightingMotion({ s, conv, opacity, scale, match }: { s: Sighting; conv: MotionValue<number>; opacity: MotionValue<number>; scale: MotionValue<number>; match: MotionValue<number> }) {
  const x = useTransform(conv, [0, 1], [s.x, 0]);
  const y = useTransform(conv, [0, 1], [s.y, 0]);
  return (
    <motion.div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ x, y, opacity, scale }}>
      <SightingCard s={s} match={match} />
    </motion.div>
  );
}

// Phones and reduced motion: the same story as a still sequence.
function Still() {
  return (
    <div className="page-x">
      <ol className="space-y-12">
        <li>
          <p className="caption-3 text-slate">Step 1</p>
          <p className="heading-5 mt-1">
            <NoBreak text={captions[0]} />
          </p>
          <div className="-mx-4 mt-6 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {sightings.map((s) => (
              <div key={s.source} className="shrink-0">
                <SightingCard s={s} />
              </div>
            ))}
          </div>
        </li>
        <li>
          <p className="caption-3 text-slate">Steps 2 to 5</p>
          <p className="heading-5 mt-1">The consolidated asset record, with data sources, resolved conflicts, coverage gaps and consuming modules.</p>
          <div className="mt-6">
            <RecordCard />
          </div>
        </li>
      </ol>
    </div>
  );
}

export function AssetMerge() {
  const calm = useCalmMotion();
  const wide = useWide();
  return calm || !wide ? <Still /> : <Pinned />;
}
