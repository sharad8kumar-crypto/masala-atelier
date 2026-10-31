import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartLine = { id: string; qty: number };

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

const MAX_QTY = 20;

// localStorage can throw (private mode, blocked storage), so wrap every call.
function getSafeStorage() {
  return {
    getItem: (name: string) => {
      try {
        return window.localStorage.getItem(name);
      } catch {
        return null;
      }
    },
    setItem: (name: string, value: string) => {
      try {
        window.localStorage.setItem(name, value);
      } catch {
        /* ignore */
      }
    },
    removeItem: (name: string) => {
      try {
        window.localStorage.removeItem(name);
      } catch {
        /* ignore */
      }
    },
  };
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      add: (id) =>
        set((s) => {
          const found = s.lines.find((l) => l.id === id);
          return {
            lines: found
              ? s.lines.map((l) =>
                  l.id === id ? { ...l, qty: Math.min(l.qty + 1, MAX_QTY) } : l
                )
              : [...s.lines, { id, qty: 1 }],
          };
        }),
      setQty: (id, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.id !== id)
              : s.lines.map((l) =>
                  l.id === id ? { ...l, qty: Math.min(qty, MAX_QTY) } : l
                ),
        })),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.id !== id) })),
      clear: () => set({ lines: [] }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "masala-cart",
      storage: createJSONStorage(getSafeStorage),
      partialize: (s) => ({ lines: s.lines }),
      skipHydration: true, // we rehydrate manually after mount (avoids hydration mismatch)
    }
  )
);