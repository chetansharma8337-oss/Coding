"use client";

import { useEffect, useState } from "react";

// True when the window is large enough for a pinned, scroll-driven scene. Smaller screens get the still version.
export function useWide(query = "(min-width: 1100px) and (min-height: 760px)") {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return wide;
}
