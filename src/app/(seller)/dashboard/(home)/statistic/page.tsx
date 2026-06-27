"use client";

import SellerIncomeCard from "@/components/seller/dashboard/statistic/seller-income-card";
import SellerMetricCard from "@/components/seller/dashboard/statistic/seller-metric-card";
import UploadProductCard from "@/components/seller/dashboard/statistic/upload-product-card";
import { useSellerDashboard } from "@/hooks/use-seller-dashboard";
import {
  MdInventory2,
  MdRateReview,
  MdShoppingCart,
  MdStar,
} from "react-icons/md";

const ratingFormatter = new Intl.NumberFormat("id-ID", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

const integerFormatter = new Intl.NumberFormat("id-ID");

const DashboardStatisticPage = () => {
  const { summary, loading, error } = useSellerDashboard();

  const totalProducts = summary?.totalProducts ?? 0;
  const totalSold = summary?.totalSold ?? 0;
  const averageRating = summary?.averageRating ?? 0;
  const totalReviews = summary?.totalReviews ?? 0;

  return (
    <div className="mt-5 space-y-5">
      <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10">
        <SellerIncomeCard />
        <UploadProductCard />
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

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
    </div>
  );
};

export default DashboardStatisticPage;
