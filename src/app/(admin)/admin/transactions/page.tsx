"use client";

import { useCallback, useEffect, useState } from "react";
import adminService, { AdminTransaction } from "@/services/admin.service";
import transactionService from "@/services/transaction.service";
import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import {
  MdOutlineReceiptLong,
  MdSearch,
  MdRefresh,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { toast } from "sonner";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Filter states
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | "PENDING" | "SUCCESS" | "REJECTED">("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  // UI state
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [checkingOrderId, setCheckingOrderId] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const result = await adminService.getTransactions({
        page,
        limit,
        status: status || undefined,
        search: search.trim() || undefined,
      });
      setTransactions(result.data || []);
      setTotal(result.meta?.total || 0);
    } catch (error: unknown) {
      logError(error, "AdminTransactionsPage");
      setFetchError(formatErrorForDisplay(error));
      setTransactions([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [page, status, search]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchTransactions();
  };

  const handleStatusChange = (newStatus: typeof status) => {
    setStatus(newStatus);
    setPage(1);
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleCheckStatus = async (orderId: string) => {
    setCheckingOrderId(orderId);
    try {
      const result = await transactionService.checkPaymentStatus(orderId);
      if (result.isPaid) {
        toast.success(`Transaksi ${orderId} terdeteksi SUKSES/DIBAYAR.`);
      } else {
        toast.info(`Transaksi ${orderId} masih PENDING.`);
      }
      fetchTransactions();
    } catch (error: unknown) {
      logError(error, `CheckPaymentStatus:${orderId}`);
      toast.error(formatErrorForDisplay(error));
    } finally {
      setCheckingOrderId(null);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mt-5 space-y-6">
      {/* Header Card */}
      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-bg-blue rounded-xl p-2">
              <MdOutlineReceiptLong className="text-primary-blue size-7" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">Daftar Transaksi</p>
              <p className="text-sm text-[#D9D9D9]">
                Manajemen dan pengecekan semua status transaksi (Pending, Success, Rejected) di Selvo.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={fetchTransactions}
            disabled={isLoading}
            className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 self-start sm:self-center"
          >
            <MdRefresh className={isLoading ? "size-5 animate-spin" : "size-5"} />
            <span>Muat Ulang</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap bg-[#152228] p-1 rounded-lg border border-[#1E2A30] self-start">
            <button
              onClick={() => handleStatusChange("")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                status === ""
                  ? "bg-primary-blue text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => handleStatusChange("SUCCESS")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                status === "SUCCESS"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Success
            </button>
            <button
              onClick={() => handleStatusChange("PENDING")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                status === "PENDING"
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => handleStatusChange("REJECTED")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                status === "REJECTED"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Rejected
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 grow max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari Order ID, nama, atau email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#152228] border border-[#1E2A30] text-sm text-white rounded-lg pl-10 pr-4 py-2 focus:outline-hidden focus:border-primary-blue transition-colors"
              />
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
            </div>
            <button
              type="submit"
              className="bg-primary-blue hover:bg-primary-blue/80 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              Cari
            </button>
          </form>
        </div>
      </div>

      {fetchError && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {fetchError}
        </div>
      )}

      {/* Main Table */}
      {isLoading ? (
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 py-20 text-center text-gray-400">
          <div className="flex flex-col items-center gap-2">
            <div className="size-8 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm">Memuat daftar transaksi...</p>
          </div>
        </div>
      ) : (
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E2A30] text-gray-400 text-xs font-semibold uppercase bg-[#152228]/50">
                  <th className="py-3 px-4 w-10"></th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Pelanggan</th>
                  <th className="py-3 px-4 text-right">Total Bayar</th>
                  <th className="py-3 px-4 text-right">Komisi Platform</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2A30] text-sm text-[#D9D9D9]">
                {transactions.length > 0 ? (
                  transactions.map((tx) => {
                    const isExpanded = expandedRow === tx.transactionId;
                    return (
                      <>
                        <tr
                          key={tx.transactionId}
                          className="hover:bg-[#152228]/50 transition-colors cursor-pointer"
                          onClick={() => toggleRow(tx.transactionId)}
                        >
                          <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => toggleRow(tx.transactionId)}
                              className="text-gray-400 hover:text-white transition"
                            >
                              {isExpanded ? (
                                <MdKeyboardArrowUp size={20} />
                              ) : (
                                <MdKeyboardArrowDown size={20} />
                              )}
                            </button>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            {new Date(tx.createdAt).toLocaleDateString("id-ID", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-4 px-4 font-mono text-xs text-primary-blue whitespace-nowrap">
                            {tx.orderId}
                          </td>
                          <td className="py-4 px-4 max-w-[200px] truncate">
                            <div className="font-semibold text-white truncate">{tx.name}</div>
                            <div className="text-xs text-gray-400 truncate">{tx.email}</div>
                          </td>
                          <td className="py-4 px-4 text-right whitespace-nowrap font-semibold text-white">
                            {currencyFormatter.format(tx.grandTotal)}
                          </td>
                          <td className="py-4 px-4 text-right whitespace-nowrap text-primary-yellow">
                            {currencyFormatter.format(tx.adminFee)}
                          </td>
                          <td className="py-4 px-4 text-center whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                tx.status === "SUCCESS"
                                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                                  : tx.status === "PENDING"
                                    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            {tx.status === "PENDING" ? (
                              <button
                                onClick={() => handleCheckStatus(tx.orderId)}
                                disabled={checkingOrderId === tx.orderId}
                                className="bg-[#152228] hover:bg-bg-blue/30 text-primary-blue text-xs font-bold px-3 py-1.5 rounded-lg border border-[#1E2A30] transition disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {checkingOrderId === tx.orderId ? "Mengecek..." : "Cek Status"}
                              </button>
                            ) : (
                              <span className="text-xs text-gray-500">-</span>
                            )}
                          </td>
                        </tr>

                        {/* Collapsible Row containing Items details */}
                        {isExpanded && (
                          <tr className="bg-[#101B20]/40">
                            <td colSpan={8} className="py-4 px-8 border-t border-[#1E2A30]">
                              <div className="space-y-3">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                  Item Transaksi ({tx.items.length})
                                </p>
                                <div className="divide-y divide-[#1E2A30] border border-[#1E2A30] rounded-lg overflow-hidden bg-[#152228]/30">
                                  {tx.items.map((item) => (
                                    <div
                                      key={item.transactionItemId}
                                      className="flex items-center justify-between p-3 text-xs"
                                    >
                                      <div>
                                        <p className="font-semibold text-white">{item.productName}</p>
                                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                                          ID: {item.productId}
                                        </p>
                                      </div>
                                      <div className="font-mono text-gray-300 font-semibold">
                                        {currencyFormatter.format(item.price)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
                                  <div className="bg-[#152228]/50 p-2.5 rounded-lg border border-[#1E2A30]">
                                    <span className="text-gray-400 block mb-0.5">Subtotal</span>
                                    <span className="font-mono text-white font-semibold">
                                      {currencyFormatter.format(tx.subTotal)}
                                    </span>
                                  </div>
                                  <div className="bg-[#152228]/50 p-2.5 rounded-lg border border-[#1E2A30]">
                                    <span className="text-gray-400 block mb-0.5">Admin Fee</span>
                                    <span className="font-mono text-white font-semibold">
                                      {currencyFormatter.format(tx.adminFee)}
                                    </span>
                                  </div>
                                  <div className="bg-[#152228]/50 p-2.5 rounded-lg border border-[#1E2A30]">
                                    <span className="text-gray-400 block mb-0.5">Service Fee</span>
                                    <span className="font-mono text-white font-semibold">
                                      {currencyFormatter.format(tx.serviceFee)}
                                    </span>
                                  </div>
                                  <div className="bg-[#152228]/50 p-2.5 rounded-lg border border-[#1E2A30]">
                                    <span className="text-gray-400 block mb-0.5">Grand Total</span>
                                    <span className="font-mono text-white font-semibold">
                                      {currencyFormatter.format(tx.grandTotal)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      Tidak ada transaksi ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[#1E2A30] px-4 py-3 bg-[#152228]/50 text-xs">
              <div className="text-gray-400">
                Menampilkan <span className="font-semibold text-white">{(page - 1) * limit + 1}</span> hingga{" "}
                <span className="font-semibold text-white">{Math.min(page * limit, total)}</span> dari{" "}
                <span className="font-semibold text-white">{total}</span> transaksi
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-md border border-[#1E2A30] bg-[#152228] text-gray-400 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MdChevronLeft size={18} />
                </button>
                <span className="text-gray-300 font-semibold">
                  Halaman {page} dari {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-md border border-[#1E2A30] bg-[#152228] text-gray-400 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MdChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
