import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ModuleIcon } from "@/components/ModuleIcon";
import { RiseOnView } from "@/components/RiseOnView";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { modules, type PlatformModule } from "@/lib/modules";

// What this module receives from the rest of ASH-V and what it hands on, built from the module data so the
// pages and the platform overview never disagree.
export function ModuleRelations({ mod }: { mod: PlatformModule }) {
  const gives = mod.handsTo.map((h) => ({ m: modules.find((x) => x.slug === h.slug)!, what: h.what }));
  const gets = modules.flatMap((m) => m.handsTo.filter((h) => h.slug === mod.slug).map((h) => ({ m, what: h.what })));
  const Col = ({ title, rows, Arrow }: { title: string; rows: typeof gives; Arrow: typeof ArrowUpRight }) => (
    <div>
      <p className="caption-3 flex items-center gap-2 text-slate">
        <Arrow weight="bold" className="size-4" aria-hidden="true" />
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {rows.map((r, i) => (
          <RiseOnView as="li" key={r.m.slug + r.what} delay={i * 0.08}>
            <Link href={`/platform/${r.m.slug}`} className="lift group flex items-start gap-4 rounded-2xl border border-ash-grey p-4 hover:border-ink hover:bg-mist">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink text-bone">
                <ModuleIcon slug={r.m.slug} className="size-5" />
              </span>
              <span>
                <span className="title-3 block">{r.m.name}</span>
                <span className="body-6 mt-1 block text-graphite">{r.what.charAt(0).toUpperCase() + r.what.slice(1)}</span>
              </span>
            </Link>
          </RiseOnView>
        ))}
      </ul>
    </div>
  );
  return (
    <section className="border-t border-ash-grey py-20 sm:py-24">
      <div className="page-x">
        <SectionIntro eyebrow="Platform Integration" heading="Module Inputs and Outputs" lead="Data this module receives from, and provides to, other ASH-V modules through the shared asset record." />
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {gets.length ? <Col title="Inputs" rows={gets} Arrow={ArrowDownRight} /> : null}
          <Col title="Outputs" rows={gives} Arrow={ArrowUpRight} />
        </div>
      </div>
    </section>
  );
}
