"use client";

import Button from "@/components/global/button";
import { useUser } from "@/hooks/use-user";
import { MdAccountBalance } from "react-icons/md";

const currencyFormatter = new Intl.NumberFormat("id-ID");

const SellerIncomeCard = () => {
  const { user, loading } = useUser();

  return (
    <div className="border-bg-blue from-primary-blue/35 to-bg-nav/70 grow space-y-5 rounded-xl border-2 bg-linear-to-b p-10">
      <div className="flex items-center gap-3">
        <div className="bg-bg-nav rounded-xl p-3">
          <MdAccountBalance className="text-primary-yellow" size={28} />
        </div>
        <p className="text-2xl font-bold text-white">
          Tabungan Pendapatan Akun
        </p>
      </div>
      <div className="">
        <p className="text-5xl font-bold text-white">
          <span className="text-primary-yellow mr-5">IDR</span>
          {loading ? "..." : currencyFormatter.format(user?.balance ?? 0)}
        </p>
      </div>
      <p className="text-sm text-[#D9D9D9]">
        {loading
          ? "Mengambil saldo berdasarkan session"
          : "Saldo ditampilkan dari data akun session penjual"}
      </p>
      <div className="mt-10! flex gap-5">
        <Button size="lg" className="grow">
          Tarik Saldo
        </Button>
        <Button variant="outline" size="lg" className="basis-1/3">
          Hubungkan Bank
        </Button>
      </div>
    </div>
  );
};

export default SellerIncomeCard;
