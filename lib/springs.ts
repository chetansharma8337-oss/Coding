import type { Transition } from "motion/react";

// B7 base curve from the landing-page-design skill: weighted, decelerating into place.
export const ease = [0.22, 1, 0.36, 1] as const;

export const spring = {
  /** Controls and small surfaces: menus, progress, swaps. 500ms on the base curve. */
  ui: { duration: 0.5, ease },
  /** Content arriving in the viewport: 700ms on the base curve. */
  reveal: { duration: 0.7, ease },
  /** Only for things the visitor throws (the swipe carousel): a spring can carry the finger's velocity. */
  gesture: { type: "spring", bounce: 0, visualDuration: 0.35 },
} satisfies Record<string, Transition>;

/** Under reduced motion, movement is replaced by a plain opacity change. */
export const fade: Transition = { duration: 0.3, ease };
