"use client";

import { motion, useReducedMotion } from "motion/react";

// The hero is the page's focal moment, so it is the one place lines are choreographed on load.
export function HeroIntro({ lines, children }: { lines: string[]; children?: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <>
      <h1 className="display-xl max-w-[11ch]">
        {lines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={reduce ? false : { y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease }}
      >
        {children}
      </motion.div>
    </>
  );
}

export function RiseIn({ children, className, delay = 0.6 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
