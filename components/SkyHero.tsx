"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Full-bleed sky with a slow scroll parallax: the photo drifts slower than the page, which is what
// makes the product frame read as sitting in front of it. The scrim keeps white type at AA over the brightest cloud.
export function SkyHero({
  src,
  children,
  className = "",
  scrim = "linear-gradient(to bottom, rgb(8 22 48 / 0.42), rgb(8 22 48 / 0.12) 60%, rgb(8 22 48 / 0) 100%)",
}: {
  src: string;
  children: React.ReactNode;
  className?: string;
  scrim?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  return (
    <section ref={ref} className={`on-dark relative isolate overflow-hidden text-bone ${className}`}>
      <motion.div className="absolute inset-x-0 -top-[4%] -z-10 h-[118%]" style={{ y }} aria-hidden="true">
        <Image src={src} alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
      </motion.div>
      <div className="absolute inset-0 -z-10" style={{ background: scrim }} aria-hidden="true" />
      {children}
    </section>
  );
}
