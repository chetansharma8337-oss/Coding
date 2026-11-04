"use client";

import { motion, useReducedMotion } from "motion/react";
import { fade } from "@/lib/springs";

// Evidence on a calendar: each vendor certificate or assessment as a marker on the months ahead. Markers drop in
// one after another; those inside the 60 day renewal window are already requested.
const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const items = [
  { vendor: "Payfield", doc: "SOC 2 Type II", at: 1.3, requested: true },
  { vendor: "Brindle", doc: "ISO/IEC 27001 Certificate", at: 1.9, requested: true },
  { vendor: "Ironbridge", doc: "Security Questionnaire", at: 3.1, requested: false },
  { vendor: "Sorrel", doc: "Penetration Test Summary", at: 4.4, requested: false },
  { vendor: "Quillmark", doc: "SOC 2 Type II", at: 5.2, requested: false },
];

export function ExpiryTimeline() {
  const reduce = useReducedMotion();
  return (
    <figure className="rounded-3xl border border-ash-grey p-6 sm:p-8">
      <div className="relative">
        <div className="grid grid-cols-6 border-b border-ink pb-2">
          {months.map((m) => (
            <span key={m} className="caption-3 text-slate">
              {m}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute -bottom-2 left-0 top-0 w-[33.3%] rounded-lg bg-cobalt/[0.06]" aria-hidden="true" />
        <span className="caption-5 absolute -top-6 left-0 text-cobalt">Renewal Window: 60 Days</span>
      </div>
      <ul className="relative mt-6 space-y-3">
        {items.map((it, i) => (
          <motion.li
            key={it.vendor + it.doc}
            className="relative sm:h-12"
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={reduce ? { y: { duration: 0 }, opacity: fade } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
          >
            {/* Markers in the second half open their label to the left, so it never runs off the edge. */}
            <span
              // Phones: a plain list (static positioning ignores the offsets). Wider screens: placed on the calendar.
              className={`static top-0 flex items-center gap-2 sm:absolute ${it.at > 3 ? "sm:translate-x-2 sm:flex-row-reverse sm:text-right" : "sm:-translate-x-2"}`}
              style={it.at > 3 ? { right: `${100 - (it.at / 6) * 100}%` } : { left: `${(it.at / 6) * 100}%` }}
            >
              <span className={`size-4 shrink-0 rounded-full ${it.requested ? "bg-ink" : "border-2 border-ink bg-bone"}`} aria-hidden="true" />
              <span className="sm:whitespace-nowrap">
                <span className="title-5 block">
                  {it.vendor}
                  <span className="caption-5 ml-2 text-slate sm:hidden">{months[Math.floor(it.at)]}</span>
                </span>
                <span className="caption-5 block text-graphite">
                  {it.doc}
                  {it.requested ? " · Renewal Requested" : ""}
                </span>
              </span>
            </span>
          </motion.li>
        ))}
      </ul>
      <figcaption className="caption-5 mt-6 text-slate">Sample data. Filled markers indicate an issued renewal request.</figcaption>
    </figure>
  );
}
