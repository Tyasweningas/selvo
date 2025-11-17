import { StaticImageData } from "next/image";
export interface ProductCardType {
    id: number;
    name: string;
    thumbnail: string | StaticImageData;
    price: number;
    creator: string;
    rate: number;
    categoryId: number;
    discount?: number;
} 