"use client";

import { SellerLeaderboardItem } from "@/types/admin";
import { MdLeaderboard } from "react-icons/md";

interface AdminLeaderboardProps {
  sellers: SellerLeaderboardItem[];
}

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function AdminLeaderboard({ sellers }: AdminLeaderboardProps) {
  return (
    <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary-blue/10 rounded-lg p-2 text-primary-blue">
          <MdLeaderboard size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-400">Peringkat Seller Terbaik (Top GMV)</p>
          <p className="text-xs text-[#D9D9D9]">5 seller dengan volume penjualan kotor tertinggi</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1E2A30] text-gray-400 text-xs font-semibold uppercase bg-[#152228]/50">
              <th className="py-2.5 px-3">Nama Seller</th>
              <th className="py-2.5 px-3">Email</th>
              <th className="py-2.5 px-3 text-right">Total Transaksi (GMV)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2A30] text-xs text-[#D9D9D9]">
            {sellers.length > 0 ? (
              sellers.map((s, idx) => (
                <tr key={s.sellerId} className="hover:bg-[#152228]/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">
                    <span className="text-gray-500 mr-1.5">#{idx + 1}</span>
                    {s.name || "Tanpa Nama"}
                  </td>
                  <td className="py-3 px-3 text-gray-400 font-mono">
                    {s.email}
                  </td>
                  <td className="py-3 px-3 text-right font-semibold text-primary-yellow">
                    {currencyFormatter.format(s.gmv)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-500">
                  Belum ada penjualan tercatat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
