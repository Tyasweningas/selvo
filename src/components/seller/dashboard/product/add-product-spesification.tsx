"use client";

import Input from "@/components/global/input";
import { CreateProductPayload } from "@/types/product";
import { Fragment, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { MdCamera, MdModeEdit } from "react-icons/md";
import ProductDetailSection from "./product-detail-section";
import ProductPhotoUpload from "./product-photo-upload";

const AddProductSpesification = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateProductPayload>();

  const images = watch("images") || [];

  useEffect(() => {
    register("images", {
      validate: (value) =>
        (value && value.length > 0 && value[0] !== null) ||
        "Minimal 1 foto produk wajib diupload",
    });
  }, [register]);

  const photoSlots = [
    { label: "Foto Utama" },
    { label: "Foto Kedua" },
    { label: "Foto Ketiga" },
    { label: "Foto Keempat" },
  ];

  const handlePhotoChange = (index: number, file: File | null) => {
    const currentImages =
      images.length > 0 ? [...images] : [null, null, null, null];
    currentImages[index] = file;
    setValue("images", currentImages as File[]);
  };

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
          Unggah gambar pratinjau atau tampilan produk digitalmu.
        </p>
        {errors.images && (
          <p className="text-sm text-red-500">{errors.images.message}</p>
        )}
        <div className="no-scrollbar flex gap-5 overflow-x-auto">
          {photoSlots.map((slot, index) => (
            <div key={index} className="aspect-16/10 w-80 shrink-0">
              <ProductPhotoUpload
                label={slot.label}
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
          {...register("productLink", {
            pattern: {
              value: /^https?:\/\/.+/,
              message: "Link harus dimulai dengan http:// atau https://",
            },
          })}
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
