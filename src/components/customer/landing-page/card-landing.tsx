import Image from "next/image";
import { ProductCardType } from "@/types/product-card";
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
  item: ProductCardType;
}

export default function CardLanding({ item }: Props) {
  // Mock formats since they're not in ProductCardType yet
  const formats = [".Png", ".Jpg", ".Raw"];

  return (
    <div className="bg-[#1A252B] rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer w-full group shadow-lg hover:shadow-xl">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.name}
          width={400}
          height={300}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        {/* Category and Format Badges - Above product name */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 bg-[#0F1922] text-gray-300 text-xs font-medium rounded-md border border-gray-700">
            {categoryNames[item.categoryId] || "Kategori"}
          </span>
          {formats.map((format, index) => (
            <span 
              key={index}
              className="px-2 py-1.5 bg-[#0F1922] text-gray-300 text-xs font-medium rounded-md border border-gray-700"
            >
              {format}
            </span>
          ))}
        </div>

        {/* Product Name */}
        <h3 className="text-white font-semibold text-base leading-tight line-clamp-2">
          {item.name}
        </h3>

        {/* Price and Rating Row */}
        <div className="flex items-center justify-between">
          <p className="text-[#FFD700] font-bold text-lg">
            IDR {item.price.toLocaleString("id-ID")}
          </p>
          <div className="flex items-center gap-1.5">
            <IoStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-semibold">
              {item.rate.toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm">
              ({Math.floor(item.rate * 24)})
            </span>
          </div>
        </div>

        {/* Creator */}
        <p className="text-sm text-gray-400">
          {item.creator}
        </p>
      </div>
    </div>
  );
}

