// Gesture physics from Apple's "Designing Fluid Interfaces" (WWDC 2018), translated for pointer events.

/** Where a flick would come to rest, using the same exponential decay as scroll deceleration. */
export function project(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/** Past a boundary the element follows less and less, so the edge feels soft instead of frozen. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

type Sample = { t: number; x: number };

/** Release velocity in px/s from the last ~100ms of pointer samples, not just the final event. */
export function velocityOf(samples: Sample[]) {
  const last = samples[samples.length - 1];
  if (!last) return 0;
  const first = samples.find((s) => last.t - s.t <= 100) ?? last;
  const dt = last.t - first.t;
  return dt > 0 ? ((last.x - first.x) / dt) * 1000 : 0;
}
