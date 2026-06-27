import PlatformStatCard from "@/components/admin/dashboard/platform-stat-card";
import adminServerService from "@/services/admin.server.service";
import type { PlatformStats } from "@/types/admin";
import Link from "next/link";
import {
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdInventory2,
  MdTrendingUp,
} from "react-icons/md";

export const dynamic = "force-dynamic";

const currencyFormatter = new Intl.NumberFormat("id-ID");
const integerFormatter = new Intl.NumberFormat("id-ID");

const AdminDashboardPage = async () => {
  let stats: PlatformStats = {
    totalRevenue: 0,
    platformProfit: 0,
    withdrawalPending: 0,
    productRequestPending: 0,
  };
  let fetchError: string | null = null;

  try {
    stats = await adminServerService.getPlatformStats();
  } catch (error) {
    console.error("Failed to fetch platform stats:", error);
    fetchError =
      "Tidak bisa mengambil statistik platform. Menampilkan data kosong.";
  }

  return (
    <div className="mt-5 space-y-6">
      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-6">
        <p className="text-3xl font-bold text-white">Dashboard Admin</p>
        <p className="mt-1 text-sm text-[#D9D9D9]">
          Ringkasan performa platform Selvo dari endpoint /api/admin/dashboard.
        </p>
      </div>

      {fetchError && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {fetchError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PlatformStatCard
          icon={<MdAccountBalance className="text-primary-yellow" size={28} />}
          title="Platform Total Revenue"
          value={currencyFormatter.format(stats.totalRevenue ?? 0)}
          helper="Akumulasi seluruh transaksi yang berhasil di platform."
          accent="yellow"
        />
        <PlatformStatCard
          icon={<MdTrendingUp className="text-primary-blue" size={28} />}
          title="Platform Profit"
          value={currencyFormatter.format(stats.platformProfit ?? 0)}
          helper="Keuntungan bersih platform setelah dikurangi pendapatan seller."
          accent="blue"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/withdrawals"
          className="border-bg-div bg-bg-nav hover:border-primary-blue group rounded-xl border-2 p-6 transition"
        >
          <div className="flex items-center gap-3">
            <div className="bg-bg-blue rounded-xl p-2">
              <MdAccountBalanceWallet className="text-primary-blue size-6" />
            </div>
            <p className="text-sm text-[#D9D9D9]">Withdrawal Pending</p>
          </div>
          <p className="mt-4 text-4xl font-semibold text-white">
            {integerFormatter.format(stats.withdrawalPending ?? 0)}
          </p>
          <p className="text-primary-blue mt-3 text-sm font-semibold opacity-80 group-hover:opacity-100">
            Lihat daftar withdrawal &rarr;
          </p>
        </Link>

        <Link
          href="/admin/products"
          className="border-bg-div bg-bg-nav hover:border-primary-blue group rounded-xl border-2 p-6 transition"
        >
          <div className="flex items-center gap-3">
            <div className="bg-bg-yellow/40 rounded-xl p-2">
              <MdInventory2 className="text-primary-yellow size-6" />
            </div>
            <p className="text-sm text-[#D9D9D9]">Product Request Pending</p>
          </div>
          <p className="mt-4 text-4xl font-semibold text-white">
            {integerFormatter.format(stats.productRequestPending ?? 0)}
          </p>
          <p className="text-primary-blue mt-3 text-sm font-semibold opacity-80 group-hover:opacity-100">
            Review produk submission &rarr;
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
