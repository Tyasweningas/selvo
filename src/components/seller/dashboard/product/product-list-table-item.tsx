import { product_categories } from "@/data/product-categories";
import { Product, ProductStatus } from "@/types/product";
import Image from "next/image";
import { MdEdit } from "react-icons/md";

interface ProductListTableItemProps {
  product: Product;
}

const ProductListTableItem = ({ product }: ProductListTableItemProps) => {
  const firstImage = product.images?.[0]?.imageUrl;
  const category = product.category;
  const categoryIcon = product_categories.find(
    (cat) => cat.productCategoryId === product.categoryId,
  )?.icon;

  const revenue = product.price * product.totalSold;
  const isActive = product.status === ProductStatus.APPROVED;

  return (
    <div className="border-bg-div hover:bg-bg-div grid min-w-[800px] grid-cols-[130px_170px_1fr_100px_150px_150px_50px] items-center px-5 py-6 text-left font-semibold text-gray-100 transition duration-100">
      <div className="flex items-center">
        <div
          className={`size-3 rounded-full ${
            isActive ? "bg-primary-green" : "bg-gray-500"
          }`}
        ></div>
        <select
          name="status"
          defaultValue={product.status}
          className={`w-24 pl-2 ${
            isActive ? "text-primary-green" : "text-gray-500"
          }`}
        >
          <option value={ProductStatus.APPROVED}>Tayang</option>
          <option value={ProductStatus.SUBMISSION}>Pending</option>
          <option value={ProductStatus.REJECTED}>Ditolak</option>
        </select>
      </div>
      <div className="flex min-w-0 items-center gap-3">
        {categoryIcon && (
          <Image
            src={categoryIcon}
            alt={category?.name || "Category"}
            width={40}
            height={40}
            className="size-10"
          />
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
      <div className="">
        <button className="bg-bg-blue block cursor-pointer rounded-full p-2.5 hover:brightness-90">
          <MdEdit className="text-primary-blue size-6" />
        </button>
      </div>
    </div>
  );
};

export default ProductListTableItem;
