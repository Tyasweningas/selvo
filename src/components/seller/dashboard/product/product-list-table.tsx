import { Product } from "@/types/product";
import ProductListTableItem from "./product-list-table-item";

interface ProductListTableProps {
  products: Product[];
}

const ProductListTable = ({ products }: ProductListTableProps) => {
  return (
    <>
      <div className="border-bg-div bg-bg-nav space-y-5 overflow-x-auto rounded-md border-2 p-5">
        <div className="border-bg-div grid min-w-[800px] grid-cols-[130px_170px_1fr_100px_150px_150px_50px] text-left font-semibold text-gray-100">
          <div className="c">Status</div>
          <div>Kategori Produk</div>
          <div className="min-w-0">Nama Produk</div>
          <div>Terjual</div>
          <div>Harga</div>
          <div>Pendapatan</div>
          <div></div>
        </div>
      </div>
      <div className="border-bg-div bg-bg-nav overflow-x-auto rounded-md border-2">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductListTableItem key={product.productId} product={product} />
          ))
        ) : (
          <div className="py-10 text-center text-gray-400">
            Belum ada produk
          </div>
        )}
      </div>
    </>
  );
};

export default ProductListTable;
