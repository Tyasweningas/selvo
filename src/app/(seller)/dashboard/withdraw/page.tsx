"use client";

import Button from "@/components/global/button";
import { useUser } from "@/hooks/use-user";
import { MdAccountBalanceWallet, MdMail, MdPerson } from "react-icons/md";

const currencyFormatter = new Intl.NumberFormat("id-ID");

const DashboardWithdrawPage = () => {
  const { user, loading } = useUser();

  return (
    <div className="mt-5 space-y-5">
      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-bg-blue rounded-xl p-2">
            <MdAccountBalanceWallet className="text-primary-blue size-7" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">Penarikan Saldo</p>
            <p className="text-sm text-[#D9D9D9]">
              Data akun diambil langsung dari session login
            </p>
          </div>
        </div>
      </div>

      <div className="border-bg-blue from-primary-blue/25 to-bg-nav/70 rounded-xl border-2 bg-linear-to-b p-6">
        <p className="text-sm text-[#D9D9D9]">Saldo Tersedia</p>
        <p className="mt-2 text-4xl font-bold text-white">
          <span className="text-primary-yellow mr-3">IDR</span>
          {loading ? "..." : currencyFormatter.format(user?.balance ?? 0)}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-bg-div rounded-xl p-4">
            <div className="mb-2 flex items-center gap-2">
              <MdPerson className="text-primary-blue" size={20} />
              <p className="text-sm text-[#D9D9D9]">Nama Penjual</p>
            </div>
            <p className="truncate font-semibold text-white">
              {loading ? "Memuat..." : (user?.name ?? "-")}
            </p>
          </div>
          <div className="bg-bg-div rounded-xl p-4">
            <div className="mb-2 flex items-center gap-2">
              <MdMail className="text-primary-blue" size={20} />
              <p className="text-sm text-[#D9D9D9]">Email</p>
            </div>
            <p className="truncate font-semibold text-white">
              {loading ? "Memuat..." : (user?.email ?? "-")}
            </p>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <Button disabled className="grow">
            Tarik Saldo (Segera)
          </Button>
          <Button variant="outline" disabled className="grow">
            Hubungkan Rekening (Segera)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardWithdrawPage;
