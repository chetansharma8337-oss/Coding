"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { HeroIntro } from "@/components/HeroIntro";
import { spring } from "@/lib/springs";

// Photo hero for inner pages. The photo settles from a slight zoom on load, then drifts slower than the page
// as you scroll away (transform only), while the copy lifts and fades. Reduced motion holds everything still.
export function PageHero({
  src,
  position = "50% 50%",
  lines,
  crumbs,
  eyebrow,
  children,
}: {
  src: string;
  position?: string;
  lines: string[];
  crumbs?: { href: string; label: string }[];
  eyebrow?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(p, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const copyY = useTransform(p, [0, 1], reduce ? [0, 0] : [0, -64]);
  const copyOpacity = useTransform(p, [0, 0.7], reduce ? [1, 1] : [1, 0]);

  return (
    <section
      ref={ref}
      data-nav-tone="dark"
      className="on-dark relative isolate -mt-[var(--header-h)] flex min-h-[640px] items-end overflow-hidden bg-ink text-bone sm:min-h-[86svh]"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: photoY }} aria-hidden="true">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={reduce ? { scale: { duration: 0 }, opacity: { duration: 0.3 } } : { duration: 1.4, ease: spring.reveal.ease }}
        >
          <Image src={src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
        </motion.div>
        {/* Flat black at 70%: white copy over the brightest pixel stays above 7:1 (B4, no gradients). */}
        <div className="absolute inset-0 bg-pure-black/70" />
      </motion.div>

      <motion.div className="page-x pb-16 pt-40 sm:pb-24" style={{ y: copyY, opacity: copyOpacity }}>
        {crumbs ? (
          <nav aria-label="Breadcrumb" className="caption-1 mb-6 text-bone/80">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-2">
                  <Link href={c.href} className="inline-flex min-h-10 items-center underline underline-offset-4 hover:text-bone">
                    {c.label}
                  </Link>
                  <span aria-hidden="true">/</span>
                </li>
              ))}
              <li aria-current="page" className="text-bone">
                {lines.join(" ")}
              </li>
            </ol>
          </nav>
        ) : null}
        {eyebrow ? <div className="mb-6">{eyebrow}</div> : null}
        <HeroIntro lines={lines}>{children}</HeroIntro>
      </motion.div>
    </section>
  );
}
