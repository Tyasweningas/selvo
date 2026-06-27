import { product_categories } from "@/data/product-categories";
import { Product, ProductStatus } from "@/types/product";
import clsx from "clsx";
import Image from "next/image";
import { MdCategory, MdEdit } from "react-icons/md";

interface ProductListTableItemProps {
  product: Product;
}

const statusLabel: Record<ProductStatus, string> = {
  [ProductStatus.APPROVED]: "Tayang",
  [ProductStatus.SUBMISSION]: "Pending",
  [ProductStatus.REJECTED]: "Ditolak",
};

const statusTextColor: Record<ProductStatus, string> = {
  [ProductStatus.APPROVED]: "text-primary-green",
  [ProductStatus.SUBMISSION]: "text-primary-yellow",
  [ProductStatus.REJECTED]: "text-red-400",
};

const statusDotColor: Record<ProductStatus, string> = {
  [ProductStatus.APPROVED]: "bg-primary-green",
  [ProductStatus.SUBMISSION]: "bg-primary-yellow",
  [ProductStatus.REJECTED]: "bg-red-400",
};

const ProductListTableItem = ({ product }: ProductListTableItemProps) => {
  const firstImage = product.images?.[0]?.imageUrl;
  const category = product.category;
  const categoryIcon =
    category?.icon ||
    product_categories.find(
      (cat) => cat.productCategoryId === product.categoryId,
    )?.icon ||
    product_categories.find((cat) => cat.name === category?.name)?.icon;

  const revenue = product.price * product.totalSold;

  return (
    <>
      {/* Mobile view card (Visible on <md screens) */}
      <div className="md:hidden border-bg-div bg-bg-nav rounded-xl border-2 p-4 space-y-3 font-semibold text-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                "size-2.5 rounded-full",
                statusDotColor[product.status],
              )}
            />
            <span className={clsx("text-xs", statusTextColor[product.status])}>
              {statusLabel[product.status]}
            </span>
          </div>
          <button className="bg-bg-blue cursor-pointer rounded-full p-2 hover:brightness-90 transition">
            <MdEdit className="text-primary-blue size-4" />
          </button>
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
            <p className="truncate text-xs font-thin text-gray-400">{product.productLink}</p>
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

        <div className="border-t border-[#1A2B32] pt-3 flex items-center justify-between text-xs text-gray-400">
          <div>
            <p>
              Terjual: <span className="text-white font-medium">{product.totalSold}</span>
            </p>
            <p className="mt-0.5">
              Harga: <span className="text-primary-yellow font-medium">IDR {product.price.toLocaleString("id-ID")}</span>
            </p>
          </div>
          <div className="text-right">
            <p>Pendapatan</p>
            <p className="text-primary-green font-bold mt-0.5 text-sm">
              IDR {revenue.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop view table row (Visible on >=md screens) */}
      <div className="hidden md:grid min-w-[800px] hover:bg-bg-div grid-cols-[130px_170px_1fr_100px_150px_150px_50px] items-center px-5 py-6 text-left font-semibold text-gray-100 transition duration-100">
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "size-3 rounded-full",
              statusDotColor[product.status],
            )}
          />
          <span className={clsx("text-sm", statusTextColor[product.status])}>
            {statusLabel[product.status]}
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-3">
          {categoryIcon ? (
            <Image
              src={categoryIcon}
              alt={category?.name || "Category"}
              width={40}
              height={40}
              className="size-8 shrink-0"
            />
          ) : (
            <div className="bg-bg-blue grid size-10 shrink-0 place-items-center rounded-xl">
              <MdCategory className="text-primary-blue size-6" />
            </div>
          )}
          <p className="truncate">{category?.name || "Tanpa Kategori"}</p>
        </div>
        <div className="flex min-w-0 items-center gap-3">
          {firstImage ? (
            <Image
              src={firstImage}
              alt={product.name}
              className="aspect-square rounded-xl object-cover"
              width={72}
              height={72}
            />
          ) : (
            <div className="flex size-[72px] items-center justify-center rounded-xl bg-gray-700">
              <span className="text-xs text-gray-400">No Image</span>
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate">{product.name}</p>
            <p className="truncate text-sm font-thin text-gray-400">
              {product.productLink}
            </p>
          </div>
        </div>
        <div>{product.totalSold}</div>
        <div>
          <span className="text-primary-yellow">IDR</span>{" "}
          {product.price.toLocaleString("id-ID")}
        </div>
        <div>
          <span className="text-primary-yellow">IDR</span>{" "}
          {revenue.toLocaleString("id-ID")}
        </div>
        <div>
          <button className="bg-bg-blue block cursor-pointer rounded-full p-2.5 hover:brightness-90 transition">
            <MdEdit className="text-primary-blue size-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductListTableItem;
