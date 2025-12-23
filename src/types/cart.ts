import { StaticImageData } from "next/image";

export interface CartItem {
    id: number;
    name: string;
    thumbnail: string | StaticImageData;
    price: number;
    creator: string;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    isOpen: boolean;
}
