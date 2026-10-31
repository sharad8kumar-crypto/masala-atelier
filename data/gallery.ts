export type GalleryItem = {
  src: string;
  alt: string;
  aspect: string; // Tailwind aspect class, gives the masonry its varied heights
};

export const gallery: GalleryItem[] = [
  {
    src: "/images/gallery/gallery-1.jpg",
    alt: "Tandoori platter fresh from the oven",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/gallery-2.jpg",
    alt: "Bowl of slow-cooked dal makhani",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/gallery-3.jpg",
    alt: "Masala chai being poured into a glass",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/gallery/gallery-4.jpg",
    alt: "Whole spices arranged on a wooden board",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/gallery/gallery-5.jpg",
    alt: "Warm candlelit restaurant interior",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/gallery-6.jpg",
    alt: "Saffron biryani served in a clay pot",
    aspect: "aspect-square",
  },
];