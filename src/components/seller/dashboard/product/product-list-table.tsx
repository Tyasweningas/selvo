import { Product } from "@/types/product";
import ProductListTableItem from "./product-list-table-item";

interface ProductListTableProps {
  products: Product[];
}

const ProductListTable = ({ products }: ProductListTableProps) => {
  return (
    <>
      {/* Mobile Card List View (Visible on <md screens) */}
      <div className="md:hidden space-y-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductListTableItem key={product.productId} product={product} />
          ))
        ) : (
          <div className="border-bg-div bg-bg-nav rounded-xl border-2 py-10 text-center text-gray-400">
            Belum ada produk
          </div>
        )}
      </div>

      {/* Desktop Table View (Visible on >=md screens) */}
      <div className="hidden md:block overflow-x-auto border-bg-div border-2 rounded-xl bg-bg-nav">
        <div className="min-w-[800px]">
          {/* Table Header */}
          <div className="border-bg-div p-5 border-b-2">
            <div className="grid grid-cols-[130px_170px_1fr_100px_150px_150px_50px] text-left font-semibold text-gray-100">
              <div>Status</div>
              <div>Kategori Produk</div>
              <div className="min-w-0">Nama Produk</div>
              <div>Terjual</div>
              <div>Harga</div>
              <div>Pendapatan</div>
              <div></div>
            </div>
          </div>
          {/* Table Body */}
          <div className="divide-y divide-bg-div">
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
        </div>
      </div>
    </>
  );
};

export default ProductListTable;
