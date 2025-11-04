import {
  category_3d,
  category_design,
  category_illustration,
  category_photography,
  category_video,
  category_web,
} from "@/assets/icon/category";
import { ProductCategory } from "@/types/product";

export const product_categories: ProductCategory[] = [
  {
    name: "Website",
    description: "Script & Source Code",
    icon: category_web.src,
  },
  {
    name: "Ilustrasi",
    description: "Ilustrasi siap pakai",
    icon: category_illustration.src,
  },
  {
    name: "3 Dimensi",
    description: "Model dan Aset 3D",
    icon: category_3d.src,
  },
  {
    name: "Fotografi",
    description: "Aset foto & preset",
    icon: category_photography.src,
  },
  {
    name: "Mockup",
    description: "Tampilan Siap Pakai",
    icon: category_illustration.src,
  },
  {
    name: "Video",
    description: "Footage & elemen",
    icon: category_video.src,
  },
  {
    name: "Desain",
    description: "Template grafis",
    icon: category_design.src,
  },
];
