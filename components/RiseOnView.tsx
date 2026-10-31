"use client";

import { motion, useReducedMotion } from "motion/react";
import { fade, spring } from "@/lib/springs";

// For a block that should arrive rather than appear: it rises into place once, as it enters the viewport.
export function RiseOnView({
  children,
  className,
  delay = 0,
  navTone,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Marks a light or dark surface for the glass header (see SiteHeader). */
  navTone?: "light" | "dark";
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      data-nav-tone={navTone}
      initial={reduce ? { opacity: 0 } : { opacity: 0.3, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={reduce ? fade : { ...spring.reveal, delay }}
    >
      {children}
    </motion.div>
  );
}
