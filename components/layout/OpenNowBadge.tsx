"use client";

import { useSyncExternalStore } from "react";
import { site, type Day } from "@/data/site";

type Status = "open" | "closed" | "unknown";

function subscribe(cb: () => void) {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
}

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getSnapshot(): Status {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  const day = get("weekday") as Day;
  const now = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);

  const hours = site.hours[day];
  if (!hours) return "closed";
  return now >= toMinutes(hours.open) && now < toMinutes(hours.close)
    ? "open"
    : "closed";
}

function getServerSnapshot(): Status {
  return "unknown";
}

export function OpenNowBadge({ className = "" }: { className?: string }) {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const label =
    status === "open" ? "Open now" : status === "closed" ? "Closed now" : "Hours";
  const dot =
    status === "open"
      ? "bg-green-500"
      : status === "closed"
        ? "bg-chili"
        : "bg-muted";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground ${className}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </span>
  );
}