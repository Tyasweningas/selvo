import { ISellerMenuNav } from "@/types/seller-menu-nav";
import {
  MdArrowCircleUp,
  MdOutlineHome,
  MdOutlineStars,
  MdOutlineStickyNote2,
  MdWorkOutline,
} from "react-icons/md";

/**
 * Ini buat menu yeah
 */
export const sellerNavItems: ISellerMenuNav[] = [
  {
    path: "/dashboard/",
    name: "Beranda",
    icon: <MdOutlineHome size={24} />,
    dropdownItems: [
      { name: "Statistik Umum", path: "/dashboard/statistic" },
      { name: "Penarikan Saldo", path: "/dashboard/withdraw" },
    ],
  },
  {
    path: "/dashboard-product",
    name: "Produk",
    icon: <MdWorkOutline size={24} />,
    dropdownItems: [
      { name: "Daftar Produk", path: "/dashboard-product" },
      { name: "Tambah Produk", path: "/dashboard-product/add" },
    ],
  },
  {
    path: "/dashboard/sales",
    name: "Penjualan",
    icon: <MdOutlineStickyNote2 size={24} />,
    dropdownItems: [
      { name: "Semua Pesanan", path: "/dashboard/sales" },
      { name: "Pesanan Baru", path: "/dashboard/sales/baru" },
      { name: "Dalam Proses", path: "/dashboard/sales/proses" },
      { name: "Selesai", path: "/dashboard/sales/selesai" },
    ],
  },
  {
    path: "/dashboard/reviews",
    name: "Ulasan Toko",
    icon: <MdOutlineStars size={24} />,
    dropdownItems: [],
  },
  {
    path: "/dashboard/promotion",
    name: "Promosi dan Iklan",
    icon: <MdArrowCircleUp size={24} />,
    dropdownItems: [
      { name: "Voucher", path: "/dashboard/promotion/voucher" },
      { name: "Flash Sale", path: "/dashboard/promotion/flash-sale" },
    ],
  },
];
