"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScriptHeading } from "@/components/ui/ScriptHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const chapters = [
  {
    no: "01",
    title: "The spice route",
    text: "It began with a worn notebook of family recipes and a spice box that travelled across three cities. Every masala we grind today still follows those handwritten measures.",
  },
  {
    no: "02",
    title: "Fire and patience",
    text: "Our dal simmers overnight. Our breads meet a roaring tandoor. Nothing here is rushed, because the best flavours are the ones you wait for.",
  },
  {
    no: "03",
    title: "A table for everyone",
    text: "We cook for long lunches, late-night cravings and family celebrations alike. Pull up a chair, share a plate, and stay for one more chai.",
  },
];

export function Story() {
  const container = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = container.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // Pinned storytelling only on desktop and only if motion is allowed.
      // Everywhere else the chapters simply stack one below another.
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = Array.from(
            el.querySelectorAll<HTMLElement>("[data-panel]")
          );

          gsap.set(panels, {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          });
          gsap.set(panels.slice(1), { autoAlpha: 0 });
          if (bar.current) gsap.set(bar.current, { autoAlpha: 1 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: el,
              start: "top 64px",
              end: `+=${panels.length * 90}%`,
              pin: true,
              scrub: 0.6,
            },
          });

          panels.forEach((panel, i) => {
            if (i === 0) return;
            tl.to(panels[i - 1], { autoAlpha: 0, y: -30, duration: 0.5 }, i);
            tl.fromTo(
              panel,
              { autoAlpha: 0, y: 40 },
              { autoAlpha: 1, y: 0, duration: 0.5 },
              i + 0.3
            );
          });

          if (bar.current) {
            tl.fromTo(
              bar.current,
              { scaleX: 0 },
              { scaleX: 1, duration: tl.duration() },
              0
            );
          }
        }
      );
    },
    { scope: container }
  );

  return (
    <section id="story" aria-labelledby="story-heading">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <ScriptHeading
          script="Cooked"
          title="With Memory"
          id="story-heading"
        />
      </div>

      <div
        ref={container}
        className="relative mt-10 border-y border-border bg-surface/50 md:min-h-[calc(100svh-4rem)]"
      >
        <div
          ref={bar}
          aria-hidden="true"
          className="invisible absolute inset-x-0 top-0 z-10 h-0.5 origin-left bg-accent"
        />
        {chapters.map((c) => (
          <div
            key={c.no}
            data-panel
            className="flex items-center px-4 py-14 sm:px-6 md:py-0"
          >
            <div className="mx-auto grid w-full max-w-7xl items-center gap-4 md:grid-cols-[auto_1fr] md:gap-16">
              <span
                aria-hidden="true"
                className="font-heading text-7xl text-gold/50 md:text-[10rem] md:leading-none"
              >
                {c.no}
              </span>
              <div>
                <h3 className="font-heading text-3xl font-semibold sm:text-5xl">
                  {c.title}
                </h3>
                <p className="mt-4 max-w-xl text-lg text-muted">{c.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}