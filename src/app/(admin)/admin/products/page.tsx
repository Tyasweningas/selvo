"use client";

import AdminProductTable from "@/components/admin/dashboard/admin-product-table";
import ProductReviewModal, {
  ProductReviewAction,
} from "@/components/admin/dashboard/product-review-modal";
import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import adminProductService from "@/services/admin-product.service";
import { Product, ProductStatus } from "@/types/product";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdInventory2, MdPendingActions, MdRefresh } from "react-icons/md";
import { toast } from "sonner";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [reviewingProduct, setReviewingProduct] = useState<Product | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const data = await adminProductService.getAllProducts();
      setProducts(data);
    } catch (error: unknown) {
      logError(error, "AdminProductsPage");
      setFetchError(formatErrorForDisplay(error));
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const { submissionProducts, otherProducts } = useMemo(() => {
    const submission: Product[] = [];
    const others: Product[] = [];
    products.forEach((product) => {
      if (product.status === ProductStatus.SUBMISSION) {
        submission.push(product);
      } else {
        others.push(product);
      }
    });
    return { submissionProducts: submission, otherProducts: others };
  }, [products]);

  const handleReview = (product: Product) => {
    setReviewingProduct(product);
  };

  const handleClose = () => {
    if (isProcessing) {
      return;
    }
    setReviewingProduct(null);
  };

  const handleConfirm = async (action: ProductReviewAction) => {
    if (!reviewingProduct) {
      return;
    }

    setIsProcessing(true);
    try {
      const updated =
        action === "approve"
          ? await adminProductService.approveProduct(reviewingProduct.productId)
          : await adminProductService.rejectProduct(reviewingProduct.productId);

      setProducts((prev) =>
        prev.map((item) =>
          item.productId === reviewingProduct.productId
            ? { ...item, ...updated }
            : item,
        ),
      );

      toast.success(
        action === "approve"
          ? "Produk berhasil disetujui."
          : "Produk berhasil ditolak.",
      );
      setReviewingProduct(null);
    } catch (error: unknown) {
      logError(error, "AdminProductsPage:review");
      toast.error(formatErrorForDisplay(error));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-5 space-y-8">
      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-bg-blue rounded-xl p-2">
              <MdInventory2 className="text-primary-blue size-7" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">
                Manajemen Produk
              </p>
              <p className="text-sm text-[#D9D9D9]">
                Data dimuat dari endpoint /products/admin/all.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={fetchProducts}
            disabled={isLoading}
            className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MdRefresh
              className={isLoading ? "size-5 animate-spin" : "size-5"}
            />
            <span>Muat ulang</span>
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#D9D9D9]">
          <span className="border-bg-light bg-bg-div rounded-full border-2 px-3 py-1">
            Total: <span className="text-white">{products.length}</span>
          </span>
          <span className="border-bg-light bg-bg-div rounded-full border-2 px-3 py-1">
            Pending:{" "}
            <span className="text-primary-yellow">
              {submissionProducts.length}
            </span>
          </span>
          <span className="border-bg-light bg-bg-div rounded-full border-2 px-3 py-1">
            Tayang/Ditolak:{" "}
            <span className="text-white">{otherProducts.length}</span>
          </span>
        </div>
      </div>

      {fetchError && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {fetchError}
        </div>
      )}

      {isLoading ? (
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 py-10 text-center text-gray-400">
          Memuat daftar produk...
        </div>
      ) : (
        <>
          <section className="space-y-4">
            <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5">
              <div className="flex items-center gap-4">
                <div className="bg-bg-yellow/40 rounded-xl p-2">
                  <MdPendingActions className="text-primary-yellow size-7" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-100">
                    Produk Menunggu Persetujuan
                  </p>
                  <p className="text-sm text-[#D9D9D9]">
                    Produk berstatus SUBMISSION yang perlu direview admin.
                  </p>
                </div>
              </div>
            </div>
            <AdminProductTable
              products={submissionProducts}
              emptyMessage="Tidak ada produk yang menunggu persetujuan"
              onReview={handleReview}
              reviewLabel="Review"
            />
          </section>

          <section className="space-y-4">
            <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5">
              <div className="flex items-center gap-4">
                <div className="bg-bg-blue rounded-xl p-2">
                  <MdInventory2 className="text-primary-blue size-7" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-100">
                    Daftar Produk
                  </p>
                  <p className="text-sm text-[#D9D9D9]">
                    Produk yang sudah berstatus tayang atau ditolak.
                  </p>
                </div>
              </div>
            </div>
            <AdminProductTable
              products={otherProducts}
              emptyMessage="Belum ada produk yang tersedia"
              onReview={handleReview}
            />
          </section>
        </>
      )}

      <ProductReviewModal
        open={!!reviewingProduct}
        product={reviewingProduct}
        loading={isProcessing}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default AdminProductsPage;
