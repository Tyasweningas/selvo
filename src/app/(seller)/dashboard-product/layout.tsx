import SellerAppBar from "@/components/global/seller-app-bar";
import DashboardMenu from "@/components/seller/dashboard/menu";
import DashboardTab from "@/components/seller/dashboard/tab";
import { productTabItems } from "@/data/seller-tab-items";
import DashboardLayoutClient from "@/components/global/dashboard-layout-client";

const SellerProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayoutClient
      appBar={<SellerAppBar />}
      menu={<DashboardMenu />}
      bgGradientFromClass="from-primary-blue/34"
    >
      <DashboardTab sellerTabs={productTabItems} />
      {children}
    </DashboardLayoutClient>
  );
};

export default SellerProductLayout;
