"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

// The muted slate section header from DESIGN.md, read at the reader's pace: words darken to ink as the
// paragraph scrolls through the viewport. Both ends of the transition pass AA (slate 4.87:1, ink 16.5:1).
function Word({
  word,
  progress,
  range,
  still,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const color = useTransform(progress, range, ["#717173", "#1f1f1f"]);
  return <motion.span style={{ color: still ? "#1f1f1f" : color }}>{word} </motion.span>;
}

export function InkParagraph({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  // Same markup either way so server and client render identically; reduced motion just pins the colour.
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={i}
          word={w}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          still={!!reduce}
        />
      ))}
    </p>
  );
}
