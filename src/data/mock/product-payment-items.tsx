// /data/product-payment-items.ts
import { StaticImageData } from "next/image";
import { thumbnail_1, thumbnail_2, thumbnail_3, thumbnail_4 } from "@/assets/items";

export type ProductPaymentItem = {
  id: number;
  name: string;
  variant: string;
  qty: number;
  price: number;
  img: string | StaticImageData; 
  category?: string;
};

export const productPaymentItems: ProductPaymentItem[] = [
  { 
    id: 1, 
    name: "Templat Laman Website", 
    variant: "Varian warna biru",
    qty: 1, 
    price: 1500000, 
    img: thumbnail_1,
    category : "Website"
  },
  {
    id: 2, 
    name: "Kumpulan Vektor Olahraga", 
    variant: "Varian warna biru",
    qty: 2, 
    price: 1500000, 
    img: thumbnail_2,
    category : "Illustrasi" 
  },
  {
    id: 3, 
    name: "Video Stok Manuk Bakicau", 
    variant: "Varian warna biru",
    qty: 3,
    price: 1500000, 
    img: thumbnail_3,
    category : "Video"
  },
  {
    id: 4, 
    name: "Ikon Aesthetic",
    variant: "Varian warna biru",
    qty: 4, 
    price: 1500000, 
    img: thumbnail_4,
    category : "Desain"
  },
];