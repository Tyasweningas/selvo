import Button from "@/components/global/button";
import Input from "@/components/global/input";
import ProductListTable from "@/components/seller/dashboard/product/product-list-table";
import productService from "@/services/product.service";
import { Product } from "@/types/product";
import Link from "next/link";
import { Fragment } from "react";
import { MdEdit, MdSearch } from "react-icons/md";

const ProductPage = async () => {
  let products: Product[] = [];

  try {
    const response = await productService.getMyProducts();
    products = response.data || [];
    console.log("Products fetched:", products.length);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Continue rendering with empty products array
  }

  return (
    <Fragment>
      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-t-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-2">
            <MdEdit className="text-primary-blue size-8" />
          </div>
          <p className="text-3xl font-bold text-gray-100">Semua Produk</p>
        </div>
      </div>
      <div className="border-bg-div bg-bg-nav flex items-center justify-between rounded-md border-2 px-5 py-8">
        <Input className="self-center" suffix={<MdSearch />} />
        <Link href="/dashboard-product/add">
          <Button className="px-12">Tambah Produk Baru</Button>
        </Link>
      </div>
      <ProductListTable products={products} />
    </Fragment>
  );
};

export default ProductPage;
