"use client";

import { MdMenu } from "react-icons/md";
import AdminMenuNav from "./menu-nav";
import AdminMenuUser from "./menu-user";

interface AdminDashboardMenuProps {
  variant?: "sidebar" | "drawer";
}

const AdminDashboardMenu = ({ variant = "sidebar" }: AdminDashboardMenuProps) => {
  const containerClasses =
    variant === "drawer"
      ? "w-full py-2 space-y-6"
      : "border-bg-light from-bg-nav/42 to-bg-nav/58 sticky top-8 h-fit rounded-xl border-2 bg-linear-to-b py-8";

  return (
    <div className={containerClasses}>
      {variant === "sidebar" && (
        <div className="flex gap-5 px-5">
          <MdMenu size={24} className="text-white" />
          <p className="font-semibold text-white">Menu Admin</p>
        </div>
      )}
      <div className={variant === "drawer" ? "px-2" : "my-16 px-5"}>
        <AdminMenuUser />
      </div>
      <div className={variant === "drawer" ? "px-2" : ""}>
        <AdminMenuNav />
      </div>
    </div>
  );
};

export default AdminDashboardMenu;
