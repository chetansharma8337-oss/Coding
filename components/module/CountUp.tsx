"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Counts a figure up once when it scrolls into view, easing out on the base curve. Only the text changes;
// nothing moves. Reduced motion, and the server render, show the final figure.
export function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    const t0 = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 4);
      setShown(value * eased);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    setShown(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  const text = `${prefix}${shown.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
  const final = `${prefix}${value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
