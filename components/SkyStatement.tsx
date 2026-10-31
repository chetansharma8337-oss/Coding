"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WordReveal } from "./WordReveal";

// Full-bleed statement on a second sky. The photo starts zoomed in and settles to frame as the section
// crosses the viewport, so the sky seems to open up behind the line.
export function SkyStatement({ line, sub, src }: { line: string; sub: string; src: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(p, [0, 0.7], reduce ? [1, 1] : [1.3, 1]);
  const y = useTransform(p, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section ref={ref} className="on-dark relative isolate overflow-hidden text-bone">
      <motion.div className="absolute inset-0 -z-10" style={{ scale, y }} aria-hidden="true">
        <Image src={src} alt="" fill sizes="100vw" className="object-cover object-bottom" />
      </motion.div>
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(to bottom, rgb(10 26 56 / 0.62), rgb(10 26 56 / 0.56) 62%, rgb(10 26 56 / 0) 90%)" }}
        aria-hidden="true"
      />
      <div className="page-x flex min-h-[620px] flex-col pb-56 pt-24 sm:min-h-[760px] sm:pt-32">
        <WordReveal as="p" parts={line} className="display-xl max-w-[16ch]" />
        <WordReveal as="p" parts={sub} className="subheading mt-8 max-w-[40ch] sm:text-[24px]" delay={0.35} />
      </div>
    </section>
  );
}
