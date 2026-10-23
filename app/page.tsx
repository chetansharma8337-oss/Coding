import Link from "next/link";
import { Suspense } from "react";
import { FindingFlow } from "@/components/FindingFlow";
import { HeroIntro, RiseIn } from "@/components/HeroIntro";
import { InkParagraph } from "@/components/InkParagraph";
import { PlatformExplorer } from "@/components/PlatformExplorer";
import { ProductFrame } from "@/components/ProductFrame";
import { ExposurePreview } from "@/components/previews/Previews";
import { Reveal } from "@/components/Reveal";
import { SkyHero } from "@/components/SkyHero";
import { WalkthroughForm } from "@/components/WalkthroughForm";

const callAgenda = [
  "We map the tools you run today to the ASH-V modules they overlap with.",
  "We walk one real exposure type from your environment through the queue, the fix and the evidence.",
  "You leave with a written summary of what a pilot would cover.",
];

export default function Home() {
  return (
    <>
      <SkyHero src="/images/sky-hero.jpg">
        <div className="page-x pt-20 sm:pt-28 lg:pt-32">
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
        </div>
        <RiseIn className="page-x mt-16 sm:mt-20">
          <ProductFrame label="Exposure queue" className="mx-auto max-w-[980px]">
            <ExposurePreview />
          </ProductFrame>
        </RiseIn>
      </SkyHero>

      <section id="approach" className="page-x py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <InkParagraph
            className="heading-lg lg:col-span-9"
            text="Most security programs keep six versions of the same estate. The scanner, the CMDB, the pentest report, the vendor register and the audit spreadsheet each count assets differently, and each one names a different owner."
          />
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="heading-sm">ASH-V keeps one.</p>
            <p className="mt-4 text-[16px] leading-[1.6] text-graphite">
              Every module reads from and writes to the same asset record. When an exposure is ranked, tested, patched or
              shown to an auditor, it is the same object with the same history, so nobody reconciles spreadsheets before a
              board meeting.
            </p>
          </div>
        </div>
      </section>

      <section id="platform" className="bg-bone pb-24 sm:pb-32">
        <div className="page-x">
          <Reveal className="mb-10 max-w-[800px] sm:mb-14">
            <h2 className="heading-lg text-slate">
              Six modules. <span className="text-ink">Use the ones you need, and they share one inventory.</span>
            </h2>
          </Reveal>
          <PlatformExplorer />
        </div>
      </section>

      <section id="flow" className="border-t border-ash-grey bg-bone py-24 sm:py-32">
        <div className="page-x">
          <div className="mb-14 grid gap-6 lg:mb-20 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <h2 className="display">How one finding moves through ASH-V</h2>
            </Reveal>
            <p className="text-[16px] leading-[1.6] text-graphite lg:col-span-4 lg:col-start-9">
              Follow CVE-2024-21762, a FortiOS SSL VPN flaw on the CISA KEV list, from the moment it appears on a firewall
              to the moment an auditor sees it closed.
            </p>
          </div>
          <FindingFlow />
        </div>
      </section>

      <SkyHero
        src="/images/sky-dawn.jpg"
        className="min-h-[560px] sm:min-h-[680px]"
        scrim="linear-gradient(to bottom, rgb(10 26 56 / 0.5), rgb(10 26 56 / 0.18) 55%, rgb(10 26 56 / 0) 80%)"
      >
        <div className="page-x py-24 sm:py-32">
          <Reveal>
            <p className="display max-w-[18ch]">
              The CISO asks what is exposed. The auditor asks what is proven.
            </p>
            <p className="subheading mt-6 max-w-[40ch] text-bone sm:text-[22px]">
              ASH-V answers both from the same data.
            </p>
          </Reveal>
        </div>
      </SkyHero>

      <section id="walkthrough" className="on-dark bg-ink py-24 text-bone sm:py-32">
        <div className="page-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display">Book a 30-minute walkthrough</h2>
            </Reveal>
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
          <div className="on-light rounded-[22.5px] bg-bone p-6 text-ink sm:p-10 lg:col-span-7">
            <Suspense fallback={<p className="text-[15px] text-graphite">Loading the request form…</p>}>
              <WalkthroughForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
