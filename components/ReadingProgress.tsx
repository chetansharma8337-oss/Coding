"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";

// A thin bar across the top of an article that fills as you read. scaleX only, so it stays on the compositor.
// The bar always renders so the server and client markup match; under reduced motion it is hidden after hydration.
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  useEffect(() => setHidden(!!reduce), [reduce]);
  return (
    <motion.div
      aria-hidden="true"
      className={`fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-ink ${hidden ? "hidden" : ""}`}
      style={{ scaleX: scrollYProgress }}
    />
  );
}
