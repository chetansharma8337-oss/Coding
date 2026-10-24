import Link from "next/link";
import { Suspense } from "react";
import { FindingFlow } from "@/components/FindingFlow";
import { FindingRail } from "@/components/FindingRail";
import { HeroIntro } from "@/components/HeroIntro";
import { InkParagraph } from "@/components/InkParagraph";
import { PinnedHero } from "@/components/PinnedHero";
import { PlatformTour } from "@/components/PlatformTour";
import { ProductFrame } from "@/components/ProductFrame";
import { ExposurePreview } from "@/components/previews/Previews";
import { RiseOnView } from "@/components/RiseOnView";
import { SkyStatement } from "@/components/SkyStatement";
import { WalkthroughForm } from "@/components/WalkthroughForm";
import { WordReveal } from "@/components/WordReveal";

const callAgenda = [
  "We map the tools you run today to the ASH-V modules they overlap with.",
  "We walk one real exposure type from your environment through the queue, the fix and the evidence.",
  "You leave with a written summary of what a pilot would cover.",
];

export default function Home() {
  return (
    <>
      <PinnedHero
        src="/images/sky-hero-v2.jpg"
        caption="Every exposure, ranked against the asset it sits on and the team that owns it."
        intro={
          <HeroIntro lines={["One record of", "everything", "you defend."]}>
            <p className="subheading mt-6 max-w-[52ch] text-bone sm:text-[20px] sm:leading-[1.45]">
              ASH-V brings asset intelligence, threat exposure management, vulnerability and patch management, automated
              penetration testing, third-party risk and GRC into one platform. Every finding points back to the same asset,
              the same owner and the same control.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/#walkthrough" className="pill pill-dark !border-ink">
                Book a walkthrough
              </Link>
              <Link href="/#platform" className="pill pill-ghost">
                Tour the six modules
              </Link>
            </div>
          </HeroIntro>
        }
        frame={
          <ProductFrame label="Exposure queue" flat>
            <ExposurePreview compact />
          </ProductFrame>
        }
      />

      <section id="approach" className="page-x py-28 sm:py-40">
        <InkParagraph
          className="display max-w-[22ch]"
          text="Most security programs keep six versions of the same estate. The scanner, the CMDB, the pentest report, the vendor register and the audit spreadsheet each count assets differently."
        />
        <div className="mt-16 grid gap-10 sm:mt-24 lg:grid-cols-12">
          <WordReveal parts="ASH-V keeps one." className="display-xl lg:col-span-6" />
          <RiseOnView className="self-end lg:col-span-5 lg:col-start-8">
            <p className="text-[18px] leading-[1.6] text-graphite">
              Every module reads from and writes to the same asset record. When an exposure is ranked, tested, patched or
              shown to an auditor, it is the same object with the same history, so nobody reconciles spreadsheets before a
              board meeting.
            </p>
          </RiseOnView>
        </div>
      </section>

      <section id="platform" className="border-t border-ash-grey pt-24 sm:pt-32">
        <div className="page-x">
          <WordReveal
            parts={[
              { text: "Six modules.", className: "text-slate" },
              { text: "Use the ones you need, and they share one inventory." },
            ]}
            className="display max-w-[20ch]"
          />
          <div className="mt-10 lg:mt-0">
            <PlatformTour />
          </div>
        </div>
      </section>

      <div id="flow" className="border-t border-ash-grey">
        <FindingRail />
        <section className="page-x py-24 sm:py-32 lg:hidden">
          <WordReveal parts="How one finding moves through ASH-V" className="display" />
          <p className="mb-14 mt-6 text-[16px] leading-[1.6] text-graphite">
            Follow CVE-2024-21762, a FortiOS SSL VPN flaw on the CISA KEV list, from the moment it appears on a firewall to
            the moment an auditor sees it closed.
          </p>
          <FindingFlow />
        </section>
      </div>

      <SkyStatement
        src="/images/sky-dawn-v2.jpg"
        line="The CISO asks what is exposed. The auditor asks what is proven."
        sub="ASH-V answers both from the same data."
      />

      <section id="walkthrough" className="on-dark bg-ink py-24 text-bone sm:py-36">
        <div className="page-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <WordReveal parts="Book a 30-minute walkthrough" className="display" />
            <p className="mt-6 max-w-[44ch] text-[17px] leading-[1.6] text-ash-grey">
              A working session with our team, built around your environment rather than a slide deck.
            </p>
            <ol className="mt-10 space-y-6">
              {callAgenda.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-bone/60 text-[13px] font-semibold">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-[16px] leading-[1.55]">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <RiseOnView className="on-light rounded-[22.5px] bg-bone p-6 text-ink sm:p-10 lg:col-span-7">
            <Suspense fallback={<p className="text-[15px] text-graphite">Loading the request form…</p>}>
              <WalkthroughForm />
            </Suspense>
          </RiseOnView>
        </div>
      </section>
    </>
  );
}
