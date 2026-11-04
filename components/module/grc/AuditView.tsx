"use client";

import { motion, useReducedMotion } from "motion/react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { fade } from "@/lib/springs";

// Hero visual: the view an auditor gets. Each control with its owner, how much evidence it has, where that evidence
// came from, and when it was last tested.
const rows = [
  { id: "AM-02", name: "Asset Inventory and Ownership", owner: "IT Operations", n: 14, from: "Asset Intelligence", last: "4 Nov 2026", ok: true },
  { id: "VM-01", name: "Remediate Known Exploited Vulnerabilities", owner: "Infrastructure", n: 13, from: "Vulnerability & Patch, Penetration Testing", last: "4 Nov 2026", ok: true },
  { id: "PT-02", name: "Attack Path Testing After Major Changes", owner: "Security Operations", n: 6, from: "Penetration Testing", last: "3 Nov 2026", ok: true },
  { id: "SR-04", name: "Vendor Review by Access Level", owner: "Procurement", n: 22, from: "Third-Party Risk", last: "1 Nov 2026", ok: true },
  { id: "BK-01", name: "Backup of Critical Servers", owner: "Infrastructure", n: 2, from: "Asset Intelligence", last: "12 Sep 2026", ok: false },
];

export function AuditView() {
  const reduce = useReducedMotion();
  return (
    <figure data-nav-tone="light" className="on-light mx-auto max-w-[1100px] overflow-hidden rounded-3xl bg-bone text-ink shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)]">
      <div className="flex items-center justify-between gap-4 border-b border-ash-grey px-6 py-4">
        <span className="caption-3 text-slate">Audit View: ISO/IEC 27001:2022 Scope</span>
        <figcaption className="caption-5 text-slate">Sample data</figcaption>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="caption-3 text-slate">
              {["Control", "Control Owner", "Evidence Records", "Evidence Source", "Last Tested", "Status"].map((h) => (
                <th key={h} scope="col" className="px-6 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr
                key={r.id}
                className="border-t border-ash-grey"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { y: { duration: 0 }, opacity: fade } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.7 + i * 0.1 }}
              >
                <th scope="row" className="px-6 py-3 font-normal">
                  <span className="caption-6 block font-mono">{r.id}</span>
                  <span className="body-6 block">{r.name}</span>
                </th>
                <td className="body-6 px-6 py-3 text-graphite">{r.owner}</td>
                <td className="caption-6 px-6 py-3 tabular-nums">{r.n}</td>
                <td className="body-6 px-6 py-3 text-graphite">{r.from}</td>
                <td className="body-6 px-6 py-3 tabular-nums">{r.last}</td>
                <td className="px-6 py-3">
                  <span className={`caption-6 inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 ${r.ok ? "bg-ink text-bone" : "border border-dashed border-ink"}`}>
                    {r.ok ? <CheckCircle weight="fill" className="size-3.5" aria-hidden="true" /> : <WarningCircle weight="bold" className="size-3.5" aria-hidden="true" />}
                    {r.ok ? "Effective" : "Test Overdue"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
