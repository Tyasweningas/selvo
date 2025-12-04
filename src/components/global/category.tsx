'use client';

import React from 'react';
import Image from 'next/image';
import { product_categories } from '@/data/product-categories';

type CategoryProps = {
  name?: string;
};

export function Category({ name }: CategoryProps) {
  
  if (!name) {
    return (
      <div className="flex items-center gap-2 mt-1 text-gray-400 text-xs">
        <span className="italic">Kategori belum diatur</span>
      </div>
    );
  }

  
  const category = product_categories.find(
    (cat) => cat.categorieName.toLowerCase() === name.toLowerCase()
  );

  
  if (!category) {
    return (
      <div className="flex items-center gap-2 mt-1 text-gray-400 text-xs">
        <span className="italic">Kategori tidak ditemukan</span>
      </div>
    );
  }

  
  return (
    <div className="flex items-center gap-2  mt-2 bg-pink-200 text-gray-800 rounded-xl px-2 py-1 w-fit shadow-lg hover:bg-pink-400 transition">
      <div className="relative w-6 h-6">
        <Image
          src={category.icon}
          alt={category.categorieName}
          fill
          className="object-contain"
        />
      </div>
      <span className="text-sm">{category.categorieName}</span>
    </div>
  );
}
