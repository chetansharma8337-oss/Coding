"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WordReveal } from "./WordReveal";

// A photograph that arrives as an inset, rounded card and opens to the full width of the window by the time
// it reaches the middle of the screen, while the picture settles from a slight zoom. Scrolling back closes
// it along the same path. Reduced motion shows it fully open and still.
export function PhotoBand({ src, line }: { src: string; line: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const open = "inset(0% 0% 0% 0% round 0px)";
  const clip = useTransform(p, [0, 1], reduce ? [open, open] : ["inset(0% 8% 0% 8% round 32px)", open]);
  const scale = useTransform(p, [0, 1], reduce ? [1, 1] : [1.15, 1]);

  return (
    <section ref={ref} className="on-dark relative h-[80svh] min-h-[480px] text-bone">
      {/* The tone mark sits on the clipped layer, so the glass header only turns dark over the photo itself. */}
      <motion.div className="absolute inset-0 overflow-hidden bg-ink" style={{ clipPath: clip }} data-nav-tone="dark">
        <motion.div className="absolute inset-0" style={{ scale }} aria-hidden="true">
          <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{ background: "rgb(0 0 0 / 0.55)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1200px] px-[calc(8vw+16px)] pb-12 sm:pb-16 xl:px-0">
          <WordReveal as="p" parts={line} className="heading-4 sm:heading-3 lg:heading-2 max-w-[18ch]" />
        </div>
      </motion.div>
    </section>
  );
}
