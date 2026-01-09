import {
  category_3d,
  category_design,
  category_font,
  category_illustration,
  category_photography,
  category_uiux,
  category_videography,
  category_web,
} from "@/assets/icon/category";
import { ProductCategory } from "@/types/product";

export const product_categories: ProductCategory[] = [
  {
    productCategoryId: "3e396460-7b89-4ad2-b0b3-c641a3628d74",
    name: "Videografi",
    description: "Script & source code video",
    icon: category_videography.src,
  },
  {
    productCategoryId: "718f05de-4860-4a37-8afc-88a842a2ef39",
    name: "Illustrasi",
    description: "Ilustrasi siap pakai",
    icon: category_illustration.src,  
  },
  {
    productCategoryId: "2db1ee98-45f8-4204-b6d4-e2e202441632",
    name: "Fotografi",
    description: "Model & aset 3D",
    icon: category_photography.src,
  },
  {
    productCategoryId: "cb033a1a-65e9-4c80-b742-32daacba5e77",
    name: "Desain",
    description: "Aset foto & preset",
    icon: category_design.src,
  },
  {
    productCategoryId: "33ee84f9-98be-47af-b86e-07cb293fdb37",
    name: "UI/UX",
    description: "Tampilan siap pakai",
    icon: category_uiux.src,
  },
  {
    productCategoryId: "4e6461e6-c3e0-4622-99f5-f6212d8cea02",
    name: "Font",
    description: "Keluarga font",
    icon: category_font.src,
  },
  {
    productCategoryId: "b4cf095b-bbf1-47b0-af38-949bfad78b2b",
    name: "Website",
    description: "Template Website",
    icon: category_web.src,
  },
  {
    productCategoryId: "18b80c59-9f92-409a-96a9-a0a4955c01de",
    name: "3 Dimensi",
    description: "Elemen 3D",
    icon: category_3d.src,
  },
];
