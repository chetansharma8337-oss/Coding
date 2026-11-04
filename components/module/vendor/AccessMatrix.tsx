"use client";

import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise, Key } from "@phosphor-icons/react/dist/ssr";
import { fade, spring } from "@/lib/springs";

// The Third-Party Risk Management signature. Vendors are placed by what they can actually reach in your estate
// (across) and the sensitivity of the data behind it (up). The cell decides the tier, and the tier decides how deep
// the review goes. Chips fly from an unsorted tray into their cells as shared layout animations (transforms), and
// a scenario shows a tier changing the moment access changes. Vendor names are invented.

const reach = ["No access", "SaaS user", "API or integration", "Privileged or network"];
const data = ["Regulated or customer data", "Internal data", "Public data"]; // top row is most sensitive
type Vendor = { id: string; name: string; what: string; r: number; d: number };

const vendors: Vendor[] = [
  { id: "payfield", name: "Payfield", what: "Payroll", r: 1, d: 0 },
  { id: "ironbridge", name: "Ironbridge", what: "Managed IT", r: 3, d: 1 },
  { id: "brindle", name: "Brindle", what: "CRM", r: 2, d: 0 },
  { id: "quillmark", name: "Quillmark", what: "E signature", r: 1, d: 1 },
  { id: "sorrel", name: "Sorrel", what: "Analytics", r: 2, d: 1 },
  { id: "kestrel", name: "Kestrel", what: "Facilities", r: 0, d: 2 },
  { id: "pressline", name: "Pressline", what: "Print", r: 0, d: 1 },
];

// Row index 0 is the most sensitive data, so sensitivity = 2 - row.
const tierOf = (r: number, row: number) => {
  const score = r + (2 - row);
  return score >= 4 ? 1 : score >= 2 ? 2 : 3;
};
const tierCell = ["", "bg-bone/[0.16]", "bg-bone/[0.08]", "bg-bone/[0.03]"];

function Chip({ v, tier, highlight }: { v: Vendor; tier?: number; highlight?: boolean }) {
  return (
    <motion.span
      layoutId={v.id}
      className={`caption-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${
        highlight ? "bg-cobalt text-bone" : tier === 1 ? "bg-bone text-ink" : "border border-bone/40 bg-ink text-bone"
      }`}
    >
      {v.name}
      <span className={`caption-5 ${highlight || tier !== 1 ? "text-bone/70" : "text-graphite"}`}>{v.what}</span>
    </motion.span>
  );
}

export function AccessMatrix() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [placed, setPlaced] = useState(false);
  const [apiKey, setApiKey] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setPlaced(true);
      return;
    }
    const a = setTimeout(() => setPlaced(true), 500);
    const b = touched ? undefined : setTimeout(() => setApiKey(true), 3400);
    return () => {
      clearTimeout(a);
      if (b) clearTimeout(b);
    };
  }, [inView, reduce, touched]);

  const pos = (v: Vendor) => (v.id === "payfield" && apiKey ? { r: 2, d: v.d } : { r: v.r, d: v.d });
  const payTier = tierOf(pos(vendors[0]).r, pos(vendors[0]).d);
  const t = reduce ? { duration: 0 } : spring.ui;

  return (
    <div ref={ref}>
      <LayoutGroup>
        <div className="flex min-h-12 flex-wrap items-center gap-2 rounded-2xl border border-dashed border-bone/25 p-2">
          <span className="caption-3 px-2 text-ash-grey">Unsorted</span>
          {!placed ? vendors.map((v) => <Chip key={v.id} v={v} />) : <span className="caption-5 text-ash-grey">Every vendor placed by its access</span>}
        </div>

        <div className="mt-4 overflow-x-auto">
          <div className="grid min-w-[720px] grid-cols-[150px_repeat(4,minmax(0,1fr))] gap-2">
            <span />
            {reach.map((r) => (
              <span key={r} className="caption-3 px-2 pb-1 text-ash-grey">
                {r}
              </span>
            ))}
            {data.map((d, row) => (
              <div key={d} className="contents">
                <span className="caption-6 flex items-center pr-2 text-ash-grey">{d}</span>
                {reach.map((_, col) => {
                  const tier = tierOf(col, row);
                  const here = placed ? vendors.filter((v) => pos(v).r === col && pos(v).d === row) : [];
                  return (
                    <div key={col} className={`relative flex min-h-24 flex-col gap-2 rounded-2xl p-3 ${tierCell[tier]}`}>
                      <span className="caption-5 text-ash-grey">Tier {tier}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {here.map((v) => (
                          <motion.div key={v.id} layout transition={t}>
                            <Chip v={v} tier={tier} highlight={v.id === "payfield" && apiKey} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </LayoutGroup>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="rounded-2xl bg-raised p-4" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={apiKey ? "after" : "before"}
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={reduce ? fade : spring.ui}
            >
              {apiKey ? (
                <>
                  <p className="title-4 flex items-center gap-2">
                    <Key weight="bold" className="size-4" aria-hidden="true" />
                    Payfield was given an API key to hr-app-01
                  </p>
                  <p className="caption-2 mt-1 text-ash-grey">
                    Its tier moved from 2 to {payTier}. Review requested: full security questionnaire and a current SOC 2 Type II report.
                  </p>
                </>
              ) : (
                <>
                  <p className="title-4">Payfield signs in to its own payroll app</p>
                  <p className="caption-2 mt-1 text-ash-grey">Employee bank details, but no access to your systems: Tier 2, standard review.</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setTouched(true);
              setPlaced(true);
              setApiKey((v) => !v);
            }}
            aria-pressed={apiKey}
            className="btn btn-sm btn-light"
          >
            <Key weight="bold" className="size-3.5" aria-hidden="true" />
            {apiKey ? "Revoke the API key" : "Give Payfield an API key"}
          </button>
          <button
            type="button"
            onClick={() => {
              setTouched(true);
              setApiKey(false);
              setPlaced(false);
              setTimeout(() => setPlaced(true), 400);
            }}
            className="btn btn-sm btn-ghost"
          >
            <ArrowCounterClockwise weight="bold" className="size-3.5" aria-hidden="true" />
            Replay
          </button>
        </div>
      </div>
      <p className="caption-5 mt-4 text-ash-grey">Illustrative vendors and tiering rule. You set which cells map to which tier.</p>
    </div>
  );
}
