"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { formatPrice, type Dish } from "@/data/menu";
import { Spice, VegMark } from "@/components/ui/DishCard";
import { AddToCartButton } from "@/components/ui/AddToCartButton";

export function DishDialog({
  dish,
  onClose,
}: {
  dish: Dish | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (dish && !d.open) d.showModal();
    if (!dish && d.open) d.close();
  }, [dish]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="dish-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl border border-border bg-surface p-0 text-foreground backdrop:bg-black/70"
    >
      {dish && (
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2">
            <VegMark veg={dish.veg} />
            <Spice level={dish.spice} />
            <span className="text-xs uppercase tracking-widest text-muted">
              {dish.category}
            </span>
          </div>

          <h2
            id="dish-dialog-title"
            className="mt-4 pr-12 font-heading text-3xl font-semibold"
          >
            {dish.name}
          </h2>
          <p className="mt-3 text-muted">{dish.description}</p>

          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-xl font-semibold text-accent-ink">
              {formatPrice(dish.price)}
            </p>
            <AddToCartButton dish={dish} />
          </div>
        </div>
      )}
    </dialog>
  );
}