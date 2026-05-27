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
    <div className="border-bg-div hover:bg-bg-div grid min-w-[800px] grid-cols-[130px_170px_1fr_100px_150px_150px_50px] items-center px-5 py-6 text-left font-semibold text-gray-100 transition duration-100">
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
        <button className="bg-bg-blue block cursor-pointer rounded-full p-2.5 hover:brightness-90">
          <MdEdit className="text-primary-blue size-6" />
        </button>
      </div>
    </div>
  );
};

export default ProductListTableItem;
