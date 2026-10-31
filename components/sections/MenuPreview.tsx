"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { categories, dishes, formatPrice, type Category } from "@/data/menu";
import { Spice, VegMark } from "@/components/ui/DishCard";
import { ScriptHeading } from "@/components/ui/ScriptHeading";

export function MenuPreview() {
  const [active, setActive] = useState<Category>(categories[0]);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const items = dishes.filter((d) => d.category === active).slice(0, 4);

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % categories.length;
    else if (e.key === "ArrowLeft")
      next = (index - 1 + categories.length) % categories.length;
    else return;
    e.preventDefault();
    setActive(categories[next]);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      className="border-y border-border bg-surface/50"
      aria-labelledby="menu-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <ScriptHeading script="Taste" title="The Menu" id="menu-heading" />

        <div
          role="tablist"
          aria-label="Menu categories"
          className="mt-8 flex gap-6 overflow-x-auto border-b border-border"
        >
          {categories.map((cat, i) => {
            const selected = cat === active;
            return (
              <button
                key={cat}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(cat)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative h-12 shrink-0 whitespace-nowrap text-base transition-colors ${
                  selected ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {cat}
                {selected && (
                  <motion.span
                    layoutId="menu-tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${categories.indexOf(active)}`}
          className="mt-4"
        >
          <ul>
            {items.map((dish) => (
              <li
                key={dish.id}
                className="flex items-start justify-between gap-4 border-b border-border py-5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <VegMark veg={dish.veg} />
                    <h3 className="font-heading text-xl font-semibold">
                      {dish.name}
                    </h3>
                    <Spice level={dish.spice} />
                  </div>
                  <p className="mt-1 max-w-xl text-sm text-muted">
                    {dish.description}
                  </p>
                </div>
                <p className="shrink-0 font-semibold text-accent-ink">
                  {formatPrice(dish.price)}
                </p>
              </li>
            ))}
          </ul>

          <Link
            href="/menu"
            className="mt-8 inline-flex h-12 items-center rounded-full border border-border px-7 font-semibold transition-colors hover:bg-surface"
          >
            View full menu
          </Link>
        </div>
      </div>
    </section>
  );
}