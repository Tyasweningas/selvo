import { StaticImageData } from "next/image";
import { DigitalFileType } from "./digital-type";
export interface ProductCardType {
    id: number;
    name: string;
    thumbnail: string | StaticImageData;
    price: number;
    creator: string;
    rate: number;
    categoryId: number;
    discount?: number;
    fileTypes: DigitalFileType[];
} 