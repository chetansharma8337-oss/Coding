import { CheckCircle, ClipboardText, Database, ListNumbers } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { RiseOnView } from "@/components/RiseOnView";
import { SectionIntro } from "./SectionIntro";

const benefits: { icon: Icon; title: string; body: string }[] = [
  {
    icon: Database,
    title: "Consolidated Asset Inventory",
    body: "Scanners, cloud accounts, endpoint agents and the directory are consolidated into one asset record per asset, each with an asset owner.",
  },
  {
    icon: ListNumbers,
    title: "Risk-Based Prioritization",
    body: "Findings are ranked by reachability, known exploitation and the criticality of the affected asset.",
  },
  {
    icon: CheckCircle,
    title: "Verified Remediation",
    body: "A finding is closed only after a verification scan confirms the fix. Validated attack paths are retested after remediation.",
  },
  {
    icon: ClipboardText,
    title: "Continuous Evidence Collection",
    body: "Remediation records, test results and vendor assessments are attached to controls as evidence records when they are produced.",
  },
];

// A2 benefits: outcome first, then the detail that supports it.
export function Benefits() {
  return (
    <section className="py-20 sm:py-24">
      <div className="page-x">
        <SectionIntro eyebrow="Platform Outcomes" heading="Core Platform Capabilities" lead="Every module reads from and writes to the same asset record, removing manual reconciliation between teams." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <RiseOnView as="li" key={b.title} delay={i * 0.08}>
              <div className="lift group flex h-full flex-col rounded-3xl border border-ash-grey bg-mist p-6 hover:border-ink hover:bg-bone">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-bone transition-transform duration-500 ease-[var(--ease-settle)] group-hover:scale-110">
                  <b.icon weight="light" className="size-6" aria-hidden="true" />
                </span>
                <h3 className="heading-6 mt-8">{b.title}</h3>
                <p className="body-6 mt-3 text-graphite">{b.body}</p>
              </div>
            </RiseOnView>
          ))}
        </ul>
      </div>
    </section>
  );
}
