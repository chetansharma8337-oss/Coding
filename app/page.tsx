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

const proof = ["Ranks against the CISA KEV catalog", "Maps controls to ISO/IEC 27001, NIST CSF and CIS Controls"];

export default function Home() {
  return (
    <>
      <PinnedHero
        src={photos.heroEarth}
        caption="Every exposure, ranked against the asset it sits on and the team that owns it."
        intro={
          <HeroIntro lines={["One record of", "everything you defend."]}>
            <p className="body-7 sm:body-8 mt-6 text-bone/90">
              ASH-V brings asset intelligence, exposure management, patching, penetration testing, vendor risk and GRC into
              one platform, so every finding points to the same asset, owner and control.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/walkthrough" className="btn btn-light">
                Book a 30 minute walkthrough
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
          <ProductFrame label="Exposure queue" flat elevated>
            <ExposurePreview compact />
          </ProductFrame>
        }
      />

      <section id="approach" className="page-x py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <WordReveal
              parts={[{ text: "Six tools.", className: "text-slate" }, { text: "Six versions of your estate." }]}
              className="heading-4 sm:heading-3 lg:heading-2 max-w-[18ch]"
            />
            <RiseOnView delay={0.1}>
              <p className="body-7 mt-6 max-w-[56ch] text-graphite">
                The scanner, the CMDB, the pentest report, the vendor register and the audit spreadsheet each count assets
                differently. Before anyone can fix anything, someone has to reconcile them.
              </p>
            </RiseOnView>
          </div>
          <RiseOnView className="self-end lg:col-span-5" delay={0.2}>
            <p className="heading-4 sm:heading-3">ASH-V keeps one.</p>
            <p className="body-3 mt-4 text-graphite">
              Every module reads from and writes to the same asset record. When an exposure is ranked, tested, patched or
              shown to an auditor, it is the same object with the same history.
            </p>
          </RiseOnView>
        </div>
      </section>

      <Benefits />

      <PhotoBand src={photos.opsServerRoom} line="Security, IT and audit work from the same record." />

      <section id="platform" className="pt-20 sm:pt-24">
        <div className="page-x">
          <SectionIntro
            muted="Six modules."
            heading="Use the ones you need. They share one inventory."
            lead={
              <>
                Scroll through each module and its working surface, or{" "}
                <Link href="/platform" className="font-semibold text-ink underline underline-offset-4">
                  read the platform overview
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
          <WordReveal parts="How one finding moves through ASH-V" className="heading-4 sm:heading-3" />
          <p className="body-3 mb-10 mt-6 text-graphite">
            Follow CVE-2024-21762, a FortiOS SSL VPN flaw on the CISA KEV list, from the moment it appears on a firewall to
            the moment an auditor sees it closed. Swipe through the steps.
          </p>
          <FlowCarousel />
        </section>
      </div>

      <section aria-label="What ASH-V is for" className="page-x py-24">
        <InkParagraph
          as="h2"
          className="heading-3 sm:heading-2 lg:heading-1"
          text="Know what is exposed, fix what matters first, and prove it to anyone who asks, from one record."
        />
      </section>

      <section id="teams" className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            muted="Built for every team."
            heading="The same record, seen the way each team works."
            lead="Leaders see risk by business impact. Analysts see a ranked queue. IT sees only the assets it owns. Audit sees evidence."
          />
          <div className="mt-12">
            <SolutionCards />
          </div>
        </div>
      </section>

      <SkyStatement
        src={photos.statementServers}
        line="The CISO asks what is exposed. The auditor asks what is proven."
        sub="ASH-V answers both from the same data."
      />

      <Faq items={homeFaq} />

      <section id="walkthrough" data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <WordReveal parts="Book a 30 minute walkthrough" className="heading-4 sm:heading-3 lg:heading-2" />
            <p className="body-7 mt-6 max-w-[44ch] text-ash-grey">
              A working session built around your environment rather than a slide deck. No cost and no commitment.
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
