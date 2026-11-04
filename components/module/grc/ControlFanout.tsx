"use client";

import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise, CheckCircle, Seal } from "@phosphor-icons/react/dist/ssr";
import { ModuleIcon } from "@/components/ModuleIcon";
import type { ModuleSlug } from "@/lib/modules";
import { fade, spring } from "@/lib/springs";

// The GRC signature. Evidence is produced by the modules that did the work, and each item travels into the one
// control it proves (a shared layout animation, so it moves with transforms). The control's count and last tested
// date update as it arrives, and every framework mapped to the control reuses the same evidence. Hover or focus a
// framework to read its requirement. Control IDs are the publishers' own; the rest is sample data.

const evidence: { slug: ModuleSlug; what: string; when: string }[] = [
  { slug: "vulnerability-patch-management", what: "61 verified closures for CVE-2021-44228", when: "4 Nov 02:41" },
  { slug: "automated-penetration-testing", what: "Retest passed: attack path to fin-db-02 closed", when: "4 Nov 03:10" },
  { slug: "threat-exposure-management", what: "12 of 12 CISA KEV findings closed within due date", when: "4 Nov 06:00" },
  { slug: "vulnerability-patch-management", what: "Risk exception EX-0193 approved, expires 31 Jan 2027", when: "4 Nov 09:15" },
];

const frameworks = [
  { id: "ISO/IEC 27001:2022", ref: "A.8.8", text: "Management of technical vulnerabilities" },
  { id: "NIST CSF 2.0", ref: "ID.RA-01", text: "Vulnerabilities in assets are identified, validated, and recorded" },
  { id: "CIS Controls v8.1", ref: "7.7", text: "Remediate Detected Vulnerabilities" },
];

// A piece of evidence in transit. Defined at module level so it keeps its identity between renders, which lets the
// shared layout animation carry it from its source to the control.
function Token({ i, reduce }: { i: number; reduce: boolean }) {
  return (
    <motion.span
      layoutId={`ev-${i}`}
      transition={reduce ? { duration: 0 } : spring.ui}
      className="caption-6 inline-flex items-center gap-1.5 rounded-full bg-bone px-2.5 py-1 text-ink"
    >
      <ModuleIcon slug={evidence[i].slug} className="size-3.5" />
      {evidence[i].when}
    </motion.span>
  );
}

export function ControlFanout() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [filed, setFiled] = useState(0);
  const [run, setRun] = useState(0);
  const [focus, setFocus] = useState<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setFiled(evidence.length);
      return;
    }
    setFiled(0);
    const timers = evidence.map((_, i) => setTimeout(() => setFiled(i + 1), 900 + i * 1100));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce, run]);

  const lastTested = filed ? evidence[filed - 1].when : "28 Oct 14:02";

  return (
    <div ref={ref}>
      <LayoutGroup>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr_1fr] lg:items-center lg:gap-8">
          <div>
            <p className="caption-3 text-ash-grey">Evidence Sources</p>
            <ul className="mt-4 space-y-2">
              {evidence.map((e, i) => {
                const done = i < filed;
                return (
                  <li key={i} className={`rounded-2xl border p-3 transition-colors duration-500 ${done ? "border-bone/10 bg-raised/50" : "border-bone/20 bg-raised"}`}>
                    <div className="flex items-start gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-bone/10">
                        <ModuleIcon slug={e.slug} className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="caption-6 block">{e.what}</span>
                        <span className="mt-2 flex min-h-6 items-center gap-2">
                          {done ? (
                            <span className="caption-5 inline-flex items-center gap-1 text-ash-grey">
                              <CheckCircle weight="fill" className="size-3.5" aria-hidden="true" />
                              Recorded: VM-01
                            </span>
                          ) : (
                            <Token i={i} reduce={!!reduce} />
                          )}
                        </span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div data-nav-tone="light" className="on-light rounded-3xl bg-bone p-6 text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)]">
            <div className="flex items-center justify-between gap-3">
              <p className="caption-6 font-mono">VM-01</p>
              <p className="caption-6 inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-bone">
                <CheckCircle weight="fill" className="size-3.5" aria-hidden="true" />
                Effective
              </p>
            </div>
            <p className="heading-6 mt-3">Remediate Known Exploited Vulnerabilities</p>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-mist p-3">
                <dt className="caption-5 text-slate">Evidence Records</dt>
                <dd className="heading-5 tabular-nums">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={filed}
                      className="inline-block"
                      initial={{ opacity: 0, y: reduce ? 0 : -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduce ? 0 : 10 }}
                      transition={reduce ? fade : spring.ui}
                    >
                      {9 + filed}
                    </motion.span>
                  </AnimatePresence>
                </dd>
              </div>
              <div className="rounded-xl bg-mist p-3">
                <dt className="caption-5 text-slate">Last Tested</dt>
                <dd className="title-3 tabular-nums">{lastTested}</dd>
              </div>
            </dl>
            <p className="caption-5 mt-4 text-slate">Control Owner: Head of Infrastructure</p>
            <div className="mt-4 flex min-h-16 flex-wrap content-start gap-1.5 rounded-xl border border-dashed border-ash-grey p-2">
              {evidence.slice(0, filed).map((_, i) => (
                <span key={i} className="[&>span]:bg-ink [&>span]:text-bone">
                  <Token i={i} reduce={!!reduce} />
                </span>
              ))}
              {!filed ? <span className="caption-5 p-1 text-slate">Awaiting evidence records</span> : null}
            </div>
          </div>

          <div>
            <p className="caption-3 text-ash-grey">Mapped Requirements</p>
            <ul className="mt-4 space-y-2">
              {frameworks.map((f, i) => (
                <motion.li
                  key={f.id}
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={reduce ? fade : { ...spring.ui, delay: 0.2 + i * 0.12 }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setFocus(i)}
                    onMouseLeave={() => setFocus(null)}
                    onFocus={() => setFocus(i)}
                    onBlur={() => setFocus(null)}
                    aria-describedby="fw-req"
                    className={`press w-full rounded-2xl border p-3 text-left ${focus === i ? "border-bone bg-bone text-ink" : "border-bone/20 bg-raised text-bone"}`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="title-4">{f.id}</span>
                      <span className="caption-6 font-mono">{f.ref}</span>
                    </span>
                    <span className={`caption-5 mt-1 flex items-center gap-1 ${focus === i ? "text-graphite" : "text-ash-grey"}`}>
                      <Seal weight="fill" className="size-3.5" aria-hidden="true" />
                      {9 + filed} evidence records applied
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <div id="fw-req" className="mt-3 min-h-16 rounded-2xl bg-raised p-3" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={focus ?? "none"}
                  className="caption-2 text-ash-grey"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={fade}
                >
                  {focus === null ? (
                    "Select a framework to display the requirement text."
                  ) : (
                    <>
                      <span className="font-mono text-bone">{frameworks[focus].ref}</span> {frameworks[focus].text}
                    </>
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </LayoutGroup>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="caption-5 text-ash-grey">Sample data. Requirement identifiers as published by ISO, NIST and CIS.</p>
        <button type="button" onClick={() => setRun((r) => r + 1)} className="btn btn-sm btn-ghost">
          <ArrowCounterClockwise weight="bold" className="size-3.5" aria-hidden="true" />
          Replay Simulation
        </button>
      </div>
    </div>
  );
}
