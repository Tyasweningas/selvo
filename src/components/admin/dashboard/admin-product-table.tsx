"use client";

import { product_categories } from "@/data/product-categories";
import { Product, ProductStatus } from "@/types/product";
import clsx from "clsx";
import Image from "next/image";
import { MdCategory, MdVisibility } from "react-icons/md";

interface AdminProductTableProps {
  products: Product[];
  emptyMessage?: string;
  onReview?: (product: Product) => void;
  reviewLabel?: string;
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

const AdminProductTable = ({
  products,
  emptyMessage = "Belum ada produk",
  onReview,
  reviewLabel = "Detail",
}: AdminProductTableProps) => {
  const showActionColumn = Boolean(onReview);

  const gridCols = showActionColumn
    ? "grid-cols-[120px_180px_1fr_180px_120px_150px_120px]"
    : "grid-cols-[120px_180px_1fr_180px_120px_150px]";

  return (
    <>
      {/* Mobile Card List View (Visible on <md screens) */}
      <div className="md:hidden space-y-4">
        {products.length > 0 ? (
          products.map((product) => {
            const category = product.category;
            const categoryIcon =
              category?.icon ||
              product_categories.find(
                (cat) => cat.productCategoryId === product.categoryId,
              )?.icon ||
              product_categories.find((cat) => cat.name === category?.name)
                ?.icon;
            const firstImage = product.images?.[0]?.imageUrl;

            return (
              <div
                key={product.productId}
                className="border-bg-div bg-bg-nav rounded-xl border-2 p-4 space-y-4 font-semibold text-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={clsx(
                        "size-2.5 rounded-full",
                        statusDot[product.status],
                      )}
                    />
                    <span
                      className={clsx("text-xs", statusColor[product.status])}
                    >
                      {statusLabel[product.status]}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">Terjual: {product.totalSold}</span>
                </div>

                <div className="flex gap-3">
                  <div className="size-16 shrink-0 relative rounded-xl overflow-hidden bg-gray-700">
                    {firstImage ? (
                      <Image
                        src={firstImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-gray-500 absolute inset-0 flex items-center justify-center">No Image</span>
                    )}
                  </div>
                  <div className="min-w-0 grow">
                    <p className="truncate text-sm font-bold text-white">{product.name}</p>
                    <p className="truncate text-xs font-thin text-gray-400">{product.slug}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
                      {categoryIcon && (
                        <Image
                          src={categoryIcon}
                          alt={category?.name || "Category"}
                          width={16}
                          height={16}
                          className="size-4 shrink-0"
                        />
                      )}
                      <span className="truncate">{category?.name || "Tanpa Kategori"}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#1A2B32] pt-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs text-primary-yellow font-semibold">
                      IDR {product.price.toLocaleString("id-ID")}
                    </p>
                    <p className="truncate text-[10px] font-thin text-gray-400 mt-0.5">
                      Seller: {product.seller?.name ?? "-"}
                    </p>
                  </div>
                  {showActionColumn && (
                    <button
                      type="button"
                      onClick={() => onReview?.(product)}
                      className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition cursor-pointer"
                    >
                      <MdVisibility className="size-4" />
                      <span>{reviewLabel}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="border-bg-div bg-bg-nav rounded-xl border-2 py-10 text-center text-gray-400">
            {emptyMessage}
          </div>
        )}
      </div>

      {/* Desktop Table View (Visible on >=md screens) */}
      <div className="hidden md:block overflow-x-auto border-bg-div border-2 rounded-xl bg-bg-nav">
        <div className="min-w-[800px]">
          {/* Table Header */}
          <div className="border-bg-div p-5 border-b-2">
            <div className={clsx("grid text-left font-semibold text-gray-100", gridCols)}>
              <div>Status</div>
              <div>Kategori</div>
              <div className="min-w-0">Nama Produk</div>
              <div>Penjual</div>
              <div>Terjual</div>
              <div>Harga</div>
              {showActionColumn && <div className="text-right">Aksi</div>}
            </div>
          </div>
          {/* Table Body */}
          <div className="divide-y divide-bg-div">
            {products.length > 0 ? (
              products.map((product) => {
                const category = product.category;
                const categoryIcon =
                  category?.icon ||
                  product_categories.find(
                    (cat) => cat.productCategoryId === product.categoryId,
                  )?.icon ||
                  product_categories.find((cat) => cat.name === category?.name)
                    ?.icon;
                const firstImage = product.images?.[0]?.imageUrl;

                return (
                  <div
                    key={product.productId}
                    className={clsx(
                      "hover:bg-bg-div grid items-center px-5 py-5 text-left font-semibold text-gray-100 transition duration-100",
                      gridCols,
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={clsx(
                          "size-3 rounded-full",
                          statusDot[product.status],
                        )}
                      />
                      <span
                        className={clsx("text-sm", statusColor[product.status])}
                      >
                        {statusLabel[product.status]}
                      </span>
                    </div>
                    <div className="flex min-w-0 items-center gap-3">
                      {categoryIcon ? (
                        <Image
                          src={categoryIcon}
                          alt={category?.name || "Category"}
                          width={32}
                          height={32}
                          className="size-8 shrink-0"
                        />
                      ) : (
                        <div className="bg-bg-blue grid size-8 shrink-0 place-items-center rounded-xl">
                          <MdCategory className="text-primary-blue size-5" />
                        </div>
                      )}
                      <p className="truncate text-sm">
                        {category?.name || "Tanpa Kategori"}
                      </p>
                    </div>
                    <div className="flex min-w-0 items-center gap-3">
                      {firstImage ? (
                        <Image
                          src={firstImage}
                          alt={product.name}
                          className="aspect-square rounded-xl object-cover"
                          width={56}
                          height={56}
                        />
                      ) : (
                        <div className="flex size-[56px] items-center justify-center rounded-xl bg-gray-700">
                          <span className="text-xs text-gray-400">No Image</span>
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate">{product.name}</p>
                        <p className="truncate text-xs font-thin text-gray-400">
                          {product.slug}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm">
                        {product.seller?.name ?? "-"}
                      </p>
                      <p className="truncate text-xs font-thin text-gray-400">
                        {product.seller?.email ?? product.sellerId}
                      </p>
                    </div>
                    <div>{product.totalSold}</div>
                    <div>
                      <span className="text-primary-yellow">IDR</span>{" "}
                      {product.price.toLocaleString("id-ID")}
                    </div>
                    {showActionColumn && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => onReview?.(product)}
                          className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition cursor-pointer"
                        >
                          <MdVisibility className="size-4" />
                          <span>{reviewLabel}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-10 text-center text-gray-400">{emptyMessage}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductTable;
