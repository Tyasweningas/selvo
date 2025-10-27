"use client";

import { MdMenu } from "react-icons/md";
import MenuNav from "./menu-nav";
import MenuUser from "./menu-user";

const DashboardMenu = () => {
  return (
    <div className="border-bg-light from-bg-nav/42 to-bg-nav/58 rounded-xl border-2 bg-gradient-to-b py-8">
      <div className="flex gap-5 px-5">
        <MdMenu size={24} className="text-white" />
        <p className="font-semibold text-white">Menu Penjual</p>
      </div>
      <div className="my-16 px-5">
        <MenuUser />
      </div>
      <MenuNav />
    </div>
  );
};

export default DashboardMenu;
