const items = [
  "Butter Chicken",
  "Smoked Dal Makhani",
  "Tandoori Platter",
  "Paneer Tikka",
  "Masala Chai",
  "Garlic Naan",
  "Gulab Jamun",
];

export function Marquee() {
  return (
    <div
      className="overflow-hidden border-y border-border bg-surface py-4"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((n) => (
          <ul key={n} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center px-6 font-heading text-2xl text-foreground/80"
              >
                {item}
                <span className="ml-12 text-accent-ink">•</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}