import SellerAppBar from "@/components/global/seller-app-bar";
import DashboardMenu from "@/components/seller/dashboard/menu";
import DashboardLayoutClient from "@/components/global/dashboard-layout-client";

const SellerDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayoutClient
      appBar={<SellerAppBar />}
      menu={<DashboardMenu />}
      bgGradientFromClass="from-[#37a2ea]/34"
    >
      {children}
    </DashboardLayoutClient>
  );
};

export default SellerDashboardLayout;
