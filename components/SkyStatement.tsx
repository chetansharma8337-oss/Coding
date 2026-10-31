"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WordReveal } from "./WordReveal";

// Full-bleed statement over a photograph. The photo starts zoomed in and settles to frame as the section
// crosses the viewport, so the scene seems to open up behind the line.
export function SkyStatement({ line, sub, src }: { line: string; sub: string; src: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(p, [0, 0.7], reduce ? [1, 1] : [1.3, 1]);
  const y = useTransform(p, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section ref={ref} data-nav-tone="dark" className="on-dark relative isolate overflow-hidden bg-ink text-bone">
      <motion.div className="absolute inset-0 -z-10" style={{ scale, y }} aria-hidden="true">
        <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "rgb(0 0 0 / 0.6)" }}
        aria-hidden="true"
      />
      <div className="page-x flex min-h-[620px] flex-col justify-center py-24 sm:min-h-[760px]">
        <WordReveal as="p" parts={line} className="heading-3 sm:heading-2 lg:heading-1 max-w-[16ch]" />
        <WordReveal as="p" parts={sub} className="body-7 sm:body-8 mt-8 max-w-[40ch]" delay={0.35} />
      </div>
    </section>
  );
}
