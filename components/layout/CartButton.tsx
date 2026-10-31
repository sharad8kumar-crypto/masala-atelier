"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";

export function CartButton() {
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const setOpen = useCart((s) => s.setOpen);

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface"
    >
      <ShoppingBag size={20} aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-on-accent">
          {count}
        </span>
      )}
    </button>
  );
}