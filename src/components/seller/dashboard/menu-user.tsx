"use client";

import { useUser } from "@/hooks/use-user";
import { MdPerson } from "react-icons/md";

const MenuUser = () => {
  const { user, loading } = useUser();

  return (
    <div className="border-primary-blue bg-bg-blue flex items-center gap-3 rounded-3xl border-2 p-5">
      <div className="bg-primary-blue rounded-full p-2">
        <MdPerson size={32} className="text-white" />
      </div>
      <div>
        <p className="max-w-[180px] truncate font-bold text-white">
          {loading ? "Memuat akun..." : (user?.name ?? "Seller")}
        </p>
        <p className="max-w-[180px] truncate text-xs text-white">
          {loading
            ? "Mengambil data session"
            : (user?.email ?? "Email tidak tersedia")}
        </p>
      </div>
    </div>
  );
};

export default MenuUser;
