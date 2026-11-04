import type { Icon } from "@phosphor-icons/react";
import { RiseOnView } from "@/components/RiseOnView";

export type BentoItem = { icon: Icon; title: string; body: string; wide?: boolean; dark?: boolean; visual?: React.ReactNode };

// A capability grid with uneven cells, so the most important capabilities get room for a small visual.
export function Bento({ items }: { items: BentoItem[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-6">
      {items.map((b, i) => (
        <RiseOnView
          as="li"
          key={b.title}
          delay={(i % 3) * 0.08}
          navTone={b.dark ? "dark" : undefined}
          className={`lift group flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8 ${b.wide ? "md:col-span-4" : "md:col-span-2"} ${
            b.dark ? "on-dark bg-ink text-bone" : "border border-ash-grey bg-bone hover:border-ink"
          }`}
        >
          <b.icon
            weight="light"
            className="size-8 transition-transform duration-500 ease-[var(--ease-settle)] group-hover:scale-110"
            aria-hidden="true"
          />
          <h3 className="heading-6 mt-6">{b.title}</h3>
          <p className={`body-6 mt-2 ${b.dark ? "text-ash-grey" : "text-graphite"}`}>{b.body}</p>
          {b.visual ? <div className="mt-6 flex-1">{b.visual}</div> : null}
        </RiseOnView>
      ))}
    </ul>
  );
}
