"use client";

import { motion, useReducedMotion } from "motion/react";

// Used on section headings only, so each section announces itself once as it arrives; body content stays still.
// Starts from a dimmed but visible state so headings are readable even before scripts run.
// Reduced motion keeps the same markup (no hydration mismatch) and makes the change instant.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.4, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
