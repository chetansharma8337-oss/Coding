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
  description: "ASH-V design principles, customer engagement model and content standards.",
  alternates: { canonical: "/company" },
};

const beliefs: { icon: Icon; title: string; body: string }[] = [
  {
    icon: Stack,
    title: "A Single Asset Record",
    body: "Integrating separate tools still leaves separate views of the environment. Every ASH-V module is built on the same asset record.",
  },
  {
    icon: Eye,
    title: "Exploitation-Based Prioritization",
    body: "Severity scores describe potential impact. Known exploitation, reachability and asset criticality determine actual priority.",
  },
  {
    icon: SealCheck,
    title: "Verified Remediation",
    body: "A finding is closed when a verification scan confirms the fix, not when a remediation task changes status.",
  },
  {
    icon: ListChecks,
    title: "Operational Evidence",
    body: "When the system that performs remediation records it, audit evidence is available without separate collection.",
  },
];

const steps = [
  {
    title: "Platform Walkthrough",
    body: "A 30-minute session based on current security tooling, followed by a written pilot scope.",
  },
  {
    title: "Pilot",
    body: "A scoped pilot on part of the environment, with data sources and success criteria agreed in writing in advance.",
  },
  {
    title: "Deployment",
    body: "Modules are added as required. Each module uses the same asset inventory, with no additional reconciliation project.",
  },
];

const honesty = [
  "Product interfaces shown on this website use sample data and are labelled accordingly.",
  "Statistics in published guides cite their primary sources.",
  "Module descriptions reflect current capabilities only.",
];

export default function CompanyPage() {
  return (
    <>
      <PageHero src={pagePhotos.company.src} position={pagePhotos.company.position} lines={["About ASH-V"]}>
        <p className="body-7 sm:body-8 mt-6 text-bone/90">
          ASH-V provides security, IT and audit teams with a single asset record for exposure management, remediation and
          compliance, replacing manual reconciliation between separate tools.
        </p>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro eyebrow="Principles" heading="Platform Design Principles" />
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

      <section aria-label="Platform objective" className="page-x border-t border-ash-grey py-24">
        <InkParagraph
          as="h2"
          className="heading-3 sm:heading-2 lg:heading-1"
          text="Board reporting and audit evidence are produced from the same asset record and remain consistent."
        />
      </section>

      <section data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x">
          <h2 className="heading-4 sm:heading-3 lg:heading-2 max-w-[22ch]">Customer Engagement Model</h2>
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
        <div className="page-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <SectionIntro className="lg:col-span-5" eyebrow="Standards" heading="Content Standards" />
          <ul className="space-y-4 lg:col-span-7">
            {honesty.map((h, i) => (
              <RiseOnView as="li" key={h} delay={i * 0.08} className="title-2 rounded-3xl bg-mist p-6">
                {h}
              </RiseOnView>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand heading="Contact ASH-V" body="Submit a walkthrough request to contact the ASH-V team. A team member will respond to schedule the session." />
    </>
  );
}
