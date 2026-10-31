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
import heroDish from "@/public/images/hero-dish.jpg";
import { site, waLink } from "@/data/site";
import { OpenNowBadge } from "@/components/layout/OpenNowBadge";

export function HeroBanner() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  });

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[85svh] items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="absolute inset-0 -z-10 scale-110"
        style={{ y: reduce ? 0 : y }}
      >
        <Image
          src={heroDish}
          alt="A signature curry served in a copper bowl with fresh naan"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/45 to-black/70"
      />

      <div className="px-4 text-center text-white">
        <motion.span
          {...rise(0.1)}
          aria-hidden="true"
          className="block -rotate-3 font-script text-7xl leading-none text-[#f0c978] sm:text-8xl"
        >
          Welcome
        </motion.span>
        <motion.h1
          {...rise(0.25)}
          id="hero-heading"
          className="-mt-3 font-heading text-4xl font-semibold uppercase tracking-[0.22em] sm:text-6xl"
        >
          {site.name}
        </motion.h1>
        <motion.div
          {...rise(0.4)}
          className="mx-auto mt-6 h-px w-32 bg-[#f0c978]"
        />
        <motion.p
          {...rise(0.5)}
          className="mt-5 text-xs uppercase tracking-[0.35em] sm:text-sm"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          {...rise(0.65)}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/reserve"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold uppercase tracking-[0.2em] text-on-accent transition-transform hover:scale-[1.03] sm:w-auto"
          >
            Book now
          </Link>
          <a
            href={waLink("Hi! I'd like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/60 px-8 text-sm font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-white/15 sm:w-auto"
          >
            Order on WhatsApp
          </a>
        </motion.div>

        <motion.div {...rise(0.8)} className="mt-8 flex justify-center">
          <OpenNowBadge />
        </motion.div>
      </div>
    </section>
  );
}