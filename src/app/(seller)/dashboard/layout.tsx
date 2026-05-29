import SellerAppBar from "@/components/global/seller-app-bar";
import DashboardMenu from "@/components/seller/dashboard/menu";

const SellerDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="custom-scrollbar h-screen overflow-auto bg-[#0F191E] bg-linear-to-b from-[#37a2ea]/34 to-[#0F191E]">
      <SellerAppBar />
      <div className="container mx-auto flex gap-5 py-10">
        <DashboardMenu />
        <div className="min-w-0 grow">{children}</div>
      </div>
    </main>
  );
};

export default SellerDashboardLayout;
