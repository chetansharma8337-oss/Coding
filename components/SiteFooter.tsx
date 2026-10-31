import Link from "next/link";
import { modules } from "@/lib/modules";
import { Logo } from "./Logo";

// Two link groups because the site has two kinds of destination: the modules, and the pages about ASH-V itself.
export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-bone">
      <div className="page-x border-t border-bone/15 py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_0.8fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[36ch] text-[15px] leading-[1.55] text-ash-grey">
              Asset intelligence, exposure, patching, testing, vendor risk and compliance on one record.
            </p>
          </div>
          <nav aria-label="Modules">
            <p className="micro-label text-ash-grey">Modules</p>
            <ul className="mt-3">
              {modules.map((m) => (
                <li key={m.slug}>
                  <Link href={`/platform/${m.slug}`} className="inline-flex min-h-11 items-center text-[15px] hover:underline">
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="ASH-V">
            <p className="micro-label text-ash-grey">ASH-V</p>
            <ul className="mt-3">
              <li>
                <Link href="/#walkthrough" className="inline-flex min-h-11 items-center text-[15px] hover:underline">
                  Book a walkthrough
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="inline-flex min-h-11 items-center text-[15px] hover:underline">
                  Privacy notice
                </Link>
              </li>
              <li>
                <Link href="/terms" className="inline-flex min-h-11 items-center text-[15px] hover:underline">
                  Terms of use
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-12 text-[13px] text-ash-grey">© {new Date().getFullYear()} ASH-V</p>
      </div>
    </footer>
  );
}
