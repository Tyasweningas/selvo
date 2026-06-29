"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  ChartOptions,
} from "chart.js";
import { MdAccountBalanceWallet } from "react-icons/md";

// Register elements
ChartJS.register(ArcElement, ChartTooltip, ChartLegend);

interface AdminLiquidityChartProps {
  totalWithdrawn: number;
  totalSellerBalance: number;
}

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function AdminLiquidityChart({
  totalWithdrawn,
  totalSellerBalance,
}: AdminLiquidityChartProps) {
  const chartData = {
    labels: ["Dana Sukses Ditarik", "Saldo Seller Aktif"],
    datasets: [
      {
        data: [totalWithdrawn, totalSellerBalance],
        backgroundColor: ["#34D399", "#38BDF8"], // emerald green and sky blue
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

  const totalFunds = totalWithdrawn + totalSellerBalance;
  const withdrawnRate = totalFunds > 0 ? (totalWithdrawn / totalFunds) * 100 : 0;

  return (
    <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary-blue/10 rounded-lg p-2 text-primary-blue">
          <MdAccountBalanceWallet size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-400">Likuiditas & Saldo Platform</p>
          <p className="text-xs text-gray-500">Perbandingan dana sukses dicairkan vs sisa saldo terikat seller</p>
        </div>
      </div>

      <div className="h-[200px] w-full relative flex items-center justify-center">
        {totalFunds > 0 ? (
          <Doughnut data={chartData} options={chartOptions} />
        ) : (
          <p className="text-xs text-gray-500">Belum ada aktivitas penarikan saldo.</p>
        )}
      </div>

      <div className="text-[10px] text-gray-400 space-y-1.5 pt-2">
        <div className="flex justify-between items-center">
          <span>Rasio Penarikan (Withdrawal Rate)</span>
          <span className="font-mono text-green-400 font-semibold">{withdrawnRate.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center border-t border-[#1E2A30] pt-1.5">
          <span>Total Perputaran Dana</span>
          <span className="font-mono text-white font-semibold">{currencyFormatter.format(totalFunds)}</span>
        </div>
      </div>
    </div>
  );
}
