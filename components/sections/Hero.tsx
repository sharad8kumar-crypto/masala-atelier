"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { MapPin } from "lucide-react";
import heroDish from "@/public/images/hero-dish.jpg";
import { site, waLink } from "@/data/site";
import { OpenNowBadge } from "@/components/layout/OpenNowBadge";

const headline = ["Where", "spice", "meets", "story."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-16 lg:py-20">
        <div className="order-2 md:order-1">
          <motion.div {...fadeUp(0)}>
            <OpenNowBadge />
          </motion.div>

          <h1
            id="hero-heading"
            className="mt-6 font-heading text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            {headline.map((word, i) => (
              <span
                key={word}
                className="mr-[0.25em] inline-block overflow-hidden py-[0.05em] align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                    delay: 0.1 + i * 0.08,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            {...fadeUp(0.5)}
            className="mt-6 max-w-md text-lg text-muted"
          >
            {site.tagline} Slow-cooked curries, tandoor-fired breads and
            chai worth lingering over.
          </motion.p>

          <motion.div
            {...fadeUp(0.65)}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={waLink("Hi! I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 font-semibold text-on-accent transition-transform hover:scale-[1.03]"
            >
              Order on WhatsApp
            </a>
            <Link
              href="/reserve"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 font-semibold text-foreground transition-colors hover:bg-surface"
            >
              Reserve a table
            </Link>
          </motion.div>

          <motion.p
            {...fadeUp(0.8)}
            className="mt-6 flex items-center gap-2 text-sm text-muted"
          >
            <MapPin size={16} aria-hidden="true" />
            {site.address}
          </motion.p>
        </div>

        <motion.div {...fadeUp(0.2)} className="order-1 md:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-full rounded-b-3xl border border-border bg-surface md:max-w-none">
            <motion.div
              className="absolute inset-0 scale-110"
              style={{ y: reduce ? 0 : parallaxY }}
            >
              <Image
                src={heroDish}
                alt="A signature curry served in a copper bowl with fresh naan"
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}