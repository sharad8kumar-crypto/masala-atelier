"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return true; // safe default: no smooth scroll until we know
}

export function SmoothScroll() {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (reduced) return null;
  return <ReactLenis root options={{ lerp: 0.1, duration: 1.1 }} />;
}