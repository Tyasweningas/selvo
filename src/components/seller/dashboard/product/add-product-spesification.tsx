"use client";

import Input from "@/components/global/input";
import {
  CreateProductFormValues,
  REQUIRED_PRODUCT_IMAGE_COUNT,
} from "@/lib/validation/product.schema";
import { Fragment, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { MdCamera, MdModeEdit } from "react-icons/md";
import ProductDetailSection from "./product-detail-section";
import ProductPhotoUpload from "./product-photo-upload";

const photoSlots: { label: string }[] = [
  { label: "Foto Utama" },
  { label: "Foto Kedua" },
  { label: "Foto Ketiga" },
  { label: "Foto Keempat" },
];

const AddProductSpesification = () => {
  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<CreateProductFormValues>();

  const images = watch("images") ?? [];

  useEffect(() => {
    register("images");
  }, [register]);

  const handlePhotoChange = (index: number, file: File | null) => {
    const next: (File | null)[] = Array.from(
      { length: REQUIRED_PRODUCT_IMAGE_COUNT },
      (_, i) => images[i] ?? null,
    );
    next[index] = file;
    setValue("images", next, {
      shouldDirty: true,
    });
    void trigger("images");
  };

  const filledCount = images.filter(
    (item): item is File => item instanceof File,
  ).length;

  const imagesError = errors.images?.message;

  return (
    <Fragment>
      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-3">
            <MdCamera className="text-primary-blue size-7" />
          </div>
          <p className="text-3xl font-bold text-white">Foto Produk</p>
        </div>
        <p className="text-sec-netral text-sm">
          Unggah {REQUIRED_PRODUCT_IMAGE_COUNT} gambar pratinjau produk
          digitalmu. ({filledCount}/{REQUIRED_PRODUCT_IMAGE_COUNT} terisi)
        </p>
        {imagesError && <p className="text-sm text-red-500">{imagesError}</p>}
        <div className="no-scrollbar flex gap-5 overflow-x-auto">
          {photoSlots.map((slot, index) => (
            <div key={slot.label} className="aspect-16/10 w-80 shrink-0">
              <ProductPhotoUpload
                label={slot.label}
                value={images[index] ?? null}
                onChange={(file) => handlePhotoChange(index, file)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-3">
            <MdModeEdit className="text-primary-blue size-7" />
          </div>
          <p className="text-3xl font-bold text-white">Tautan Produk</p>
        </div>
        <p className="text-sec-netral text-sm">
          Masukkan link produk yang akan diterima pembeli
        </p>
        <Input
          placeholder="Masukkan link produk"
          className="w-full"
          {...register("productLink")}
        />
        {errors.productLink && (
          <p className="text-sm text-red-500">{errors.productLink.message}</p>
        )}
      </div>

      <ProductDetailSection />
    </Fragment>
  );
};

export default AddProductSpesification;
