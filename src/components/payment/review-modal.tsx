"use client";

import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import reviewService from "@/services/review.service";
import type { Review, TransactionItem } from "@/types/transaction";
import clsx from "clsx";
import { FormEvent, useEffect, useState } from "react";
import { MdClose, MdStar, MdStarBorder } from "react-icons/md";
import { toast } from "sonner";

interface ReviewModalProps {
  open: boolean;
  item: TransactionItem | null;
  onClose: () => void;
  onSubmitted: (review: Review) => void;
}

const STARS = [1, 2, 3, 4, 5];

const starLabel: Record<number, string> = {
  1: "Sangat buruk",
  2: "Buruk",
  3: "Cukup",
  4: "Bagus",
  5: "Sangat bagus",
};

const ReviewModal = ({
  open,
  item,
  onClose,
  onSubmitted,
}: ReviewModalProps) => {
  const [star, setStar] = useState<number>(0);
  const [hoverStar, setHoverStar] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setStar(0);
      setHoverStar(0);
      setMessage("");
      setError(null);
    }
  }, [open]);

  if (!open || !item) {
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!star || star < 1 || star > 5) {
      setError("Pilih rating bintang terlebih dahulu.");
      return;
    }

    setSubmitting(true);
    try {
      const review = await reviewService.createReview({
        transactionItemId: item.transactionItemId,
        star,
        message: message.trim() || undefined,
      });
      toast.success("Terima kasih atas ulasanmu.");
      onSubmitted(review);
      onClose();
    } catch (err: unknown) {
      logError(err, "ReviewModal");
      setError(formatErrorForDisplay(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isSubmitting) {
      return;
    }
    onClose();
  };

  const activeStar = hoverStar || star;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="border-bg-light bg-bg-nav max-h-full w-full max-w-lg overflow-y-auto rounded-2xl border-2 p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xl font-bold text-white">Beri Ulasan Produk</p>
            <p className="mt-1 truncate text-sm text-[#D9D9D9]">
              {item.product?.name ?? "Produk"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="text-tertier-netral hover:bg-bg-div rounded-full p-2 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Tutup"
          >
            <MdClose className="size-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/15 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mt-5">
          <label className="text-sm font-semibold text-white">
            Rating Produk
          </label>
          <div className="mt-2 flex items-center gap-1">
            {STARS.map((value) => {
              const filled = activeStar >= value;
              return (
                <button
                  key={value}
                  type="button"
                  onMouseEnter={() => setHoverStar(value)}
                  onMouseLeave={() => setHoverStar(0)}
                  onClick={() => setStar(value)}
                  disabled={isSubmitting}
                  aria-label={`Beri rating ${value} bintang`}
                  className="text-primary-yellow cursor-pointer p-1 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {filled ? (
                    <MdStar className="size-9" />
                  ) : (
                    <MdStarBorder className="size-9" />
                  )}
                </button>
              );
            })}
            <span
              className={clsx(
                "ml-2 text-sm",
                activeStar > 0 ? "text-white" : "text-tertier-netral",
              )}
            >
              {activeStar > 0 ? starLabel[activeStar] : "Pilih bintang"}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm font-semibold text-white">
            Pesan (opsional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            rows={4}
            placeholder="Bagikan pengalamanmu memakai produk ini."
            className="border-bg-light bg-bg-div mt-2 w-full resize-none rounded-xl border-2 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none disabled:opacity-50"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="bg-bg-div border-primary-blue text-primary-blue hover:bg-bg-blue hover:border-bg-blue cursor-pointer rounded-full border-2 px-4 py-2 font-semibold shadow-[5px_5px_0_#17547d] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:text-white hover:shadow-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-blue border-primary-blue hover:border-secondary-blue hover:bg-secondary-blue cursor-pointer rounded-full border-2 px-4 py-2 font-semibold text-white shadow-[5px_5px_0_#1086d5] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;
