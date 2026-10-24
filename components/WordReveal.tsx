"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";

type Part = { text: string; className?: string };

// Headlines rise word by word from behind a mask as they enter the viewport: the signature move of the
// reference style, used on section headlines only so body copy stays still and readable.
export function WordReveal({
  parts,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  parts: string | Part[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const list: Part[] = typeof parts === "string" ? [{ text: parts }] : parts;
  const words = list.flatMap((p) => p.text.split(" ").filter(Boolean).map((w) => ({ w, className: p.className })));
  const label = list.map((p) => p.text).join(" ");

  return (
    <Tag className={className} aria-label={label}>
      <motion.span
        className="block"
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ staggerChildren: reduce ? 0 : 0.045, delayChildren: delay }}
      >
        {words.map(({ w, className: c }, i) => (
          <Fragment key={i}>
            <span className={`-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-top ${c ?? ""}`}>
              <motion.span
                className="inline-block whitespace-nowrap"
                variants={{
                  hidden: { y: "110%" },
                  show: { y: "0%", transition: reduce ? { duration: 0 } : { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
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
