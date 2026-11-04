import type { Metadata } from "next";
import { Suspense } from "react";
import { CalendarCheck, FileText, Gift, UsersThree } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { FormSkeleton } from "@/components/FormSkeleton";
import { RiseOnView } from "@/components/RiseOnView";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { WalkthroughForm } from "@/components/WalkthroughForm";
import { walkthroughFaq } from "@/lib/faq";
import { pagePhotos } from "@/lib/images";
import { callAgenda } from "@/lib/walkthrough";

export const metadata: Metadata = {
  title: "Request a Walkthrough",
  description: "Request a 30-minute ASH-V platform walkthrough based on your environment and current security tooling. Provided at no cost.",
  alternates: { canonical: "/walkthrough" },
};

const terms: { icon: Icon; text: string }[] = [
  { icon: CalendarCheck, text: "30-minute session, scheduled on request" },
  { icon: UsersThree, text: "Based on your current security tooling" },
  { icon: FileText, text: "Written pilot scope provided" },
  { icon: Gift, text: "No cost and no commitment" },
];

export default function WalkthroughPage() {
  return (
    <>
      <PageHero src={pagePhotos.walkthrough.src} position={pagePhotos.walkthrough.position} lines={["Request a Platform", "Walkthrough"]}>
        <p className="body-7 sm:body-8 mt-6 text-bone/90">
          A 30-minute session in which one exposure type from your environment is followed through prioritization,
          remediation and evidence.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {terms.map((t) => (
            <li key={t.text} className="body-5 flex items-center gap-3 text-bone/90">
              <t.icon weight="light" className="size-6 shrink-0" aria-hidden="true" />
              {t.text}
            </li>
          ))}
        </ul>
      </PageHero>

      <section id="request" className="bg-mist py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="heading-4 sm:heading-3">Session Agenda</h2>
            <ol className="mt-10 space-y-6">
              {callAgenda.map((item, i) => (
                <RiseOnView as="li" key={item} delay={i * 0.08} className="flex gap-4">
                  <span className="body-4 flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-bone">{i + 1}</span>
                  <span className="body-3 pt-1 text-graphite">{item}</span>
                </RiseOnView>
              ))}
            </ol>
          </div>
          <RiseOnView className="rounded-3xl border border-ash-grey bg-bone p-6 sm:p-10 lg:col-span-8">
            <h2 className="heading-5">Walkthrough Request</h2>
            <p className="body-6 mt-2 text-graphite">Four fields are required. A member of the ASH-V team will respond to schedule the session.</p>
            <div className="mt-8">
              <Suspense fallback={<FormSkeleton />}>
                <WalkthroughForm />
              </Suspense>
            </div>
          </RiseOnView>
        </div>
      </section>

      <Faq items={walkthroughFaq} />
    </>
  );
}
