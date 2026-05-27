import PlatformStatCard from "@/components/admin/dashboard/platform-stat-card";
import adminServerService from "@/services/admin.server.service";
import type { PlatformStats } from "@/types/admin";
import { MdAccountBalance, MdTrendingUp } from "react-icons/md";

export const dynamic = "force-dynamic";

const currencyFormatter = new Intl.NumberFormat("id-ID");

const AdminDashboardPage = async () => {
  let stats: PlatformStats = {
    totalRevenue: 0,
    platformProfit: 0,
    totalTransactions: 0,
    totalSellers: 0,
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
          Ringkasan performa platform Selvo secara keseluruhan.
        </p>
      </div>

      {fetchError && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {fetchError}
        </div>
      )}

      <div className="flex items-stretch gap-6">
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

      <div className="grid grid-cols-2 gap-6">
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-6">
          <p className="text-sm text-[#D9D9D9]">Total Transaksi</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {(stats.totalTransactions ?? 0).toLocaleString("id-ID")}
          </p>
        </div>
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-6">
          <p className="text-sm text-[#D9D9D9]">Total Seller</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {(stats.totalSellers ?? 0).toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
