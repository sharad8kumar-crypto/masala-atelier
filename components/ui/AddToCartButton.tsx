"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/store/cart";
import type { Dish } from "@/data/menu";

export function AddToCartButton({
  dish,
  className = "",
}: {
  dish: Dish;
  className?: string;
}) {
  const add = useCart((s) => s.add);

  return (
    <button
      type="button"
      onClick={() => {
        add(dish.id);
        toast.success(`${dish.name} added to cart`);
      }}
      className={`inline-flex h-11 items-center gap-1.5 rounded-full bg-accent px-5 text-sm font-semibold text-on-accent transition-transform hover:scale-[1.04] active:scale-95 ${className}`}
      aria-label={`Add ${dish.name} to cart`}
    >
      <Plus size={16} aria-hidden="true" />
      Add
    </button>
  );
}