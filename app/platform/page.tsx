import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ModuleIcon } from "@/components/ModuleIcon";
import { OneRecord } from "@/components/OneRecord";
import { RiseOnView } from "@/components/RiseOnView";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { photos } from "@/lib/images";
import { moduleBySlug, modules } from "@/lib/modules";

export const metadata: Metadata = {
  title: "Platform Overview",
  description:
    "Six modules on one asset record: asset intelligence, threat exposure management, vulnerability and patch management, automated penetration testing, vendor risk and GRC.",
  alternates: { canonical: "/platform" },
};

export default function PlatformPage() {
  const handoffs = modules.flatMap((m) => m.handsTo.map((h) => ({ from: m, to: moduleBySlug(h.slug)!, what: h.what })));

  return (
    <>
      <PageHero src={photos.flowCircuit} lines={["Platform Overview"]}>
        <p className="body-7 sm:body-8 mt-6 text-bone/90">
          All six modules read from and write to the same asset inventory. Modules can be deployed individually and extended
          without additional integration projects.
        </p>
        <div className="mt-8">
          <Link href="/walkthrough" className="btn btn-light">
            Request a Walkthrough
            <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            eyebrow="Platform Architecture"
            heading="Shared Asset Record Architecture"
            lead="Each module reads from and writes to the asset record, so a finding is prioritized, tested, remediated and evidenced without data transfer between tools."
          />
          <div className="mt-12 sm:mt-16">
            <OneRecord />
          </div>
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro eyebrow="Modules" heading="Platform Modules" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => (
              <RiseOnView as="li" key={m.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/platform/${m.slug}`}
                  className="lift group flex h-full flex-col rounded-3xl border border-ash-grey p-6 hover:border-ink hover:bg-mist sm:p-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-bone transition-transform duration-500 ease-[var(--ease-settle)] group-hover:scale-110">
                    <ModuleIcon slug={m.slug} className="size-6" />
                  </span>
                  <span className="caption-3 mt-8 text-slate">{String(i + 1).padStart(2, "0")}</span>
                  <span className="heading-5 mt-2 block">{m.name}</span>
                  <span className="body-6 mt-3 block text-graphite">{m.line}</span>
                  <span className="link-arrow body-4 mt-auto pt-6">
                    View Module
                    <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </RiseOnView>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <SectionIntro
            className="lg:col-span-4"
            eyebrow="Data Flow"
            heading="Inter-Module Data Flow"
            lead="Data moves between modules through the shared asset record rather than through exports."
          />
          <RiseOnView className="lg:col-span-8">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Data provided between ASH-V modules</caption>
              <thead>
                <tr className="caption-3 border-b border-ink text-slate">
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    Source Module
                  </th>
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    Target Module
                  </th>
                  <th scope="col" className="hidden py-3 font-semibold sm:table-cell">
                    Data Provided
                  </th>
                </tr>
              </thead>
              <tbody>
                {handoffs.map((h) => (
                  <tr key={`${h.from.slug}-${h.to.slug}`} className="border-b border-ash-grey align-top">
                    <td className="body-5 py-4 pr-4">{h.from.name}</td>
                    <td className="body-5 py-4 pr-4">
                      {h.to.name}
                      <span className="body-6 mt-1 block text-graphite sm:hidden">{h.what}</span>
                    </td>
                    <td className="body-6 hidden py-4 text-graphite sm:table-cell">{h.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </RiseOnView>
        </div>
      </section>

      <CtaBand secondary={{ href: "/solutions", label: "View Solutions by Role" }} />
    </>
  );
}
