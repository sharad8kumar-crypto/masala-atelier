"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { Flame } from "lucide-react";
import { formatPrice, type Dish } from "@/data/menu";
import { SafeImage } from "@/components/ui/SafeImage";

export function VegMark({ veg }: { veg: boolean }) {
  const color = veg ? "border-green-600" : "border-chili";
  const dot = veg ? "bg-green-600" : "bg-chili";
  return (
    <span
      className={`inline-flex h-4 w-4 items-center justify-center rounded-[3px] border ${color}`}
      role="img"
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} />
    </span>
  );
}

export function Spice({ level }: { level: number }) {
  if (level === 0) return null;
  return (
    <span
      className="inline-flex items-center gap-0.5 text-accent-ink"
      role="img"
      aria-label={`Spice level ${level} of 3`}
    >
      {Array.from({ length: level }).map((_, i) => (
        <Flame key={i} size={14} aria-hidden="true" />
      ))}
    </span>
  );
}

export function DishCard({ dish }: { dish: Dish }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [7, -7]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-7, 7]), {
    stiffness: 200,
    damping: 20,
  });

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function reset() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <div
      style={{ perspective: 1000 }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <motion.article
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="overflow-hidden rounded-3xl border border-border bg-surface"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-accent/30 via-surface to-chili/20">
          <SafeImage
            src={dish.image ?? `/images/dishes/${dish.id}.jpg`}
            alt={dish.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            fallbackLabel={dish.name}
          />
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2">
            <VegMark veg={dish.veg} />
            <Spice level={dish.spice} />
          </div>
          <h3 className="mt-3 font-heading text-xl font-semibold">{dish.name}</h3>
          <p className="mt-2 text-sm text-muted">{dish.description}</p>
          <p className="mt-4 font-semibold text-accent-ink">
            {formatPrice(dish.price)}
          </p>
        </div>
      </motion.article>
    </div>
  );
}