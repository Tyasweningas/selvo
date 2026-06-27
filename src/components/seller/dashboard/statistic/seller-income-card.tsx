"use client";

import Button from "@/components/global/button";
import { useSellerDashboard } from "@/hooks/use-seller-dashboard";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { MdAccountBalance } from "react-icons/md";

const currencyFormatter = new Intl.NumberFormat("id-ID");

const SellerIncomeCard = () => {
  const { user } = useUser();
  const { summary, loading } = useSellerDashboard();

  const balance = summary?.balance ?? user?.balance ?? 0;

  return (
    <div className="border-bg-blue from-primary-blue/35 to-bg-nav/70 grow space-y-5 rounded-xl border-2 bg-linear-to-b p-6 sm:p-10">
      <div className="flex items-center gap-3">
        <div className="bg-bg-nav rounded-xl p-3">
          <MdAccountBalance className="text-primary-yellow" size={28} />
        </div>
        <p className="text-xl sm:text-2xl font-bold text-white">
          Tabungan Pendapatan Akun
        </p>
      </div>
      <div>
        <p className="text-3xl sm:text-5xl font-bold text-white">
          <span className="text-primary-yellow mr-3 sm:mr-5">IDR</span>
          {loading ? "..." : currencyFormatter.format(balance)}
        </p>
      </div>
      <p className="text-sm text-[#D9D9D9]">
        {loading
          ? "Mengambil saldo dari /sellers/dashboard"
          : "Saldo terkini dari endpoint /sellers/dashboard"}
      </p>
      <div className="mt-10! flex flex-col sm:flex-row gap-3 sm:gap-5">
        <Link href={"/dashboard/withdraw"} className="grow">
          <Button size="lg" className="w-full">
            Tarik Saldo
          </Button>
        </Link>
        <Link href={"/dashboard/withdraw"} className="grow sm:basis-1/3">
          <Button variant="outline" size="lg" className="w-full">
            Hubungkan Bank
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SellerIncomeCard;
