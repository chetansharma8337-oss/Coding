"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise, Play } from "@phosphor-icons/react/dist/ssr";
import { fade, spring } from "@/lib/springs";

// The Threat Exposure Management signature. Eight findings start in CVSS order, the way a scanner export
// arrives. Each signal you switch on adds its points, and the cards slide to their new rank (layout animation,
// which moves them with transforms). Every card says why it moved, and selecting one shows the arithmetic.
// CVE IDs and CVSS scores are real; assets, owners and weights are illustrative.

type Signal = "criticality" | "reach" | "kev" | "path";
type Finding = {
  id: string;
  title: string;
  asset: string;
  cvss: number | null;
  severity: string;
  crit: "High" | "Medium" | "Low";
  reach: "Internet" | "Internal" | "Not reachable";
  kev: boolean;
  path: boolean;
};

const findings: Finding[] = [
  { id: "CVE-2024-3400", title: "PAN-OS GlobalProtect", asset: "vpn-gw-01", cvss: 10, severity: "Critical", crit: "High", reach: "Internet", kev: true, path: false },
  { id: "CVE-2021-44228", title: "Apache Log4j", asset: "billing-api-04", cvss: 10, severity: "Critical", crit: "High", reach: "Internal", kev: true, path: false },
  { id: "CVE-2023-38545", title: "curl SOCKS5 heap overflow", asset: "lab-vm-12", cvss: 9.8, severity: "Critical", crit: "Low", reach: "Not reachable", kev: false, path: false },
  { id: "CVE-2024-21762", title: "FortiOS SSL VPN", asset: "edge-fw-02", cvss: 9.8, severity: "Critical", crit: "High", reach: "Internet", kev: true, path: true },
  { id: "CVE-2022-22965", title: "Spring Framework", asset: "intranet-wiki-02", cvss: 9.8, severity: "Critical", crit: "Low", reach: "Internal", kev: true, path: false },
  { id: "CVE-2023-34362", title: "MOVEit Transfer", asset: "mft-prod-01", cvss: 9.8, severity: "Critical", crit: "Medium", reach: "Internal", kev: true, path: false },
  { id: "MISCONFIG-114", title: "Local admin password reused", asset: "jump-host-03", cvss: null, severity: "Medium", crit: "High", reach: "Internal", kev: false, path: true },
  { id: "MISCONFIG-207", title: "SMB signing not required", asset: "print-srv-01", cvss: null, severity: "Medium", crit: "Low", reach: "Internal", kev: false, path: false },
];

const signals: { key: Signal; label: string; hint: string }[] = [
  { key: "criticality", label: "Asset criticality", hint: "From Asset Intelligence" },
  { key: "reach", label: "Reachability", hint: "Internet, internal or not reachable" },
  { key: "kev", label: "Known exploitation", hint: "CISA KEV and your threat intel" },
  { key: "path", label: "Validated attack path", hint: "From Automated Penetration Testing" },
];

const base = (f: Finding) => (f.cvss ?? (f.severity === "Medium" ? 5 : 4)) * 4;
const parts = (f: Finding, on: Set<Signal>) => {
  const list: { label: string; pts: number }[] = [{ label: f.cvss ? `CVSS ${f.cvss.toFixed(1)}` : `Severity ${f.severity}`, pts: base(f) }];
  if (on.has("criticality")) list.push({ label: `${f.crit} criticality asset`, pts: f.crit === "High" ? 20 : f.crit === "Medium" ? 10 : 0 });
  if (on.has("reach")) list.push({ label: f.reach === "Not reachable" ? "Not reachable" : `${f.reach} reachable`, pts: f.reach === "Internet" ? 20 : f.reach === "Internal" ? 8 : -20 });
  if (on.has("kev")) list.push({ label: f.kev ? "Listed in CISA KEV" : "No known exploitation", pts: f.kev ? 15 : 0 });
  if (on.has("path")) list.push({ label: f.path ? "On a validated path" : "No validated path", pts: f.path ? 25 : 0 });
  return list;
};
const total = (f: Finding, on: Set<Signal>) => parts(f, on).reduce((s, p) => s + p.pts, 0);
const MAX = 120;

function tags(f: Finding, on: Set<Signal>) {
  const t: string[] = [];
  if (on.has("path") && f.path) t.push("Path validated");
  if (on.has("kev") && f.kev) t.push("On KEV");
  if (on.has("reach")) t.push(f.reach === "Internet" ? "Internet facing" : f.reach === "Not reachable" ? "Not reachable" : "Internal");
  if (on.has("criticality") && f.crit === "High") t.push("Critical asset");
  return t;
}

export function ReRank() {
  const [on, setOn] = useState<Set<Signal>>(new Set());
  const [selected, setSelected] = useState(findings[3].id);
  const [touched, setTouched] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  // Once in view, the signals switch on one by one, unless the visitor takes over first.
  useEffect(() => {
    if (!inView || touched) return;
    if (reduce) {
      setOn(new Set(signals.map((s) => s.key)));
      return;
    }
    const timers = signals.map((s, i) => setTimeout(() => setOn((cur) => new Set(cur).add(s.key)), 900 + i * 1500));
    return () => timers.forEach(clearTimeout);
  }, [inView, touched, reduce]);

  const toggle = (k: Signal) => {
    setTouched(true);
    setOn((cur) => {
      const next = new Set(cur);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };
  const reset = () => {
    setTouched(true);
    setOn(new Set());
  };
  const all = () => {
    setTouched(true);
    setOn(new Set(signals.map((s) => s.key)));
  };

  const ranked = [...findings].sort((a, b) => total(b, on) - total(a, on) || (b.cvss ?? 0) - (a.cvss ?? 0));
  const startRank = Object.fromEntries([...findings].sort((a, b) => base(b) - base(a)).map((f, i) => [f.id, i + 1]));
  const sel = findings.find((f) => f.id === selected)!;
  const layoutT = reduce ? { duration: 0 } : spring.ui;

  return (
    <div ref={ref} className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-4">
        <fieldset>
          <legend className="caption-3 text-ash-grey">Signals</legend>
          <ul className="mt-4 space-y-2">
            {signals.map((s, i) => {
              const active = on.has(s.key);
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={active}
                    onClick={() => toggle(s.key)}
                    className={`press flex w-full items-center gap-4 rounded-2xl border p-4 text-left ${
                      active ? "border-bone bg-bone text-ink" : "border-bone/20 bg-raised text-bone hover:border-bone/60"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`relative flex h-6 w-10 shrink-0 items-center rounded-full p-0.5 transition-colors duration-300 ${active ? "bg-ink" : "bg-bone/20"}`}
                    >
                      <span
                        className={`size-5 rounded-full bg-bone transition-transform duration-500 ease-[var(--ease-settle)] ${active ? "translate-x-4" : ""}`}
                      />
                    </span>
                    <span>
                      <span className="title-4 block">
                        {i + 1}. {s.label}
                      </span>
                      <span className={`caption-5 block ${active ? "text-graphite" : "text-ash-grey"}`}>{s.hint}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={all} className="btn btn-sm btn-light">
            <Play weight="fill" className="size-3.5" aria-hidden="true" />
            All signals
          </button>
          <button type="button" onClick={reset} className="btn btn-sm btn-ghost">
            <ArrowCounterClockwise weight="bold" className="size-3.5" aria-hidden="true" />
            CVSS only
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-raised p-4" aria-live="polite">
          <p className="caption-3 text-ash-grey">Why #{ranked.findIndex((f) => f.id === sel.id) + 1}</p>
          <p className="title-4 mt-2">
            <span className="font-mono">{sel.id}</span> on <span className="font-mono">{sel.asset}</span>
          </p>
          <ul className="mt-3 space-y-1">
            <AnimatePresence initial={false}>
              {parts(sel, on).map((p) => (
                <motion.li
                  key={p.label}
                  className="caption-2 flex justify-between gap-3"
                  initial={{ opacity: 0, x: reduce ? 0 : -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={reduce ? fade : spring.ui}
                >
                  <span className="text-ash-grey">{p.label}</span>
                  <span className="font-mono tabular-nums">{p.pts > 0 ? `+${p.pts.toFixed(0)}` : p.pts.toFixed(0)}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <p className="caption-6 mt-3 flex justify-between border-t border-bone/15 pt-3">
            <span>Score</span>
            <span className="font-mono tabular-nums">{total(sel, on).toFixed(0)}</span>
          </p>
        </div>
      </div>

      <div className="lg:col-span-8">
        <div className="flex items-center justify-between gap-4">
          <p className="caption-3 text-ash-grey">{on.size ? `Ranked with ${on.size} of 4 signals` : "Sorted by CVSS, like a scanner export"}</p>
          <p className="caption-5 text-ash-grey">Illustrative weights and assets</p>
        </div>
        <ol className="mt-4 space-y-2">
          {ranked.map((f, i) => {
            const score = total(f, on);
            const moved = startRank[f.id] - (i + 1);
            const isSel = f.id === selected;
            return (
              <motion.li key={f.id} layout transition={layoutT}>
                <button
                  type="button"
                  onClick={() => setSelected(f.id)}
                  aria-pressed={isSel}
                  className={`press grid w-full grid-cols-[32px_1fr_auto] items-center gap-x-3 gap-y-2 rounded-2xl p-3 text-left sm:grid-cols-[32px_1.4fr_1fr_120px] sm:p-4 ${
                    isSel ? "bg-bone text-ink" : "bg-raised text-bone hover:bg-bone/10"
                  }`}
                >
                  <span className="heading-6 tabular-nums">{i + 1}</span>
                  <span className="min-w-0">
                    <span className="caption-6 block font-mono">{f.id}</span>
                    <span className={`caption-5 block truncate ${isSel ? "text-graphite" : "text-ash-grey"}`}>
                      {f.title} · <span className="font-mono">{f.asset}</span>
                    </span>
                  </span>
                  <span className="col-span-3 flex flex-wrap gap-1 sm:col-span-1">
                    <AnimatePresence initial={false}>
                      {tags(f, on).map((t) => (
                        <motion.span
                          key={t}
                          className={`caption-6 rounded-full px-2 py-0.5 ${
                            t === "Not reachable"
                              ? "border border-dashed border-current"
                              : isSel
                                ? "bg-ink text-bone"
                                : "bg-bone/15"
                          }`}
                          initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={reduce ? fade : spring.ui}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </span>
                  <span className="col-start-3 row-start-1 flex flex-col items-end gap-1 sm:col-start-4">
                    <span className="caption-6 font-mono tabular-nums">
                      {score.toFixed(0)}
                      {on.size && moved !== 0 ? (
                        <span className={`ml-2 ${isSel ? "text-graphite" : "text-ash-grey"}`}>
                          {moved > 0 ? `▲${moved}` : `▼${-moved}`}
                        </span>
                      ) : null}
                    </span>
                    <span className={`h-1.5 w-full min-w-16 overflow-hidden rounded-full ${isSel ? "bg-mist" : "bg-bone/15"}`} aria-hidden="true">
                      <motion.span
                        className={`block h-full origin-left rounded-full ${isSel ? "bg-ink" : "bg-bone"}`}
                        initial={false}
                        animate={{ scaleX: Math.max(0.02, score / MAX) }}
                        transition={reduce ? { duration: 0 } : spring.ui}
                      />
                    </span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
