"use client";

import Input from "@/components/global/input";
import { product_categories } from "@/data/product-categories";
import { CreateProductFormValues } from "@/lib/validation/product.schema";
import { categoryService } from "@/services/category.service";
import { ProductCategory } from "@/types/product";
import clsx from "clsx";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MdCategory, MdEdit } from "react-icons/md";

const AddProductGeneral = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<CreateProductFormValues>();

  const selectedCategoryId = watch("categoryId");

  useEffect(() => {
    register("categoryId");
  }, [register]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        const mapped = data.map((cat) => {
          const icon = product_categories.find(
            (pc) => pc.name === cat.name,
          )?.icon;

          return {
            ...cat,
            icon: icon || undefined,
          };
        });

        setCategories(mapped);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Fragment>
      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-2">
            <MdEdit className="text-primary-blue size-5 sm:size-8" />
          </div>
          <p className="text-xl font-bold text-white sm:text-3xl">
            Nama Produk
          </p>
        </div>
        <p className="text-sec-netral text-sm">
          Masukkan judul produk yang jelas dan mudah dikenali
        </p>
        <Input
          type="text"
          placeholder="Masukkan Nama Produk..."
          className="mb-3 w-full text-sm sm:text-base"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-2">
            <MdCategory className="text-primary-blue size-5 sm:size-8" />
          </div>
          <p className="text-xl font-bold text-white sm:text-3xl">
            Kategori Produk
          </p>
        </div>
        <p className="text-sec-netral text-sm">
          Pilih kategori yang sesuai agar produkmu mudah ditemukan.
        </p>
        {errors.categoryId && (
          <p className="text-sm text-red-500">{errors.categoryId.message}</p>
        )}
        {loading ? (
          <div className="grid grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="my-3 flex h-16 w-full items-center gap-3"
              >
                <div className="bg-bg-div size-16 animate-pulse rounded-xl"></div>
                <div className="space-y-2">
                  <div className="bg-bg-div h-4 w-20 animate-pulse rounded-full"></div>
                  <div className="bg-bg-div h-4 w-32 animate-pulse rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {categories.map((category) => (
              <button
                type="button"
                key={category.productCategoryId}
                className={clsx(
                  "hover:bg-bg-div flex cursor-pointer items-center gap-3 rounded-lg p-3 text-left transition duration-100 active:scale-95",
                  selectedCategoryId === category.productCategoryId &&
                    "bg-bg-div",
                )}
                onClick={() => {
                  setValue("categoryId", category.productCategoryId, {
                    shouldDirty: true,
                  });
                  void trigger("categoryId");
                }}
              >
                {category.icon ? (
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={48}
                    height={48}
                    className="size-8 sm:size-12"
                  />
                ) : (
                  <div className="bg-bg-blue rounded-xl p-2">
                    <MdCategory className="text-primary-blue size-8" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-white sm:text-base">
                    {category.name}
                  </p>
                  <p className="text-xs text-white sm:text-sm">
                    {category.description || "No description"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AddProductGeneral;
