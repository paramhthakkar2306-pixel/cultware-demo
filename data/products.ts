export type ProductCategory = "MENSWEAR" | "WOMENSWEAR";
export type GarmentType = "OUTERWEAR" | "TOPS" | "BOTTOMS";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  /** Used by the size-visualizer silhouette renderer */
  garment: GarmentType;
  price: number;
  /** Path relative to /public — swap in real photography here */
  image: string;
  // Extend later:
  // sizes: SizeOption[];
  // description: string;
  // availableForInquiry: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "m1-shadow-ritual-set",
    name: "SHADOW RITUAL SET",
    category: "MENSWEAR",
    garment: "OUTERWEAR",
    price: 14999,
    image: "/images/M1.png",
  },
  {
    id: "m2-void-oversized-jacket",
    name: "VOID OVERSIZED JACKET",
    category: "MENSWEAR",
    garment: "TOPS",
    price: 8999,
    image: "/images/M2.png",
  },
  {
    id: "w1-dark-feminine-drape",
    name: "DARK FEMININE DRAPE",
    category: "WOMENSWEAR",
    garment: "OUTERWEAR",
    price: 11499,
    image: "/images/W1.png",
  },
  {
    id: "w2-cult-noir-coord",
    name: "CULT NOIR COORD",
    category: "WOMENSWEAR",
    garment: "BOTTOMS",
    price: 12999,
    image: "/images/W2.png",
  },
];
