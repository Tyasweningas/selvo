"use client";

import SellerIncomeCard from "@/components/seller/dashboard/statistic/seller-income-card";
import SellerMetricCard from "@/components/seller/dashboard/statistic/seller-metric-card";
import UploadProductCard from "@/components/seller/dashboard/statistic/upload-product-card";
import SellerGoalTracker from "@/components/seller/dashboard/statistic/seller-goal-tracker";
import SellerTopProducts from "@/components/seller/dashboard/statistic/seller-top-products";
import { useSellerDashboard } from "@/hooks/use-seller-dashboard";
import {
  MdInventory2,
  MdRateReview,
  MdShoppingCart,
  MdStar,
  MdQueryStats,
  MdPaid,
  MdCampaign,
} from "react-icons/md";

const ratingFormatter = new Intl.NumberFormat("id-ID", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const integerFormatter = new Intl.NumberFormat("id-ID");

const DashboardStatisticPage = () => {
  const { summary, loading, error } = useSellerDashboard();

  const totalProducts = summary?.totalProducts ?? 0;
  const totalSold = summary?.totalSold ?? 0;
  const averageRating = summary?.averageRating ?? 0;
  const totalReviews = summary?.totalReviews ?? 0;
  const totalViews = summary?.totalViews ?? 0;
  const totalRevenue = summary?.totalRevenue ?? 0;
  const transactionCount = summary?.transactionCount ?? 0;
  const totalAdCost = summary?.totalAdCost ?? 0;
  const adRevenue = summary?.adRevenue ?? 0;

  // Calculators
  const conversionRate = totalViews > 0 ? (totalSold / totalViews) * 100 : 0;
  const aov = transactionCount > 0 ? totalRevenue / transactionCount : 0;
  const roas = totalAdCost > 0 ? adRevenue / totalAdCost : 0;

  return (
    <div className="mt-5 space-y-6">
      <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10">
        <SellerIncomeCard />
        <UploadProductCard />
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <SellerMetricCard
          icon={<MdInventory2 className="text-primary-blue size-5 sm:size-6" />}
          title="Total Produk"
          footerText="Jumlah produk aktif di toko kamu"
        >
          <p className="text-2xl sm:text-3xl font-semibold text-white">
            {loading ? "..." : integerFormatter.format(totalProducts)}
          </p>
        </SellerMetricCard>

        <SellerMetricCard
          icon={<MdShoppingCart className="text-primary-blue size-5 sm:size-6" />}
          title="Total Terjual"
          footerText="Akumulasi penjualan dari semua produk"
        >
          <p className="text-2xl sm:text-3xl font-semibold text-white">
            {loading ? "..." : integerFormatter.format(totalSold)}
          </p>
        </SellerMetricCard>

        <SellerMetricCard
          icon={<MdStar className="text-primary-yellow size-5 sm:size-6" />}
          title="Rating Rata-rata"
          footerText="Rata-rata penilaian dari pembeli"
        >
          <p className="text-2xl sm:text-3xl font-semibold text-white">
            {loading
              ? "..."
              : averageRating > 0
                ? ratingFormatter.format(averageRating)
                : "-"}
          </p>
        </SellerMetricCard>

        <SellerMetricCard
          icon={<MdRateReview className="text-primary-blue size-5 sm:size-6" />}
          title="Total Ulasan"
          footerText="Jumlah ulasan yang masuk ke toko"
        >
          <p className="text-2xl sm:text-3xl font-semibold text-white">
            {loading ? "..." : integerFormatter.format(totalReviews)}
          </p>
        </SellerMetricCard>
      </div>

      {/* Advanced Analytics Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        <SellerMetricCard
          icon={<MdQueryStats className="text-[#38BDF8] size-5 sm:size-6" />}
          title="Tingkat Konversi (CVR)"
          footerText="Persentase pembelian dari tayangan produk"
        >
          <p className="text-2xl sm:text-3xl font-semibold text-white">
            {loading ? "..." : `${conversionRate.toFixed(1)}%`}
          </p>
        </SellerMetricCard>

        <SellerMetricCard
          icon={<MdPaid className="text-green-400 size-5 sm:size-6" />}
          title="Rata-rata Nilai Order (AOV)"
          footerText="Rata-rata pengeluaran per transaksi"
        >
          <p className="text-xl sm:text-2xl font-semibold text-white">
            {loading ? "..." : currencyFormatter.format(aov)}
          </p>
        </SellerMetricCard>

        <SellerMetricCard
          icon={<MdCampaign className="text-primary-yellow size-5 sm:size-6" />}
          title="Return on Ad Spend (ROAS)"
          footerText="Rasio efisiensi biaya iklan vs penjualan"
        >
          <p className="text-2xl sm:text-3xl font-semibold text-white">
            {loading ? "..." : totalAdCost > 0 ? `${roas.toFixed(1)}x` : "-"}
          </p>
        </SellerMetricCard>
      </div>

      {/* Bottom Widgets: Goal Tracker & Top Products */}
      {!loading && (
        <div className="grid grid-col-1 lg:grid-cols-2 gap-6">
          <SellerGoalTracker totalRevenue={totalRevenue} />
          <SellerTopProducts products={summary?.topProducts || []} />
        </div>
      )}
    </div>
  );
};

export default DashboardStatisticPage;
