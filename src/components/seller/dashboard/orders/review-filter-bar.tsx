"use client";

import clsx from "clsx";
import { MdStar } from "react-icons/md";

type StarFilter = 0 | 1 | 2 | 3 | 4 | 5;

interface ReviewFilterBarProps {
  activeStar: StarFilter;
  onChangeStar: (star: StarFilter) => void;
  productOptions: { productId: string; name: string }[];
  activeProductId: string | null;
  onChangeProduct: (productId: string | null) => void;
  loading?: boolean;
}

const STAR_OPTIONS: { value: StarFilter; label: string }[] = [
  { value: 0, label: "Semua" },
  { value: 5, label: "5" },
  { value: 4, label: "4" },
  { value: 3, label: "3" },
  { value: 2, label: "2" },
  { value: 1, label: "1" },
];

const ReviewFilterBar = ({
  activeStar,
  onChangeStar,
  productOptions,
  activeProductId,
  onChangeProduct,
  loading,
}: ReviewFilterBarProps) => {
  return (
    <div className="border-bg-div bg-bg-nav space-y-4 rounded-xl border-2 p-5">
      <div>
        <p className="text-tertier-netral mb-2 text-xs font-semibold uppercase">
          Filter Bintang
        </p>
        <div className="flex flex-wrap gap-2">
          {STAR_OPTIONS.map((opt) => {
            const isActive = activeStar === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChangeStar(opt.value)}
                disabled={loading}
                className={clsx(
                  "inline-flex items-center gap-1 rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
                  isActive
                    ? "border-primary-blue bg-primary-blue text-white"
                    : "border-bg-light bg-bg-div text-tertier-netral hover:text-white",
                )}
              >
                {opt.value > 0 && (
                  <MdStar className="text-primary-yellow size-4" />
                )}
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-tertier-netral mb-2 text-xs font-semibold uppercase">
          Filter Produk
        </p>
        <select
          value={activeProductId ?? ""}
          onChange={(e) => onChangeProduct(e.target.value || null)}
          disabled={loading}
          className="border-bg-light bg-bg-div w-full max-w-md rounded-full border-2 px-4 py-2 text-sm text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Semua produk</option>
          {productOptions.map((product) => (
            <option key={product.productId} value={product.productId}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ReviewFilterBar;
