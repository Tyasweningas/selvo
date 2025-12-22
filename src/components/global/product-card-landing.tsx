"use client";

import Image from "next/image";
import { ProductCardType } from "@/types/product-card";

const categoryColor: Record<number, string> = {
  1: "bg-[#5DA9FF]",
  2: "bg-[#76D672]",
  3: "bg-[#CE82FF]",
  4: "bg-[#FFA657]",
  5: "bg-[#FF6B9A]",
};

interface Props {
  item?: ProductCardType;
}

export default function ProductCardLanding({ item }: Props) {
  // Prevent SSR crash
  if (!item) {
    console.warn("ProductCardLanding menerima item undefined");
    return null;
  }

  return (
    <div className="flex text-white font-gilroy">
      <div className="bg-bg-light w-[255px] h-[485px] rounded-2xl mb-3 pr-2 shadow-md hover:scale-[1.02] transition-all duration-200">
        <div className="relative bg-bg-nav w-[250px] h-95 rounded-2xl overflow-hidden">
          {/* Kategori badge */}
          <div
            className={`absolute top-2 left-2 px-3 py-1 text-sm rounded-full text-black font-semibold ${categoryColor[item.categoryId] || "bg-gray-300"
              }`}
          >
            Kategori {item.categoryId}
          </div>

          {/* Konten utama */}
          <div className="flex flex-col items-center pt-6 pb-2 px-4">
            {/* Gambar: tetap di tengah */}
            <Image
              src={item.thumbnail}
              alt={item.name}
              width={230}
              height={230}
              className="object-cover rounded-xl"
            />

            {/* Teks: rata kiri, tapi tetap dalam container berpusat */}
            <div className="w-full mt-3 text-left">
              <p className="font-semibold leading-tight">{item.name}</p>
              <p className="text-sm text-gray-300 mt-1">{item.creator}</p>

              <div className="flex items-center mt-2">
                <span>⭐</span>
                <span className="ml-1">{item.rate}</span>
              </div>

              <p className="font-bold text-lg mt-3">
                IDR {item.price.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-bg-nav w-full rounded-2xl mt-1 p-2">
          <div className="flex justify-between items-center mt-3">
            <button className="bg-primary-blue w-full py-2 rounded-xl font-semibold">
              Beli
            </button>

            <button className="bg-bg-light ml-2 p-2 rounded-xl border border-primary-blue">
              🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}