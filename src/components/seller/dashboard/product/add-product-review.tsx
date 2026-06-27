"use client";

import { CreateProductFormValues } from "@/lib/validation/product.schema";
import { categoryService } from "@/services/category.service";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

const AddProductReview = () => {
  const { watch } = useFormContext<CreateProductFormValues>();
  const formData = watch();
  const [categoryName, setCategoryName] = useState<string>("");
  const [emblaRef] = useEmblaCarousel({
    loop: true,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        const matched = data.find(
          (cat) => cat.productCategoryId === formData.categoryId,
        )?.name;
        setCategoryName(matched || "Kategori tidak ditemukan");
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [formData.categoryId]);

  const imagePreviews = useMemo(() => {
    const files = (formData.images ?? []).filter(
      (img): img is File => img instanceof File,
    );
    return files.map((img) => URL.createObjectURL(img));
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
                  className="aspect-12/10 flex-none shrink-0 grow-0 basis-56 overflow-hidden rounded-lg pr-4 sm:basis-96"
                >
                  <Image
                    src={preview}
                    alt={`Product image ${index + 1}`}
                    width={20}
                    height={20}
                    className="size-full rounded-lg object-cover"
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
          <p className="bg-bg-light w-fit rounded-xl p-3 text-sm font-semibold text-gray-100 sm:text-base">
            {categoryName}
          </p>
          <p className="text-xl font-semibold text-gray-100 sm:text-2xl lg:text-4xl">
            {formData.name}
          </p>
          <p className="text-2xl font-semibold text-gray-100 sm:text-3xl">
            <span className="text-primary-yellow mr-3">IDR</span>
            {(formData.price ?? 0).toLocaleString("id-ID")}
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
              Detail Produk
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
          <h2 className="text-xl font-bold text-white sm:text-2xl">
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
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Tautan Produk
          </h2>
          <div className="border-bg-light bg-bg-div text-tertier-netral flex h-10 flex-1 items-center rounded-full border-2 px-5 text-sm">
            {formData.productLink || "Belum ada link produk"}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddProductReview;
