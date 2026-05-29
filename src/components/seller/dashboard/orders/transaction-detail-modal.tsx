"use client";

import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import sellerService from "@/services/seller.service";
import type {
  SellerTransactionDetail,
  SellerTransactionItemSummary,
} from "@/types/seller-orders";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdClose,
  MdContentCopy,
  MdMail,
  MdPerson,
  MdRateReview,
  MdReceiptLong,
} from "react-icons/md";
import { toast } from "sonner";
import StarRating from "../../../global/star-rating";
import StatusPill from "./status-pill";

interface TransactionDetailModalProps {
  open: boolean;
  transactionId: string | null;
  onClose: () => void;
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

const ReviewSection = ({ item }: { item: SellerTransactionItemSummary }) => {
  if (!item.review) {
    return (
      <div className="border-bg-div bg-bg-div/40 mt-3 rounded-lg border-2 border-dashed p-3 text-sm text-gray-400">
        Pembeli belum memberikan ulasan untuk produk ini.
      </div>
    );
  }

  const review = item.review;

  return (
    <div className="border-primary-blue/40 bg-primary-blue/5 mt-3 rounded-lg border-2 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MdRateReview className="text-primary-blue size-4" />
          <span className="text-primary-blue text-xs font-semibold uppercase">
            Ulasan Pembeli
          </span>
        </div>
        <span className="text-tertier-netral text-xs">
          {formatDate(review.createdAt)}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <StarRating value={review.star} size={16} showNumber />
        <span className="text-tertier-netral text-xs">oleh {review.name}</span>
      </div>
      {review.message ? (
        <p className="mt-2 text-sm leading-relaxed text-gray-200">
          {review.message}
        </p>
      ) : (
        <p className="text-tertier-netral mt-2 text-sm italic">
          Pembeli tidak meninggalkan pesan.
        </p>
      )}
    </div>
  );
};

const ItemBlock = ({ item }: { item: SellerTransactionItemSummary }) => {
  return (
    <div className="border-bg-div bg-bg-div/30 rounded-xl border-2 p-4">
      <div className="flex gap-4">
        <div className="bg-bg-nav flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg">
          {item.product.imageUrl ? (
            <Image
              src={item.product.imageUrl}
              alt={item.product.name}
              width={80}
              height={80}
              className="size-full object-cover"
            />
          ) : (
            <span className="text-xs text-gray-500">No Image</span>
          )}
        </div>
        <div className="min-w-0 grow">
          <Link
            href={`/products/${item.product.slug}`}
            target="_blank"
            className="hover:text-primary-blue block truncate font-semibold text-white transition"
          >
            {item.product.name}
          </Link>
          <p className="truncate text-xs text-gray-400">
            {item.product.categoryName ?? "Tanpa kategori"} · 1x
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            <span className="text-primary-yellow mr-1">IDR</span>
            {currencyFormatter.format(item.price)}
          </p>
        </div>
      </div>
      <ReviewSection item={item} />
    </div>
  );
};

const TransactionDetailModal = ({
  open,
  transactionId,
  onClose,
}: TransactionDetailModalProps) => {
  const [detail, setDetail] = useState<SellerTransactionDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !transactionId) {
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setDetail(null);

    sellerService
      .getMyTransactionDetail(transactionId)
      .then((result) => {
        if (!cancelled) {
          setDetail(result);
        }
      })
      .catch((err) => {
        logError(err, "TransactionDetailModal");
        if (!cancelled) {
          setError(formatErrorForDisplay(err));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, transactionId]);

  if (!open) {
    return null;
  }

  const handleCopy = async () => {
    if (!detail?.orderId) return;
    try {
      await navigator.clipboard.writeText(detail.orderId);
      toast.success("Order ID disalin");
    } catch {
      toast.error("Gagal menyalin order ID");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
      <div className="border-bg-light bg-bg-nav max-h-full w-full max-w-2xl overflow-hidden rounded-2xl border-2 shadow-2xl">
        <div className="border-bg-div flex items-start justify-between gap-3 border-b-2 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="bg-bg-blue rounded-xl p-2">
              <MdReceiptLong className="text-primary-blue size-6" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Detail Transaksi</p>
              <p className="text-tertier-netral text-xs">
                Lihat item dan ulasan pada pesanan ini.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-tertier-netral hover:bg-bg-div rounded-full p-2 transition hover:text-white"
            aria-label="Tutup"
          >
            <MdClose className="size-5" />
          </button>
        </div>

        <div className="custom-scrollbar max-h-[70vh] overflow-y-auto px-6 py-5">
          {loading && (
            <div className="py-12 text-center text-gray-400">
              Memuat detail transaksi...
            </div>
          )}

          {error && !loading && (
            <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          )}

          {detail && !loading && !error && (
            <div className="space-y-5">
              <div className="border-bg-div bg-bg-div/30 flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-tertier-netral text-xs">Order ID</p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-primary-blue hover:text-secondary-blue inline-flex items-center gap-1 text-sm font-semibold"
                  >
                    <span className="max-w-[260px] truncate">
                      {detail.orderId}
                    </span>
                    <MdContentCopy className="size-3.5" />
                  </button>
                  <p className="text-tertier-netral mt-1 text-xs">
                    {formatDate(detail.createdAt)}
                  </p>
                </div>
                <StatusPill status={detail.status} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border-bg-div bg-bg-div/30 rounded-xl border-2 p-4">
                  <div className="flex items-center gap-2">
                    <MdPerson className="text-primary-blue size-4" />
                    <p className="text-tertier-netral text-xs">Pembeli</p>
                  </div>
                  <p className="mt-1 truncate font-semibold text-white">
                    {detail.buyerName}
                  </p>
                </div>
                <div className="border-bg-div bg-bg-div/30 rounded-xl border-2 p-4">
                  <div className="flex items-center gap-2">
                    <MdMail className="text-primary-blue size-4" />
                    <p className="text-tertier-netral text-xs">Email</p>
                  </div>
                  <p className="mt-1 truncate font-semibold text-white">
                    {detail.buyerEmail}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Produk Dipesan ({detail.itemsCount})
                </p>
                <p className="text-tertier-netral text-xs">
                  Hanya menampilkan produk milikmu pada transaksi ini.
                </p>
                <div className="mt-3 space-y-3">
                  {detail.items.map((item) => (
                    <ItemBlock key={item.transactionItemId} item={item} />
                  ))}
                </div>
              </div>

              <div className="border-bg-div bg-bg-div/30 flex items-center justify-between rounded-xl border-2 px-4 py-3">
                <div>
                  <p className="text-tertier-netral text-xs">
                    Subtotal Penjualan
                  </p>
                  <p className="text-tertier-netral text-xs">
                    Akumulasi item milikmu pada transaksi ini.
                  </p>
                </div>
                <p className="text-xl font-bold text-white">
                  <span className="text-primary-yellow mr-2">IDR</span>
                  {currencyFormatter.format(detail.sellerSubtotal)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border-bg-div flex justify-end border-t-2 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-bg-div border-primary-blue text-primary-blue hover:bg-bg-blue hover:border-bg-blue cursor-pointer rounded-full border-2 px-4 py-2 font-semibold shadow-[5px_5px_0_#17547d] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:text-white hover:shadow-none active:scale-95"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailModal;
