"use client";

import { product_categories } from "@/data/product-categories";
import Image from "next/image";

type CategoryProps = {
  name?: string;
};

export function Category({ name }: CategoryProps) {
  if (!name) {
    return (
      <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
        <span className="italic">Kategori belum diatur</span>
      </div>
    );
  }

  const category = product_categories.find(
    (cat) => cat.name.toLowerCase() === name.toLowerCase(),
  );

  if (!category) {
    return (
      <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
        <span className="italic">Kategori tidak ditemukan</span>
      </div>
    );
  }

  return (
    <div className="mt-2 flex w-fit items-center gap-2 rounded-xl bg-pink-200 px-2 py-1 text-gray-800 shadow-lg transition hover:bg-pink-400">
      <div className="relative h-6 w-6">
        <Image
          src={category.icon!}
          alt={category.name}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <span className="text-sm">{category.name}</span>
    </div>
  );
}
