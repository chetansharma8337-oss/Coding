import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { NoBreak } from "@/components/NoBreak";
import { RiseOnView } from "@/components/RiseOnView";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { articles, formatDate } from "@/lib/articles";
import { pagePhotos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Resources",
  description: "Technical guides on exposure management, the CISA KEV catalog and cross-framework control mapping.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const [lead, ...rest] = articles;
  return (
    <>
      <PageHero src={pagePhotos.resources.src} position={pagePhotos.resources.position} lines={["Security and Compliance", "Resources"]}>
        <p className="body-7 sm:body-8 mt-6 text-bone/90">
          Technical guides on exposure management, vulnerability prioritization and audit evidence. Each guide cites its
          primary sources.
        </p>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <RiseOnView>
            <Link href={`/resources/${lead.slug}`} className="press group grid overflow-hidden rounded-3xl border border-ash-grey hover:border-ink lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-settle)] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col p-6 sm:p-10">
                <p className="caption-3 text-slate">{lead.topic}</p>
                <h2 className="heading-4 sm:heading-3 mt-3">{lead.title}</h2>
                <p className="body-7 mt-4 text-graphite"><NoBreak text={lead.description} /></p>
                <p className="caption-2 mt-6 text-slate">
                  {formatDate(lead.date)} · {lead.minutes}-minute read
                </p>
                <span className="link-arrow body-4 mt-auto pt-8">
                  Read Article
                  <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </RiseOnView>

          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {rest.map((a, i) => (
              <RiseOnView as="li" key={a.slug} delay={i * 0.08}>
                <Link href={`/resources/${a.slug}`} className="press group flex h-full flex-col overflow-hidden rounded-3xl border border-ash-grey hover:border-ink">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={a.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-settle)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="caption-3 text-slate">{a.topic}</p>
                    <h2 className="heading-5 mt-3">{a.title}</h2>
                    <p className="body-6 mt-3 text-graphite"><NoBreak text={a.description} /></p>
                    <p className="caption-2 mt-6 text-slate">
                      {formatDate(a.date)} · {a.minutes}-minute read
                    </p>
                  </div>
                </Link>
              </RiseOnView>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
