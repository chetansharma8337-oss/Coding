"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// Inertial scrolling gives the pinned, scroll-driven sections their weight. Skipped entirely for reduced motion.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -72 } });
    return () => lenis.destroy();
  }, []);
  return null;
}
