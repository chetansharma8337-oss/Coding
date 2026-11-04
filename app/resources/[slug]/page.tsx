import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { HeroIntro } from "@/components/HeroIntro";
import { ReadingProgress } from "@/components/ReadingProgress";
import { NoBreak } from "@/components/NoBreak";
import { RiseOnView } from "@/components/RiseOnView";
import { CtaBand } from "@/components/sections/CtaBand";
import { articleBySlug, articles, formatDate } from "@/lib/articles";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = articleBySlug((await params).slug);
  return a
    ? {
        title: a.title,
        description: a.description,
        alternates: { canonical: `/resources/${a.slug}` },
        openGraph: { type: "article", title: a.title, description: a.description, publishedTime: a.date },
      }
    : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = articleBySlug((await params).slug);
  if (!a) notFound();
  const others = articles.filter((o) => o.slug !== a.slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    image: `${site.url}${a.image}`,
    author: { "@type": "Organization", name: "ASH-V" },
    publisher: { "@type": "Organization", name: "ASH-V" },
  };

  return (
    <>
      <ReadingProgress />
      <article>
        <header className="page-x pb-12 pt-12 sm:pt-16">
          <Link href="/resources" className="link-arrow body-5 text-graphite hover:text-ink">
            <ArrowLeft weight="bold" className="size-4" aria-hidden="true" />
            All Resources
          </Link>
          <p className="caption-3 mt-8 text-slate">{a.topic}</p>
          <div className="mt-3">
            <HeroIntro tone="light" lines={[a.title]} className="heading-4 sm:heading-3 lg:heading-2">
              <p className="body-7 mt-6 text-graphite"><NoBreak text={a.description} /></p>
              <p className="caption-2 mt-6 text-slate">
                Reviewed {formatDate(a.date)} · {a.minutes}-minute read · ASH-V
              </p>
            </HeroIntro>
          </div>
        </header>
        <RiseOnView className="page-x">
          <div className="relative aspect-[21/9] overflow-hidden rounded-3xl">
            <Image src={a.image} alt="" fill priority sizes="(min-width: 1200px) 1200px, 100vw" className="object-cover" />
          </div>
        </RiseOnView>
        <div className="page-x py-16 sm:py-20">
          <div className="prose-ash mx-auto max-w-[680px]">
            <a.Body />
          </div>
          <aside aria-labelledby="sources" className="mx-auto mt-16 max-w-[680px] rounded-3xl bg-mist p-6 sm:p-8">
            <h2 id="sources" className="heading-6">
              Sources
            </h2>
            <ol className="mt-4 space-y-2">
              {a.sources.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="body-6 inline-flex min-h-10 items-center gap-1 underline decoration-ash-grey underline-offset-4 hover:decoration-ink"
                  >
                    {s.label}
                    <ArrowUpRight weight="bold" className="size-3 shrink-0" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </article>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x">
          <h2 className="heading-4 sm:heading-3">Related Articles</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/resources/${o.slug}`} className="lift flex h-full flex-col rounded-3xl border border-ash-grey p-6 hover:border-ink hover:bg-mist sm:p-8">
                  <span className="caption-3 text-slate">{o.topic}</span>
                  <span className="heading-6 mt-3 block">{o.title}</span>
                  <span className="body-6 mt-2 block text-graphite">{o.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
