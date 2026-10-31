"use client";

import { motion, useReducedMotion } from "motion/react";
import { fade, spring } from "@/lib/springs";

// B7 scroll reveal: rises 32px and fades in over 700ms on the base curve, once. Whileinview uses
// IntersectionObserver under the hood, so nothing runs on every scroll frame.
export function RiseOnView({
  children,
  className,
  delay = 0,
  navTone,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Marks a light or dark surface for the glass header (see SiteHeader). */
  navTone?: "light" | "dark";
  as?: "div" | "li" | "section" | "article";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      data-nav-tone={navTone}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={reduce ? fade : { ...spring.reveal, delay }}
    >
      {children}
    </Tag>
  );
}
