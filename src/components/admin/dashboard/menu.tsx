"use client";

import { MdMenu } from "react-icons/md";
import AdminMenuNav from "./menu-nav";
import AdminMenuUser from "./menu-user";

const AdminDashboardMenu = () => {
  return (
    <div className="border-bg-light from-bg-nav/42 to-bg-nav/58 sticky top-8 h-fit rounded-xl border-2 bg-linear-to-b py-8">
      <div className="flex gap-5 px-5">
        <MdMenu size={24} className="text-white" />
        <p className="font-semibold text-white">Menu Admin</p>
      </div>
      <div className="my-16 px-5">
        <AdminMenuUser />
      </div>
      <AdminMenuNav />
    </div>
  );
};

export default AdminDashboardMenu;
