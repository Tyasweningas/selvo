"use client";

import { useEffect, useState } from "react";
import { MdFlag, MdEdit, MdCheck } from "react-icons/md";

interface SellerGoalTrackerProps {
  totalRevenue: number;
}

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function SellerGoalTracker({ totalRevenue }: SellerGoalTrackerProps) {
  const [target, setTarget] = useState(10000000); // Default 10 million IDR
  const [isEditing, setIsEditing] = useState(false);
  const [tempTarget, setTempTarget] = useState("10000000");

  useEffect(() => {
    const saved = localStorage.getItem("seller_monthly_revenue_target");
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) {
        setTarget(parsed);
        setTempTarget(saved);
      }
    }
  }, []);

  const handleSave = () => {
    const parsed = parseInt(tempTarget.replace(/\D/g, ""), 10);
    if (!isNaN(parsed) && parsed > 0) {
      setTarget(parsed);
      localStorage.setItem("seller_monthly_revenue_target", parsed.toString());
      setIsEditing(false);
    }
  };

  const percentage = Math.min((totalRevenue / target) * 100, 100);
  const remaining = Math.max(target - totalRevenue, 0);

  return (
    <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-yellow/10 rounded-lg p-2 text-primary-yellow">
            <MdFlag size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400">Target Pendapatan Bulanan</p>
            {isEditing ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={tempTarget}
                  onChange={(e) => setTempTarget(e.target.value.replace(/\D/g, ""))}
                  className="bg-[#152228] border border-[#1E2A30] text-sm text-white font-mono px-2 py-1 rounded-md w-32 focus:outline-hidden focus:border-primary-blue"
                />
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-md transition"
                >
                  <MdCheck size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-white font-mono">
                  {currencyFormatter.format(target)}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <MdEdit size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Pencapaian</p>
          <p className="text-lg font-extrabold text-primary-blue">{percentage.toFixed(1)}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="w-full bg-[#152228] h-3.5 rounded-full overflow-hidden border border-[#1E2A30] p-0.5">
          <div
            className="bg-linear-to-r from-primary-blue to-teal-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-gray-400 font-mono">
          <span>{currencyFormatter.format(totalRevenue)}</span>
          <span>{percentage >= 100 ? "Selesai! 🎉" : `${percentage.toFixed(0)}% dari target`}</span>
        </div>
      </div>

      {remaining > 0 ? (
        <p className="text-xs text-gray-300">
          Butuh <span className="text-primary-yellow font-semibold font-mono">{currencyFormatter.format(remaining)}</span> lagi untuk mencapai target bulanan Anda.
        </p>
      ) : (
        <p className="text-xs text-green-400 font-semibold">
          Selamat! Anda telah melampaui target pendapatan bulan ini sebesar <span className="font-mono">{currencyFormatter.format(totalRevenue - target)}</span>! 🚀
        </p>
      )}
    </div>
  );
}
