import { ReactNode } from "react";

export interface ISellerMenuNav {
  path: string;
  name: string;
  icon: ReactNode;
  dropdownItems: ISellerMenuNavItem[];
}

export interface ISellerMenuNavItem {
  name: string;
  path: string;
}
