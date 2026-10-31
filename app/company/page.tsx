import type { Metadata } from "next";
import { Eye, ListChecks, SealCheck, Stack } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { InkParagraph } from "@/components/InkParagraph";
import { RiseOnView } from "@/components/RiseOnView";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { pagePhotos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Company",
  description: "Why ASH-V exists, what we believe about exposure management, and how we work with customers.",
  alternates: { canonical: "/company" },
};

const beliefs: { icon: Icon; title: string; body: string }[] = [
  {
    icon: Stack,
    title: "One record beats six integrations",
    body: "Connecting six tools still leaves six versions of the estate. We build every module on the same asset record instead.",
  },
  {
    icon: Eye,
    title: "Rank by what attackers use",
    body: "A severity score says how bad a flaw could be. Exploitation, reachability and the asset it sits on say whether it matters to you.",
  },
  {
    icon: SealCheck,
    title: "Done means verified",
    body: "A finding is fixed when a rescan confirms it, not when a ticket changes colour.",
  },
  {
    icon: ListChecks,
    title: "Evidence is a by product of the work",
    body: "If the system that did the remediation writes the record, nobody has to rebuild it for the audit.",
  },
];

const steps = [
  {
    title: "Walkthrough",
    body: "A 30 minute working session built around the tools you run today. You leave with a written summary of what a pilot would cover.",
  },
  {
    title: "Pilot",
    body: "A scoped pilot on part of your estate, with the data sources and the outcomes to measure agreed in writing first.",
  },
  {
    title: "Rollout",
    body: "Add modules as you need them. Each one joins the same inventory, so there is no new reconciliation project.",
  },
];

const honesty = [
  "Product screens on this site use sample data, and say so.",
  "Every statistic in our guides names its source.",
  "We describe what each module does, not what it might do one day.",
];

export default function CompanyPage() {
  return (
    <>
      <PageHero src={pagePhotos.company.src} position={pagePhotos.company.position} lines={["Built to end", "the reconciliation."]}>
        <p className="body-7 sm:body-8 mt-6 text-bone/90">
          Security, IT and audit teams lose too much of every week arguing about whose spreadsheet is right. ASH-V gives them
          one record to work from, so the time goes into fixing things instead.
        </p>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro muted="What we believe." heading="Four ideas behind every module" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {beliefs.map((b, i) => (
              <RiseOnView as="li" key={b.title} delay={(i % 2) * 0.08}>
                <div className="lift group h-full rounded-3xl border border-ash-grey p-6 hover:border-ink sm:p-8">
                  <b.icon
                    weight="light"
                    className="size-10 transition-transform duration-500 ease-[var(--ease-settle)] group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <h3 className="heading-5 mt-8">{b.title}</h3>
                  <p className="body-3 mt-3 text-graphite">{b.body}</p>
                </div>
              </RiseOnView>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Our aim" className="page-x border-t border-ash-grey py-24">
        <InkParagraph
          as="h2"
          className="heading-3 sm:heading-2 lg:heading-1"
          text="We want the answer to the board and the answer to the auditor to be the same answer."
        />
      </section>

      <section data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x">
          <h2 className="heading-4 sm:heading-3 lg:heading-2 max-w-[22ch]">How we work with customers</h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <RiseOnView as="li" key={s.title} delay={i * 0.1} className="rounded-3xl bg-raised p-6 sm:p-8">
                <span className="body-4 flex size-10 items-center justify-center rounded-full border border-bone/60">{i + 1}</span>
                <h3 className="heading-5 mt-8">{s.title}</h3>
                <p className="body-6 mt-3 text-ash-grey">{s.body}</p>
              </RiseOnView>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x grid gap-12 lg:grid-cols-12">
          <SectionIntro className="lg:col-span-5" heading="How we write about ourselves" />
          <ul className="space-y-4 lg:col-span-7">
            {honesty.map((h, i) => (
              <RiseOnView as="li" key={h} delay={i * 0.08} className="title-2 rounded-3xl bg-mist p-6">
                {h}
              </RiseOnView>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand heading="Talk to the team." body="The quickest way to reach us is to book a walkthrough. We reply to agree a time." />
    </>
  );
}
