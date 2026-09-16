import type {
  MenuCategory,
  SpecialDeal,
  Testimonial,
  Feature,
  ContactInfo,
  SocialLink,
  NavLink,
} from "@/types";

// ============================================
// RESTAURANT INFO
// ============================================
export const RESTAURANT = {
  name: "The Pizza Kitchen",
  tagline: "Flavor First, Always.",
  fullTagline: "Flavor First, Always. Cravings Solved.",
  since: "Serving Faisalabad with love",
  rating: 4.1,
  reviewCount: 938,
  services: ["Dine In", "Takeaway", "Delivery"],
};

// ============================================
// CONTACT INFO
// ============================================
export const CONTACT: ContactInfo = {
  address: "48W-101, End Corner, Susan Road, Faisalabad, Pakistan",
  addressShort: "48W-101, End Corner, Susan Road",
  phone1: "041 111 19 20 21",
  phone2: "0322 219 20 21",
  whatsapp: "+923222192021",
  email: "info@thepizzakitchen.pk",
  hours: "12:00 PM – 2:00 AM (Daily)",
  mapUrl: "https://maps.google.com/?q=The+Pizza+Kitchen+Susan+Road+Faisalabad",
  mapEmbedUrl:
    "https://www.google.com/maps?q=The+Pizza+Kitchen+Susan+Road+Faisalabad&output=embed",
};

// ============================================
// NAVIGATION
// ============================================
export const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "menu", label: "Menu", href: "#menu" },
  { id: "specials", label: "Specials", href: "#specials" },
  { id: "reviews", label: "Reviews", href: "#reviews" },
  { id: "contact", label: "Contact", href: "#contact" },
];

// ============================================
// FEATURES (About Section)
// ============================================
export const FEATURES: Feature[] = [
  {
    id: "ingredients",
    title: "Fresh Ingredients",
    description:
      "Hand-picked vegetables, premium cheese, and tender meats — prepared daily.",
    icon: "Star",
  },
  {
    id: "oven",
    title: "Oven Baked Perfection",
    description:
      "Every pizza is baked to golden perfection with our signature crust recipes.",
    icon: "Flame",
  },
  {
    id: "fast",
    title: "30-Min Delivery",
    description:
      "Hot & fresh pizzas delivered to your doorstep in 30 minutes or less.",
    icon: "Package",
  },
  {
    id: "family",
    title: "Family Ambiance",
    description:
      "A cozy dine-in experience perfect for families and friends.",
    icon: "Users",
  },
];

// ============================================
// MENU DATA
// ============================================
export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "pizza",
    name: "Pizza",
    icon: "Pizza",
    description: "Hand-tossed, oven-baked, bursting with flavor",
    subCategories: [
      {
        id: "signature-pizza",
        name: "Signature Pizza",
        description: "Choose your crust style — Round or Square",
        items: [
          {
            id: "chicken-tikka",
            name: "Chicken Tikka",
            description: "Tender chicken tikka with onions & spices",
            price: 1540,
            priceNote: "Round: Medium 1540 | Large 2399",
            isPopular: true,
          },
          {
            id: "chicken-fajita",
            name: "Chicken Fajita",
            description: "Smoky fajita chicken with peppers",
            price: 1540,
            priceNote: "Round: Medium 1540 | Large 2399",
            isPopular: true,
          },
          {
            id: "fajita-sicilian",
            name: "Fajita Sicilian",
            description: "Italian-style fajita with our signature sauce",
            price: 1540,
            priceNote: "Round: Medium 1540 | Large 2399",
          },
          {
            id: "vegi-lover",
            name: "Vegi Lover",
            description: "Loaded with fresh garden vegetables",
            price: 1540,
            priceNote: "Round: Medium 1540 | Large 2399",
          },
          {
            id: "cheese-lover",
            name: "Cheese Lover",
            description: "Mozzarella, cheddar & our secret cheese blend",
            price: 1540,
            priceNote: "Round: Medium 1540 | Large 2399",
          },
        ],
      },
      {
        id: "special-pizza",
        name: "Special Pizza",
        description: "Our chef specialties — loaded to the edges",
        items: [
          {
            id: "super-supreme",
            name: "Super Supreme",
            description: "Chicken, olives, mushrooms, peppers & more",
            price: 590,
            priceNote: "S:590 | R:1340 | L:1790 | XL:2650",
            isPopular: true,
          },
          {
            id: "chicken-sheekh-kebab",
            name: "Chicken Sheekh Kebab",
            description: "Authentic sheekh kebab pizza",
            price: 590,
            priceNote: "S:590 | R:1340 | L:1790 | XL:2650",
          },
          {
            id: "bonfire",
            name: "Bonfire",
            description: "Spicy bonfire pizza for heat lovers",
            price: 590,
            priceNote: "S:590 | R:1340 | L:1790 | XL:2650",
            isSpicy: true,
          },
          {
            id: "euro",
            name: "Euro",
            description: "European-style loaded pizza",
            price: 590,
            priceNote: "S:590 | R:1340 | L:1790 | XL:2650",
          },
          {
            id: "peri-peri",
            name: "Peri Peri",
            description: "Bold peri peri chicken pizza",
            price: 590,
            priceNote: "S:590 | R:1340 | L:1790 | XL:2650",
            isSpicy: true,
          },
          {
            id: "malai-boti",
            name: "Malai Boti",
            description: "Creamy malai boti pizza",
            price: 590,
            priceNote: "S:590 | R:1340 | L:1790 | XL:2650",
            isPopular: true,
          },
          {
            id: "pizza-kitchen-special",
            name: "Pizza Kitchen Special",
            description: "Our house masterpiece",
            price: 590,
            priceNote: "S:590 | R:1340 | L:1790 | XL:2650",
            isPopular: true,
          },
        ],
      },
      {
        id: "square-pizza",
        name: "Square Pizza",
        description: "Square-cut, thick-crust delight",
        items: [
          {
            id: "square-medium",
            name: "Square Pizza Medium",
            price: 1899,
            priceNote: "Medium (Square)",
          },
          {
            id: "square-large",
            name: "Square Pizza Large",
            price: 2599,
            priceNote: "Large (Square)",
          },
        ],
      },
      {
        id: "extra-toppings",
        name: "Extra Toppings",
        description: "Add more to your pizza",
        items: [
          {
            id: "topping-chicken",
            name: "Chicken",
            price: 150,
            priceNote: "S:150 | R:180 | L:300 | XL:350",
          },
          {
            id: "topping-cheese",
            name: "Cheese",
            price: 150,
            priceNote: "S:150 | R:180 | L:300 | XL:350",
          },
          {
            id: "topping-veggies",
            name: "Veggies",
            price: 100,
            priceNote: "S:100 | R:150 | L:180 | XL:250",
          },
        ],
      },
    ],
  },
  {
    id: "appetizers",
    name: "Appetizers",
    icon: "Flame",
    description: "Crispy, hot & flavorful starters",
    subCategories: [
      {
        id: "wings",
        name: "Wings",
        items: [
          {
            id: "hot-wings",
            name: "Oven Baked Hot Wings",
            price: 350,
            priceNote: "6 pcs: 350 | 10 pcs: 650",
            isPopular: true,
            isSpicy: true,
          },
          {
            id: "peri-peri-wings",
            name: "Peri Peri Wings",
            price: 430,
            priceNote: "6 pcs: 430 | 12 pcs: 850",
            isSpicy: true,
          },
          {
            id: "fried-wings",
            name: "Fried Wings",
            price: 350,
            priceNote: "6 pcs: 350 | 10 pcs: 650",
          },
        ],
      },
      {
        id: "wedges",
        name: "Spicy Wedges",
        items: [
          {
            id: "potato-wedges",
            name: "Potato Wedges",
            price: 350,
            priceNote: "Small: 350 | Large: 650",
          },
          {
            id: "potato-skin",
            name: "Potato Skin",
            price: 375,
          },
        ],
      },
      {
        id: "rolls",
        name: "Rolls",
        items: [
          { id: "chicken-spin", name: "Chicken Spin", price: 690, isPopular: true },
          { id: "bbq-chicken-spin", name: "BBQ Chicken Spin", price: 710 },
          { id: "malai-boti-roll", name: "Malai Boti Roll", price: 790 },
        ],
      },
      {
        id: "garlic-bread",
        name: "Garlic Bread",
        items: [
          { id: "garlic-bread-item", name: "Garlic Bread", price: 350 },
          {
            id: "garlic-bread-supreme",
            name: "Garlic Bread Supreme",
            price: 450,
            isPopular: true,
          },
          { id: "garlic-mushrooms", name: "Garlic Mushrooms", price: 375 },
        ],
      },
    ],
  },
  {
    id: "pasta",
    name: "Pastas",
    icon: "UtensilsCrossed",
    description: "Creamy, cheesy, saucy pastas",
    subCategories: [
      {
        id: "pasta-signature",
        name: "Signature Pastas",
        items: [
          {
            id: "fettuccine-alfredo",
            name: "Fettuccine Alfredo",
            description:
              "Pasta in creamy white sauce with mushrooms and chicken chunks",
            price: 899,
            isPopular: true,
          },
          {
            id: "special-macaroni",
            name: "Special Macaroni",
            description: "Macaroni pasta with white sauce, chicken and cheese",
            price: 899,
          },
          {
            id: "soft-crunchy",
            name: "Soft & Crunchy",
            description:
              "Tossed in our rich signature sauce, topped with a golden crunchy finish",
            price: 890,
          },
          {
            id: "lasagne",
            name: "Lasagne",
            description:
              "Layered sheets of pasta with seasoned meat, creamy bechamel, and melted cheese",
            price: 899,
            isPopular: true,
          },
        ],
      },
    ],
  },
  {
    id: "platters",
    name: "Platters",
    icon: "Utensils",
    description: "Sharing platters for the whole table",
    subCategories: [
      {
        id: "sharing",
        name: "Sharing Platters",
        items: [
          {
            id: "special-platter",
            name: "Special Platter",
            description:
              "Chicken wings 2 pcs, seekh kabab & 4 pcs behari chicken spin roll, served with garlic mayo dip",
            price: 990,
          },
          {
            id: "bbq-platter",
            name: "BBQ Platter",
            description:
              "Wings 2 pcs, seekh kabab & 4 pcs of our BBQ chicken spin roll, served with a dip",
            price: 1090,
            isPopular: true,
          },
        ],
      },
    ],
  },
  {
    id: "sandwich",
    name: "Sandwich",
    icon: "Sandwich",
    description: "Fresh & filling sandwiches",
    subCategories: [
      {
        id: "sandwich-types",
        name: "Our Sandwiches",
        items: [
          { id: "mexican-sandwich", name: "Mexican", price: 720 },
          { id: "malai-boti-sandwich", name: "Malai Boti", price: 760 },
          { id: "special-sandwich", name: "Special", price: 780, isPopular: true },
        ],
      },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "Coffee",
    description: "Hot & cold drinks to refresh",
    subCategories: [
      {
        id: "hot-drinks",
        name: "Hot Drinks",
        items: [
          { id: "coffee", name: "Coffee", price: 350 },
          { id: "cappuccino", name: "Cappuccino", price: 380 },
          { id: "latte", name: "Latte", price: 350 },
          { id: "hot-tea", name: "Hot Tea", price: 150 },
          { id: "green-tea", name: "Green Tea", price: 120 },
          { id: "cardamom-tea", name: "Cardamom Tea", price: 220 },
        ],
      },
      {
        id: "cold-drinks",
        name: "Cold Drinks & Shakes",
        items: [
          { id: "cold-coffee", name: "Cold Coffee", price: 450 },
          {
            id: "milkshake-icecream",
            name: "Milkshake with Icecream",
            price: 450,
            isPopular: true,
          },
          {
            id: "milkshake",
            name: "Milk Shake",
            description: "Chocolate, Strawberry, Vanilla, Pista",
            price: 450,
          },
        ],
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "IceCreamCone",
    description: "Sweet endings to your meal",
    subCategories: [
      {
        id: "sweet-treats",
        name: "Sweet Treats",
        items: [
          { id: "brownie-sundae", name: "Brownie Sundae", price: 399, isPopular: true },
          { id: "tutti-fruity", name: "Tutti Fruity", price: 650 },
          { id: "single-scoop", name: "Single Scoop Icecream", price: 150 },
          { id: "double-scoop", name: "Double Scoop Icecream", price: 275, isPopular: true },
        ],
      },
      {
        id: "salad-bar",
        name: "Salad Bar",
        items: [
          {
            id: "salad",
            name: "Fresh Salad",
            price: 450,
            priceNote: "Half: 450 | Full: 799",
          },
        ],
      },
    ],
  },
];

// ============================================
// SPECIAL DEALS
// ============================================
export const SPECIAL_DEALS: SpecialDeal[] = [
  {
    id: "eid-offer",
    title: "Eid Feast Now",
    subtitle: "With A Treat!",
    description: "Enjoy 20% OFF on the Entire Menu. Dine in, take away, or get it delivered.",
    badge: "20% OFF",
    image: "/images/hero/hero-pizza.webp",
    ctaText: "Claim Offer",
  },
  {
    id: "ramzan-deal",
    title: "Ramzan Special Deals",
    subtitle: "8 PM – 2 AM",
    description: "Unlimited Flavor for Unlimited Blessings. Deals starting from Rs 790.",
    badge: "Ramzan Deal",
    image: "/images/hero/hero-pizza.webp",
    ctaText: "View Deals",
  },
  {
    id: "deal-2",
    title: "Deal 2",
    subtitle: "Your Daily Dose of Delicious",
    description: "1 Regular Pizza + 1 Medium Pizza. Perfect for sharing.",
    price: 1250,
    oldPrice: 1540,
    badge: "Save Rs 290",
    image: "/images/hero/hero-pizza.webp",
    ctaText: "Order Now",
  },
  {
    id: "iftaar-deal",
    title: "Iftaar Deal",
    subtitle: "Aftari Kamra",
    description: "Fries + Nuggets + 2 Pcs Behari Chicken Spin Rolls.",
    price: 1350,
    badge: "Family Deal",
    image: "/images/hero/hero-pizza.webp",
    ctaText: "Order Now",
  },
];

// ============================================
// TESTIMONIALS
// ============================================
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Ahmed R.",
    rating: 5,
    text: "Best pizza in Faisalabad! The Super Supreme is unbeatable. Cheese quality is amazing and delivery is always hot.",
    initial: "A",
  },
  {
    id: "t2",
    name: "Sana K.",
    rating: 5,
    text: "Love their Fettuccine Alfredo and the ambiance of the dine-in. Perfect spot for family dinners.",
    initial: "S",
  },
  {
    id: "t3",
    name: "Bilal H.",
    rating: 4,
    text: "Hot Wings are addictive! Order at least 3 times a month. Peri Peri is my favorite.",
    initial: "B",
  },
  {
    id: "t4",
    name: "Fatima M.",
    rating: 5,
    text: "The Brownie Sundae is a must-try dessert. Staff is friendly and service is quick.",
    initial: "F",
  },
  {
    id: "t5",
    name: "Usman T.",
    rating: 5,
    text: "Their 30-minute delivery promise is real. Fresh, hot, and delicious every single time.",
    initial: "U",
  },
  {
    id: "t6",
    name: "Zara S.",
    rating: 4,
    text: "Malai Boti pizza is my go-to order. Creamy, tender, and full of flavor.",
    initial: "Z",
  },
];

// ============================================
// SOCIAL LINKS
// ============================================
// Using inline SVG paths since lucide-react removed brand icons
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "facebook",
    name: "Facebook",
    url: "https://facebook.com/thepizzakitchenpk",
    svgPath:
      "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/thepizzakitchenpk",
    svgPath:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    id: "tiktok",
    name: "TikTok",
    url: "https://tiktok.com/@thepizzakitchenpk",
    svgPath:
      "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
];

// ============================================
// FORMAT HELPERS
// ============================================
export function formatPrice(price: number): string {
  return `Rs ${price.toLocaleString("en-PK")}`;
}