"use client";

import { motion, useReducedMotion } from "motion/react";
import { fade, spring } from "@/lib/springs";

// The hero is the page's focal moment, so it is the one place lines are choreographed on load.
// B5: heading and subheading capped at 680px; the heading carries the left to right text gradient.
// Lines are passed in already broken where the thought breaks.
export function HeroIntro({
  lines,
  children,
  tone = "dark",
  className = "heading-3 sm:heading-2 lg:heading-1",
}: {
  lines: string[];
  children?: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <>
      <h1 className={`max-w-[680px] ${className}`}>
        {lines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className={`block ${tone === "dark" ? "text-sheen-dark" : "text-sheen-light"}`}
              initial={{ y: "105%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={
                reduce ? { y: { duration: 0 }, opacity: { ...fade, delay: 0.1 } } : { ...spring.reveal, delay: 0.1 + i * 0.08 }
              }
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.div
        className="max-w-[680px]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { y: { duration: 0 }, opacity: { ...fade, delay: 0.2 } } : { ...spring.reveal, delay: 0.35 }}
      >
        {children}
      </motion.div>
    </>
  );
}
