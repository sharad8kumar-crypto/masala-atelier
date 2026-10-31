import { MapPin, MessageCircle, Phone } from "lucide-react";
import { site, waLink } from "@/data/site";
import { DAY_KEYS, formatTime } from "@/lib/time";
import { ScriptHeading } from "@/components/ui/ScriptHeading";

const weekOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const fullName: Record<(typeof DAY_KEYS)[number], string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const btn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold transition-transform hover:scale-[1.03]";

export function Contact() {
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6"
      aria-labelledby="contact-heading"
    >
      <ScriptHeading
        script="Find us"
        title="Come Hungry"
        id="contact-heading"
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-surface p-7 sm:p-9">
          <p className="flex items-start gap-3 text-lg">
            <MapPin
              className="mt-1 shrink-0 text-accent-ink"
              size={20}
              aria-hidden="true"
            />
            {site.address}
          </p>

          <h3 className="mt-8 font-heading text-2xl font-semibold">
            Opening hours
          </h3>
          <dl className="mt-4 divide-y divide-border text-sm">
            {weekOrder.map((d) => {
              const h = site.hours[d];
              return (
                <div key={d} className="flex justify-between py-2.5">
                  <dt className="text-muted">{fullName[d]}</dt>
                  <dd className={h ? "" : "text-chili"}>
                    {h
                      ? `${formatTime(h.open)} – ${formatTime(h.close)}`
                      : "Closed"}
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.phoneHref} className={`${btn} bg-accent text-on-accent`}>
              <Phone size={18} aria-hidden="true" />
              Call us
            </a>
            <a
              href={waLink("Hi! I have a question.")}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-border`}
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-border`}
            >
              <MapPin size={18} aria-hidden="true" />
              Directions
            </a>
          </div>
        </div>

        <div className="min-h-80 overflow-hidden rounded-3xl border border-border bg-surface">
          <iframe
            title="Map showing the Masala Atelier area"
            src="https://www.google.com/maps?q=Meerut%2C+Uttar+Pradesh&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-80 w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}