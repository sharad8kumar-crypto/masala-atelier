"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/store/cart";
import { dishes, formatPrice } from "@/data/menu";
import { site, waLink } from "@/data/site";

export function CartDrawer() {
  const ref = useRef<HTMLDialogElement>(null);
  const isOpen = useCart((s) => s.isOpen);
  const setOpen = useCart((s) => s.setOpen);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);

  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  // Load saved cart from localStorage after the first render
  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);

  // Open / close the native dialog when the store changes
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  const items = useMemo(
    () =>
      lines.flatMap((l) => {
        const dish = dishes.find((d) => d.id === l.id);
        return dish ? [{ dish, qty: l.qty }] : [];
      }),
    [lines]
  );

  const total = items.reduce((sum, i) => sum + i.dish.price * i.qty, 0);

  const message = [
    `Hi ${site.name}! I'd like to place an order:`,
    "",
    ...items.map(
      (i) => `• ${i.qty} x ${i.dish.name} - Rs ${i.dish.price * i.qty}`
    ),
    "",
    `Total: Rs ${total}`,
    name.trim() ? `Name: ${name.trim()}` : "",
    note.trim() ? `Note: ${note.trim()}` : "",
  ]
    .filter((line, idx, arr) => !(line === "" && arr[idx - 1] === ""))
    .join("\n")
    .trim();

  return (
    <dialog
      ref={ref}
      onClose={() => setOpen(false)}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      aria-labelledby="cart-title"
      className="my-0 ml-auto mr-0 h-dvh max-h-none w-full max-w-md border-l border-border bg-background p-0 text-foreground backdrop:bg-black/60 open:flex"
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="cart-title" className="font-heading text-2xl font-semibold">
            Your order
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border"
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-heading text-2xl">Your cart is empty</p>
            <p className="text-muted">Add a few dishes to get started.</p>
            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center rounded-full bg-accent px-7 font-semibold text-on-accent"
            >
              Browse the menu
            </Link>
          </div>
        ) : (
          <>
            <ul
              data-lenis-prevent
              className="flex-1 divide-y divide-border overflow-y-auto px-5"
            >
              {items.map(({ dish, qty }) => (
                <li key={dish.id} className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-heading text-lg font-semibold">
                        {dish.name}
                      </p>
                      <p className="text-sm text-muted">
                        {formatPrice(dish.price)} each
                      </p>
                    </div>
                    <p className="font-semibold text-accent-ink">
                      {formatPrice(dish.price * qty)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button
                        type="button"
                        onClick={() => setQty(dish.id, qty - 1)}
                        aria-label={`Decrease ${dish.name}`}
                        className="inline-flex h-11 w-11 items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span
                        className="min-w-8 text-center font-semibold"
                        aria-live="polite"
                      >
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(dish.id, qty + 1)}
                        aria-label={`Increase ${dish.name}`}
                        className="inline-flex h-11 w-11 items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(dish.id)}
                      aria-label={`Remove ${dish.name}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted hover:text-chili"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border bg-surface px-5 py-5">
              <div className="space-y-3">
                <div>
                  <label htmlFor="order-name" className="text-sm text-muted">
                    Your name (optional)
                  </label>
                  <input
                    id="order-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="order-note" className="text-sm text-muted">
                    Address or table note (optional)
                  </label>
                  <textarea
                    id="order-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="text-xl font-semibold">{formatPrice(total)}</span>
              </div>

              <a
                href={waLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent font-semibold text-on-accent transition-transform hover:scale-[1.02]"
              >
                Send order on WhatsApp
              </a>
              <button
                type="button"
                onClick={clear}
                className="mt-2 h-11 w-full text-sm text-muted hover:text-foreground"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}