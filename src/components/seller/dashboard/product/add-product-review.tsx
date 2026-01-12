"use client";

import { categoryService } from "@/services/category.service";
import { CreateProductPayload } from "@/types/product";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

const AddProductReview = () => {
  const { watch } = useFormContext<CreateProductPayload>();
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        const categoryName = data.find(
          (cat) => cat.productCategoryId === formData.categoryId,
        )?.name;
        setCategoryName(categoryName || "Kategori tidak ditemukan");
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const formData = watch();
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    // dragFree: true,
  });

  const imagePreviews = useMemo(() => {
    if (formData.images && formData.images.length > 0) {
      return formData.images
        .filter((img): img is File => img !== null)
        .map((img) => URL.createObjectURL(img));
    }
    return [];
  }, [formData.images]);

  return (
    <Fragment>
      <div className="mt-5 space-y-5">
        {/* Publikasi - Photo Gallery */}
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {imagePreviews.length > 0 ? (
              imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="aspect-12/10 flex-none shrink-0 grow-0 basis-96 overflow-hidden rounded-lg pr-4"
                >
                  <Image
                    src={preview}
                    alt={`Product image ${index + 1}`}
                    width={20}
                    height={20}
                    className="size-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="bg-bg-div flex aspect-16/10 w-80 shrink-0 items-center justify-center rounded-lg">
                <p className="text-sec-netral text-sm">Belum ada foto produk</p>
              </div>
            )}
          </div>
        </div>
        {/* Description */}
        <div className="border-bg-div bg-bg-nav space-y-5 rounded-xl border-2 p-5">
          <p className="bg-bg-light w-fit rounded-xl p-3 font-semibold text-gray-100">
            {categoryName}
          </p>
          <p className="text-4xl font-semibold text-gray-100">
            {formData.name}
          </p>
          <p className="text-3xl font-semibold text-gray-100">
            <span className="text-primary-yellow mr-3">IDR</span>
            {formData.price.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="border-bg-div bg-bg-nav space-y-5 rounded-xl border-2 p-5">
          <div>
            <h2 className="text-sec-netral mb-2 text-lg font-semibold">
              Deskripsi Produk
            </h2>
            <p className="text-sec-netral border-bg-div rounded-xl border-2 p-3 text-sm whitespace-pre-wrap">
              {formData.description || "Belum ada deskripsi"}
            </p>
          </div>

          <div>
            <h2 className="text-sec-netral mb-2 text-lg font-semibold">
              Deskripsi Produk
            </h2>
            {formData.details && formData.details.length > 0 ? (
              <div className="space-y-3">
                {formData.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-bg-light text-tertier-netral flex h-10 w-48 shrink-0 items-center rounded-full border-2 border-transparent px-5 text-center text-sm font-bold">
                      <p className="mx-auto">{detail.key || "Label kosong"}</p>
                    </div>
                    <div className="border-bg-light bg-bg-div text-tertier-netral flex h-10 flex-1 items-center rounded-full border-2 px-5 text-sm">
                      {detail.value || "Nilai kosong"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sec-netral text-sm">
                Belum ada spesifikasi produk
              </p>
            )}
          </div>
        </div>

        {/* Keywords */}
        <div className="border-bg-div bg-bg-nav space-y-5 rounded-xl border-2 p-5">
          <h2 className="text-2xl font-bold text-white">
            Kata Kunci Pencarian Produk
          </h2>
          <div className="border-bg-light bg-bg-div flex flex-wrap gap-2 rounded-xl border-2 p-4">
            {formData.keywords && formData.keywords.length > 0 ? (
              formData.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-bg-light text-sec-netral rounded-full px-4 py-2 text-sm"
                >
                  {keyword}
                </span>
              ))
            ) : (
              <span className="text-sec-netral text-sm">
                Belum ada kata kunci
              </span>
            )}
          </div>
        </div>

        {/* Product Link */}
        <div className="border-bg-div bg-bg-nav space-y-5 rounded-xl border-2 p-5">
          <h2 className="text-2xl font-bold text-white">Tauran Produk</h2>
          <a
            href={formData.productLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-blue text-sm break-all hover:underline"
          ></a>
          <div className="border-bg-light bg-bg-div text-tertier-netral flex h-10 flex-1 items-center rounded-full border-2 px-5 text-sm">
            {formData.productLink || "Belum ada link produk"}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddProductReview;
