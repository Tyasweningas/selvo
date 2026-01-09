import SellerAppBar from "@/components/global/seller-app-bar";
import DashboardMenu from "@/components/seller/dashboard/menu";
import DashboardTab from "@/components/seller/dashboard/tab";
import { productTabItems } from "@/data/seller-tab-items";

const SellerProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="custom-scrollbar h-screen overflow-auto bg-[#0F191E] bg-linear-to-b from-primary-blue/34 to-[#0F191E]">
      <SellerAppBar />
      <div className="container mx-auto flex gap-5 py-10">
        <DashboardMenu />
        <div className="min-w-0 grow">
          <DashboardTab sellerTabs={productTabItems} />
          {children}
        </div>
      </div>
    </main>
  );
};

export default SellerProductLayout;
