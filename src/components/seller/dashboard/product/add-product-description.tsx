"use client";

import ChipsInput from "@/components/global/chips-input";
import Input from "@/components/global/input";
import TextArea from "@/components/global/textarea";
import { CreateProductPayload } from "@/types/product";
import { Fragment, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { IoSearch } from "react-icons/io5";
import { MdDescription, MdPayments } from "react-icons/md";

const AddProductDescription = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateProductPayload>();

  const keywords = watch("keywords") || [];

  useEffect(() => {
    register("keywords");
  }, [register]);

  return (
    <Fragment>
      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-3">
            <MdDescription className="text-primary-blue size-7" />
          </div>
          <p className="text-3xl font-bold text-white">Deskripsi Produk</p>
        </div>
        <p className="text-sec-netral text-sm">
          Jelaskan Fitur, Manfaat, atau Detail penting produk digitalmu.
        </p>
        <TextArea
          className="h-48 w-full"
          placeholder="Tuliskan deksripsi produk"
          {...register("description", {
            required: "Deskripsi produk wajib diisi",
            minLength: {
              value: 20,
              message: "Deskripsi minimal 20 karakter",
            },
          })}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-3">
            <IoSearch className="text-primary-blue size-7" />
          </div>
          <p className="text-3xl font-bold text-white">
            Kata Kunci Pencarian Produk
          </p>
        </div>
        <p className="text-sec-netral text-sm">
          Tambahkan kata kunci agar produkmu lebih mudah dicari.
        </p>
        <ChipsInput
          value={keywords}
          onChange={(value) => setValue("keywords", value)}
          placeholder="Ketik kata kunci dan tekan spasi..."
          className="min-h-48 w-full overflow-y-auto"
        />
      </div>

      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-3">
            <MdPayments className="text-primary-blue size-7" />
          </div>
          <p className="text-3xl font-bold text-white">Harga Produk</p>
        </div>
        <p className="text-sec-netral text-sm">
          Tentukan harga jual untuk satu produk digital.
        </p>
        <Input
          prefix={
            <span className="text-sec-netral border-r-sec-netral/50 border-r py-1.5 pr-3 text-sm font-semibold whitespace-nowrap">
              Rupiah - IDR
            </span>
          }
          type="number"
          placeholder="Tulis estimasi pesenanmu..."
          className="w-full"
          {...register("price", {
            required: "Harga produk wajib diisi",
            min: {
              value: 1000,
              message: "Harga minimal Rp 1.000",
            },
            valueAsNumber: true,
          })}
        />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
      </div>
    </Fragment>
  );
};

export default AddProductDescription;
