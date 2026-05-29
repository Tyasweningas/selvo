"use client";

import { product_categories } from "@/data/product-categories";
import { Product, ProductStatus } from "@/types/product";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdCategory, MdClose } from "react-icons/md";

export type ProductReviewAction = "approve" | "reject";

interface ProductReviewModalProps {
  open: boolean;
  product: Product | null;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (action: ProductReviewAction) => void;
}

const statusLabel: Record<ProductStatus, string> = {
  [ProductStatus.APPROVED]: "Tayang",
  [ProductStatus.SUBMISSION]: "Pending",
  [ProductStatus.REJECTED]: "Ditolak",
};

const statusColor: Record<ProductStatus, string> = {
  [ProductStatus.APPROVED]: "text-primary-green",
  [ProductStatus.SUBMISSION]: "text-primary-yellow",
  [ProductStatus.REJECTED]: "text-red-400",
};

const statusDot: Record<ProductStatus, string> = {
  [ProductStatus.APPROVED]: "bg-primary-green",
  [ProductStatus.SUBMISSION]: "bg-primary-yellow",
  [ProductStatus.REJECTED]: "bg-red-400",
};

const ProductReviewModal = ({
  open,
  product,
  loading = false,
  onClose,
  onConfirm,
}: ProductReviewModalProps) => {
  const [actionInProgress, setActionInProgress] =
    useState<ProductReviewAction | null>(null);

  useEffect(() => {
    if (open) {
      setActionInProgress(null);
    }
  }, [open]);

  if (!open || !product) {
    return null;
  }

  const handleAction = (action: ProductReviewAction) => {
    setActionInProgress(action);
    onConfirm(action);
  };

  const category = product.category;
  const categoryIcon =
    category?.icon ||
    product_categories.find(
      (cat) => cat.productCategoryId === product.categoryId,
    )?.icon ||
    product_categories.find((cat) => cat.name === category?.name)?.icon;

  const images = product.images ?? [];
  const isPending = product.status === ProductStatus.SUBMISSION;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
      <div className="border-bg-light bg-bg-nav max-h-full w-full max-w-3xl overflow-y-auto rounded-2xl border-2 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-2xl font-bold text-white">{product.name}</p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={clsx(
                  "size-3 rounded-full",
                  statusDot[product.status],
                )}
              />
              <span className={clsx("text-sm", statusColor[product.status])}>
                {statusLabel[product.status]}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-tertier-netral hover:bg-bg-div rounded-full p-2 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Tutup"
          >
            <MdClose className="size-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <div className="bg-bg-div flex items-center gap-3 rounded-xl p-3">
              {categoryIcon ? (
                <Image
                  src={categoryIcon}
                  alt={category?.name || "Category"}
                  width={40}
                  height={40}
                  className="size-10"
                />
              ) : (
                <div className="bg-bg-blue grid size-10 place-items-center rounded-xl">
                  <MdCategory className="text-primary-blue size-6" />
                </div>
              )}
              <p className="truncate text-sm text-white">
                {category?.name || "Tanpa Kategori"}
              </p>
            </div>
            <div className="bg-bg-div min-w-0 rounded-xl p-3">
              <p className="text-xs text-[#D9D9D9]">Penjual</p>
              <p className="truncate font-semibold text-white">
                {product.seller?.name ?? "-"}
              </p>
              <p className="truncate text-xs font-thin text-gray-400">
                {product.seller?.email ?? product.sellerId}
              </p>
            </div>
          </div>

          <div className="bg-bg-div rounded-xl p-3">
            <p className="text-xs text-[#D9D9D9]">Harga</p>
            <p className="text-2xl font-bold text-white">
              <span className="text-primary-yellow mr-2">IDR</span>
              {product.price.toLocaleString("id-ID")}
            </p>
          </div>

          {images.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold text-white">
                Foto Produk
              </p>
              <div className="grid grid-cols-4 gap-3">
                {images.map((img) => (
                  <div
                    key={img.productImageId}
                    className="bg-bg-div relative aspect-square overflow-hidden rounded-xl"
                  >
                    <Image
                      src={img.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 text-sm font-semibold text-white">Deskripsi</p>
            <p className="text-sec-netral border-bg-div bg-bg-div rounded-xl border-2 p-3 text-sm whitespace-pre-wrap">
              {product.description || "Belum ada deskripsi."}
            </p>
          </div>

          {product.details && product.details.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold text-white">
                Detail Produk
              </p>
              <div className="space-y-2">
                {product.details.map((detail) => (
                  <div
                    key={detail.productDetailId}
                    className="bg-bg-div flex items-center gap-3 rounded-xl p-3"
                  >
                    <p className="bg-bg-light text-tertier-netral w-48 shrink-0 rounded-full px-4 py-1.5 text-center text-xs font-bold">
                      {detail.key}
                    </p>
                    <p className="text-sec-netral truncate text-sm">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.productLink && (
            <div>
              <p className="mb-2 text-sm font-semibold text-white">
                Tautan Produk
              </p>
              <a
                href={product.productLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-blue bg-bg-div inline-flex w-full items-center rounded-xl px-4 py-2 text-sm hover:underline"
              >
                {product.productLink}
              </a>
            </div>
          )}

          {!isPending && (
            <div className="border-bg-light bg-bg-div rounded-xl border-2 p-3 text-sm text-[#D9D9D9]">
              Produk ini sudah direview. Aksi approve/reject hanya tersedia
              untuk produk berstatus SUBMISSION.
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="bg-bg-div border-primary-blue text-primary-blue hover:bg-bg-blue hover:border-bg-blue cursor-pointer rounded-full border-2 px-4 py-2 font-semibold shadow-[5px_5px_0_#17547d] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:text-white hover:shadow-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Tutup
          </button>
          {isPending && (
            <>
              <button
                type="button"
                onClick={() => handleAction("reject")}
                disabled={loading}
                className="cursor-pointer rounded-full border-2 border-red-500 bg-red-500/15 px-4 py-2 font-semibold text-red-300 shadow-[5px_5px_0_rgba(248,113,113,0.4)] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:bg-red-500 hover:text-white hover:shadow-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading && actionInProgress === "reject"
                  ? "Memproses..."
                  : "Tolak"}
              </button>
              <button
                type="button"
                onClick={() => handleAction("approve")}
                disabled={loading}
                className="bg-primary-blue border-primary-blue hover:border-secondary-blue hover:bg-secondary-blue cursor-pointer rounded-full border-2 px-4 py-2 font-semibold text-white shadow-[5px_5px_0_#1086d5] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading && actionInProgress === "approve"
                  ? "Memproses..."
                  : "Setujui"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewModal;
