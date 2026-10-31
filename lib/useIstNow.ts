"use client";

import { useSyncExternalStore } from "react";

// Returns "YYYY-MM-DD|minutesSinceMidnight" in IST. A string keeps the snapshot stable.
function getIstNow(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const g = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const minutes = parseInt(g("hour"), 10) * 60 + parseInt(g("minute"), 10);
  return `${g("year")}-${g("month")}-${g("day")}|${minutes}`;
}

function subscribe(cb: () => void) {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
}

function getServerSnapshot() {
  return "";
}

export function useIstNow() {
  const raw = useSyncExternalStore(subscribe, getIstNow, getServerSnapshot);
  if (!raw) return { ready: false, today: "", minutes: 0 };
  const [today, m] = raw.split("|");
  return { ready: true, today, minutes: Number(m) };
}