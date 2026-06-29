"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  ChartOptions,
} from "chart.js";
import { CategoryContributionItem } from "@/types/admin";
import { MdCategory } from "react-icons/md";

// Register elements
ChartJS.register(ArcElement, ChartTooltip, ChartLegend);

interface AdminCategoryContribProps {
  categories: CategoryContributionItem[];
}

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function AdminCategoryContribution({ categories }: AdminCategoryContribProps) {
  const labels = categories.map((c) => c.name);
  const sales = categories.map((c) => c.sales);

  const colors = [
    "#1086D5", // Primary Blue
    "#38BDF8", // Light Blue
    "#FBBF24", // Yellow
    "#34D399", // Emerald
    "#F87171", // Rose
    "#A78BFA", // Violet
  ];

  const chartData = {
    labels: labels.slice(0, 5).concat(labels.length > 5 ? ["Lainnya"] : []),
    datasets: [
      {
        data: sales.slice(0, 5).concat(
          sales.length > 5
            ? [sales.slice(5).reduce((sum, val) => sum + val, 0)]
            : []
        ),
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: "#0E171B",
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
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

  return (
    <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary-blue/10 rounded-lg p-2 text-primary-blue">
          <MdCategory size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-400">Kontribusi Penjualan Kategori</p>
          <p className="text-xs text-gray-500">Porsi pendapatan platform berdasarkan kategori produk</p>
        </div>
      </div>

      <div className="h-[200px] w-full relative flex items-center justify-center">
        {sales.length > 0 ? (
          <Doughnut data={chartData} options={chartOptions} />
        ) : (
          <p className="text-xs text-gray-500">Belum ada kontribusi kategori.</p>
        )}
      </div>

      <div className="text-[10px] text-gray-400 space-y-1.5 pt-2">
        {categories.slice(0, 3).map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="truncate max-w-[150px] font-semibold text-white">{item.name}</span>
            <span className="font-mono text-primary-yellow">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
