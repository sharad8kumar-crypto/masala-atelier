export type Testimonial = {
  name: string;
  detail: string;
  quote: string;
  rating: 4 | 5;
};

// All reviews are sample content for a concept project.
export const testimonials: Testimonial[] = [
  {
    name: "Ananya S.",
    detail: "Birthday dinner",
    quote:
      "The smoked dal makhani alone is worth the trip. Warm service, beautiful lighting, and we did not feel rushed once.",
    rating: 5,
  },
  {
    name: "Rohit K.",
    detail: "Weekend lunch",
    quote:
      "Ordered the biryani on WhatsApp and it was ready in 25 minutes. Packed well, still hot, and properly spiced.",
    rating: 5,
  },
  {
    name: "Meera & Dev",
    detail: "Date night",
    quote:
      "Quiet corner tables and a menu that is easy to share. The saffron rasmalai was the perfect end to the evening.",
    rating: 4,
  },
];