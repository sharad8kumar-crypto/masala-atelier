export type Day = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type Hours = { open: string; close: string } | null;

export const site = {
  name: "Masala Atelier",
  tagline: "Modern Indian kitchen. Slow-cooked stories.",
  description:
    "Masala Atelier is a modern Indian cafe and restaurant. Order on WhatsApp, reserve a table, or visit us. (Concept demo with sample content.)",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "919876543210", // country code + number, no + or spaces
  email: "hello@masalaatelier.example",
  address: "Shop 12, Garden Road, Meerut, Uttar Pradesh 250001",
  instagram: "https://instagram.com/",
  hours: {
    Mon: { open: "11:00", close: "23:00" },
    Tue: null, // closed
    Wed: { open: "11:00", close: "23:00" },
    Thu: { open: "11:00", close: "23:00" },
    Fri: { open: "11:00", close: "23:30" },
    Sat: { open: "11:00", close: "23:30" },
    Sun: { open: "11:00", close: "23:00" },
  } satisfies Record<Day, Hours>,
};

export function waLink(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}