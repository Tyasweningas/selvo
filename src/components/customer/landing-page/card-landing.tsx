import { Product } from "@/types/product";
import { ProductCardType } from "@/types/product-card";
import Image from "next/image";
import Link from "next/link";
import { IoStar } from "react-icons/io5";

const categoryNames: Record<number, string> = {
  1: "UI-UX",
  2: "File Figma",
  3: "Illustrasi",
  4: "AI",
  5: "Fotografi",
  6: "Tipografi",
};

interface Props {
  item: ProductCardType | Product;
}

// Type guard to check if item is Product from API
function isProductAPI(item: ProductCardType | Product): item is Product {
  return "productId" in item;
}

export default function CardLanding({ item }: Props) {
  // Extract data depending on type
  const name = item.name;
  const price = item.price;
  const thumbnail = isProductAPI(item)
    ? item.images?.[0]?.imageUrl || "/placeholder-product.png"
    : item.thumbnail;
  const categoryId = isProductAPI(item)
    ? parseInt(item.categoryId || "1")
    : item.categoryId;
  const creator = isProductAPI(item)
    ? item.seller?.name || "Seller"
    : (item as ProductCardType).creator;
  const rate = isProductAPI(item) ? 4.5 : (item as ProductCardType).rate;
  const slug = isProductAPI(item) ? item.slug : `product-${item.id}`;

  // Mock formats since they're not in ProductCardType yet
  const formats = [".Png", ".Jpg", ".Raw"];

  return (
    <Link href={`/products/${slug}`}>
      <div className="group w-full cursor-pointer overflow-hidden rounded-2xl bg-[#1A252B] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        {/* Product Image Container */}
        <div className="relative aspect-4/3 overflow-hidden bg-gray-800">
          <Image
            src={thumbnail}
            alt={name}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={isProductAPI(item)}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-3 p-4">
          {/* Category and Format Badges - Above product name */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md border border-gray-700 bg-[#0F1922] px-3 py-1.5 text-xs font-medium text-gray-300">
              {categoryNames[categoryId] || "Kategori"}
            </span>
            {formats.map((format, index) => (
              <span
                key={index}
                className="rounded-md border border-gray-700 bg-[#0F1922] px-2 py-1.5 text-xs font-medium text-gray-300"
              >
                {format}
              </span>
            ))}
          </div>

          {/* Product Name */}
          <h3 className="line-clamp-2 text-base leading-tight font-semibold text-white">
            {name}
          </h3>

          {/* Price and Rating Row */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-[#FFD700]">
              IDR {price.toLocaleString("id-ID")}
            </p>
            <div className="flex items-center gap-1.5">
              <IoStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-white">
                {rate.toFixed(1)}
              </span>
              <span className="text-sm text-gray-400">
                ({Math.floor(rate * 24)})
              </span>
            </div>
          </div>

          {/* Creator */}
          <p className="text-sm text-gray-400">{creator}</p>
        </div>
      </div>
    </Link>
  );
}
