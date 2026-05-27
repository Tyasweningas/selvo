import AdminProductTable from "@/components/admin/dashboard/admin-product-table";
import adminServerService from "@/services/admin.server.service";
import { Product, ProductStatus } from "@/types/product";
import { MdInventory2, MdPendingActions } from "react-icons/md";

const AdminProductsPage = async () => {
  let products: Product[] = [];
  let fetchError: string | null = null;

  try {
    products = await adminServerService.getAllProducts();
  } catch (error) {
    console.error("Failed to fetch admin products:", error);
    fetchError = "Tidak bisa mengambil daftar produk. Coba lagi nanti.";
  }

  const submissionProducts = products.filter(
    (product) => product.status === ProductStatus.SUBMISSION,
  );
  const otherProducts = products.filter(
    (product) => product.status !== ProductStatus.SUBMISSION,
  );

  return (
    <div className="mt-5 space-y-8">
      {fetchError && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {fetchError}
        </div>
      )}

      <section className="space-y-4">
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5">
          <div className="flex items-center gap-4">
            <div className="bg-bg-blue rounded-xl p-2">
              <MdInventory2 className="text-primary-blue size-7" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">Daftar Produk</p>
              <p className="text-sm text-[#D9D9D9]">
                Seluruh produk yang sudah berstatus tayang atau ditolak.
              </p>
            </div>
          </div>
        </div>
        <AdminProductTable
          products={otherProducts}
          emptyMessage="Belum ada produk yang tersedia"
        />
      </section>

      <section className="space-y-4">
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5">
          <div className="flex items-center gap-4">
            <div className="bg-bg-yellow/40 rounded-xl p-2">
              <MdPendingActions className="text-primary-yellow size-7" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">
                Produk Menunggu Persetujuan
              </p>
              <p className="text-sm text-[#D9D9D9]">
                Produk yang berstatus SUBMISSION dan perlu direview admin.
              </p>
            </div>
          </div>
        </div>
        <AdminProductTable
          products={submissionProducts}
          emptyMessage="Tidak ada produk yang menunggu persetujuan"
        />
      </section>
    </div>
  );
};

export default AdminProductsPage;
