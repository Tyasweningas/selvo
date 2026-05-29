"use client";

import ReviewCard from "@/components/seller/dashboard/orders/review-card";
import ReviewFilterBar from "@/components/seller/dashboard/orders/review-filter-bar";
import ReviewSummaryCard from "@/components/seller/dashboard/orders/review-summary-card";
import { useMyProducts } from "@/hooks/use-my-products";
import { useSellerReviews } from "@/hooks/use-seller-reviews";
import { useMemo, useState } from "react";
import { MdInbox, MdRefresh } from "react-icons/md";

type StarFilter = 0 | 1 | 2 | 3 | 4 | 5;
const PAGE_SIZE = 10;

const ReviewsPage = () => {
  const [star, setStar] = useState<StarFilter>(0);
  const [productId, setProductId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { data: products } = useMyProducts();

  const productOptions = useMemo(
    () =>
      products.map((p) => ({
        productId: p.productId,
        name: p.name,
      })),
    [products],
  );

  const { data, meta, loading, error, refetch } = useSellerReviews({
    page,
    limit: PAGE_SIZE,
    productId: productId ?? undefined,
    star: star === 0 ? undefined : star,
  });

  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));
  const startIndex = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const endIndex = Math.min(meta.page * meta.limit, meta.total);

  const handleStarChange = (next: StarFilter) => {
    setStar(next);
    setPage(1);
  };

  const handleProductChange = (next: string | null) => {
    setProductId(next);
    setPage(1);
  };

  return (
    <div className="mt-5 space-y-5">
      <ReviewSummaryCard meta={meta} loading={loading} />

      <ReviewFilterBar
        activeStar={star}
        onChangeStar={handleStarChange}
        productOptions={productOptions}
        activeProductId={productId}
        onChangeProduct={handleProductChange}
        loading={loading}
      />

      <div className="border-bg-div bg-bg-nav flex items-center justify-between rounded-xl border-2 px-5 py-3">
        <p className="text-sm text-[#D9D9D9]">
          {loading
            ? "Memuat ulasan..."
            : `Menampilkan ${meta.total === 0 ? 0 : `${startIndex}-${endIndex}`} dari ${meta.total} ulasan`}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={loading}
          className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 inline-flex cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          <MdRefresh className={loading ? "size-4 animate-spin" : "size-4"} />
          Muat ulang
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 py-16 text-center text-gray-400">
          Memuat ulasan...
        </div>
      ) : data.length === 0 ? (
        <div className="border-bg-div bg-bg-nav flex flex-col items-center justify-center rounded-xl border-2 py-16 text-center">
          <div className="bg-bg-div mb-4 rounded-2xl p-4">
            <MdInbox className="text-tertier-netral size-12" />
          </div>
          <p className="text-lg font-semibold text-white">Belum ada ulasan</p>
          <p className="mt-1 max-w-sm text-sm text-gray-400">
            {star !== 0 || productId
              ? "Tidak ada ulasan yang sesuai dengan filter saat ini."
              : "Ulasan dari pembeli akan muncul di sini begitu produkmu mendapat penilaian."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((review) => (
            <ReviewCard key={review.reviewId} review={review} />
          ))}
        </div>
      )}

      {meta.total > 0 && !loading && (
        <div className="border-bg-div bg-bg-nav flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 px-5 py-3 text-sm text-[#D9D9D9]">
          <p>
            Halaman <span className="text-white">{meta.page}</span> dari{" "}
            <span className="text-white">{totalPages}</span>
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
    </div>
  );
};

export default ReviewsPage;
