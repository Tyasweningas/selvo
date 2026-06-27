"use client";

import type { SellerTransactionListItem } from "@/types/seller-orders";
import { MdRateReview, MdVisibility } from "react-icons/md";
import StatusPill from "./status-pill";

interface TransactionTableProps {
  transactions: SellerTransactionListItem[];
  onView: (transaction: SellerTransactionListItem) => void;
  emptyMessage?: string;
}

const currencyFormatter = new Intl.NumberFormat("id-ID");
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return dateFormatter.format(parsed);
};

const TransactionTable = ({
  transactions,
  onView,
  emptyMessage = "Belum ada transaksi",
}: TransactionTableProps) => {
  return (
    <>
      {/* Mobile Card List View (Visible on <md screens) */}
      <div className="md:hidden space-y-4">
        {transactions.length > 0 ? (
          transactions.map((trx) => (
            <div
              key={trx.transactionId}
              className="border-bg-div bg-bg-nav rounded-xl border-2 p-4 space-y-3 font-semibold text-gray-100"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 truncate max-w-[150px]" title={trx.orderId}>
                  {trx.orderId}
                </span>
                <StatusPill status={trx.status} size="sm" />
              </div>

              <div className="space-y-1.5 text-xs text-gray-400">
                <p>
                  Pembeli: <span className="text-white font-medium">{trx.buyerName}</span>
                </p>
                <p className="font-thin">
                  Email: {trx.buyerEmail}
                </p>
                <p>
                  Tanggal: <span className="text-white">{formatDate(trx.createdAt)}</span>
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span>
                    Item: <span className="text-white font-medium">{trx.itemsCount} produk</span>
                  </span>
                  {trx.reviewedCount > 0 && (
                    <span className="text-primary-green inline-flex items-center gap-1 font-medium">
                      <MdRateReview className="size-3.5" />
                      {trx.reviewedCount} diulas
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-[#1A2B32] pt-3 flex items-center justify-between">
                <p className="text-sm font-bold text-white">
                  <span className="text-primary-yellow text-xs mr-1">IDR</span>
                  {currencyFormatter.format(trx.sellerSubtotal)}
                </p>
                <button
                  type="button"
                  onClick={() => onView(trx)}
                  className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/40 inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition cursor-pointer"
                >
                  <MdVisibility className="size-4" />
                  <span>Detail</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="border-bg-div bg-bg-nav rounded-xl border-2 py-10 text-center text-gray-400">
            {emptyMessage}
          </div>
        )}
      </div>

      {/* Desktop Table View (Visible on >=md screens) */}
      <div className="hidden md:block overflow-x-auto border-bg-div border-2 rounded-xl bg-bg-nav">
        <div className="min-w-[1000px]">
          {/* Table Header */}
          <div className="border-bg-div p-5 border-b-2">
            <div className="grid grid-cols-[200px_1fr_140px_120px_180px_140px] text-left font-semibold text-gray-100">
              <div>Order ID</div>
              <div className="min-w-0">Pembeli</div>
              <div>Status</div>
              <div>Produk</div>
              <div>Subtotal</div>
              <div className="text-center">Aksi</div>
            </div>
          </div>
          {/* Table Body */}
          <div className="divide-y divide-bg-div">
            {transactions.length > 0 ? (
              transactions.map((trx) => (
                <div
                  key={trx.transactionId}
                  className="hover:bg-bg-div grid grid-cols-[200px_1fr_140px_120px_180px_140px] items-center px-5 py-5 text-left font-semibold text-gray-100 transition duration-100"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm" title={trx.orderId}>
                      {trx.orderId}
                    </p>
                    <p className="truncate text-xs font-thin text-gray-400">
                      {formatDate(trx.createdAt)}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm">{trx.buyerName}</p>
                    <p className="truncate text-xs font-thin text-gray-400">
                      {trx.buyerEmail}
                    </p>
                  </div>
                  <div>
                    <StatusPill status={trx.status} size="sm" />
                  </div>
                  <div className="text-sm">
                    <p>{trx.itemsCount} produk</p>
                    {trx.reviewedCount > 0 && (
                      <p className="text-primary-green inline-flex items-center gap-1 text-xs font-thin">
                        <MdRateReview className="size-3.5" />
                        {trx.reviewedCount} diulas
                      </p>
                    )}
                  </div>
                  <div className="text-sm">
                    <span className="text-primary-yellow">IDR</span>{" "}
                    {currencyFormatter.format(trx.sellerSubtotal)}
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => onView(trx)}
                      className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/40 hover:border-bg-blue inline-flex cursor-pointer items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition"
                    >
                      <MdVisibility className="size-4" />
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-gray-400">{emptyMessage}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionTable;
