import AdminAppBar from "@/components/admin/admin-app-bar";
import AdminDashboardMenu from "@/components/admin/dashboard/menu";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="custom-scrollbar from-primary-blue/34 h-screen overflow-auto bg-[#0F191E] bg-linear-to-b to-[#0F191E]">
      <AdminAppBar />
      <div className="container mx-auto flex gap-5 py-10">
        <AdminDashboardMenu />
        <div className="min-w-0 grow">{children}</div>
      </div>
    </main>
  );
};

export default AdminLayout;
