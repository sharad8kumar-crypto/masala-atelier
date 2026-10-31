import { site, type Day } from "@/data/site";

export const DAY_KEYS: Day[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Weekday of a "YYYY-MM-DD" calendar date (0 = Sunday), independent of timezone
export function weekdayIndex(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function formatLongDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatTime(value: string) {
  const [h, m] = value.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// 30-minute slots from opening until 1 hour before closing.
// For today, only slots at least 30 minutes from now.
export function getSlots(dateStr: string, today: string, nowMinutes: number) {
  if (!dateStr) return [];
  const hours = site.hours[DAY_KEYS[weekdayIndex(dateStr)]];
  if (!hours) return [];
  const slots: { value: string; label: string }[] = [];
  const first = toMinutes(hours.open);
  const last = toMinutes(hours.close) - 60;
  for (let m = first; m <= last; m += 30) {
    if (dateStr === today && m < nowMinutes + 30) continue;
    const value = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    slots.push({ value, label: formatTime(value) });
  }
  return slots;
}