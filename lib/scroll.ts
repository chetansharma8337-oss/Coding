import type Lenis from "lenis";

// One place to scroll from code, so programmatic scrolls ride the same inertial scroller as the wheel
// instead of fighting it. Falls back to the browser when Lenis is off (reduced motion).
let instance: Lenis | null = null;

export function setScroller(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToElement(el: HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(el, { offset });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top });
}
