"use client";
import { useUser } from "@/hooks/use-user";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdMail, MdNotifications, MdPerson } from "react-icons/md";

const SellerAppBar = () => {
  const router = useRouter();
  const { user, loading } = useUser();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* <TopBanner variant="green" /> */}
      <nav className="bg-[linear-gradient(to_bottom,#111D22_0%,#111D22_40%,rgba(17,29,34,0.7)_100%)] py-4 md:py-8 px-4 md:px-6">
        <div className="container mx-auto flex flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <p className="text-primary-blue text-3xl md:text-5xl font-extrabold">SELVO</p>
            <p className="text-primary-blue text-sm md:text-lg">Seller.</p>
          </div>

          {/* Search bar (desktop only) */}
          <div className="hidden md:flex grow justify-center max-w-[500px] lg:max-w-[600px] px-4">
            <input
              type="text"
              placeholder="Cari Sesuatu..."
              className="w-full rounded-full border-2 border-[#29373D] bg-[#1A2B32] px-5 py-2.5 text-[#9CA3A7] focus:outline-none"
            />
          </div>

          {/* Icons & Profile */}
          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            <div className="flex gap-2.5 md:gap-4">
              <div className="grid place-items-center rounded-xl bg-[#29373D] p-2 md:px-3 md:py-2.5 cursor-pointer hover:bg-[#384a52] transition">
                <MdNotifications size={20} className="text-[#9CA3A7] md:size-[24px]" />
              </div>
              <div className="grid place-items-center rounded-xl bg-[#29373D] p-2 md:px-3 md:py-2.5 cursor-pointer hover:bg-[#384a52] transition">
                <MdMail size={20} className="text-[#9CA3A7] md:size-[24px]" />
              </div>
            </div>

            {/* Separator */}
            <div className="hidden sm:block h-8 w-0.5 bg-[#29373D]"></div>

            <div className="">
              <button
                onClick={handleLogout}
                className="border-primary-blue flex items-center gap-2 md:gap-3 rounded-full border-2 bg-[#1A2B32] p-1 pr-3 md:px-3 md:py-1.5 transition hover:bg-[#29373D] shrink-0 max-w-[150px] md:max-w-[220px]"
              >
                <div className="rounded-full bg-[#204E31] p-1 md:p-1.5 shrink-0">
                  <MdPerson size={20} className="text-primary-blue md:size-[24px]" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-primary-blue truncate text-xs md:text-sm font-semibold">
                    {loading ? "Memuat..." : (user?.name ?? "Seller")}
                  </p>
                  <p className="text-primary-blue text-[10px] md:text-xs font-medium">Logout</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SellerAppBar;
