import { StaticImageData } from "next/image";

export type categoryType = {
  id: number;
  categorieName: string;
  categorieDesc: string;
  icon: string | StaticImageData; // ✅ tambahkan StaticImageData
};
