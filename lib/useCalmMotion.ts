"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// True when pinned, scroll-scrubbed motion should stand down: the visitor asked for reduced motion,
// or the screen is phone-sized and a pinned section would clip its content. Pair with the .pin-* CSS.
export function useCalmMotion() {
  const reduce = useReducedMotion();
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return !!reduce || narrow;
}
