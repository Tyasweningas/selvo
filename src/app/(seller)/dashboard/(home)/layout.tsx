import DashboardTab from "@/components/seller/dashboard/tab";
import { dashboardTabItems } from "@/data/seller-tab-items";

const DashboardHomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardTab sellerTabs={dashboardTabItems} />
      {children}
    </>
  );
};

export default DashboardHomeLayout;
