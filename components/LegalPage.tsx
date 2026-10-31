import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { HeroIntro } from "./HeroIntro";

// Legal pages exist because the walkthrough form collects personal data. The text is a placeholder
// until ASH-V's counsel supplies the real version, and the page says so to every visitor.
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="page-x max-w-[760px] py-16 sm:py-24">
      <Link href="/" className="link-arrow body-5 text-graphite hover:text-ink">
        <ArrowLeft weight="bold" className="size-4" aria-hidden="true" />
        Home
      </Link>
      <div className="mt-8">
        <HeroIntro tone="light" lines={[title]} className="heading-3 sm:heading-2">
          <p className="body-4 mt-8 rounded-2xl border border-ink p-4">
            Draft placeholder. This page will be replaced with text approved by ASH-V&apos;s legal team before launch.
          </p>
        </HeroIntro>
      </div>
      <div className="prose-ash mt-10">{children}</div>
    </article>
  );
}
