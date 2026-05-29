"use client";

import StarRating from "@/components/global/star-rating";
import { useProductReviews } from "@/hooks/use-product-reviews";
import type { ProductReviewStarKey } from "@/services/review.service";
import { useState } from "react";
import { MdInbox, MdPerson, MdRateReview, MdStar } from "react-icons/md";

interface ProductReviewsProps {
  productId: string;
}

const REVIEWS_PER_PAGE = 5;

const integerFormatter = new Intl.NumberFormat("id-ID");

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return dateFormatter.format(parsed);
};

const STAR_KEYS: ProductReviewStarKey[] = ["5", "4", "3", "2", "1"];

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [page, setPage] = useState(1);

  const { data, meta, loading, error } = useProductReviews({
    productId,
    page,
    limit: REVIEWS_PER_PAGE,
  });

  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));
  const totalReviews = meta.total;
  const averageStar = meta.averageStar;

  return (
    <section className="mt-14 mb-4">
      <div className="mb-5 flex items-center gap-3">
        <div className="bg-bg-blue text-primary-blue grid size-11 shrink-0 place-items-center rounded-xl">
          <MdRateReview size={22} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white sm:text-xl">
            Ulasan Pembeli
          </h2>
          <p className="text-tertier-netral text-xs sm:text-sm">
            Pendapat asli dari pembeli yang sudah memakai produk ini
          </p>
        </div>
      </div>

      <div className="border-bg-light bg-bg-nav mb-6 rounded-2xl border p-5 shadow-lg sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="border-bg-light bg-bg-div rounded-xl border p-5 text-center">
            <p className="text-tertier-netral text-xs">Rata-rata Rating</p>
            <div className="mt-2 flex items-end justify-center gap-1">
              <p className="text-primary-yellow text-5xl leading-none font-extrabold">
                {loading ? "..." : averageStar.toFixed(1)}
              </p>
              <span className="text-tertier-netral pb-1 text-lg">/ 5</span>
            </div>
            <div className="mt-3 flex justify-center">
              <StarRating value={averageStar} size={20} />
            </div>
            <p className="text-tertier-netral mt-3 text-xs">
              Berdasarkan{" "}
              <span className="text-white">
                {loading ? "..." : integerFormatter.format(totalReviews)}
              </span>{" "}
              ulasan
            </p>
          </div>

          <div className="space-y-2 self-center">
            {STAR_KEYS.map((key) => {
              const count = meta.distribution[key] ?? 0;
              const percentage =
                totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
              return (
                <div key={key} className="flex items-center gap-3">
                  <div className="text-tertier-netral flex w-10 items-center gap-1 text-sm">
                    <span>{key}</span>
                    <MdStar className="text-primary-yellow size-4" />
                  </div>
                  <div className="bg-bg-body h-2 grow overflow-hidden rounded-full">
                    <div
                      className="bg-primary-yellow h-full rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="w-16 text-right text-sm font-semibold text-white">
                    {integerFormatter.format(count)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="border-bg-light bg-bg-nav text-tertier-netral rounded-xl border p-8 text-center text-sm">
          Memuat ulasan...
        </div>
      ) : data.length === 0 ? (
        <div className="border-bg-light bg-bg-nav flex flex-col items-center justify-center rounded-xl border p-10 text-center">
          <div className="bg-bg-div mb-3 rounded-2xl p-3">
            <MdInbox className="text-tertier-netral size-10" />
          </div>
          <p className="text-base font-semibold text-white">Belum ada ulasan</p>
          <p className="text-tertier-netral mt-1 max-w-sm text-sm">
            Produk ini belum mendapat ulasan dari pembeli.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((review) => (
            <article
              key={review.reviewId}
              className="border-bg-light bg-bg-nav rounded-xl border p-4 shadow-lg sm:p-5"
            >
              <div className="flex items-start gap-3">
                <div className="bg-bg-blue text-primary-blue grid size-10 shrink-0 place-items-center rounded-full">
                  <MdPerson className="size-5" />
                </div>
                <div className="min-w-0 grow">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-white sm:text-base">
                      {review.name}
                    </p>
                    <span className="text-tertier-netral text-xs">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <div className="mt-1">
                    <StarRating value={review.star} size={16} showNumber />
                  </div>
                  {review.message ? (
                    <p className="mt-2 text-sm leading-relaxed text-gray-300">
                      {review.message}
                    </p>
                  ) : (
                    <p className="text-tertier-netral mt-2 text-sm italic">
                      Pembeli tidak meninggalkan pesan.
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {meta.total > REVIEWS_PER_PAGE && !loading && (
        <div className="border-bg-light bg-bg-nav mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border px-5 py-3 text-sm text-gray-300">
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
    </section>
  );
};

export default ProductReviews;
