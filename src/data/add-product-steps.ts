import AddProductGeneral from "@/components/seller/dashboard/product/add-product-general";

interface Step {
  name: string;
  component: React.FC;
}

export const add_product_steps: Step[] = [
  {
    name: "Gambaran Umum",
    component: AddProductGeneral,
  },
  {
    name: "Deskripsi & Harga",
    component: AddProductGeneral,
  },
  {
    name: "Spesifikasi Produk",
    component: AddProductGeneral,
  },
  {
    name: "Publikasi",
    component: AddProductGeneral,
  },
];
