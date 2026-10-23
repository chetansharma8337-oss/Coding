import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroIntro, RiseIn } from "@/components/HeroIntro";
import { ModuleIcon } from "@/components/ModuleIcon";
import { ProductFrame } from "@/components/ProductFrame";
import { previewFor } from "@/components/previews/Previews";
import { Reveal } from "@/components/Reveal";
import { SkyHero } from "@/components/SkyHero";
import { moduleBySlug, modules } from "@/lib/modules";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const m = moduleBySlug((await params).slug);
  return m ? { title: m.name, description: m.line } : {};
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const mod = moduleBySlug((await params).slug);
  if (!mod) notFound();
  const { label, Component } = previewFor[mod.slug];
  const index = modules.findIndex((m) => m.slug === mod.slug);
  const next = modules[(index + 1) % modules.length];

  return (
    <>
      <SkyHero src="/images/sky-module.jpg">
        <div className="page-x pt-16 sm:pt-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-[14px] text-bone/85">
            <Link href="/#platform" className="inline-flex min-h-11 items-center underline underline-offset-4">
              Platform
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span aria-current="page">{mod.name}</span>
          </nav>
          <div className="flex items-center gap-3 text-bone">
            <ModuleIcon slug={mod.slug} className="size-7" />
            <span className="subheading">{mod.name}</span>
          </div>
          <div className="mt-6">
            <HeroIntro lines={[mod.headline]}>
              <p className="subheading mt-6 max-w-[56ch] text-bone">{mod.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/?interest=${mod.slug}#walkthrough`} className="pill pill-dark !border-ink">
                  Book a walkthrough of {mod.short}
                </Link>
              </div>
            </HeroIntro>
          </div>
        </div>
        <RiseIn className="page-x mt-14 sm:mt-20" delay={0.5}>
          <ProductFrame label={label} className="mx-auto max-w-[980px]">
            <Component />
          </ProductFrame>
        </RiseIn>
      </SkyHero>

      <section className="page-x py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="heading-lg text-slate">What {mod.short === "GRC" ? "GRC" : mod.name} covers</h2>
          </Reveal>
          <ul className="divide-y divide-ash-grey rounded-[20px] bg-mist px-5 sm:px-8 lg:col-span-8">
            {mod.covers.map((c) => (
              <li key={c.title} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
                <h3 className="text-[17px] font-semibold leading-snug">{c.title}</h3>
                <p className="text-[15px] leading-[1.6] text-graphite">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-28">
        <div className="page-x">
          <Reveal>
            <h2 className="heading-lg max-w-[24ch]">What it hands to the rest of ASH-V</h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {mod.handsTo.map((h) => {
              const target = moduleBySlug(h.slug)!;
              return (
                <li key={h.slug}>
                  <Link
                    href={`/platform/${target.slug}`}
                    className="flex h-full items-start gap-4 rounded-[22.5px] border border-ash-grey p-6 transition-colors hover:border-ink"
                  >
                    <ModuleIcon slug={target.slug} className="mt-0.5 size-6 shrink-0" />
                    <span>
                      <span className="block text-[17px] font-semibold">{target.name}</span>
                      <span className="mt-1 block text-[15px] leading-[1.55] text-graphite">Receives {h.what}.</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="display max-w-[16ch]">See {mod.short} on your own estate.</h2>
            <p className="mt-4 text-[16px] text-ash-grey">
              Next module:{" "}
              <Link href={`/platform/${next.slug}`} className="font-semibold text-bone underline underline-offset-4">
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
