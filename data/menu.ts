export const categories = [
  "Starters",
  "Mains",
  "Breads & Rice",
  "Desserts",
  "Drinks",
] as const;

export type Category = (typeof categories)[number];

export type Dish = {
  id: string;
  name: string;
  category: Category;
  price: number; // in Rs
  veg: boolean;
  spice: 0 | 1 | 2 | 3;
  description: string;
  signature?: boolean;
  image?: string; // e.g. "/images/dishes/butter-chicken.jpg" (add later)
};

export const dishes: Dish[] = [
  // Starters
  {
    id: "paneer-tikka",
    name: "Smoked Paneer Tikka",
    category: "Starters",
    price: 290,
    veg: true,
    spice: 2,
    description: "Charred cottage cheese marinated in hung curd and kasuri methi.",
    signature: true,
  },
  {
    id: "chicken-seekh",
    name: "Chicken Seekh Kebab",
    category: "Starters",
    price: 340,
    veg: false,
    spice: 2,
    description: "Minced chicken, green chilli and fresh herbs, grilled on skewers.",
  },
  {
    id: "hara-bhara-kabab",
    name: "Hara Bhara Kabab",
    category: "Starters",
    price: 240,
    veg: true,
    spice: 1,
    description: "Spinach, peas and potato patties with a crisp golden crust.",
  },
  {
    id: "amritsari-fish",
    name: "Amritsari Fish Fry",
    category: "Starters",
    price: 380,
    veg: false,
    spice: 2,
    description: "Ajwain-scented batter-fried fish with mint chutney.",
  },

  // Mains
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    category: "Mains",
    price: 420,
    veg: false,
    spice: 1,
    description: "Tandoori chicken in a silky tomato and butter gravy.",
    signature: true,
  },
  {
    id: "dal-makhani",
    name: "Smoked Dal Makhani",
    category: "Mains",
    price: 320,
    veg: true,
    spice: 1,
    description: "Black lentils slow-cooked overnight with cream and a coal smoke finish.",
    signature: true,
  },
  {
    id: "rogan-josh",
    name: "Lamb Rogan Josh",
    category: "Mains",
    price: 520,
    veg: false,
    spice: 3,
    description: "Kashmiri-style lamb braised with whole spices and dry chillies.",
  },
  {
    id: "palak-paneer",
    name: "Palak Paneer",
    category: "Mains",
    price: 300,
    veg: true,
    spice: 1,
    description: "Fresh spinach puree with soft paneer cubes and garlic tadka.",
  },
  {
    id: "chicken-chettinad",
    name: "Chicken Chettinad",
    category: "Mains",
    price: 440,
    veg: false,
    spice: 3,
    description: "Fiery South Indian curry with freshly ground black pepper and coconut.",
  },

  // Breads & Rice
  {
    id: "garlic-naan",
    name: "Garlic Butter Naan",
    category: "Breads & Rice",
    price: 90,
    veg: true,
    spice: 0,
    description: "Tandoor-baked leavened bread brushed with garlic and butter.",
  },
  {
    id: "laccha-paratha",
    name: "Laccha Paratha",
    category: "Breads & Rice",
    price: 80,
    veg: true,
    spice: 0,
    description: "Flaky, layered whole wheat bread cooked on the tawa.",
  },
  {
    id: "dum-biryani",
    name: "Dum Chicken Biryani",
    category: "Breads & Rice",
    price: 400,
    veg: false,
    spice: 2,
    description: "Basmati and chicken sealed in a pot and slow-steamed with saffron.",
    signature: true,
  },

  // Desserts
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    category: "Desserts",
    price: 140,
    veg: true,
    spice: 0,
    description: "Warm milk dumplings soaked in cardamom syrup.",
  },
  {
    id: "rasmalai",
    name: "Saffron Rasmalai",
    category: "Desserts",
    price: 170,
    veg: true,
    spice: 0,
    description: "Soft paneer discs in chilled saffron and pistachio milk.",
  },
  {
    id: "matka-kulfi",
    name: "Matka Kulfi",
    category: "Desserts",
    price: 150,
    veg: true,
    spice: 0,
    description: "Dense, slow-reduced milk kulfi set in a clay pot.",
  },

  // Drinks
  {
    id: "masala-chai",
    name: "Masala Chai",
    category: "Drinks",
    price: 80,
    veg: true,
    spice: 1,
    description: "Assam tea simmered with ginger, cardamom and cinnamon.",
  },
  {
    id: "mango-lassi",
    name: "Mango Lassi",
    category: "Drinks",
    price: 130,
    veg: true,
    spice: 0,
    description: "Thick yoghurt blended with ripe Alphonso mango.",
  },
  {
    id: "jaljeera",
    name: "Jaljeera",
    category: "Drinks",
    price: 90,
    veg: true,
    spice: 1,
    description: "Chilled cumin and mint cooler with a tangy kick.",
  },
];

export function formatPrice(price: number) {
  return `Rs ${price}`;
}