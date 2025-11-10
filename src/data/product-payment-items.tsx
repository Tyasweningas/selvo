// /data/product-payment-items.ts
import { StaticImageData } from "next/image";
import { popular_item_1, item2, item3, item4 } from "@/assets/items";

export type ProductPaymentItem = {
  id: number;
  name: string;
  variant: string;
  qty: number;
  price: number;
  img: string | StaticImageData; 
};

export const productPaymentItems: ProductPaymentItem[] = [
  { 
    id: 1, 
    name: "Templat Laman Website", 
    variant: "Varian warna biru",
    qty: 1, 
    price: 1500000, 
    img: popular_item_1,
  },
  {
    id: 2, 
    name: "Kumpulan Vektor Olahraga", 
    variant: "Varian warna biru",
    qty: 2, 
    price: 1500000, 
    img: item2,
  },
  {
    id: 3, 
    name: "Video Stok Manuk Bakicau", 
    variant: "Varian warna biru",
    qty: 3,
    price: 1500000, 
    img: item3,
  },
  {
    id: 4, 
    name: "Ikon Aesthetic",
    variant: "Varian warna biru",
    qty: 4, 
    price: 1500000, 
    img: item4,
  },
];
