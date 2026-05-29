"use client";

import Input from "@/components/global/input";
import ProductFilterSelect from "@/components/seller/dashboard/orders/product-filter-select";
import TransactionDetailModal from "@/components/seller/dashboard/orders/transaction-detail-modal";
import TransactionStatusTabs from "@/components/seller/dashboard/orders/transaction-status-tabs";
import TransactionTable from "@/components/seller/dashboard/orders/transaction-table";
import { useMyProducts } from "@/hooks/use-my-products";
import { useSellerTransactions } from "@/hooks/use-seller-transactions";
import type {
  SellerTransactionListItem,
  SellerVisibleTransactionStatus,
} from "@/types/seller-orders";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdInbox, MdRefresh, MdSearch, MdShoppingBag } from "react-icons/md";

type StatusFilter = SellerVisibleTransactionStatus | "ALL";

const PAGE_SIZE = 10;
const ALLOWED: StatusFilter[] = ["ALL", "SUCCESS", "REJECTED"];

const parseStatus = (raw: string | null): StatusFilter => {
  if (!raw) return "ALL";
  const upper = raw.toUpperCase();
  return (ALLOWED as string[]).includes(upper)
    ? (upper as StatusFilter)
    : "ALL";
};

const SalesContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialStatus = useMemo(
    () => parseStatus(searchParams.get("status")),
    [searchParams],
  );

  const [status, setStatus] = useState<StatusFilter>(initialStatus);
  const [productId, setProductId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [activeTransactionId, setActiveTransactionId] = useState<string | null>(
    null,
  );

  const { data: products } = useMyProducts();
  const productOptions = useMemo(
    () =>
      products.map((p) => ({
        productId: p.productId,
        name: p.name,
      })),
    [products],
  );

  // Sinkronkan jika user pindah ke menu dengan query string status berbeda.
  useEffect(() => {
    setStatus(initialStatus);
    setPage(1);
  }, [initialStatus]);

  const { data, meta, loading, error, refetch } = useSellerTransactions({
    page,
    limit: PAGE_SIZE,
    status: status === "ALL" ? undefined : status,
    search: search || undefined,
    productId: productId ?? undefined,
  });

  const handleStatusChange = (next: StatusFilter) => {
    setStatus(next);
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "ALL") {
      params.delete("status");
    } else {
      params.set("status", next);
    }
    const query = params.toString();
    router.replace(`/dashboard/sales${query ? `?${query}` : ""}`);
  };

  const handleProductChange = (next: string | null) => {
    setProductId(next);
    setPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleView = (transaction: SellerTransactionListItem) => {
    setActiveTransactionId(transaction.transactionId);
  };

  const handleCloseModal = () => {
    setActiveTransactionId(null);
  };

  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));
  const startIndex = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const endIndex = Math.min(meta.page * meta.limit, meta.total);

  return (
    <div className="mt-5 space-y-5">
      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-bg-blue rounded-xl p-2">
            <MdShoppingBag className="text-primary-blue size-7" />
          </div>
          <div className="grow">
            <p className="text-2xl font-bold text-white">Daftar Pesanan</p>
            <p className="text-sm text-[#D9D9D9]">
              Pantau setiap transaksi yang sudah dibayar atau dibatalkan untuk
              produk kamu.
            </p>
          </div>
        </div>
      </div>

      <TransactionStatusTabs
        active={status}
        counts={meta.counts}
        onChange={handleStatusChange}
      />

      <form
        onSubmit={handleSearch}
        className="border-bg-div bg-bg-nav flex flex-wrap items-center gap-4 rounded-xl border-2 px-5 py-5"
      >
        <Input
          className="min-w-[280px] grow"
          placeholder="Cari Order ID, nama pembeli, atau produk"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          suffix={<MdSearch />}
        />
        <ProductFilterSelect
          value={productId}
          options={productOptions}
          onChange={handleProductChange}
          placeholder="Semua produkmu"
          className="min-w-[220px]"
        />
        <button
          type="submit"
          className="bg-primary-blue border-primary-blue hover:bg-secondary-blue cursor-pointer rounded-full border-2 px-5 py-2 text-sm font-semibold text-white shadow-[5px_5px_0_#1086d5] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95"
        >
          Cari
        </button>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={loading}
          className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 inline-flex cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          <MdRefresh className={loading ? "size-4 animate-spin" : "size-4"} />
          Muat ulang
        </button>
      </form>

      {error && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 py-16 text-center text-gray-400">
          Memuat daftar pesanan...
        </div>
      ) : data.length === 0 ? (
        <div className="border-bg-div bg-bg-nav flex flex-col items-center justify-center rounded-xl border-2 py-16 text-center">
          <div className="bg-bg-div mb-4 rounded-2xl p-4">
            <MdInbox className="text-tertier-netral size-12" />
          </div>
          <p className="text-lg font-semibold text-white">Belum ada pesanan</p>
          <p className="mt-1 max-w-sm text-sm text-gray-400">
            {search || productId || status !== "ALL"
              ? "Tidak ada pesanan yang sesuai dengan filter saat ini."
              : "Pesanan dari pelanggan akan muncul di sini begitu pembayaran terkonfirmasi."}
          </p>
        </div>
      ) : (
        <TransactionTable transactions={data} onView={handleView} />
      )}

      {meta.total > 0 && !loading && (
        <div className="border-bg-div bg-bg-nav flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 px-5 py-3 text-sm text-[#D9D9D9]">
          <p>
            Menampilkan{" "}
            <span className="text-white">
              {startIndex}-{endIndex}
            </span>{" "}
            dari <span className="text-white">{meta.total}</span> pesanan
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 cursor-pointer rounded-full border-2 px-4 py-1.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <span className="text-white">
              Halaman {meta.page} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 cursor-pointer rounded-full border-2 px-4 py-1.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Berikutnya
            </button>
          </div>
        </div>
      )}

      <TransactionDetailModal
        open={activeTransactionId !== null}
        transactionId={activeTransactionId}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SalesContent;
