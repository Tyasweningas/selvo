"use client";

import { SellerDashboardProductItem } from "@/services/seller.service";
import { MdTrendingUp } from "react-icons/md";

interface SellerTopProductsProps {
  products: SellerDashboardProductItem[];
}

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function SellerTopProducts({ products }: SellerTopProductsProps) {
  return (
    <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary-blue/10 rounded-lg p-2 text-primary-blue">
          <MdTrendingUp size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-400">Produk Terlaris</p>
          <p className="text-xs text-[#D9D9D9]">5 produk dengan performa penjualan tertinggi</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1E2A30] text-gray-400 text-xs font-semibold uppercase bg-[#152228]/50">
              <th className="py-2.5 px-3">Nama Produk</th>
              <th className="py-2.5 px-3 text-right">Harga</th>
              <th className="py-2.5 px-3 text-center">Terjual</th>
              <th className="py-2.5 px-3 text-center">Tayangan</th>
              <th className="py-2.5 px-3 text-right">Konversi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2A30] text-xs text-[#D9D9D9]">
            {products.length > 0 ? (
              products.map((p) => {
                const cvr = p.viewCount > 0 ? (p.totalSold / p.viewCount) * 100 : 0;
                return (
                  <tr key={p.productId} className="hover:bg-[#152228]/30 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white max-w-[200px] truncate">
                      {p.name}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-gray-300">
                      {currencyFormatter.format(p.price)}
                    </td>
                    <td className="py-3 px-3 text-center font-semibold text-white">
                      {p.totalSold}
                    </td>
                    <td className="py-3 px-3 text-center text-gray-400">
                      {p.viewCount}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-primary-yellow">
                      {cvr.toFixed(1)}%
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  Belum ada produk terjual.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
