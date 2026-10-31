"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { useRef } from "react";

// A pinned opener in three beats, driven by scroll:
// 1. the headline sits on open sky with the product peeking at the bottom edge,
// 2. the headline lifts away while the product rises to the centre (the product is the answer to the headline),
// 3. the sky folds into a rounded card, handing over to the white page below.
// Reduced motion and phone widths unpin the section (see .pin-* in globals.css) and hold every element at rest.
// The section tucks up under the translucent header, so the sky shows through it; content is offset by the
// header height to stay clear of it.
export function PinnedHero({
  src,
  intro,
  frame,
  caption,
  scrim = "linear-gradient(to bottom, rgb(8 22 48 / 0.55), rgb(8 22 48 / 0.28) 60%, rgb(8 22 48 / 0.1) 100%)",
}: {
  src: string;
  intro: React.ReactNode;
  frame: React.ReactNode;
  caption?: string;
  scrim?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalmMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const textY = useTransform(p, [0, 0.3], reduce ? [0, 0] : [0, -120]);
  const textOpacity = useTransform(p, [0.02, 0.2], reduce ? [1, 1] : [1, 0]);
  const frameY = useTransform(p, [0.1, 0.55], reduce ? ["0vh", "0vh"] : ["66vh", "0vh"]);
  const frameScale = useTransform(p, [0.1, 0.55], reduce ? [1, 1] : [0.9, 1]);
  const skyScale = useTransform(p, [0, 1], reduce ? [1, 1] : [1.14, 1]);
  const clip = useTransform(
    p,
    [0.72, 1],
    // The folded card's top edge clears the 64px header (--header-h) by 24px. Both ends need the same shape,
    // number for number, so motion can interpolate them.
    reduce
      ? ["inset(0px 0% 0% 0% round 0px)", "inset(0px 0% 0% 0% round 0px)"]
      : ["inset(0px 0% 0% 0% round 0px)", "inset(88px 2.5% 3% 2.5% round 32px)"],
  );
  const captionOpacity = useTransform(p, [0.5, 0.66], reduce ? [1, 1] : [0, 1]);
  const captionY = useTransform(p, [0.5, 0.66], reduce ? [0, 0] : [24, 0]);

  return (
    <section ref={ref} className="pin-tall pin-hero relative -mt-[var(--header-h)] h-[250svh]">
      <div className="pin-sticky on-dark sticky top-0 h-[100svh] overflow-hidden text-bone">
        <motion.div
          className="pin-bg absolute inset-0 -z-0 overflow-hidden bg-ink"
          style={{ clipPath: clip }}
          aria-hidden="true"
          data-nav-tone="dark"
        >
          <motion.div className="absolute inset-0" style={{ scale: skyScale }}>
            <Image src={src} alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
          </motion.div>
          <div className="absolute inset-0" style={{ background: scrim }} />
        </motion.div>

        <motion.div className="pin-intro page-x relative pt-[calc(var(--header-h)+9svh)] sm:pt-[calc(var(--header-h)+11svh)]" style={{ y: textY, opacity: textOpacity }}>
          {intro}
        </motion.div>

        <motion.div
          className="pin-frame absolute inset-x-0 top-[calc(var(--header-h)+5svh)] origin-top sm:top-[calc(var(--header-h)+7svh)]"
          style={{ y: frameY, scale: frameScale }}
        >
          <div className="page-x">
            <div className="mx-auto max-w-[1000px]">{frame}</div>
            {caption ? (
              <motion.div className="mt-5 hidden justify-center sm:flex" style={{ opacity: captionOpacity, y: captionY }}>
                {/* Dark glass chip: keeps the caption at AA wherever it lands on the sky, cloud included. */}
                <p className="rounded-full bg-ink/80 px-5 py-2.5 text-center text-[1rem] font-medium text-bone backdrop-blur-md">
                  {caption}
                </p>
              </motion.div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
