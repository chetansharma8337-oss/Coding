"use client";

import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";

// B11 tagline reveal. Words start at 30% of the text colour and light up one at a time, in reading order,
// as they cross a trigger line in the viewport. Each word eases in on the base curve; once lit, a word stays
// lit. Scroll progress comes from Motion's useScroll, which batches reads to one per animation frame.
export function InkParagraph({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "h2";
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const [lit, setLit] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });

  // Inline styles are not patched during hydration, so reduced motion is applied after it, not in the first render.
  useEffect(() => {
    if (reduce) setLit(words.length);
  }, [reduce, words.length]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(words.length, Math.floor(p * (words.length + 1)));
    setLit((cur) => (next > cur ? next : cur));
  });

  return (
    <Tag ref={ref} className={`max-w-[680px] ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="transition-opacity duration-500 ease-[var(--ease-settle)]"
          style={{ opacity: i < lit ? 1 : 0.3 }}
        >
          {w}{" "}
        </span>
      ))}
    </Tag>
  );
}
