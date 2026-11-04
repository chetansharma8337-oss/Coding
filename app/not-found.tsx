import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { HeroIntro } from "@/components/HeroIntro";

const places = [
  { href: "/platform", label: "Platform Overview", body: "The six ASH-V modules and the shared asset record." },
  { href: "/solutions", label: "Solutions by Role", body: "Solutions for security leadership, security operations, IT operations and GRC teams." },
  { href: "/resources", label: "Resources", body: "Technical guides on exposure management and audit evidence." },
];

// B10: a branded 404 with a way back to every main section.
export default function NotFound() {
  return (
    <section className="page-x py-16 sm:py-24">
      <p className="caption-3 font-mono text-slate">Error 404</p>
      <div className="mt-4">
        <HeroIntro tone="light" lines={["Page Not Found"]}>
          <p className="body-7 mt-6 text-graphite">
            The requested page does not exist or has been moved. The following sections are available.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-dark">
              Return to Home Page
            </Link>
            <Link href="/walkthrough" className="btn btn-outline">
              Request a Walkthrough
            </Link>
          </div>
        </HeroIntro>
      </div>
      <ul className="mt-16 grid gap-4 md:grid-cols-3">
        {places.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className="lift group flex h-full flex-col rounded-3xl border border-ash-grey p-6 hover:border-ink hover:bg-mist">
              <span className="heading-6">{p.label}</span>
              <span className="body-6 mt-2 text-graphite">{p.body}</span>
              <span className="link-arrow body-4 mt-auto pt-4">
                Open Section
                <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
