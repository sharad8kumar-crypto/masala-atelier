"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { ScriptHeading } from "@/components/ui/ScriptHeading";

export function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6"
      aria-labelledby="reviews-heading"
    >
      <ScriptHeading
        script="Kind words"
        title="What Guests Say"
        id="reviews-heading"
      />
      <p className="mt-4 text-sm text-muted">
        Sample reviews for this concept project.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            className="flex flex-col rounded-3xl border border-border bg-surface p-7"
          >
            <div
              className="flex gap-1 text-gold"
              role="img"
              aria-label={`${t.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, n) => (
                <Star
                  key={n}
                  size={18}
                  aria-hidden="true"
                  className={n < t.rating ? "fill-current" : "opacity-30"}
                />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 text-lg leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold">{t.name}</span>
              <span className="text-muted"> · {t.detail}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}