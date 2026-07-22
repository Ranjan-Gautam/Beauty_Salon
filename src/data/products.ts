// src/data/products.ts
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number | null;
  badge: string | null;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Moisturizing Shaving Cream",
    image: "/products/crew.jpg",
    price: 100,
    oldPrice: 120,
    badge: "Featured",
  },
  {
    id: 2,
    name: "Natural Plant Hand Wash",
    image: "/products/HandWash.jpg",
    price: 90,
    oldPrice: null,
    badge: null,
  },
  {
    id: 3,
    name: "Oriflame – White Night Cream",
    image: "/products/NightCream.jpg",
    price: 50,
    oldPrice: 55,
    badge: "Featured",
  },
  {
    id: 4,
    name: "Oriflame – Dual Core",
    image: "/products/DualCore.jpg",
    price: 30,
    oldPrice: null,
    badge: null,
  },
  {
    id: 5,
    name: "Aloevera Face Wash",
    image: "/products/AeloveraFaceWash.jpg",
    price: 40,
    oldPrice: null,
    badge: null,
  },
  {
    id: 6,
    name: "Brightening Day Cream",
    image: "/products/DayCream.jpg",
    price: 65,
    oldPrice: 80,
    badge: "Sale",
  },
  {
    id: 7,
    name: "Dior Beauty Essence",
    image: "/products/Dior.jpg",
    price: 150,
    oldPrice: null,
    badge: "Featured",
  },
  {
    id: 8,
    name: "Dream Cream",
    image: "/products/DreamCream.jpg",
    price: 55,
    oldPrice: null,
    badge: null,
  },
  {
    id: 9,
    name: "Hair Repair Treatment",
    image: "/products/HariProduct.jpg",
    price: 45,
    oldPrice: null,
    badge: null,
  },
  {
    id: 10,
    name: "Jelly Hydration Mask",
    image: "/products/JellyMask.jpg",
    price: 35,
    oldPrice: 45,
    badge: "Sale",
  },
  {
    id: 11,
    name: "SK-II Essence Cream",
    image: "/products/Sk-iiCream.jpg",
    price: 180,
    oldPrice: null,
    badge: "Featured",
  },
  {
    id: 12,
    name: "Ultra Modern Lipstick",
    image: "/products/ultraModernLIpistick.jpg",
    price: 25,
    oldPrice: null,
    badge: null,
  },
];