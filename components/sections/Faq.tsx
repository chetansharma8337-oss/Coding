import { Plus } from "@phosphor-icons/react/dist/ssr";
import { RiseOnView } from "@/components/RiseOnView";
import { SectionIntro } from "./SectionIntro";

export type QA = { q: string; a: string };

// A2 FAQ in plain question and answer form, with FAQPage structured data for answer engines (A7).
// Native <details>, so it works without JavaScript and with every assistive technology. The answer rises
// and fades in on open; the plus turns into a cross. Only transform and opacity move (B7).
export function Faq({ items, heading = "Questions we hear before a walkthrough", id = "faq" }: { items: QA[]; heading?: string; id?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <section id={id} className="border-t border-ash-grey py-20 sm:py-24">
      <div className="page-x grid gap-12 lg:grid-cols-12">
        <SectionIntro heading={heading} className="lg:col-span-5" />
        <div className="lg:col-span-7">
          <ul className="border-t border-ash-grey">
            {items.map((item, i) => (
              <RiseOnView as="li" key={item.q} delay={Math.min(i * 0.05, 0.3)} className="border-b border-ash-grey">
                <details className="faq group">
                  <summary className="title-2 flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus
                      weight="light"
                      aria-hidden="true"
                      className="size-6 shrink-0 transition-transform duration-500 ease-[var(--ease-settle)] group-open:rotate-45"
                    />
                  </summary>
                  <p className="faq-answer body-3 max-w-[60ch] pb-6 text-graphite">{item.a}</p>
                </details>
              </RiseOnView>
            ))}
          </ul>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
