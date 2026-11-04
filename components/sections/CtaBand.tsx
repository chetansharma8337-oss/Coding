import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { WordReveal } from "@/components/WordReveal";

// A2 final call to action: the same action as the top of the page, said again with the risk taken out.
export function CtaBand({
  heading = "Request a Platform Walkthrough",
  body = "A 30-minute session based on your current security tooling and environment. Provided at no cost, with a written pilot scope delivered afterwards.",
  href = "/walkthrough",
  secondary,
}: {
  heading?: string;
  body?: string;
  href?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
      <div className="page-x flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <WordReveal parts={heading} className="heading-3 sm:heading-2 max-w-[18ch]" />
          <p className="body-7 mt-6 max-w-[52ch] text-ash-grey">{body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link href={href} className="btn btn-light">
            Request a Walkthrough
            <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
          </Link>
          {secondary ? (
            <Link href={secondary.href} className="btn btn-ghost">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
