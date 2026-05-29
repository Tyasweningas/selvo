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
      <div className="border-bg-div bg-bg-nav space-y-5 overflow-x-auto rounded-t-md border-2 p-5">
        <div
          className={clsx(
            "border-bg-div grid min-w-[800px] text-left font-semibold text-gray-100",
            gridCols,
          )}
        >
          <div>Status</div>
          <div>Kategori</div>
          <div className="min-w-0">Nama Produk</div>
          <div>Penjual</div>
          <div>Terjual</div>
          <div>Harga</div>
          {showActionColumn && <div className="text-right">Aksi</div>}
        </div>
      </div>
      <div className="border-bg-div bg-bg-nav overflow-x-auto rounded-b-md border-2 border-t-0">
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
                  "border-bg-div hover:bg-bg-div grid min-w-[800px] items-center px-5 py-5 text-left font-semibold text-gray-100 transition duration-100",
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
                      className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition"
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
    </>
  );
};

export default AdminProductTable;
