"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ModuleIcon } from "./ModuleIcon";
import { NoBreak } from "./NoBreak";
import { flowSteps } from "./FindingFlow";

// Desktop only: scrolling down drives the rail sideways, so the finding visibly travels from module to
// module. The section's height is the rail's overflow, measured, so the pin lasts exactly as long as the rail.
export function FindingRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress: p } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(p, [0, 1], [0, reduce ? 0 : -distance]);

  return (
    <section
      ref={section}
      aria-labelledby="flow-heading"
      className="pin-tall relative hidden lg:block"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="pin-sticky sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] flex-col justify-center overflow-hidden">
        <motion.div ref={track} className="flex w-max items-stretch gap-6 pl-[max(24px,calc((100vw-1200px)/2))] pr-[10vw]" style={{ x }}>
          <div className="flex w-[440px] shrink-0 flex-col justify-center pr-6">
            <h2 id="flow-heading" className="display">
              How one finding moves through <span className="whitespace-nowrap">ASH-V</span>
            </h2>
            <p className="mt-6 max-w-[40ch] text-[17px] leading-[1.6] text-graphite">
              Follow CVE-2024-21762, a FortiOS SSL VPN flaw on the CISA KEV list, from the moment it appears on a firewall
              to the moment an auditor sees it closed. Keep scrolling.
            </p>
          </div>

          {flowSteps.map((s, i) => (
            <article
              key={s.verb}
              className="flex h-[min(560px,68svh)] w-[420px] shrink-0 flex-col rounded-[22.5px] border border-ash-grey bg-bone p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-full border-2 border-ink">
                  <ModuleIcon slug={s.slug} className="size-6" />
                </span>
                <span className="micro-label text-slate">Step {String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-auto pt-10 font-display text-[64px] font-medium leading-none tracking-[-0.024em]">{s.verb}</h3>
              <p className="mt-5 text-[16px] leading-[1.6] text-graphite">
                <NoBreak text={s.body} />
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-ash-grey pt-5">
                <span className="shrink-0 whitespace-nowrap rounded-full bg-mist px-3 py-1 font-mono text-[12px] font-semibold">{s.evidence}</span>
                <Link
                  href={`/platform/${s.slug}`}
                  className="inline-flex min-h-11 items-center text-right text-[14px] font-semibold text-ink/80 underline decoration-ash-grey underline-offset-4 hover:text-ink hover:decoration-ink"
                >
                  {s.module}
                </Link>
              </div>
            </article>
          ))}

          <article className="on-dark relative flex h-[min(560px,68svh)] w-[440px] shrink-0 flex-col justify-end overflow-hidden rounded-[22.5px] bg-ink p-8 text-bone">
            <Image src="/images/sky-module-v2.jpg" alt="" fill sizes="440px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" aria-hidden="true" />
            <div className="relative">
              <p className="heading-lg">One finding. Five modules. One record.</p>
              <Link href="/#walkthrough" className="pill pill-light mt-6 !border-bone">
                Walk through it with us
              </Link>
            </div>
          </article>
        </motion.div>

        <div className="page-x mt-10">
          <div className="h-px w-full bg-ash-grey">
            <motion.div className="h-px origin-left bg-ink" style={{ scaleX: p }} />
          </div>
        </div>
      </div>
    </section>
  );
}
