import { dishes, formatPrice } from "@/data/menu";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { Spice, VegMark } from "@/components/ui/DishCard";
import { SafeImage } from "@/components/ui/SafeImage";

export function ChefSpecial() {
  const dish = dishes.find((d) => d.id === "rogan-josh");
  if (!dish) return null;

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6"
      aria-labelledby="chef-heading"
    >
      <div className="grid overflow-hidden rounded-[2rem] border border-border bg-surface md:grid-cols-2">
        <div className="relative min-h-72 bg-gradient-to-br from-chili/30 via-accent/20 to-surface">
          <SafeImage
            src={`/images/dishes/${dish.id}.jpg`}
            alt={dish.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            fallbackLabel={dish.name}
          />
        </div>

        <div className="p-8 sm:p-12">
          <p className="font-script text-4xl text-gold sm:text-5xl">
            Chef&apos;s special
          </p>
          <h2
            id="chef-heading"
            className="mt-2 font-heading text-3xl font-semibold uppercase tracking-[0.12em] sm:text-4xl"
          >
            {dish.name}
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <VegMark veg={dish.veg} />
            <Spice level={dish.spice} />
          </div>
          <p className="mt-5 text-lg text-muted">{dish.description}</p>
          <p className="mt-4 text-muted">
            &ldquo;I slow-braise this for four hours until the oil turns red and
            the meat falls off the bone. It is the dish I cook for my own
            family.&rdquo;
            <span className="mt-2 block text-sm text-foreground">
              Chef Arjun Mehra (sample)
            </span>
          </p>

          <div className="mt-8 flex items-center gap-6">
            <p className="text-2xl font-semibold text-accent-ink">
              {formatPrice(dish.price)}
            </p>
            <AddToCartButton dish={dish} />
          </div>
        </div>
      </div>
    </section>
  );
}