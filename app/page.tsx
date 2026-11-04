import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { FindingRail } from "@/components/FindingRail";
import { FlowCarousel } from "@/components/FlowCarousel";
import { FormSkeleton } from "@/components/FormSkeleton";
import { HeroIntro } from "@/components/HeroIntro";
import { InkParagraph } from "@/components/InkParagraph";
import { PhotoBand } from "@/components/PhotoBand";
import { PinnedHero } from "@/components/PinnedHero";
import { PlatformTour } from "@/components/PlatformTour";
import { ProductFrame } from "@/components/ProductFrame";
import { ExposurePreview } from "@/components/previews/Previews";
import { RiseOnView } from "@/components/RiseOnView";
import { Benefits } from "@/components/sections/Benefits";
import { Faq } from "@/components/sections/Faq";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { SolutionCards } from "@/components/sections/SolutionCards";
import { SkyStatement } from "@/components/SkyStatement";
import { WalkthroughForm } from "@/components/WalkthroughForm";
import { WordReveal } from "@/components/WordReveal";
import { homeFaq } from "@/lib/faq";
import { photos } from "@/lib/images";
import { callAgenda } from "@/lib/walkthrough";

const proof = ["Prioritization against the CISA KEV catalog", "Control mapping to ISO/IEC 27001, NIST CSF and CIS Controls"];

export default function Home() {
  return (
    <>
      <PinnedHero
        src={photos.heroEarth}
        caption="Findings ranked by asset criticality and assigned to the asset owner."
        intro={
          <HeroIntro lines={["Unified Exposure", "Management and GRC"]}>
            <p className="body-7 sm:body-8 mt-6 text-bone/90">
              ASH-V unifies asset intelligence, exposure management, remediation, penetration testing, third-party risk and GRC
              on a single asset record. Every finding is linked to the same asset, asset owner and control.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/walkthrough" className="btn btn-light">
                Request a Walkthrough
                <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {proof.map((p) => (
                <li key={p} className="caption-1 flex items-center gap-2 text-bone/85 sm:whitespace-nowrap">
                  <CheckCircle weight="fill" className="size-4 shrink-0" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </HeroIntro>
        }
        frame={
          <ProductFrame label="Exposure Queue" flat elevated>
            <ExposurePreview compact />
          </ProductFrame>
        }
      />

      <section id="approach" className="page-x py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="caption-3 mb-4 text-slate">Challenge</p>
            <WordReveal parts="Fragmented Asset and Risk Data" className="heading-4 sm:heading-3 lg:heading-2 max-w-[18ch]" />
            <RiseOnView delay={0.1}>
              <p className="body-7 mt-6 max-w-[56ch] text-graphite">
                Vulnerability scanners, the CMDB, penetration test reports, vendor registers and audit spreadsheets each maintain
                a separate view of the environment, and each requires manual reconciliation before remediation can begin.
              </p>
            </RiseOnView>
          </div>
          <RiseOnView className="self-end lg:col-span-5" delay={0.2}>
            <p className="heading-4 sm:heading-3">A Single Asset Record</p>
            <p className="body-3 mt-4 text-graphite">
              Every ASH-V module reads from and writes to the same asset record. A finding retains the same identity and history
              from prioritization through testing, remediation and audit.
            </p>
          </RiseOnView>
        </div>
      </section>

      <Benefits />

      <PhotoBand src={photos.opsServerRoom} line="Shared Data for Security, IT and Audit" />

      <section id="platform" className="pt-20 sm:pt-24">
        <div className="page-x">
          <SectionIntro
            eyebrow="Modules"
            heading="Six Integrated Modules"
            lead={
              <>
                Each module can be deployed independently and shares the same asset inventory. Integration details are
                available in the{" "}
                <Link href="/platform" className="font-semibold text-ink underline underline-offset-4">
                  Platform Overview
                </Link>
                .
              </>
            }
          />
          <div className="mt-12 lg:mt-0">
            <PlatformTour />
          </div>
        </div>
      </section>

      <div id="flow" className="border-t border-ash-grey">
        <FindingRail />
        <section className="page-x py-20 lg:hidden">
          <WordReveal parts="Finding Lifecycle Across Modules" className="heading-4 sm:heading-3" />
          <p className="body-3 mb-10 mt-6 text-graphite">
            CVE-2024-21762, a FortiOS SSL VPN vulnerability listed in the CISA KEV catalog, from discovery on a firewall to
            verified closure and audit evidence.
          </p>
          <FlowCarousel />
        </section>
      </div>

      <section aria-label="Platform summary" className="page-x py-24">
        <InkParagraph
          as="h2"
          className="heading-3 sm:heading-2 lg:heading-1"
          text="Current exposure, prioritized remediation and audit evidence, reported from a single asset record."
        />
      </section>

      <section id="teams" className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            eyebrow="Solutions"
            heading="Solutions by Role"
            lead="Security leadership, security operations, IT operations and GRC teams work from the same asset record, each with the views relevant to their responsibilities."
          />
          <div className="mt-12">
            <SolutionCards />
          </div>
        </div>
      </section>

      <SkyStatement
        src={photos.statementServers}
        line="Exposure Reporting and Audit Assurance from One Data Set"
        sub="Security leadership and auditors receive consistent information from the same asset record."
      />

      <Faq items={homeFaq} />

      <section id="walkthrough" data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <WordReveal parts="Request a Platform Walkthrough" className="heading-4 sm:heading-3 lg:heading-2" />
            <p className="body-7 mt-6 max-w-[44ch] text-ash-grey">
              A 30-minute session based on your environment and current security tooling, provided at no cost and with no commitment.
            </p>
            <ol className="mt-10 space-y-6">
              {callAgenda.map((item, i) => (
                <RiseOnView as="li" key={item} delay={i * 0.08} className="flex gap-4">
                  <span className="body-4 flex size-8 shrink-0 items-center justify-center rounded-full border border-bone/60">
                    {i + 1}
                  </span>
                  <span className="body-3 pt-1">{item}</span>
                </RiseOnView>
              ))}
            </ol>
            <RiseOnView className="relative mt-12 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
              <Image src={photos.teamScreen} alt="" fill sizes="40vw" className="object-cover" />
            </RiseOnView>
          </div>
          <RiseOnView navTone="light" className="on-light rounded-3xl bg-bone p-6 text-ink sm:p-10 lg:col-span-7">
            <Suspense fallback={<FormSkeleton />}>
              <WalkthroughForm />
            </Suspense>
          </RiseOnView>
        </div>
      </section>
    </>
  );
}
