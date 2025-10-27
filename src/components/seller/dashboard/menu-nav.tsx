import { sellerNavItems } from "@/data/seller-nav-items";
import { usePathname } from "next/navigation";
import MenuNavItem from "./menu-nav-item";

const MenuNav = () => {
  const currentPath = usePathname();

  return (
    <nav className="space-y-1" aria-label="Seller Dashboard Navigation">
      {sellerNavItems.map((item) => (
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

export default MenuNav;
