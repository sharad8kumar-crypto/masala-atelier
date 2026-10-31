import type { Metadata } from "next";
import { MenuExplorer } from "@/components/sections/MenuExplorer";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse the full Masala Atelier menu: starters, mains, breads, desserts and drinks. Sample menu for a concept demo.",
};

export default function MenuPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm uppercase tracking-[0.3em] text-accent-ink">Our menu</p>
      <h1 className="mt-3 font-heading text-5xl font-semibold sm:text-6xl">
        Everything we cook
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        All prices in Rs. This is a sample menu for a concept project.
      </p>
      <MenuExplorer />
    </section>
  );
}