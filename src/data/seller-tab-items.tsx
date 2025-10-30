import { ISellerTab } from "@/types/seller-tab-nav";

export const dashboardTabItems: ISellerTab[] = [
  {
    path: "/dashboard/statistic",
    name: "Statistik Umum",
  },
  {
    path: "/dashboard/withdraw",
    name: "Penarikan Saldo",
  },
];

export const productTabItems: ISellerTab[] = [
  {
    path: "/dashboard-product",
    name: "Daftar Produk",
  },
  {
    path: "/dashboard-product/add",
    name: "Tambah Produk",
  },
];
