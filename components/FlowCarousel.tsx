"use client";

import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useCallback, useEffect, useRef, useState } from "react";
import { flowSteps } from "@/lib/flow";
import { photos } from "@/lib/images";
import { project, rubberband, velocityOf } from "@/lib/gesture";
import { spring } from "@/lib/springs";
import { ModuleIcon } from "./ModuleIcon";
import { NoBreak } from "./NoBreak";

const GAP = 12;
const SLOP = 10; // movement before the gesture commits to an axis

// Neighbouring cards sit slightly back and dimmed, and come forward continuously as they are dragged in,
// so the in-between frames already show which card is about to land.
function Slide({
  i,
  n,
  x,
  step,
  children,
}: {
  i: number;
  n: number;
  x: MotionValue<number>;
  step: number;
  children: React.ReactNode;
}) {
  const at = -i * step;
  const range = [at - step, at, at + step];
  const scale = useTransform(x, range, [0.94, 1, 0.94]);
  const opacity = useTransform(x, range, [0.55, 1, 0.55]);
  return (
    <motion.div
      role="group"
      aria-roledescription="slide"
      aria-label={`${i + 1} of ${n}`}
      className="shrink-0"
      style={{ width: step ? step - GAP : "86%", scale: step ? scale : 1, opacity: step ? opacity : 1 }}
    >
      {children}
    </motion.div>
  );
}

// Phones and tablets: the finding's journey as cards you swipe. The cards follow the finger 1:1 from where it
// grabbed, resist past either end, and on release land where the flick was heading, carrying its speed.
export function FlowCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [step, setStep] = useState(0);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const drag = useRef<{ id: number; startX: number; startY: number; origin: number; axis: "x" | "y" | null; samples: { t: number; x: number }[] } | null>(null);
  const moved = useRef(false);
  const n = flowSteps.length + 1;
  const indexRef = useRef(0);

  const settle = useCallback(
    (target: number, velocity = 0) => {
      indexRef.current = target;
      setIndex(target);
      anim.current?.stop();
      const to = -target * step;
      if (reduce) {
        x.set(to);
        return;
      }
      // A flick earns a touch of bounce; a tap on a dot or arrow settles without one.
      anim.current = animate(x, to, { ...spring.gesture, bounce: Math.abs(velocity) > 400 ? 0.12 : 0, velocity });
    },
    [reduce, step, x],
  );

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const card = Math.min(w * 0.86, 420);
      setStep(card + GAP);
      x.set(-indexRef.current * (card + GAP));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [x]);

  const bounds = () => ({ min: -(n - 1) * step, max: 0 });

  function onPointerDown(e: React.PointerEvent) {
    if (e.button !== 0 || !step) return;
    // Grab the cards wherever they are, mid-flight included: the new gesture starts from the live value.
    anim.current?.stop();
    moved.current = false;
    drag.current = { id: e.pointerId, startX: e.clientX, startY: e.clientY, origin: x.get(), axis: null, samples: [{ t: e.timeStamp, x: e.clientX }] };
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.axis) {
      if (Math.hypot(dx, dy) < SLOP) return;
      d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (d.axis === "y") {
        // A vertical intent belongs to the page; let the scroll have it and leave the cards where they are.
        drag.current = null;
        settle(indexRef.current);
        return;
      }
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      moved.current = true;
    }
    d.samples.push({ t: e.timeStamp, x: e.clientX });
    if (d.samples.length > 12) d.samples.shift();
    const { min, max } = bounds();
    const raw = d.origin + dx;
    const w = viewport.current?.clientWidth ?? 400;
    x.set(raw > max ? max + rubberband(raw - max, w) : raw < min ? min - rubberband(min - raw, w) : raw);
  }

  function onPointerUp(e: React.PointerEvent) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (d.axis !== "x") return;
    const v = velocityOf(d.samples);
    // Choose the card nearest to where the flick would have come to rest, then hand its speed to the spring.
    const projected = x.get() + project(v, 0.99);
    const target = Math.max(0, Math.min(n - 1, Math.round(-projected / step)));
    settle(target, v);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") settle(Math.min(n - 1, index + 1));
    else if (e.key === "ArrowLeft") settle(Math.max(0, index - 1));
    else return;
    e.preventDefault();
  }

  const card = "flex h-full min-h-[420px] flex-col rounded-3xl border border-ash-grey bg-bone p-6 sm:p-8";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Finding lifecycle across modules" onKeyDown={onKeyDown}>
      <div
        ref={viewport}
        className="-mx-4 cursor-grab touch-pan-y select-none overflow-hidden px-4 active:cursor-grabbing sm:-mx-6 sm:px-6"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        // A drag is not a tap: swallow the click a drag would otherwise fire on a link inside a card.
        onClickCapture={(e) => {
          if (moved.current) {
            e.preventDefault();
            e.stopPropagation();
            moved.current = false;
          }
        }}
      >
        <motion.div className="flex items-stretch" style={{ x, gap: GAP }}>
          {flowSteps.map((s, i) => (
            <Slide key={s.verb} i={i} n={n} x={x} step={step}>
              <article className={card} aria-hidden={i !== index || undefined}>
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-full border-2 border-ink">
                    <ModuleIcon slug={s.slug} className="size-5" />
                  </span>
                  <span className="caption-3 text-slate">Step {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-auto pt-10 heading-2">{s.verb}</h3>
                <p className="mt-4 body-3 text-graphite">
                  <NoBreak text={s.body} />
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-ash-grey pt-4">
                  <span className="whitespace-nowrap rounded-full bg-mist px-3 py-1 font-mono caption-6">{s.evidence}</span>
                  <Link
                    href={`/platform/${s.slug}`}
                    tabIndex={i === index ? 0 : -1}
                    className="inline-flex min-h-11 items-center body-4 underline decoration-ash-grey underline-offset-4"
                  >
                    {s.module}
                  </Link>
                </div>
              </article>
            </Slide>
          ))}
          <Slide i={n - 1} n={n} x={x} step={step}>
            <article
              className="on-dark relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl bg-ink bg-cover bg-center p-6 text-bone sm:p-8"
              style={{ backgroundImage: `linear-gradient(rgb(0 0 0 / 0.7), rgb(0 0 0 / 0.7)), url(${photos.flowCircuit})` }}
              aria-hidden={index !== n - 1 || undefined}
            >
              <p className="heading-4 lg:heading-3">Five Modules, One Asset Record</p>
              <Link href="/walkthrough" tabIndex={index === n - 1 ? 0 : -1} className="btn btn-light mt-6 self-start ">
                Request a Walkthrough
              </Link>
            </article>
          </Slide>
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center" role="group" aria-label="Select a step">
          {Array.from({ length: n }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-current={i === index ? "step" : undefined}
              aria-label={i < n - 1 ? `Step ${i + 1}: ${flowSteps[i].verb}` : "Summary"}
              onClick={() => settle(i)}
              className="flex h-11 w-7 items-center justify-center"
            >
              <motion.span
                className="block h-2 rounded-full bg-ink"
                initial={false}
                animate={{ width: i === index ? 20 : 8, opacity: i === index ? 1 : 0.25 }}
                transition={reduce ? { duration: 0 } : spring.ui}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous step"
            disabled={index === 0}
            onClick={() => settle(Math.max(0, index - 1))}
            className="btn btn-outline size-11 !p-0 !rounded-full disabled:opacity-30"
          >
            <ArrowLeft weight="bold" className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next step"
            disabled={index === n - 1}
            onClick={() => settle(Math.min(n - 1, index + 1))}
            className="btn btn-outline size-11 !p-0 !rounded-full disabled:opacity-30"
          >
            <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
