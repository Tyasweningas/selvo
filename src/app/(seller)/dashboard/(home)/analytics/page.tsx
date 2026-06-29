"use client";

import { useEffect, useState, useCallback } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  ChartOptions,
} from "chart.js";
import sellerService, { SellerAnalyticsResponse } from "@/services/seller.service";
import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import {
  MdAnalytics,
  MdRefresh,
  MdVisibility,
  MdAdsClick,
  MdCheckCircle,
  MdPeople,
} from "react-icons/md";

// Register ChartJS elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const integerFormatter = new Intl.NumberFormat("id-ID");

export default function SellerAnalyticsPage() {
  const [filter, setFilter] = useState<"day" | "week" | "month">("day");
  const [analyticsData, setAnalyticsData] = useState<SellerAnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await sellerService.getDashboardAnalytics(filter);
      setAnalyticsData(response);
    } catch (error: unknown) {
      logError(error, "SellerAnalyticsPage:fetchAnalytics");
      setFetchError(formatErrorForDisplay(error));
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const trendLabels = analyticsData?.chartData.map((d) => d.label) || [];
  const trendRevenues = analyticsData?.chartData.map((d) => d.revenue) || [];

  const trendChartData = {
    labels: trendLabels,
    datasets: [
      {
        label: "Pendapatan",
        data: trendRevenues,
        borderColor: "#1086D5",
        backgroundColor: "rgba(16, 134, 213, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: "#1086D5",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        yAxisID: "y-revenue",
      },
    ],
  };

  const trendChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.parsed.y ?? 0;
            return `Pendapatan: ${currencyFormatter.format(val)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(30, 42, 48, 0.5)",
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
      "y-revenue": {
        position: "left",
        grid: {
          color: "rgba(30, 42, 48, 0.5)",
        },
        ticks: {
          color: "#9CA3AF",
          callback: (value) => currencyFormatter.format(Number(value)),
        },
      },
    },
  };

  // 2. Product Contribution Doughnut Chart Configuration
  const contribNames = analyticsData?.productContribution.map((p) => p.name) || [];
  const contribRevenues = analyticsData?.productContribution.map((p) => p.revenue) || [];

  const contribColors = [
    "#1086D5", // Primary Blue
    "#38BDF8", // Light Blue
    "#FBBF24", // Yellow
    "#34D399", // Emerald
    "#F87171", // Rose
    "#A78BFA", // Violet
  ];

  const doughnutChartData = {
    labels: contribNames.slice(0, 5).concat(contribNames.length > 5 ? ["Lainnya"] : []),
    datasets: [
      {
        data: contribRevenues.slice(0, 5).concat(
          contribRevenues.length > 5
            ? [contribRevenues.slice(5).reduce((sum, val) => sum + val, 0)]
            : []
        ),
        backgroundColor: contribColors,
        borderWidth: 2,
        borderColor: "#0E171B",
        hoverOffset: 4,
      },
    ],
  };

  const doughnutChartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#E5E7EB",
          font: {
            size: 11,
          },
          boxWidth: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.parsed as number;
            const total = context.dataset.data.reduce((sum: number, v: number) => sum + v, 0);
            const percentage = total > 0 ? (val / total) * 100 : 0;
            return ` ${context.label}: ${currencyFormatter.format(val)} (${percentage.toFixed(1)}%)`;
          },
        },
      },
    },
  };

  // 3. Funnel Math
  const views = analyticsData?.funnel.views ?? 0;
  const clicks = analyticsData?.funnel.clicks ?? 0;
  const purchases = analyticsData?.funnel.purchases ?? 0;

  const clickCtr = views > 0 ? (clicks / views) * 100 : 0;
  const purchaseCtr = clicks > 0 ? (purchases / clicks) * 100 : 0;
  const totalCvr = views > 0 ? (purchases / views) * 100 : 0;

  return (
    <div className="mt-5 space-y-6">
      {/* Header Card */}
      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-bg-blue rounded-xl p-2">
              <MdAnalytics className="text-primary-blue size-7" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">Analisis Detail Toko</p>
              <p className="text-sm text-[#D9D9D9]">
                Laporan visual mendalam mengenai tren penjualan, corong konversi, kontribusi produk, dan retensi pembeli.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={fetchAnalytics}
            disabled={isLoading}
            className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 self-start sm:self-center"
          >
            <MdRefresh className={isLoading ? "size-5 animate-spin" : "size-5"} />
            <span>Muat Ulang</span>
          </button>
        </div>
      </div>

      {fetchError && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {fetchError}
        </div>
      )}

      {isLoading ? (
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 py-32 text-center text-gray-400">
          <div className="flex flex-col items-center gap-2">
            <div className="size-8 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm">Memuat analisis data toko...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Trend (Line Chart) */}
            <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-400">Tren Pendapatan</p>
                  <p className="text-xs text-gray-500">Nilai kotor pendapatan dari produk terjual</p>
                </div>
                {/* Time Range Filter Group */}
                <div className="flex bg-[#152228] p-1 rounded-lg border border-[#1E2A30]">
                  <button
                    onClick={() => setFilter("day")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                      filter === "day" ? "bg-primary-blue text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Hari
                  </button>
                  <button
                    onClick={() => setFilter("week")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                      filter === "week" ? "bg-primary-blue text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Minggu
                  </button>
                  <button
                    onClick={() => setFilter("month")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                      filter === "month" ? "bg-primary-blue text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Bulan
                  </button>
                </div>
              </div>
              <div className="h-[250px] w-full relative">
                <Line data={trendChartData} options={trendChartOptions} />
              </div>
            </div>

            {/* Product Contribution (Doughnut Chart) */}
            <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-400">Kontribusi Pendapatan Produk</p>
                <p className="text-xs text-gray-500">Porsi produk terhadap total penjualan</p>
              </div>
              <div className="h-[200px] w-full relative flex items-center justify-center">
                {contribRevenues.length > 0 ? (
                  <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                ) : (
                  <p className="text-xs text-gray-500">Belum ada kontribusi produk.</p>
                )}
              </div>
              <div className="text-[10px] text-gray-400 space-y-1.5 pt-2">
                {analyticsData?.productContribution.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="truncate max-w-[150px] font-semibold text-white">{item.name}</span>
                    <span className="font-mono text-primary-yellow">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Funnel Card */}
            <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 space-y-5">
              <div>
                <p className="text-sm font-semibold text-gray-400">Corong Konversi Penjualan (Funnel)</p>
                <p className="text-xs text-gray-500">Rasio pengunjung yang melakukan tindakan pembelian</p>
              </div>

              {/* Vertical Funnel Flow */}
              <div className="space-y-4 font-mono">
                {/* Step 1: Views */}
                <div className="bg-[#152228]/50 border border-[#1E2A30] rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#38BDF8]/10 text-[#38BDF8] p-1.5 rounded-md">
                      <MdVisibility size={16} />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">Tingkat 1: Tayangan</span>
                      <span className="text-sm font-bold text-white">{integerFormatter.format(views)} Views</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded-full">Baseline (100%)</span>
                </div>

                {/* Arrow indicator */}
                <div className="flex justify-center text-gray-600 my-0.5">
                  <span className="text-xs text-gray-400 font-semibold bg-[#152228] px-2.5 py-0.5 rounded-full border border-[#1E2A30]">
                    CTR Minat: {clickCtr.toFixed(1)}%
                  </span>
                </div>

                {/* Step 2: Clicks */}
                <div className="bg-[#152228]/50 border border-[#1E2A30] rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-yellow/10 text-primary-yellow p-1.5 rounded-md">
                      <MdAdsClick size={16} />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">Tingkat 2: Interaksi / Klik</span>
                      <span className="text-sm font-bold text-white">{integerFormatter.format(clicks)} Clicks</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-primary-yellow bg-primary-yellow/10 px-2 py-0.5 rounded-full">
                    {clickCtr.toFixed(0)}% Efisiensi
                  </span>
                </div>

                {/* Arrow indicator */}
                <div className="flex justify-center text-gray-600 my-0.5">
                  <span className="text-xs text-gray-400 font-semibold bg-[#152228] px-2.5 py-0.5 rounded-full border border-[#1E2A30]">
                    CVR Pembelian: {purchaseCtr.toFixed(1)}%
                  </span>
                </div>

                {/* Step 3: Purchases */}
                <div className="bg-[#152228]/50 border border-[#1E2A30] rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 text-green-400 p-1.5 rounded-md">
                      <MdCheckCircle size={16} />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">Tingkat 3: Pembelian Sukses</span>
                      <span className="text-sm font-bold text-white">{integerFormatter.format(purchases)} Purchases</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block">Total Konversi</span>
                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                      {totalCvr.toFixed(1)}% CVR
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Loyalty (Repeat Purchase Rate) */}
            <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-400">Analisis Loyalitas Pelanggan</p>
                <p className="text-xs text-gray-500">Tingkat kepuasan pembeli yang kembali bertransaksi</p>
              </div>

              {/* Loyalty Statistics Grid */}
              <div className="grid grid-cols-2 gap-4 my-2">
                <div className="bg-[#152228]/50 border border-[#1E2A30] rounded-lg p-3.5 space-y-1">
                  <span className="text-xs text-gray-400">Total Pembeli Unik</span>
                  <p className="text-2xl font-bold text-white font-mono">
                    {integerFormatter.format(analyticsData?.customerLoyalty.uniqueBuyers ?? 0)}
                  </p>
                </div>
                <div className="bg-[#152228]/50 border border-[#1E2A30] rounded-lg p-3.5 space-y-1">
                  <span className="text-xs text-gray-400">{"Pembeli Berulang (>= 2x)"}</span>
                  <p className="text-2xl font-bold text-white font-mono text-primary-yellow">
                    {integerFormatter.format(analyticsData?.customerLoyalty.repeatBuyers ?? 0)}
                  </p>
                </div>
              </div>

              {/* RPR Circular Display */}
              <div className="bg-[#152228]/30 border border-[#1E2A30] rounded-lg p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-blue/10 text-primary-blue p-2.5 rounded-lg">
                    <MdPeople size={24} />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400">Rasio Pembelian Berulang (RPR)</span>
                    <p className="text-xs text-gray-300 mt-0.5">
                      Sebanyak <span className="text-white font-semibold">{(analyticsData?.customerLoyalty.repeatPurchaseRate ?? 0)}%</span> pembeli bertransaksi kembali di toko Anda.
                    </p>
                  </div>
                </div>
                <div className="text-center shrink-0">
                  <span className="text-2xl font-extrabold text-primary-blue font-mono">
                    {(analyticsData?.customerLoyalty.repeatPurchaseRate ?? 0).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
