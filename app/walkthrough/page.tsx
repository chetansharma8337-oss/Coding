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
  title: "Book a walkthrough",
  description: "A 30 minute working session built around the security tools you run today. No cost and no commitment.",
  alternates: { canonical: "/walkthrough" },
};

const terms: { icon: Icon; text: string }[] = [
  { icon: CalendarCheck, text: "30 minutes, at a time that suits you" },
  { icon: UsersThree, text: "Built around your tools, not a slide deck" },
  { icon: FileText, text: "A written summary you keep" },
  { icon: Gift, text: "No cost and no commitment" },
];

export default function WalkthroughPage() {
  return (
    <>
      <PageHero src={pagePhotos.walkthrough.src} position={pagePhotos.walkthrough.position} lines={["See ASH-V on", "your own estate."]}>
        <p className="body-7 sm:body-8 mt-6 text-bone/90">
          Book a 30 minute walkthrough. We follow one real exposure type from your environment through the queue, the fix
          and the evidence.
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
            <h2 className="heading-4 sm:heading-3">What happens in the session</h2>
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
            <h2 className="heading-5">Request your walkthrough</h2>
            <p className="body-6 mt-2 text-graphite">Four required fields. We reply to agree a time.</p>
            <div className="mt-8">
              <Suspense fallback={<FormSkeleton />}>
                <WalkthroughForm />
              </Suspense>
            </div>
          </RiseOnView>
        </div>
      </section>

      <Faq items={walkthroughFaq} heading="Before you book" />
    </>
  );
}
