"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  categories,
  dishes,
  formatPrice,
  type Category,
  type Dish,
} from "@/data/menu";
import { Spice, VegMark } from "@/components/ui/DishCard";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { DishDialog } from "@/components/ui/DishDialog";

type Diet = "all" | "veg" | "nonveg";

const pill = (active: boolean) =>
  `inline-flex h-11 shrink-0 items-center rounded-full border px-5 text-sm transition-colors ${
    active
      ? "border-accent bg-accent text-on-accent font-semibold"
      : "border-border text-foreground hover:bg-surface"
  }`;

export function MenuExplorer() {
  const [category, setCategory] = useState<"All" | Category>("All");
  const [diet, setDiet] = useState<Diet>("all");
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Dish | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dishes.filter((d) => {
      if (category !== "All" && d.category !== category) return false;
      if (diet === "veg" && !d.veg) return false;
      if (diet === "nonveg" && d.veg) return false;
      if (spicyOnly && d.spice < 2) return false;
      if (
        q &&
        !d.name.toLowerCase().includes(q) &&
        !d.description.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [category, diet, spicyOnly, query]);

  function resetAll() {
    setCategory("All");
    setDiet("all");
    setSpicyOnly(false);
    setQuery("");
  }

  return (
    <div className="mt-8">
      {/* Search */}
      <div className="relative">
        <label htmlFor="menu-search" className="sr-only">
          Search dishes
        </label>
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          id="menu-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes, e.g. paneer"
          className="h-12 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-foreground placeholder:text-muted"
        />
      </div>

      {/* Category pills */}
      <div
        role="group"
        aria-label="Category"
        className="mt-4 flex gap-2 overflow-x-auto pb-1"
      >
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={pill(category === c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Diet + spice */}
      <div className="mt-3 flex flex-wrap gap-2">
        <div role="group" aria-label="Diet" className="flex gap-2">
          {(
            [
              ["all", "All"],
              ["veg", "Veg"],
              ["nonveg", "Non-veg"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={diet === value}
              onClick={() => setDiet(value)}
              className={pill(diet === value)}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-pressed={spicyOnly}
          onClick={() => setSpicyOnly((v) => !v)}
          className={pill(spicyOnly)}
        >
          Spicy only
        </button>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "dish" : "dishes"}
      </p>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-border bg-surface p-10 text-center">
          <p className="font-heading text-2xl">No dishes match your filters</p>
          <p className="mt-2 text-muted">Try a different word or clear the filters.</p>
          <button
            type="button"
            onClick={resetAll}
            className="mt-6 inline-flex h-12 items-center rounded-full bg-accent px-7 font-semibold text-on-accent"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-2 grid gap-x-10 lg:grid-cols-2">
          {filtered.map((dish) => (
            <li
              key={dish.id}
              className="flex items-start justify-between gap-4 border-b border-border py-5"
            >
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => setSelected(dish)}
                  className="flex items-center gap-2 text-left"
                >
                  <VegMark veg={dish.veg} />
                  <span className="font-heading text-xl font-semibold hover:text-accent-ink">
                    {dish.name}
                  </span>
                  <Spice level={dish.spice} />
                </button>
                <p className="mt-1 text-sm text-muted">{dish.description}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-3">
                <p className="font-semibold text-accent-ink">
                  {formatPrice(dish.price)}
                </p>
                <AddToCartButton dish={dish} />
              </div>
            </li>
          ))}
        </ul>
      )}

      <DishDialog dish={selected} onClose={() => setSelected(null)} />
    </div>
  );
}