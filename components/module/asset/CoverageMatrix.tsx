"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { fade } from "@/lib/springs";

// Coverage gaps as a picture: assets down the side, required controls across the top. Filled cells settle
// in row by row; the gaps stay as hollow rings, which is the point of the chart.
const cols = ["Owner", "Endpoint agent", "Vulnerability scan", "Backup", "Central logging"];
const rows: { asset: string; note: string; has: boolean[] }[] = [
  { asset: "fin-db-02", note: "Database server", has: [true, true, true, false, true] },
  { asset: "billing-api-04", note: "Container workload", has: [true, true, true, true, true] },
  { asset: "mft-prod-01", note: "Virtual machine", has: [true, true, true, true, false] },
  { asset: "laptop-ops-118", note: "Endpoint", has: [true, true, false, true, true] },
  { asset: "legacy-ftp-01", note: "Seen only by a network scan", has: [false, false, true, false, false] },
  { asset: "kiosk-lobby-03", note: "Unknown device", has: [false, false, true, false, false] },
];

export function CoverageMatrix() {
  const reduce = useReducedMotion();
  const missing = cols.map((_, c) => rows.filter((r) => !r.has[c]).length);
  return (
    <figure className="overflow-x-auto rounded-3xl bg-raised p-4 sm:p-6">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">Coverage of required controls per asset. Sample data.</caption>
        <thead>
          <tr>
            <th scope="col" className="caption-3 pb-4 pr-4 font-semibold text-ash-grey">
              Asset
            </th>
            {cols.map((c) => (
              <th key={c} scope="col" className="caption-3 pb-4 text-center font-semibold text-ash-grey">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={r.asset} className="border-t border-bone/10">
              <th scope="row" className="py-3 pr-4 font-normal">
                <span className="caption-6 block font-mono text-bone">{r.asset}</span>
                <span className="caption-5 block text-ash-grey">{r.note}</span>
              </th>
              {r.has.map((ok, ci) => (
                <td key={ci} className="py-3 text-center">
                  <motion.span
                    className={`inline-flex size-8 items-center justify-center rounded-full align-middle ${ok ? "bg-bone text-ink" : "border border-dashed border-bone/70"}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={reduce ? { scale: { duration: 0 }, opacity: fade } : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: ri * 0.08 + ci * 0.03 }}
                  >
                    {ok ? <Check weight="bold" className="size-4" aria-hidden="true" /> : null}
                    <span className="sr-only">{ok ? "Covered" : "Missing"}</span>
                  </motion.span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-bone/30">
            <th scope="row" className="caption-1 pt-4 pr-4 text-left text-bone">
              Missing
            </th>
            {missing.map((m, i) => (
              <td key={i} className="caption-6 pt-4 text-center text-bone">
                {m}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
      <figcaption className="caption-5 mt-4 text-ash-grey">Illustrative, sample data. Required controls are set per asset type.</figcaption>
    </figure>
  );
}
