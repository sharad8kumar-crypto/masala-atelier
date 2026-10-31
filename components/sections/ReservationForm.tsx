"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import { site, waLink } from "@/data/site";
import {
  DAY_KEYS,
  DAY_NAMES,
  formatLongDate,
  formatTime,
  getSlots,
  weekdayIndex,
} from "@/lib/time";
import { useIstNow } from "@/lib/useIstNow";

type Field = "name" | "phone" | "date" | "time";
type Summary = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
};

const MAX_GUESTS = 12;
const FIELD_ORDER: Field[] = ["name", "phone", "date", "time"];

const inputCls = (bad: boolean) =>
  `mt-2 h-12 w-full rounded-xl border bg-background px-4 text-foreground placeholder:text-muted ${
    bad ? "border-chili" : "border-border"
  }`;

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-chili">
      {message}
    </p>
  );
}

export function ReservationForm() {
  const base = useId();
  const fid = (k: string) => `${base}-${k}`;
  const { ready, today, minutes } = useIstNow();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [attempted, setAttempted] = useState(false);
  const [done, setDone] = useState<Summary | null>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const slots = useMemo(
    () => getSlots(date, today, minutes),
    [date, today, minutes]
  );

  // Derived validation (no effects, no extra state)
  const errors: Partial<Record<Field, string>> = {};
  if (name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[6-9]\d{9}$/.test(phone))
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!date) {
    errors.date = "Please choose a date.";
  } else if (ready && date < today) {
    errors.date = "Please choose today or a future date.";
  } else {
    const idx = weekdayIndex(date);
    if (!site.hours[DAY_KEYS[idx]]) {
      errors.date = `We are closed on ${DAY_NAMES[idx]}s. Please pick another day.`;
    }
  }
  if (date && !errors.date) {
    if (slots.length === 0) {
      errors.time = "No slots left on this day. Please pick another date.";
    } else if (!slots.some((s) => s.value === time)) {
      errors.time = "Please choose a time slot.";
    }
  }

  const showErr = (k: Field) => {
    if (k === "date") return attempted || date ? errors.date : undefined;
    if (k === "time")
      return attempted || (date && !errors.date && slots.length === 0)
        ? errors.time
        : undefined;
    return attempted ? errors[k] : undefined;
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAttempted(true);
    const firstBad = FIELD_ORDER.find((k) => errors[k]);
    if (firstBad) {
      document.getElementById(fid(firstBad))?.focus();
      return;
    }
    setDone({ name: name.trim(), phone, date, time, guests });
  }

  function reset() {
    setName("");
    setPhone("");
    setDate("");
    setTime("");
    setGuests(2);
    setAttempted(false);
    setDone(null);
  }

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  if (done) {
    const message = [
      `Hi ${site.name}! I'd like to reserve a table:`,
      "",
      `Name: ${done.name}`,
      `Date: ${formatLongDate(done.date)}`,
      `Time: ${formatTime(done.time)}`,
      `Guests: ${done.guests}`,
      `Phone: +91 ${done.phone}`,
    ].join("\n");

    return (
      <div className="text-center">
        <CheckCircle2
          size={48}
          className="mx-auto text-accent-ink"
          aria-hidden="true"
        />
        <h3
          ref={doneRef}
          tabIndex={-1}
          className="mt-4 font-heading text-3xl font-semibold outline-none"
        >
          Table request ready
        </h3>
        <dl className="mx-auto mt-6 max-w-sm space-y-2 rounded-2xl border border-border bg-background p-5 text-left text-sm">
          {[
            ["Name", done.name],
            ["Date", formatLongDate(done.date)],
            ["Time", formatTime(done.time)],
            ["Guests", String(done.guests)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent font-semibold text-on-accent transition-transform hover:scale-[1.02]"
        >
          Confirm on WhatsApp
        </a>
        <button
          type="button"
          onClick={reset}
          className="mt-2 h-11 w-full text-sm text-muted hover:text-foreground"
        >
          Make another reservation
        </button>
        <p className="mt-3 text-xs text-muted">
          Demo only: no booking is stored. Tap the button to send the request on
          WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor={fid("name")} className="text-sm">
          Your name
        </label>
        <input
          id={fid("name")}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          aria-invalid={!!showErr("name")}
          aria-describedby={showErr("name") ? fid("name-err") : undefined}
          className={inputCls(!!showErr("name"))}
        />
        <ErrorText id={fid("name-err")} message={showErr("name")} />
      </div>

      <div className="mt-5">
        <label htmlFor={fid("phone")} className="text-sm">
          Mobile number
        </label>
        <input
          id={fid("phone")}
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          autoComplete="tel-national"
          placeholder="10-digit number"
          aria-invalid={!!showErr("phone")}
          aria-describedby={showErr("phone") ? fid("phone-err") : undefined}
          className={inputCls(!!showErr("phone"))}
        />
        <ErrorText id={fid("phone-err")} message={showErr("phone")} />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fid("date")} className="text-sm">
            Date
          </label>
          <input
            id={fid("date")}
            type="date"
            value={date}
            min={ready ? today : undefined}
            onChange={(e) => {
              setDate(e.target.value);
              setTime("");
            }}
            aria-invalid={!!showErr("date")}
            aria-describedby={showErr("date") ? fid("date-err") : undefined}
            className={inputCls(!!showErr("date"))}
          />
          <ErrorText id={fid("date-err")} message={showErr("date")} />
        </div>

        <div>
          <label htmlFor={fid("time")} className="text-sm">
            Time
          </label>
          <select
            id={fid("time")}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!date || !!errors.date || slots.length === 0}
            aria-invalid={!!showErr("time")}
            aria-describedby={showErr("time") ? fid("time-err") : undefined}
            className={`${inputCls(!!showErr("time"))} disabled:opacity-50`}
          >
            <option value="">
              {date && !errors.date ? "Select a slot" : "Pick a date first"}
            </option>
            {slots.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <ErrorText id={fid("time-err")} message={showErr("time")} />
        </div>
      </div>

      <div className="mt-5">
        <span id={fid("guests-label")} className="text-sm">
          Guests
        </span>
        <div
          role="group"
          aria-labelledby={fid("guests-label")}
          className="mt-2 flex items-center justify-between rounded-xl border border-border bg-background px-2"
        >
          <button
            type="button"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            disabled={guests <= 1}
            aria-label="Decrease guests"
            className="inline-flex h-12 w-12 items-center justify-center disabled:opacity-40"
          >
            <Minus size={18} />
          </button>
          <span className="font-semibold" aria-live="polite">
            {guests} {guests === 1 ? "guest" : "guests"}
          </span>
          <button
            type="button"
            onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
            disabled={guests >= MAX_GUESTS}
            aria-label="Increase guests"
            className="inline-flex h-12 w-12 items-center justify-center disabled:opacity-40"
          >
            <Plus size={18} />
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">
          Parties above {MAX_GUESTS}? Please call us on {site.phone}.
        </p>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent font-semibold text-on-accent transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Reserve a table
      </button>
    </form>
  );
}