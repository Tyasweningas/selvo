import { ISellerTab } from "@/types/seller-tab-nav";
import clsx from "clsx";
import Link from "next/link";

interface props {
  tab: ISellerTab;
  currentPath: string;
}

const TabItem = ({ tab, currentPath }: props) => {
  return (
    <div className="group grow">
      <Link
        href={tab.path}
        className={clsx(
          "block py-5 text-center text-sm font-semibold group-hover:text-white",
          tab.path === currentPath ? "text-white" : "text-tertier-netral",
        )}
      >
        {tab.name}
      </Link>
      <div
        className={clsx(
          "bg-primary-green mx-1 h-1 rounded-full transition duration-200",
          tab.path !== currentPath && "opacity-0 group-hover:opacity-100",
        )}
      ></div>
    </div>
  );
};

export default TabItem;
