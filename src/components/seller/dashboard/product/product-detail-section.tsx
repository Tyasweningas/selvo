"use client";

import { CreateProductPayload } from "@/types/product";
import { useFormContext } from "react-hook-form";
import { MdListAlt } from "react-icons/md";
import ProductDetailItem from "./product-detail-item";

interface ProductDetail {
  id: string;
  key: string;
  value: string;
}

const ProductDetailSection = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateProductPayload>();

  const details = watch("details") || [];

  const handleAddDetail = () => {
    const newDetail: ProductDetail = {
      id: Date.now().toString(),
      key: "",
      value: "",
    };
    setValue("details", [...details, newDetail]);
  };

  const handleRemoveDetail = (id: string) => {
    if (details.length > 1) {
      setValue(
        "details",
        details.filter((detail) => detail.id !== id),
      );
    }
  };

  const handleDetailChange = (
    id: string,
    data: { key: string; value: string },
  ) => {
    setValue(
      "details",
      details.map((detail) =>
        detail.id === id ? { ...detail, ...data } : detail,
      ),
    );
  };

  return (
    <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-3">
            <MdListAlt className="text-primary-blue size-7" />
          </div>
          <p className="text-3xl font-bold text-white">Detail Produk</p>
        </div>
        <button
          type="button"
          onClick={handleAddDetail}
          className="border-primary-blue text-primary-blue hover:bg-primary-blue rounded-full border-2 px-6 py-2 text-sm font-medium transition-colors hover:text-white"
        >
          Tambah label baru
        </button>
      </div>
      <p className="text-sec-netral text-sm">
        Masukkan judul produk yang jelas dan mudah dikenali.
      </p>
      <div className="space-y-3">
        {details.map((detail) => (
          <ProductDetailItem
            key={detail.id}
            detailKey={detail.key}
            detailValue={detail.value}
            onRemove={() => handleRemoveDetail(detail.id)}
            onChange={(data) => handleDetailChange(detail.id, data)}
            showRemove={details.length > 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailSection;
