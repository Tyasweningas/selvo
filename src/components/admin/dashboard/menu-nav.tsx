"use client";

import MenuNavItem from "@/components/seller/dashboard/menu-nav-item";
import { adminNavItems } from "@/data/admin-nav-items";
import { usePathname } from "next/navigation";

const AdminMenuNav = () => {
  const currentPath = usePathname();

  return (
    <nav className="space-y-1" aria-label="Admin Dashboard Navigation">
      {adminNavItems.map((item) => (
        <MenuNavItem
          key={item.path}
          path={item.path}
          name={item.name}
          icon={item.icon}
          dropdownItems={item.dropdownItems}
          currentPath={currentPath}
        />
      ))}
    </nav>
  );
};

export default AdminMenuNav;
