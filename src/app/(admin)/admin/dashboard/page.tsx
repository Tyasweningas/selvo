import PlatformStatCard from "@/components/admin/dashboard/platform-stat-card";
import AdminCharts from "@/components/admin/dashboard/admin-charts";
import adminServerService from "@/services/admin.server.service";
import type { PlatformStats } from "@/types/admin";
import Link from "next/link";
import {
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdInventory2,
  MdTrendingUp,
  MdPeople,
  MdAdUnits,
  MdShoppingBag,
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
    totalSellers: 0,
    totalProducts: 0,
    totalApprovedProducts: 0,
    totalTransactionsCount: 0,
    totalAdRevenue: 0,
    totalAdsCount: 0,
    recentTransactions: [],
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
      {/* Header */}
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

      {/* Financial Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PlatformStatCard
          icon={<MdAccountBalance className="text-primary-yellow" size={28} />}
          title="Platform Total Revenue"
          value={currencyFormatter.format(stats.totalRevenue ?? 0)}
          helper="Akumulasi seluruh transaksi sukses di platform (GMV)."
          accent="yellow"
        />
        <PlatformStatCard
          icon={<MdTrendingUp className="text-primary-blue" size={28} />}
          title="Platform Profit"
          value={currencyFormatter.format(stats.platformProfit ?? 0)}
          helper="Keuntungan bersih platform setelah dikurangi bagian seller."
          accent="blue"
        />
        <PlatformStatCard
          icon={<MdAdUnits className="text-green-400" size={28} />}
          title="Platform Ad Revenue"
          value={currencyFormatter.format(stats.totalAdRevenue ?? 0)}
          helper="Total pendapatan tambahan platform dari biaya iklan seller."
          accent="blue"
        />
      </div>

      {/* Chart Section */}
      <AdminCharts />

      {/* Core Activity & Catalog Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sellers */}
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Penjual</p>
            <MdPeople className="text-primary-blue size-5" />
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {integerFormatter.format(stats.totalSellers ?? 0)}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">Sellers terverifikasi</p>
          </div>
        </div>

        {/* Catalog Products */}
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Katalog Produk</p>
            <MdInventory2 className="text-primary-yellow size-5" />
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {integerFormatter.format(stats.totalApprovedProducts ?? 0)}
              <span className="text-sm font-normal text-gray-400"> / {integerFormatter.format(stats.totalProducts ?? 0)}</span>
            </p>
            <p className="text-[11px] text-gray-400 mt-1">Disetujui / Total submissions</p>
          </div>
        </div>

        {/* Successful Orders */}
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Transaksi Sukses</p>
            <MdShoppingBag className="text-green-400 size-5" />
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {integerFormatter.format(stats.totalTransactionsCount ?? 0)}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">Pesanan selesai terbayar</p>
          </div>
        </div>

        {/* Total Ads */}
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Kampanye Iklan</p>
            <MdAdUnits className="text-purple-400 size-5" />
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {integerFormatter.format(stats.totalAdsCount ?? 0)}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">Total promosi seller</p>
          </div>
        </div>
      </div>

      {/* Quick Actions / Pending Tasks */}
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

      {/* Recent Activity Table */}
      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-bold text-white">Aktivitas Transaksi Terbaru</p>
          <span className="text-xs text-gray-400">Menampilkan 5 transaksi sukses terakhir</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1E2A30] text-gray-400 text-xs font-semibold uppercase">
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Nama Pelanggan</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4 text-right">Total Bayar</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2A30] text-sm text-[#D9D9D9]">
              {stats.recentTransactions && stats.recentTransactions.length > 0 ? (
                stats.recentTransactions.map((tx) => (
                  <tr key={tx.transactionId} className="hover:bg-[#152228] transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      {new Date(tx.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-primary-blue">{tx.orderId}</td>
                    <td className="py-3 px-4 whitespace-nowrap font-medium text-white">{tx.name}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-gray-400">{tx.email}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap font-semibold">
                      IDR {currencyFormatter.format(tx.grandTotal)}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    Belum ada data transaksi sukses.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-right">
          <Link
            href="/admin/transactions"
            className="text-primary-blue hover:text-primary-blue/85 text-sm font-semibold inline-flex items-center gap-1 transition"
          >
            Lihat semua transaksi (Pending & Success) &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
