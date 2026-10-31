"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";

// A thin bar across the top of an article that fills as you read. scaleX only, so it stays on the compositor.
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-ink"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
