"use client";

import { ISellerTab } from "@/types/seller-tab-nav";
import { usePathname } from "next/navigation";
import TabItem from "./tab-item";

interface props {
  sellerTabs: ISellerTab[];
}

const DashboardTab = ({ sellerTabs }: props) => {
  const currentPath = usePathname();

  return (
    <div className="border-bg-light from-bg-nav/42 to-bg-nav/58 flex rounded-xl border-2 bg-linear-to-b">
      {sellerTabs.map((tab) => (
        <TabItem key={tab.path} tab={tab} currentPath={currentPath} />
      ))}
    </div>
  );
};

export default DashboardTab;
