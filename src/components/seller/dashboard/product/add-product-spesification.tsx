"use client";

import Input from "@/components/global/input";
import { Fragment, useState } from "react";
import { MdCamera, MdModeEdit } from "react-icons/md";
import ProductDetailSection from "./product-detail-section";
import ProductPhotoUpload from "./product-photo-upload";

const AddProductSpesification = () => {
  const [photos, setPhotos] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const photoSlots = [
    { label: "Foto Utama" },
    { label: "Foto Kedua" },
    { label: "Foto Ketiga" },
    { label: "Foto Keempat" },
  ];

  const handlePhotoChange = (index: number, file: File | null) => {
    setPhotos((prev) => {
      const newPhotos = [...prev];
      newPhotos[index] = file;
      return newPhotos;
    });
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:max-w-3xl lg:grid-cols-4">
          {photoSlots.map((slot, index) => (
            <ProductPhotoUpload
              key={index}
              label={slot.label}
              onChange={(file) => handlePhotoChange(index, file)}
            />
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
        <Input placeholder="Masukkan link produk" className="w-full" />
      </div>

      <ProductDetailSection />
    </Fragment>
  );
};

export default AddProductSpesification;
