import { categoryType } from '@/types/categories';
import CategoryWebsite from "@/assets/icon/category/category-web.png";
import CategoryUnggulan from "@/assets/icon/category/category-unggulan.png";
import CategoryIllustration from "@/assets/icon/category/category-illustration.png";
import Category3D from "@/assets/icon/category/category-3d.png";
import CategoryPhotography from "@/assets/icon/category/category-photography.png";
import CategoryMockup from "@/assets/icon/category/category-mockup.png";
import CategoryVideo from "@/assets/icon/category/category-video.png";
import CategoryDesain from "@/assets/icon/category/category-design.png";

export const product_categories: categoryType[] = [
  {
    id: 1,
    categorieName: "Unggulan",
    categorieDesc: "Produk Pilihan Terbaik",
    icon: CategoryUnggulan,
  },
  {
    id: 2,
    categorieName: "Website",
    categorieDesc: "Script & Source Code Terbaik",
    icon: CategoryWebsite,
  },
  {
    id: 3,
    categorieName: "Illustrasi",
    categorieDesc: "Illustrasi siap pakai",
    icon: CategoryIllustration,
  },
  {
    id: 4,
    categorieName: "3 Dimensi",
    categorieDesc: "Model & Aset 3D",
    icon: Category3D,
  },
  {
    id: 5,
    categorieName: "Fotografi",
    categorieDesc: "Aset Foto & Preset",
    icon: CategoryPhotography,
  },
  {
    id: 6,
    categorieName: "Mockup",
    categorieDesc: "Tampilan siap pakai",
    icon: CategoryMockup,
  },
  {
    id: 7,
    categorieName: "Video",
    categorieDesc: "Footage & Elemen",
    icon: CategoryVideo,
  },
  {
    id: 8,
    categorieName: "Desain",
    categorieDesc: "Template Desain Grafis",
    icon: CategoryDesain,
  },
];
