"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { ModuleSlug } from "@/lib/modules";
import { ModuleIcon } from "./ModuleIcon";
import { NoBreak } from "./NoBreak";

export const flowSteps: { verb: string; slug: ModuleSlug; module: string; body: string; evidence: string }[] = [
  {
    verb: "Found",
    evidence: "edge-fw-02 · owner Network",
    slug: "asset-intelligence",
    module: "Asset Intelligence",
    body: "edge-fw-02 is in the inventory with an owner, Network, and a criticality.",
  },
  {
    verb: "Ranked",
    evidence: "CVE-2024-21762 · KEV",
    slug: "threat-exposure-management",
    module: "Threat Exposure Management",
    body: "CVE-2024-21762 is on the KEV list and the VPN faces the internet, so it goes near the top.",
  },
  {
    verb: "Proven",
    evidence: "path to fin-db-02",
    slug: "automated-penetration-testing",
    module: "Automated Penetration Testing",
    body: "A test confirms the VPN leads to fin-db-02, so it moves to rank 1.",
  },
  {
    verb: "Fixed",
    evidence: "rescan: closed",
    slug: "vulnerability-patch-management",
    module: "Vulnerability & Patch Management",
    body: "Network gets the work, patches in rings, and a rescan closes it.",
  },
  {
    verb: "Evidenced",
    evidence: "control VM-01",
    slug: "grc",
    module: "GRC",
    body: "The patch record and retest attach to control VM-01 for the next audit.",
  },
];

// The line draws as the section scrolls: it shows one finding travelling module to module,
// which is the claim the section makes. Reduced motion shows the finished line.
export function FindingFlow() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

  return (
    <ol ref={ref} className="relative grid gap-0 lg:grid-cols-5 lg:gap-6">
      {/* Track and progress, vertical on phones and tablets, horizontal on desktop. */}
      <span className="absolute bottom-6 left-[19px] top-6 w-px bg-ash-grey lg:hidden" aria-hidden="true" />
      <motion.span
        className="absolute bottom-6 left-[19px] top-6 w-px origin-top bg-ink lg:hidden"
        style={{ scaleY: scale }}
        aria-hidden="true"
      />
      <span className="absolute left-5 right-5 top-5 hidden h-px bg-ash-grey lg:block" aria-hidden="true" />
      <motion.span
        className="absolute left-5 right-5 top-5 hidden h-px origin-left bg-ink lg:block"
        style={{ scaleX: scale }}
        aria-hidden="true"
      />

      {flowSteps.map((s, i) => (
        <li key={s.verb} className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:gap-6 lg:pb-0">
          <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-bone">
            <ModuleIcon slug={s.slug} className="size-5" />
          </span>
          <span className="block">
            <span className="micro-label block text-slate">
              Step {String(i + 1).padStart(2, "0")}
            </span>
            <span className="heading-sm mt-2 block">{s.verb}</span>
            <span className="mt-2 block max-w-[38ch] text-[15px] leading-[1.55] text-graphite">
              <NoBreak text={s.body} />
            </span>
            <Link
              href={`/platform/${s.slug}`}
              className="mt-3 inline-flex min-h-11 items-center text-[14px] font-semibold text-ink/80 underline decoration-ash-grey underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              {s.module}
            </Link>
          </span>
        </li>
      ))}
    </ol>
  );
}
