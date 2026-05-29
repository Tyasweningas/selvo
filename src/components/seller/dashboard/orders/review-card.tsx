import type { SellerReviewItem } from "@/types/seller-orders";
import Image from "next/image";
import Link from "next/link";
import { MdPerson } from "react-icons/md";
import StarRating from "../../../global/star-rating";

interface ReviewCardProps {
  review: SellerReviewItem;
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return dateFormatter.format(parsed);
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <article className="border-bg-div bg-bg-nav rounded-xl border-2 p-5">
      <div className="flex items-start gap-4">
        <div className="bg-bg-blue grid size-11 shrink-0 place-items-center rounded-full">
          <MdPerson className="text-primary-blue size-6" />
        </div>
        <div className="min-w-0 grow">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="truncate font-semibold text-white">{review.name}</p>
            <span className="text-tertier-netral text-xs">
              {formatDate(review.createdAt)}
            </span>
          </div>
          <div className="mt-1">
            <StarRating value={review.star} size={16} showNumber />
          </div>
          {review.message ? (
            <p className="mt-3 text-sm leading-relaxed text-gray-200">
              {review.message}
            </p>
          ) : (
            <p className="text-tertier-netral mt-3 text-sm italic">
              Pembeli tidak meninggalkan pesan.
            </p>
          )}

          <Link
            href={`/products/${review.product.slug}`}
            target="_blank"
            className="border-bg-div bg-bg-div hover:bg-bg-blue/40 mt-4 flex items-center gap-3 rounded-lg border-2 p-3 transition"
          >
            <div className="bg-bg-nav flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md">
              {review.product.imageUrl ? (
                <Image
                  src={review.product.imageUrl}
                  alt={review.product.name}
                  width={48}
                  height={48}
                  className="size-full object-cover"
                />
              ) : (
                <span className="text-[10px] text-gray-500">No Image</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {review.product.name}
              </p>
              <p className="text-primary-blue text-xs">Lihat produk</p>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ReviewCard;
