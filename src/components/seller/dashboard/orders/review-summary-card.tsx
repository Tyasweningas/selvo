"use client";

import type { ReviewStarKey, SellerReviewMeta } from "@/types/seller-orders";
import { MdRateReview, MdStar } from "react-icons/md";
import StarRating from "../../../global/star-rating";

interface ReviewSummaryCardProps {
  meta: SellerReviewMeta;
  loading?: boolean;
}

const integerFormatter = new Intl.NumberFormat("id-ID");

const STAR_KEYS: ReviewStarKey[] = ["5", "4", "3", "2", "1"];

const ReviewSummaryCard = ({ meta, loading }: ReviewSummaryCardProps) => {
  const total = meta.total;

  return (
    <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-6">
      <div className="flex items-start gap-4">
        <div className="bg-bg-blue rounded-xl p-2">
          <MdRateReview className="text-primary-blue size-7" />
        </div>
        <div className="grow">
          <p className="text-2xl font-bold text-white">Ulasan Toko</p>
          <p className="text-sm text-[#D9D9D9]">
            Rating dan ulasan dari pembeli untuk semua produkmu.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="border-bg-div from-primary-blue/15 to-bg-nav/40 rounded-xl border-2 bg-linear-to-b p-5 text-center">
          <p className="text-tertier-netral text-sm">Rata-rata Rating</p>
          <div className="mt-2 flex items-end justify-center gap-1">
            <p className="text-primary-yellow text-5xl leading-none font-bold">
              {loading ? "..." : meta.averageStar.toFixed(1)}
            </p>
            <span className="text-tertier-netral pb-1 text-lg">/ 5</span>
          </div>
          <div className="mt-3 flex justify-center">
            <StarRating value={meta.averageStar} size={22} />
          </div>
          <p className="text-tertier-netral mt-3 text-xs">
            Berdasarkan{" "}
            <span className="text-white">
              {loading ? "..." : integerFormatter.format(total)}
            </span>{" "}
            ulasan
          </p>
        </div>

        <div className="space-y-2">
          {STAR_KEYS.map((key) => {
            const count = meta.distribution[key] ?? 0;
            const percentage =
              total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={key} className="flex items-center gap-3">
                <div className="text-tertier-netral flex w-12 items-center gap-1 text-sm">
                  <span>{key}</span>
                  <MdStar className="text-primary-yellow size-4" />
                </div>
                <div className="bg-bg-div h-2 grow overflow-hidden rounded-full">
                  <div
                    className="bg-primary-yellow h-full rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="w-20 text-right text-sm font-semibold text-white">
                  {integerFormatter.format(count)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummaryCard;
