"use client";

import Input from "@/components/global/input";
import { categoryService } from "@/services/category.service";
import { ProductCategory } from "@/types/product";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { MdCategory, MdEdit } from "react-icons/md";

const AddProductGeneral = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
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
          name="name"
          className="mb-3 w-full"
        />
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
        {loading ? (
          <p className="text-white">Loading categories...</p>
        ) : (
          <div className="grid grid-cols-5 gap-5">
            {categories.map((category) => (
              <div
                key={category.productCategoryId}
                className="hover:bg-bg-div flex cursor-pointer items-center gap-3 rounded-lg p-3"
              >
                <div className="bg-bg-blue rounded-xl p-2">
                  <MdCategory className="text-primary-blue size-8" />
                </div>
                <div>
                  <p className="font-bold text-white">{category.name}</p>
                  <p className="text-sm text-white">
                    {category.description || "No description"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AddProductGeneral;
