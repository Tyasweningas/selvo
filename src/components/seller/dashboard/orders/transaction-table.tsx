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
      <div className="border-bg-div bg-bg-nav space-y-5 overflow-x-auto rounded-t-xl border-2 p-5">
        <div className="border-bg-div grid min-w-[1000px] grid-cols-[200px_1fr_140px_120px_180px_140px] text-left font-semibold text-gray-100">
          <div>Order ID</div>
          <div className="min-w-0">Pembeli</div>
          <div>Status</div>
          <div>Produk</div>
          <div>Subtotal</div>
          <div className="text-center">Aksi</div>
        </div>
      </div>
      <div className="border-bg-div bg-bg-nav overflow-x-auto rounded-b-xl border-2 border-t-0">
        {transactions.length > 0 ? (
          transactions.map((trx) => (
            <div
              key={trx.transactionId}
              className="border-bg-div hover:bg-bg-div grid min-w-[1000px] grid-cols-[200px_1fr_140px_120px_180px_140px] items-center px-5 py-5 text-left font-semibold text-gray-100 transition duration-100"
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
    </>
  );
};

export default TransactionTable;
