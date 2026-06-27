"use client";

import { MdMenu } from "react-icons/md";
import MenuNav from "./menu-nav";
import MenuUser from "./menu-user";

interface DashboardMenuProps {
  variant?: "sidebar" | "drawer";
}

const DashboardMenu = ({ variant = "sidebar" }: DashboardMenuProps) => {
  const containerClasses =
    variant === "drawer"
      ? "w-full py-2 space-y-6"
      : "border-bg-light from-bg-nav/42 to-bg-nav/58 sticky top-8 h-fit rounded-xl border-2 bg-gradient-to-b py-8";

  return (
    <div className={containerClasses}>
      {variant === "sidebar" && (
        <div className="flex gap-5 px-5">
          <MdMenu size={24} className="text-white" />
          <p className="font-semibold text-white">Menu Penjual</p>
        </div>
      )}
      <div className={variant === "drawer" ? "px-2" : "my-16 px-5"}>
        <MenuUser />
      </div>
      <div className={variant === "drawer" ? "px-2" : ""}>
        <MenuNav />
      </div>
    </div>
  );
};

export default DashboardMenu;
