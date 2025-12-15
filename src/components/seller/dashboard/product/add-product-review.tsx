"use client";

import Image from "next/image";
import { Fragment } from "react";

const AddProductReview = () => {
  return (
    <Fragment>
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-7">
        {/* Left Side - Product Preview */}
        <div className="space-y-5 lg:col-span-2">
          {/* Main Product Card */}
          <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-4">
            <div className="bg-bg-div relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src="https://i.etsystatic.com/10683147/r/il/d4a024/4900691314/il_1080xN.4900691314_fu21.jpg"
                alt="test"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="space-y-5 lg:col-span-5">
          {/* Description */}
          <div className="border-bg-div bg-bg-nav space-y-5 rounded-xl border-2 p-5">
            <h2 className="text-2xl font-bold text-white">Deskripsi Produk</h2>
          </div>

          {/* Specifications */}
          <div className="border-bg-div bg-bg-nav space-y-5 rounded-xl border-2 p-5">
            <h2 className="text-2xl font-bold text-white">
              Spesifikasi Produk
            </h2>
          </div>

          {/* Keywords */}
          <div className="border-bg-div bg-bg-nav space-y-5 rounded-xl border-2 p-5">
            <h2 className="text-2xl font-bold text-white">
              Kata Kunci Pencarian Produk
            </h2>
            <div className="border-bg-light bg-bg-div flex flex-wrap gap-2 rounded-xl border-2 p-4">
              <span className="bg-bg-light text-sec-netral rounded-full px-4 py-2 text-sm">
                Bagas
              </span>
            </div>
          </div>

          {/* Product Link */}
          <div className="border-bg-div bg-bg-nav space-y-5 rounded-xl border-2 p-5"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddProductReview;
