"use client";

import { useAdmin } from "@/hooks/use-admin";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdAdminPanelSettings, MdMail, MdNotifications } from "react-icons/md";

const AdminAppBar = () => {
  const router = useRouter();
  const { admin, loading } = useAdmin();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/auth/admin");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-[linear-gradient(to_bottom,#111D22_0%,#111D22_40%,rgba(17,29,34,0.7)_100%)] py-8">
      <div className="container mx-auto flex flex-row items-center gap-2">
        <div className="flex items-center gap-2">
          <p className="text-primary-blue text-5xl font-extrabold">SELVO</p>
          <p className="text-primary-blue text-lg">Admin.</p>
        </div>

        <div className="flex grow justify-between">
          <div className="grow pl-16">
            <input
              type="text"
              placeholder="Cari Sesuatu..."
              className="w-[600px] rounded-full border-2 border-[#29373D] bg-[#1A2B32] px-5 py-2.5 text-[#9CA3A7] focus:outline-none"
            />
          </div>
          <div className="flex w-fit gap-5">
            <div className="grid place-items-center rounded-xl bg-[#29373D] px-3">
              <MdNotifications size={24} className="text-[#9CA3A7]" />
            </div>
            <div className="grid place-items-center rounded-xl bg-[#29373D] px-3">
              <MdMail size={24} className="text-[#9CA3A7]" />
            </div>
          </div>
        </div>

        <div className="w-24">
          <div className="mx-auto h-12 w-0.5 rounded-full bg-[#29373D]"></div>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="border-primary-blue flex items-center gap-3 rounded-full border-2 bg-[#1A2B32] px-3 py-1.5 transition hover:bg-[#29373D]"
          >
            <div className="rounded-full bg-[#204E31] p-1.5">
              <MdAdminPanelSettings size={24} className="text-primary-blue" />
            </div>
            <div className="text-left">
              <p className="text-primary-blue max-w-[140px] truncate text-sm font-semibold">
                {loading ? "Memuat..." : (admin?.name ?? "Admin")}
              </p>
              <p className="text-primary-blue text-xs font-medium">Logout</p>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminAppBar;
