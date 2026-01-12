"use client";

import Input from "@/components/global/input";
import { product_categories } from "@/data/product-categories";
import { categoryService } from "@/services/category.service";
import { CreateProductPayload, ProductCategory } from "@/types/product";
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
    formState: { errors },
  } = useFormContext<CreateProductPayload>();

  const selectedCategoryId = watch("categoryId");

  // Register categoryId for validation
  useEffect(() => {
    register("categoryId", {
      required: "kwontol",
    });
    register("categoryId", {
      required: "Kategori produk wajib dipilih",
    });
  }, [register]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        const categories = data.map((cat) => {
          const icon = product_categories.find(
            (pc) => pc.name === cat.name,
          )?.icon;

          return {
            ...cat,
            icon: icon || undefined,
          };
        });

        console.log("New Category", categories);

        setCategories(categories);
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
            <MdEdit className="text-primary-blue size-8" />
          </div>
          <p className="text-3xl font-bold text-white">Nama Produk</p>
        </div>
        <p className="text-sec-netral text-sm">
          Masukkan judul produk yang jelas dan mudah dikenali
        </p>
        <Input
          type="text"
          placeholder="Masukkan Nama Produk..."
          className="mb-3 w-full"
          {...register("name", {
            required: "Nama produk wajib diisi",
            minLength: {
              value: 3,
              message: "Nama produk minimal 3 karakter",
            },
          })}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-2">
            <MdCategory className="text-primary-blue size-8" />
          </div>
          <p className="text-3xl font-bold text-white">Kategori Produk</p>
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
              // <div
              //   key={index}
              //   className="bg-bg-div h-22 w-full animate-pulse rounded-lg"
              // ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-5">
            {categories.map((category) => (
              <button
                key={category.productCategoryId}
                className={clsx(
                  "hover:bg-bg-div flex cursor-pointer items-center gap-3 rounded-lg p-3 text-left transition duration-100 active:scale-95",
                  selectedCategoryId === category.productCategoryId &&
                    "bg-bg-div",
                )}
                onClick={() =>
                  setValue("categoryId", category.productCategoryId)
                }
              >
                {category.icon ? (
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="bg-bg-blue rounded-xl p-2">
                    <MdCategory className="text-primary-blue size-8" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-white">{category.name}</p>
                  <p className="text-sm text-white">
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
