import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { HeroIntro } from "@/components/HeroIntro";
import { ModuleIcon } from "@/components/ModuleIcon";
import { ProductFrame } from "@/components/ProductFrame";
import { previewFor } from "@/components/previews/Previews";
import { PinnedHero } from "@/components/PinnedHero";
import { RiseOnView } from "@/components/RiseOnView";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { SolutionIcon } from "@/components/SolutionIcon";
import { StackCards } from "@/components/StackCards";
import { moduleHero } from "@/lib/images";
import { moduleBySlug, modules, type PlatformModule } from "@/lib/modules";
import { solutions } from "@/lib/solutions";

export function ModuleView({ mod }: { mod: PlatformModule }) {
  const { label, Component } = previewFor[mod.slug];
  const index = modules.findIndex((m) => m.slug === mod.slug);
  const next = modules[(index + 1) % modules.length];
  const teams = solutions.filter((s) => s.modules.includes(mod.slug));

  return (
    <>
      <PinnedHero
        src={moduleHero[mod.slug].src}
        position={moduleHero[mod.slug].position}
        intro={
          <>
            <nav aria-label="Breadcrumb" className="caption-1 mb-6 text-bone/80">
              <Link href="/platform" className="inline-flex min-h-10 items-center underline underline-offset-4 hover:text-bone">
                Platform
              </Link>
              <span aria-hidden="true" className="mx-2">
                /
              </span>
              <span aria-current="page" className="text-bone">
                {mod.name}
              </span>
            </nav>
            <div className="mb-6 flex items-center gap-3 text-bone">
              <ModuleIcon slug={mod.slug} className="size-8" />
              <span className="title-1">{mod.name}</span>
            </div>
            <HeroIntro lines={[mod.headline]}>
              <p className="body-7 sm:body-8 mt-6 text-bone/90">{mod.intro}</p>
              <div className="mt-8">
                <Link href={`/walkthrough?interest=${mod.slug}`} className="btn btn-light">
                  Book a walkthrough of {mod.short}
                  <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </HeroIntro>
          </>
        }
        frame={
          <ProductFrame label={label} flat elevated>
            <Component />
          </ProductFrame>
        }
      />

      <section className="page-x pb-20 pt-24 sm:pb-24">
        <SectionIntro muted="What" heading={`${mod.short === "GRC" ? "GRC" : mod.name} covers`} />
        <div className="mt-12 sm:mt-16">
          <StackCards items={mod.covers} />
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro heading="What it hands to the rest of ASH-V" />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {mod.handsTo.map((h, i) => {
              const target = moduleBySlug(h.slug)!;
              return (
                <RiseOnView as="li" key={h.slug} delay={i * 0.1} className="h-full">
                  <Link
                    href={`/platform/${target.slug}`}
                    className="lift group flex h-full items-start gap-6 rounded-3xl border border-ash-grey p-8 hover:border-ink hover:bg-mist"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-bone">
                      <ModuleIcon slug={target.slug} className="size-6" />
                    </span>
                    <span>
                      <span className="heading-5 block">{target.name}</span>
                      <span className="body-3 mt-2 block text-graphite">Receives {h.what}.</span>
                    </span>
                  </Link>
                </RiseOnView>
              );
            })}
          </ul>
        </div>
      </section>

      {teams.length ? (
        <section className="border-t border-ash-grey py-20 sm:py-24">
          <div className="page-x">
            <SectionIntro heading="Teams that work in this module" />
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {teams.map((t, i) => (
                <RiseOnView as="li" key={t.slug} delay={i * 0.08}>
                  <Link
                    href={`/solutions/${t.slug}`}
                    className="lift group flex h-full flex-col rounded-3xl bg-mist p-6 hover:bg-ink hover:text-bone"
                  >
                    <SolutionIcon slug={t.slug} className="size-8" />
                    <span className="title-2 mt-6 block">{t.role}</span>
                    <span className="link-arrow body-4 mt-auto pt-4">
                      Read more
                      <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </RiseOnView>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        heading={`See ${mod.short} on your own estate.`}
        href={`/walkthrough?interest=${mod.slug}`}
        secondary={{ href: `/platform/${next.slug}`, label: `Next: ${next.name}` }}
      />
    </>
  );
}
