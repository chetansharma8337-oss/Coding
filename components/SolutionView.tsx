import Link from "next/link";
import { ArrowRight, CheckCircle, Question, XCircle } from "@phosphor-icons/react/dist/ssr";
import { InkParagraph } from "@/components/InkParagraph";
import { ModuleIcon } from "@/components/ModuleIcon";
import { RiseOnView } from "@/components/RiseOnView";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { SolutionIcon } from "@/components/SolutionIcon";
import { moduleBySlug } from "@/lib/modules";
import { roleInSentence, solutions, type Solution } from "@/lib/solutions";

export function SolutionView({ solution: s }: { solution: Solution }) {
  const others = solutions.filter((o) => o.slug !== s.slug);
  const interest = s.modules[0];

  return (
    <>
      <PageHero
        src={s.image.src}
        position={s.image.position}
        lines={[s.headline]}
        eyebrow={
          <span className="title-3 inline-flex items-center gap-2 text-bone">
            <SolutionIcon slug={s.slug} className="size-6" />
            For {roleInSentence(s.role)}
          </span>
        }
      >
        <p className="body-7 sm:body-8 mt-6 text-bone/90">{s.intro}</p>
        <div className="mt-8">
          <Link href={`/walkthrough?interest=${interest}`} className="btn btn-light">
            Book a walkthrough
            <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="page-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionIntro muted="Today." heading="Where the time goes" />
            <ul className="mt-10 space-y-4">
              {s.problems.map((p, i) => (
                <RiseOnView as="li" key={p.title} delay={i * 0.08} className="flex gap-4 rounded-3xl border border-ash-grey p-6">
                  <XCircle weight="light" className="mt-0.5 size-6 shrink-0 text-slate" aria-hidden="true" />
                  <div>
                    <h3 className="title-2">{p.title}</h3>
                    <p className="body-6 mt-2 text-graphite">{p.body}</p>
                  </div>
                </RiseOnView>
              ))}
            </ul>
          </div>
          <div>
            <SectionIntro muted="With ASH-V." heading="What changes" />
            <ul className="mt-10 space-y-4">
              {s.outcomes.map((o, i) => (
                <RiseOnView
                  as="li"
                  key={o.title}
                  delay={0.1 + i * 0.08}
                  navTone="dark"
                  className="on-dark flex gap-4 rounded-3xl bg-ink p-6 text-bone"
                >
                  <CheckCircle weight="fill" className="mt-0.5 size-6 shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="title-2">{o.title}</h3>
                    <p className="body-6 mt-2 text-ash-grey">{o.body}</p>
                  </div>
                </RiseOnView>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-label="In one sentence" className="page-x border-t border-ash-grey py-24">
        <InkParagraph as="h2" className="heading-3 sm:heading-2" text={`${s.line} Built on the same record as every other team.`} />
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x grid gap-12 lg:grid-cols-12">
          <SectionIntro className="lg:col-span-4" heading="Questions you can answer on the spot" />
          <ul className="grid gap-4 lg:col-span-8">
            {s.questions.map((q, i) => (
              <RiseOnView as="li" key={q.q} delay={i * 0.08} className="rounded-3xl bg-mist p-6 sm:p-8">
                <p className="title-2 flex gap-3">
                  <Question weight="light" className="mt-0.5 size-6 shrink-0" aria-hidden="true" />
                  {q.q}
                </p>
                <p className="body-3 mt-3 pl-9 text-graphite">{q.a}</p>
              </RiseOnView>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro heading="The modules this team works in" />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {s.modules.map((slug, i) => {
              const m = moduleBySlug(slug)!;
              return (
                <RiseOnView as="li" key={slug} delay={i * 0.08}>
                  <Link
                    href={`/platform/${slug}`}
                    className="lift group flex h-full flex-col rounded-3xl border border-ash-grey p-6 hover:border-ink hover:bg-mist"
                  >
                    <ModuleIcon slug={slug} className="size-8" />
                    <span className="heading-6 mt-6 block">{m.name}</span>
                    <span className="body-6 mt-2 block text-graphite">{m.line}</span>
                    <span className="link-arrow body-4 mt-auto pt-4">
                      Explore {m.short}
                      <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </RiseOnView>
              );
            })}
          </ul>
          <p className="body-6 mt-8 text-graphite">
            Other teams:{" "}
            {others.map((o, i) => (
              <span key={o.slug}>
                <Link href={`/solutions/${o.slug}`} className="font-semibold text-ink underline underline-offset-4">
                  {o.role}
                </Link>
                {i < others.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </div>
      </section>

      <CtaBand href={`/walkthrough?interest=${interest}`} />
    </>
  );
}
