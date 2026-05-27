"use client";

import { useAdmin } from "@/hooks/use-admin";
import { MdAdminPanelSettings } from "react-icons/md";

const AdminMenuUser = () => {
  const { admin, loading } = useAdmin();

  return (
    <div className="border-primary-blue bg-bg-blue flex items-center gap-3 rounded-3xl border-2 p-5">
      <div className="bg-primary-blue rounded-full p-2">
        <MdAdminPanelSettings size={32} className="text-white" />
      </div>
      <div>
        <p className="max-w-[180px] truncate font-bold text-white">
          {loading ? "Memuat akun..." : (admin?.name ?? "Admin")}
        </p>
        <p className="max-w-[180px] truncate text-xs text-white">
          {loading
            ? "Mengambil data session"
            : (admin?.email ?? "Email tidak tersedia")}
        </p>
      </div>
    </div>
  );
};

export default AdminMenuUser;
