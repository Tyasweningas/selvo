import AdminAppBar from "@/components/admin/admin-app-bar";
import AdminDashboardMenu from "@/components/admin/dashboard/menu";
import DashboardLayoutClient from "@/components/global/dashboard-layout-client";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayoutClient
      appBar={<AdminAppBar />}
      menu={<AdminDashboardMenu />}
      bgGradientFromClass="from-primary-blue/34"
    >
      {children}
    </DashboardLayoutClient>
  );
};

export default AdminLayout;
