"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowsClockwise, CheckCircle, Pause, Play, Scan, Seal, Stack } from "@phosphor-icons/react/dist/ssr";
import { fade, spring } from "@/lib/springs";

// The Vulnerability & Patch Management signature: a patch moves through rings of devices, a health check
// pauses it, it resumes, and then a rescan decides what is actually fixed. One device installed the patch but is
// still vulnerable, so it goes back in the queue. Every device state is a stack of layers that cross-fade, so
// only opacity and transform ever animate. Sample data.

type State = "pending" | "installed" | "failed" | "verified" | "vulnerable";

const rings = [
  { name: "Ring 0", who: "IT pilot", n: 6 },
  { name: "Ring 1", who: "Early adopters", n: 12 },
  { name: "Ring 2", who: "Broad workstations", n: 30 },
  { name: "Ring 3", who: "Servers", n: 14 },
];
const total = rings.reduce((s, r) => s + r.n, 0);

const stages = [
  { icon: Stack, title: "Staged", body: "The patch for CVE-2021-44228 is routed to Payments, due in 14 days because it is on the KEV list.", due: 14 },
  { icon: Play, title: "Pilot installs", body: "Ring 0 installs during the 22:00 maintenance window.", due: 13 },
  { icon: Pause, title: "Paused", body: "Two Ring 1 hosts fail their health check. Ring 2 holds automatically; the due date keeps counting.", due: 11 },
  { icon: ArrowsClockwise, title: "Resumed", body: "The fixed package ships. Ring 1 completes and Rings 2 and 3 roll out.", due: 9 },
  { icon: Scan, title: "Verified", body: "A rescan checks every device. One installed the patch but is still vulnerable: it waits for a reboot, so it is re-queued.", due: 8 },
  { icon: Seal, title: "Evidenced", body: "Verified closures attach to control VM-01 in GRC, with dates and the scan that confirmed them.", due: 8 },
];

// The one device that installs but stays vulnerable, and the two that fail in Ring 1.
const STUCK = { ring: 2, i: 17 };
const FAILS = [3, 8];

function stateOf(stage: number, ring: number, i: number): State {
  if (ring === 1 && FAILS.includes(i) && stage === 2) return "failed";
  const installed = (ring === 0 && stage >= 1) || (ring === 1 && stage >= 2) || (ring >= 2 && stage >= 3);
  if (!installed) return "pending";
  if (stage >= 4) return ring === STUCK.ring && i === STUCK.i ? "vulnerable" : "verified";
  return "installed";
}

function Dot({ state, reduce }: { state: State; reduce: boolean }) {
  const layers: [State, string][] = [
    ["pending", "border border-bone/30"],
    ["installed", "bg-bone/45"],
    ["failed", "border border-dashed border-bone bg-transparent"],
    ["verified", "bg-bone"],
    ["vulnerable", "bg-bone/45 ring-2 ring-cobalt ring-offset-2 ring-offset-raised"],
  ];
  return (
    <span className="relative block size-3 sm:size-3.5" aria-hidden="true">
      {layers.map(([s, cls]) => (
        <motion.span
          key={s}
          className={`absolute inset-0 rounded-full ${cls}`}
          initial={false}
          animate={{ opacity: state === s ? 1 : 0, scale: state === s ? 1 : 0.6 }}
          transition={reduce ? { duration: 0 } : spring.ui}
        />
      ))}
    </span>
  );
}

export function RingTrack() {
  const [stage, setStage] = useState(0);
  const [touched, setTouched] = useState(false);
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!inView || touched) return;
    if (reduce) {
      setStage(stages.length - 1);
      return;
    }
    const timers = stages.slice(1).map((_, i) => setTimeout(() => setStage(i + 1), 1200 + i * 2200));
    return () => timers.forEach(clearTimeout);
  }, [inView, touched, reduce]);

  const go = (i: number) => {
    setTouched(true);
    setStage(i);
  };

  const counts = { verified: 0, installed: 0, pending: 0, failed: 0, vulnerable: 0 } as Record<State, number>;
  rings.forEach((r, ri) => Array.from({ length: r.n }, (_, i) => counts[stateOf(stage, ri, i)]++));
  const s = stages[stage];

  return (
    <div ref={ref} className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Phones: a compact stepper above the track, so the animation stays in view. */}
      <div className="lg:hidden">
        <ol className="flex gap-2" aria-label="Rollout stages">
          {stages.map((st, i) => (
            <li key={st.title}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === stage ? "step" : undefined}
                aria-label={`${i + 1}. ${st.title}`}
                className={`press body-4 flex size-11 items-center justify-center rounded-xl border ${
                  i === stage ? "border-bone bg-bone text-ink" : i < stage ? "border-bone/40 bg-bone/15" : "border-bone/15 bg-raised"
                }`}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
        <p className="title-3 mt-4">
          {stage + 1}. {s.title}
        </p>
        <p className="body-6 mt-1 text-ash-grey">{s.body}</p>
      </div>

      <ol className="hidden space-y-2 lg:col-span-4 lg:block" aria-label="Rollout stages">
        {stages.map((st, i) => {
          const on = i === stage;
          const done = i < stage;
          return (
            <li key={st.title}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={on ? "step" : undefined}
                className={`press flex w-full items-start gap-4 rounded-2xl border p-4 text-left ${
                  on ? "border-bone bg-bone text-ink" : "border-bone/15 bg-raised text-bone hover:border-bone/50"
                }`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${on ? "bg-ink text-bone" : done ? "bg-bone text-ink" : "bg-bone/10"}`}
                >
                  {done ? <CheckCircle weight="fill" className="size-4" aria-hidden="true" /> : <st.icon weight="bold" className="size-4" aria-hidden="true" />}
                </span>
                <span>
                  <span className="title-4 block">
                    {i + 1}. {st.title}
                  </span>
                  {on ? <span className="caption-5 mt-1 block text-graphite">{st.body}</span> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="relative overflow-hidden rounded-3xl bg-raised p-4 sm:p-6 lg:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="caption-6 rounded-full bg-bone/10 px-3 py-1 font-mono">CVE-2021-44228 · owner Payments</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={s.due}
              className="caption-6 rounded-full border border-bone/30 px-3 py-1"
              initial={{ opacity: 0, y: reduce ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : 8 }}
              transition={reduce ? fade : spring.ui}
            >
              Due in {s.due} days
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="relative mt-6 space-y-4">
          {rings.map((r, ri) => (
            <div key={r.name}>
              {ri === 2 ? (
                // The health gate between rings: dim while checks pass, lit while it holds the rollout.
                <div className="relative mb-4 h-10">
                  <motion.div
                    className="absolute inset-0 flex items-center gap-2 rounded-xl border border-bone/15 px-3"
                    initial={false}
                    animate={{ opacity: stage === 2 ? 0 : 0.6 }}
                    transition={reduce ? fade : spring.ui}
                    aria-hidden={stage === 2}
                  >
                    <CheckCircle weight="regular" className="size-4" aria-hidden="true" />
                    <span className="caption-5">Health gate: checks passing before each ring</span>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 flex items-center gap-2 rounded-xl border border-dashed border-bone bg-bone/10 px-3"
                    initial={false}
                    animate={{ opacity: stage === 2 ? 1 : 0, y: stage === 2 || reduce ? 0 : -6 }}
                    transition={reduce ? fade : spring.ui}
                    aria-hidden={stage !== 2}
                  >
                    <Pause weight="fill" className="size-4" aria-hidden="true" />
                    <span className="caption-6">Ring 2 held: health check failed on 2 hosts</span>
                  </motion.div>
                </div>
              ) : null}
              <div className="grid grid-cols-[96px_1fr] items-center gap-3 sm:grid-cols-[140px_1fr]">
                <div>
                  <p className="title-5">{r.name}</p>
                  <p className="caption-5 text-ash-grey">
                    {r.who} · {r.n}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {Array.from({ length: r.n }, (_, i) => (
                    <Dot key={i} state={stateOf(stage, ri, i)} reduce={reduce} />
                  ))}
                </div>
              </div>
            </div>
          ))}
          {/* The rescan sweeps across the lanes once, during the verify stage. */}
          <AnimatePresence>
            {stage === 4 && !reduce ? (
              <motion.span
                key="scan"
                aria-hidden="true"
                className="pointer-events-none absolute -inset-y-2 left-0 right-0 origin-left rounded-xl border-r-2 border-cobalt bg-cobalt/15"
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{ scaleX: 1, opacity: [1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ scaleX: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 1.8, times: [0, 0.7, 1] } }}
              />
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 border-t border-bone/10 pt-4 sm:grid-cols-4" aria-live="polite">
          {[
            ["Verified fixed", counts.verified],
            ["Installed, not yet verified", counts.installed + counts.vulnerable * (stage >= 4 ? 0 : 1)],
            ["Waiting", counts.pending + counts.failed],
            ["Still vulnerable, re-queued", counts.vulnerable],
          ].map(([label, n]) => (
            <div key={label as string}>
              <p className="heading-5 tabular-nums">
                {n as number}
                <span className="caption-5 text-ash-grey"> / {total}</span>
              </p>
              <p className="caption-5 text-ash-grey">{label}</p>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {stage === 5 ? (
            <motion.div
              key="evidence"
              data-nav-tone="light"
              className="on-light mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-bone p-4 text-ink"
              initial={{ opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? fade : spring.ui}
            >
              <span className="flex items-center gap-3">
                <Seal weight="fill" className="size-6" aria-hidden="true" />
                <span>
                  <span className="title-4 block">Evidence for control VM-01</span>
                  <span className="caption-5 block text-graphite">61 verified closures, 1 re-queued, rescan of 4 Nov 2026</span>
                </span>
              </span>
              <span className="caption-6 rounded-full bg-ink px-3 py-1 text-bone">Sent to GRC</span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <ul className="caption-5 mt-6 flex flex-wrap gap-x-4 gap-y-2 text-ash-grey">
          {(
            [
              ["pending", "Waiting"],
              ["installed", "Installed"],
              ["failed", "Health check failed"],
              ["verified", "Verified fixed"],
              ["vulnerable", "Installed, still vulnerable"],
            ] as [State, string][]
          ).map(([st, label]) => (
            <li key={st} className="flex items-center gap-2">
              <Dot state={st} reduce />
              {label}
            </li>
          ))}
        </ul>
        <p className="caption-5 mt-2 text-ash-grey">Illustrative, sample data</p>
      </div>
    </div>
  );
}
