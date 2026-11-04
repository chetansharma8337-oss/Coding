import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { RiseOnView } from "@/components/RiseOnView";
import { CountUp } from "./CountUp";

export type Stat = { value: number; decimals?: number; prefix?: string; suffix?: string; label: string; source: { label: string; href: string } };

const cols: Record<number, string> = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };

// Public, attributed figures that frame the problem a module solves. Never product claims.
export function StatBand({ heading, stats, tone = "light" }: { heading: string; stats: Stat[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section data-nav-tone={dark ? "dark" : undefined} className={`py-20 sm:py-24 ${dark ? "on-dark bg-ink text-bone" : "border-t border-ash-grey"}`}>
      <div className="page-x">
        <h2 className="heading-5 sm:heading-4 max-w-[30ch]">{heading}</h2>
        <ul className={`mt-12 grid gap-px overflow-hidden rounded-3xl ${cols[stats.length] ?? cols[3]} ${dark ? "bg-bone/15" : "bg-ash-grey"}`}>
          {stats.map((s, i) => (
            <RiseOnView as="li" key={s.label} delay={i * 0.08} className={`flex flex-col p-6 sm:p-8 ${dark ? "bg-ink" : "bg-bone"}`}>
              <span className="heading-2 sm:heading-1">
                <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </span>
              <span className={`body-3 mt-4 ${dark ? "text-ash-grey" : "text-graphite"}`}>{s.label}</span>
              <a
                href={s.source.href}
                target="_blank"
                rel="noreferrer"
                className={`caption-1 mt-auto inline-flex min-h-10 items-center gap-1 pt-4 underline underline-offset-4 ${dark ? "text-bone/80 decoration-bone/30" : "text-graphite decoration-ash-grey"}`}
              >
                {s.source.label}
                <ArrowUpRight weight="bold" className="size-3" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </RiseOnView>
          ))}
        </ul>
      </div>
    </section>
  );
}
