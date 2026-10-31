import { ReservationForm } from "@/components/sections/ReservationForm";
import { ScriptHeading } from "@/components/ui/ScriptHeading";

const perks = [
  "Tables held for 15 minutes",
  "Birthday and anniversary set-ups on request",
  "Reserve for lunch, dinner or a long chai evening",
];

export function Reservation() {
  return (
    <section
      id="reserve"
      className="border-y border-border bg-surface/50"
      aria-labelledby="reserve-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <ScriptHeading
            script="Reserve"
            title="Your Table"
            id="reserve-heading"
          />
          <p className="mt-8 max-w-md text-lg text-muted">
            Tell us when you are coming and we will have a table ready. You
            confirm on WhatsApp in one tap.
          </p>
          <ul className="mt-8 space-y-3 text-muted">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <ReservationForm />
        </div>
      </div>
    </section>
  );
}