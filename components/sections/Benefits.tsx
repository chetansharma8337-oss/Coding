import { CheckCircle, ClipboardText, Database, ListNumbers } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { RiseOnView } from "@/components/RiseOnView";
import { SectionIntro } from "./SectionIntro";

const benefits: { icon: Icon; title: string; body: string }[] = [
  {
    icon: Database,
    title: "One asset count everyone agrees on",
    body: "Scanners, cloud accounts, agents and the directory merge into one record per asset, each with an owner.",
  },
  {
    icon: ListNumbers,
    title: "A queue ranked by real risk",
    body: "Exposures are ordered by reachability, known exploitation and the criticality of the asset they sit on.",
  },
  {
    icon: CheckCircle,
    title: "Fixes that are proven, not promised",
    body: "A finding closes when a rescan confirms it, and a validated attack path is retested once a step is fixed.",
  },
  {
    icon: ClipboardText,
    title: "Audit evidence without the spreadsheet",
    body: "Patch records, test results and vendor reviews attach to controls as they happen.",
  },
];

// A2 benefits: outcome first, then the detail that supports it.
export function Benefits() {
  return (
    <section className="py-20 sm:py-24">
      <div className="page-x">
        <SectionIntro muted="What changes." heading="Security, IT and audit stop reconciling and start fixing." />
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
