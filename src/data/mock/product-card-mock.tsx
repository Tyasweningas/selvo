import { ProductCardType } from "@/types/product-card";
import { thumbnail_1, thumbnail_2, thumbnail_3, thumbnail_4 } from "@/assets/items";


export const products: ProductCardType[] = [
  {
    id: 1,
    name: "Template Landing Page",
    thumbnail: thumbnail_1,
    price: 700000,
    creator: "Bayu Maulana",
    rate: 4.2,
    categoryId: 1,
  },
  {
    id: 2,
    name: "Foto Profil Waifu",
    thumbnail: thumbnail_2,
    price: 10600,
    creator: "Ibnu Hanif",
    rate: 3.2,
    categoryId: 5,
  },
  {
    id: 3,
    name: "Template PPT – Burung",
    thumbnail: thumbnail_3,
    price: 55400,
    creator: "Rahel",
    rate: 5.0,
    categoryId: 2,
  },
    {
    id: 4,
    name: "Template PPT – Burung",
    thumbnail: thumbnail_4,
    price: 55400,
    creator: "Rahel",
    rate: 5.0,
    categoryId: 1,
  },
    {
    id: 3,
    name: "Template PPT – Burung",
    thumbnail: thumbnail_1,
    price: 55400,
    creator: "Tyas",
    rate: 5.0,
    categoryId: 3,
  },
];
