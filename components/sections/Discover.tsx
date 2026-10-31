import { SafeImage as Image } from "@/components/ui/SafeImage";
import Link from "next/link";
import { ScriptHeading } from "@/components/ui/ScriptHeading";

export function Discover() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6"
      aria-labelledby="discover-heading"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <ScriptHeading
            script="Discover"
            title="Our Kitchen"
            id="discover-heading"
          />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Masala Atelier began as a small kitchen with a big idea: Indian
              food can be both deeply traditional and beautifully modern.
              Every curry starts with whole spices, ground fresh each morning.
            </p>
            <p>
              Sit by the window with a glass of masala chai, share a tandoor
              platter with friends, or book the corner table for a quiet
              evening. We cook slowly so you can stay a little longer.
            </p>
          </div>
          <Link
            href="/reserve"
            className="mt-8 inline-flex h-12 items-center rounded-full border border-accent px-7 text-sm font-semibold uppercase tracking-[0.2em] text-accent-ink transition-colors hover:bg-accent hover:text-on-accent"
          >
            Reserve a table
          </Link>
        </div>

        <div className="grid gap-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src="/images/gallery/gallery-5.jpg"
              alt="Warm candlelit restaurant interior"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src="/images/gallery/gallery-1.jpg"
              alt="Tandoori platter fresh from the oven"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <p className="absolute bottom-3 right-4 text-xs text-foreground/80">
              Chef&apos;s pick (sample)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}