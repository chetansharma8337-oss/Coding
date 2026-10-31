import type { Transition } from "motion/react";

// Springs instead of fixed-duration curves, so any motion can be interrupted and picks up from where the
// element actually is. All are critically damped (bounce 0): nothing here is thrown by the visitor, so
// nothing should overshoot. visualDuration is the time to look settled, close to Apple's "response".
export const spring = {
  /** Controls and small surfaces: menus, progress, swaps. */
  ui: { type: "spring", bounce: 0, visualDuration: 0.35 },
  /** Larger content arriving: headlines, blocks entering the viewport. */
  reveal: { type: "spring", bounce: 0, visualDuration: 0.7 },
} satisfies Record<string, Transition>;

/** Under reduced motion, movement is replaced by a short cross-fade rather than removed outright. */
export const fade: Transition = { duration: 0.2, ease: "easeOut" };
