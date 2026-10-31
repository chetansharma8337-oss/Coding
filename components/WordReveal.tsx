"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";
import { fade, spring } from "@/lib/springs";

type Part = { text: string; className?: string };

// Headlines rise word by word from behind a mask as they enter the viewport, once, on the base curve.
// Used on section headlines only, so body copy stays still and readable. The words are hidden from assistive
// technology and the sentence is given once as screen reader text.
export function WordReveal({
  parts,
  as: Tag = "h2",
  className = "",
  delay = 0,
  id,
}: {
  parts: string | Part[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const list: Part[] = typeof parts === "string" ? [{ text: parts }] : parts;
  const words = list.flatMap((p) => p.text.split(" ").filter(Boolean).map((w) => ({ w, className: p.className })));
  const label = list.map((p) => p.text).join(" ");

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{label}</span>
      <motion.span
        className="block"
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ staggerChildren: reduce ? 0 : 0.04, delayChildren: delay }}
      >
        {words.map(({ w, className: c }, i) => (
          <Fragment key={i}>
            <span className={`-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-top ${c ?? ""}`}>
              <motion.span
                className="inline-block whitespace-nowrap"
                // One set of variants for both modes, so the server render and the hydrated page agree;
                // under reduced motion the position snaps and only the opacity eases.
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  show: { y: "0%", opacity: 1, transition: reduce ? { y: { duration: 0 }, opacity: fade } : spring.reveal },
                }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
