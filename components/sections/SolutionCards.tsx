import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { RiseOnView } from "@/components/RiseOnView";
import { SolutionIcon } from "@/components/SolutionIcon";
import { solutions } from "@/lib/solutions";

// Four photo cards, one per team. The photo eases in closer on hover; the arrow slides forward.
export function SolutionCards() {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {solutions.map((s, i) => (
        <RiseOnView as="li" key={s.slug} delay={(i % 2) * 0.1}>
          <Link
            href={`/solutions/${s.slug}`}
            data-nav-tone="dark"
            className="press group on-dark relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-6 text-bone sm:p-8"
          >
            <Image
              src={s.image.src}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="-z-20 object-cover transition-transform duration-700 ease-[var(--ease-settle)] group-hover:scale-105"
              style={{ objectPosition: s.image.position }}
            />
            <span className="absolute inset-0 -z-10 bg-pure-black/65" aria-hidden="true" />
            <SolutionIcon slug={s.slug} className="size-8" />
            <span className="heading-5 mt-4 block max-w-[20ch]">{s.role}</span>
            <span className="body-6 mt-2 block max-w-[44ch] text-bone/85">{s.line}</span>
            <span className="link-arrow body-4 mt-4">
              View Solution
              <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
            </span>
          </Link>
        </RiseOnView>
      ))}
    </ul>
  );
}
