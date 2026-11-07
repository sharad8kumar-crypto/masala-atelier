import { site, type Day } from "@/data/site";

const dayName: Record<Day, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export function RestaurantJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://masala-atelier.vercel.app";

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: site.description,
    url: base,
    telephone: site.phone,
    servesCuisine: "Indian",
    priceRange: "₹₹",
    hasMenu: `${base}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop 12, Garden Road",
      addressLocality: "Meerut",
      addressRegion: "Uttar Pradesh",
      postalCode: "250001",
      addressCountry: "IN",
    },
    openingHoursSpecification: (Object.keys(site.hours) as Day[]).flatMap(
      (d) => {
        const h = site.hours[d];
        return h
          ? [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: dayName[d],
                opens: h.open,
                closes: h.close,
              },
            ]
          : [];
      }
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}