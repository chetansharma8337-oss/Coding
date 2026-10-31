"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

// Each card pins a little lower than the last, and the ones underneath shrink back as the next slides over,
// so the list builds into a stack you can still read the edges of.
function Card({
  item,
  i,
  n,
  progress,
}: {
  item: { title: string; body: string };
  i: number;
  n: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [i / n, 1], reduce ? [1, 1] : [1, 1 - (n - 1 - i) * 0.04]);
  return (
    <div className="pin-sticky sticky" style={{ top: `calc(var(--header-h) + 32px + ${i * 22}px)` }}>
      <motion.article
        style={{ scale }}
        className="origin-top grid min-h-[300px] gap-6 rounded-[22.5px] border border-ash-grey bg-mist p-8 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10 sm:p-12"
      >
        <div>
          <span className="micro-label text-slate">
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
          <h3 className="heading mt-4">{item.title}</h3>
        </div>
        <p className="self-end text-[18px] leading-[1.6] text-graphite">{item.body}</p>
      </motion.article>
    </div>
  );
}

export function StackCards({ items }: { items: { title: string; body: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="flex flex-col gap-[28svh] pb-[8svh]">
      {items.map((item, i) => (
        <Card key={item.title} item={item} i={i} n={items.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}
