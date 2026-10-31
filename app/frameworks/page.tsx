import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { InkParagraph } from "@/components/InkParagraph";
import { RiseOnView } from "@/components/RiseOnView";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { frameworks, mappingExample } from "@/lib/frameworks";
import { pagePhotos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Frameworks",
  description:
    "Map a control once to ISO/IEC 27001, NIST CSF 2.0 and the CIS Controls, and let ASH-V supply the evidence from remediation, testing and vendor reviews.",
  alternates: { canonical: "/frameworks" },
};

export default function FrameworksPage() {
  return (
    <>
      <PageHero src={pagePhotos.frameworks.src} position={pagePhotos.frameworks.position} lines={["Map a control once.", "Report it everywhere."]}>
        <p className="body-7 sm:body-8 mt-6 text-bone/90">
          Most frameworks ask the same questions in different words. ASH-V maps each control to every framework you report
          against and attaches evidence from the work your teams already do.
        </p>
        <div className="mt-8">
          <Link href="/walkthrough?interest=grc" className="btn btn-light">
            Book a walkthrough
            <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            muted="The frameworks."
            heading="What you report against, and where the data comes from"
            lead="Three control frameworks and the public catalog ASH-V ranks exposures against. Facts are taken from each publisher's own pages."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {frameworks.map((f, i) => (
              <RiseOnView as="li" key={f.name} delay={(i % 2) * 0.08} className="flex flex-col rounded-3xl border border-ash-grey p-6 sm:p-8">
                <p className="caption-3 text-slate">{f.publisher}</p>
                <h3 className="heading-5 mt-2">{f.name}</h3>
                <ul className="mt-6 space-y-3">
                  {f.facts.map((fact) => (
                    <li key={fact} className="body-6 border-l-2 border-ink pl-4 text-graphite">
                      {fact}
                    </li>
                  ))}
                </ul>
                <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-6">
                  {f.sources.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="caption-1 inline-flex min-h-10 items-center gap-1 text-ink underline decoration-ash-grey underline-offset-4 hover:decoration-ink"
                      >
                        {s.label}
                        <ArrowUpRight weight="bold" className="size-3" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </RiseOnView>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Why it matters" className="page-x border-t border-ash-grey py-24">
        <InkParagraph
          as="h2"
          className="heading-3 sm:heading-2"
          text="Patch a server once, and the evidence shows up under every framework that asks about patching."
        />
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            muted="One control, many frameworks."
            heading="An example mapping"
            lead="Three common controls, the matching requirement in each framework, and the ASH-V module that supplies the evidence. Your control set will differ; this shows the shape."
          />
          <RiseOnView className="mt-12 overflow-x-auto rounded-3xl border border-ash-grey">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="sr-only">Example control mapping across ISO/IEC 27001:2022, NIST CSF 2.0 and CIS Controls v8.1</caption>
              <thead className="bg-mist">
                <tr className="caption-3 text-slate">
                  <th scope="col" className="p-4 font-semibold sm:px-6">
                    Control
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    ISO/IEC 27001:2022
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    NIST CSF 2.0
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    CIS v8.1
                  </th>
                  <th scope="col" className="p-4 font-semibold sm:px-6">
                    Evidence from
                  </th>
                </tr>
              </thead>
              <tbody>
                {mappingExample.map((r) => (
                  <tr key={r.control} className="border-t border-ash-grey align-top">
                    <th scope="row" className="body-5 p-4 sm:px-6">
                      {r.control}
                    </th>
                    <td className="body-6 p-4 font-mono">{r.iso}</td>
                    <td className="body-6 p-4 font-mono">{r.csf}</td>
                    <td className="body-6 p-4 font-mono">{r.cis}</td>
                    <td className="body-6 p-4 text-graphite sm:px-6">{r.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </RiseOnView>
          <p className="caption-2 mt-4 text-slate">Control IDs are the publishers&apos; own. Control names and evidence sources are illustrative.</p>
          <p className="body-3 mt-8">
            Read more in{" "}
            <Link href="/resources/one-control-many-frameworks" className="font-semibold underline underline-offset-4">
              One control, many frameworks
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand href="/walkthrough?interest=grc" secondary={{ href: "/platform/grc", label: "Explore GRC" }} />
    </>
  );
}
