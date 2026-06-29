"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
  ChartOptions,
} from "chart.js";
import adminService, { ChartDataPoint } from "@/services/admin.service";
import { formatErrorForDisplay } from "@/lib/error-handler";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function AdminCharts() {
  const [filter, setFilter] = useState<"day" | "week" | "month">("day");
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await adminService.getDashboardCharts(filter);
        setData(response || []);
      } catch (err: unknown) {
        setError(formatErrorForDisplay(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  const labels = data.map((item) => item.label);
  const revenues = data.map((item) => item.revenue);
  const commissions = data.map((item) => item.commission);

  const revenueChartData = {
    labels,
    datasets: [
      {
        label: "Total Revenue",
        data: revenues,
        borderColor: "#00A3FF",
        backgroundColor: "rgba(0, 163, 255, 0.05)",
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointBackgroundColor: "#00A3FF",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#00A3FF",
        pointHoverBorderColor: "#fff",
      },
    ],
  };

  const commissionChartData = {
    labels,
    datasets: [
      {
        label: "Platform Komisi",
        data: commissions,
        borderColor: "#FFB800",
        backgroundColor: "rgba(255, 184, 0, 0.05)",
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointBackgroundColor: "#FFB800",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#FFB800",
        pointHoverBorderColor: "#fff",
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#D9D9D9",
          font: {
            family: "Inter, sans-serif",
            size: 12,
            weight: "normal",
          },
          padding: 10,
        },
      },
      tooltip: {
        backgroundColor: "#152228",
        titleColor: "#fff",
        bodyColor: "#D9D9D9",
        borderColor: "#1E2A30",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return ` ${label}: ${value !== null ? currencyFormatter.format(value) : "Rp 0"}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            family: "Inter, sans-serif",
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            family: "Inter, sans-serif",
            size: 11,
          },
          callback: (value) => {
            const numVal = Number(value);
            if (numVal >= 1_000_000) {
              return `Rp ${(numVal / 1_000_000).toFixed(1)}M`;
            }
            if (numVal >= 1_000) {
              return `Rp ${(numVal / 1_000).toFixed(0)}K`;
            }
            return `Rp ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-lg font-bold text-white">Grafik Performa Finansial</p>
          <p className="text-xs text-gray-400 mt-1">
            Visualisasi total revenue (GMV) dan keuntungan komisi platform Selvo.
          </p>
        </div>
        <div className="flex bg-[#152228] p-1 rounded-lg border border-[#1E2A30] self-start sm:self-center">
          <button
            onClick={() => setFilter("day")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filter === "day"
                ? "bg-primary-blue text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            7 Hari
          </button>
          <button
            onClick={() => setFilter("week")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filter === "week"
                ? "bg-primary-blue text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            4 Minggu
          </button>
          <button
            onClick={() => setFilter("month")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filter === "month"
                ? "bg-primary-blue text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            12 Bulan
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-80 flex items-center justify-center bg-[#152228]/30 rounded-lg border border-dashed border-[#1E2A30]">
          <div className="flex flex-col items-center gap-2">
            <div className="size-8 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-400">Memuat data grafik...</p>
          </div>
        </div>
      ) : error ? (
        <div className="h-80 flex items-center justify-center bg-red-500/5 rounded-lg border border-dashed border-red-500/20 p-4">
          <p className="text-sm text-red-300 text-center">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="bg-[#152228]/20 p-4 rounded-xl border border-[#1E2A30]">
            <p className="text-sm font-semibold text-white mb-4">Total Revenue (GMV)</p>
            <div className="h-72 w-full">
              <Line data={revenueChartData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-[#152228]/20 p-4 rounded-xl border border-[#1E2A30]">
            <p className="text-sm font-semibold text-white mb-4">Platform Komisi (Profit)</p>
            <div className="h-72 w-full">
              <Line data={commissionChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
