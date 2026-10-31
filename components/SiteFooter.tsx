import Link from "next/link";
import { modules } from "@/lib/modules";
import { solutions } from "@/lib/solutions";
import { Logo } from "./Logo";

const groups = [
  {
    label: "Platform",
    links: [{ href: "/platform", label: "Overview" }, ...modules.map((m) => ({ href: `/platform/${m.slug}`, label: m.name }))],
  },
  {
    label: "Solutions",
    links: solutions.map((s) => ({ href: `/solutions/${s.slug}`, label: s.role })),
  },
  {
    label: "ASH-V",
    links: [
      { href: "/company", label: "Company" },
      { href: "/frameworks", label: "Frameworks" },
      { href: "/resources", label: "Resources" },
      { href: "/walkthrough", label: "Book a walkthrough" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer data-nav-tone="dark" className="on-dark bg-night text-bone">
      <div className="page-x py-16 sm:py-20">

        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_0.8fr]">
          <div>
            <Logo />
            <p className="body-6 mt-4 max-w-[36ch] text-ash-grey">
              Asset intelligence, exposure, patching, testing, vendor risk and compliance on one record.
            </p>
          </div>
          {groups.map((g) => (
            <nav key={g.label} aria-label={g.label}>
              <p className="caption-3 text-ash-grey">{g.label}</p>
              <ul className="mt-3">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="body-6 inline-flex min-h-10 items-center text-bone/90 underline-offset-4 transition-colors duration-300 hover:text-bone hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="caption-2 text-ash-grey">© {new Date().getFullYear()} ASH-V</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="caption-2 inline-flex min-h-10 items-center text-ash-grey hover:text-bone hover:underline">
                Privacy notice
              </Link>
            </li>
            <li>
              <Link href="/terms" className="caption-2 inline-flex min-h-10 items-center text-ash-grey hover:text-bone hover:underline">
                Terms of use
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
