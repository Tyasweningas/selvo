import { ISellerMenuNav } from "@/types/seller-menu-nav";
import {
  MdAccountBalanceWallet,
  MdOutlineHome,
  MdWorkOutline,
} from "react-icons/md";

export const adminNavItems: ISellerMenuNav[] = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: <MdOutlineHome size={24} />,
    dropdownItems: [],
  },
  {
    path: "/admin/products",
    name: "Daftar Produk",
    icon: <MdWorkOutline size={24} />,
    dropdownItems: [],
  },
  {
    path: "/admin/withdrawals",
    name: "Withdrawal",
    icon: <MdAccountBalanceWallet size={24} />,
    dropdownItems: [],
  },
];
