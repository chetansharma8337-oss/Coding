import Link from "next/link";
import { HeroIntro } from "@/components/HeroIntro";
import { ModuleIcon } from "@/components/ModuleIcon";
import { ProductFrame } from "@/components/ProductFrame";
import { previewFor } from "@/components/previews/Previews";
import { PinnedHero } from "@/components/PinnedHero";
import { RiseOnView } from "@/components/RiseOnView";
import { StackCards } from "@/components/StackCards";
import { WordReveal } from "@/components/WordReveal";
import { moduleBySlug, modules, type PlatformModule } from "@/lib/modules";

export function ModuleView({ mod }: { mod: PlatformModule }) {
  const { label, Component } = previewFor[mod.slug];
  const index = modules.findIndex((m) => m.slug === mod.slug);
  const next = modules[(index + 1) % modules.length];

  return (
    <>
      <PinnedHero
        src="/images/sky-module-v2.jpg"
        intro={
          <>
            <nav aria-label="Breadcrumb" className="mb-6 text-[14px] text-bone/85">
              <Link href="/#platform" className="inline-flex min-h-11 items-center underline underline-offset-4">
                Platform
              </Link>
              <span aria-hidden="true" className="mx-2">
                /
              </span>
              <span aria-current="page">{mod.name}</span>
            </nav>
            <div className="mb-6 flex items-center gap-3 text-bone">
              <ModuleIcon slug={mod.slug} className="size-7" />
              <span className="subheading">{mod.name}</span>
            </div>
            <HeroIntro lines={[mod.headline]} className="display-xl max-w-[16ch]">
              <p className="subheading mt-6 max-w-[56ch] text-bone">{mod.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/?interest=${mod.slug}#walkthrough`} className="pill pill-dark !border-ink">
                  Book a walkthrough of {mod.short}
                </Link>
              </div>
            </HeroIntro>
          </>
        }
        frame={
          <ProductFrame label={label} flat>
            <Component />
          </ProductFrame>
        }
      />

      <section className="page-x pb-24 pt-28 sm:pb-32 sm:pt-40">
        <WordReveal
          parts={[{ text: "What", className: "text-slate" }, { text: `${mod.short === "GRC" ? "GRC" : mod.name} covers` }]}
          className="display max-w-[18ch]"
        />
        <div className="mt-14 sm:mt-20">
          <StackCards items={mod.covers} />
        </div>
      </section>

      <section className="border-t border-ash-grey py-24 sm:py-32">
        <div className="page-x">
          <WordReveal parts="What it hands to the rest of ASH-V" className="display max-w-[20ch]" />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {mod.handsTo.map((h, i) => {
              const target = moduleBySlug(h.slug)!;
              return (
                <li key={h.slug}>
                  <RiseOnView delay={i * 0.1} className="h-full">
                    <Link
                      href={`/platform/${target.slug}`}
                      className="group flex h-full items-start gap-5 rounded-[22.5px] border border-ash-grey p-8 transition-colors duration-300 hover:border-ink hover:bg-mist"
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-bone">
                        <ModuleIcon slug={target.slug} className="size-6" />
                      </span>
                      <span>
                        <span className="heading-sm block">{target.name}</span>
                        <span className="mt-2 block text-[16px] leading-[1.55] text-graphite">Receives {h.what}.</span>
                      </span>
                    </Link>
                  </RiseOnView>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="on-dark bg-ink py-24 text-bone sm:py-32">
        <div className="page-x flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <WordReveal parts={`See ${mod.short} on your own estate.`} className="display-xl max-w-[14ch]" />
            <p className="mt-6 text-[16px] text-ash-grey">
              Next module:{" "}
              <Link href={`/platform/${next.slug}`} className="inline-flex min-h-11 items-center font-semibold text-bone underline underline-offset-4">
                {next.name}
              </Link>
            </p>
          </div>
          <Link href={`/?interest=${mod.slug}#walkthrough`} className="pill pill-light shrink-0 !border-bone">
            Book a walkthrough
          </Link>
        </div>
      </section>
    </>
  );
}
