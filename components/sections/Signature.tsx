"use client";

import { motion, useReducedMotion } from "motion/react";
import { dishes } from "@/data/menu";
import { DishCard } from "@/components/ui/DishCard";
import { ScriptHeading } from "@/components/ui/ScriptHeading";

export function Signature() {
  const reduce = useReducedMotion();
  const signature = dishes.filter((d) => d.signature);

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6"
      aria-labelledby="signature-heading"
    >
      <ScriptHeading
        script="Savour"
        title="Signature Dishes"
        id="signature-heading"
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {signature.map((dish, i) => (
          <motion.div
            key={dish.id}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
          >
            <DishCard dish={dish} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}