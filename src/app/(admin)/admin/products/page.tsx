"use client";

import AdminProductTable from "@/components/admin/dashboard/admin-product-table";
import ProductReviewModal, {
  ProductReviewAction,
} from "@/components/admin/dashboard/product-review-modal";
import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import adminProductService from "@/services/admin-product.service";
import { categoryService } from "@/services/category.service";
import { Product, ProductCategory, ProductStatus } from "@/types/product";
import { useCallback, useEffect, useState } from "react";
import {
  MdInventory2,
  MdRefresh,
  MdSearch,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { toast } from "sonner";

export default function AdminProductsPage() {
  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Filter & Search states
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | ProductStatus>("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  // Review state
  const [reviewingProduct, setReviewingProduct] = useState<Product | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data || []);
      } catch (error: unknown) {
        logError(error, "AdminProductsPage:fetchCategories");
      }
    };
    fetchCategories();
  }, []);

  // Fetch products callback
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const result = await adminProductService.getAllProducts({
        page,
        limit,
        status: status || undefined,
        categoryId: categoryId || undefined,
        search: search.trim() || undefined,
      });
      setProducts(result.data || []);
      setTotal(result.meta?.total || 0);
    } catch (error: unknown) {
      logError(error, "AdminProductsPage:fetchProducts");
      setFetchError(formatErrorForDisplay(error));
      setProducts([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [page, status, categoryId, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleStatusChange = (newStatus: typeof status) => {
    setStatus(newStatus);
    setPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
    setPage(1);
  };

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

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mt-5 space-y-6">
      {/* Header Card */}
      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-bg-blue rounded-xl p-2">
              <MdInventory2 className="text-primary-blue size-7" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">Manajemen Produk</p>
              <p className="text-sm text-[#D9D9D9]">
                Data produk terintegrasi dengan filter pencarian dan verifikasi status.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={fetchProducts}
            disabled={isLoading}
            className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 self-start sm:self-center"
          >
            <MdRefresh className={isLoading ? "size-5 animate-spin" : "size-5"} />
            <span>Muat Ulang</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5 space-y-4">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap bg-[#152228] p-1 rounded-lg border border-[#1E2A30] self-start">
            <button
              onClick={() => handleStatusChange("")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                status === ""
                  ? "bg-primary-blue text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => handleStatusChange(ProductStatus.SUBMISSION)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                status === ProductStatus.SUBMISSION
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Pending (Submission)
            </button>
            <button
              onClick={() => handleStatusChange(ProductStatus.APPROVED)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                status === ProductStatus.APPROVED
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Tayang (Approved)
            </button>
            <button
              onClick={() => handleStatusChange(ProductStatus.REJECTED)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                status === ProductStatus.REJECTED
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Ditolak (Rejected)
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 grow xl:max-w-2xl">
            {/* Category Select */}
            <div className="w-full sm:w-48 shrink-0">
              <select
                value={categoryId}
                onChange={handleCategoryChange}
                className="w-full bg-[#152228] border border-[#1E2A30] text-sm text-gray-300 rounded-lg px-3 py-2 focus:outline-hidden focus:border-primary-blue transition-colors cursor-pointer"
              >
                <option value="">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.productCategoryId} value={cat.productCategoryId}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 grow">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Cari produk berdasarkan nama..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#152228] border border-[#1E2A30] text-sm text-white rounded-lg pl-10 pr-4 py-2 focus:outline-hidden focus:border-primary-blue transition-colors"
                />
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              </div>
              <button
                type="submit"
                className="bg-primary-blue hover:bg-primary-blue/80 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shrink-0"
              >
                Cari
              </button>
            </form>
          </div>
        </div>
      </div>

      {fetchError && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {fetchError}
        </div>
      )}

      {/* Main Table view */}
      {isLoading ? (
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 py-20 text-center text-gray-400">
          <div className="flex flex-col items-center gap-2">
            <div className="size-8 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm">Memuat daftar produk...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <AdminProductTable
            products={products}
            emptyMessage="Tidak ada produk ditemukan sesuai filter"
            onReview={handleReview}
            reviewLabel={status === "SUBMISSION" ? "Review" : "Detail"}
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-[#1E2A30] px-4 py-3 bg-[#152228]/50 border-2 rounded-xl text-xs text-gray-300">
              <div>
                Menampilkan <span className="font-semibold text-white">{(page - 1) * limit + 1}</span> hingga{" "}
                <span className="font-semibold text-white">{Math.min(page * limit, total)}</span> dari{" "}
                <span className="font-semibold text-white">{total}</span> produk
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-md border border-[#1E2A30] bg-[#152228] text-gray-400 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MdChevronLeft size={18} />
                </button>
                <span className="text-gray-300 font-semibold">
                  Halaman {page} dari {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-md border border-[#1E2A30] bg-[#152228] text-gray-400 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MdChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Review Modal */}
      <ProductReviewModal
        open={!!reviewingProduct}
        product={reviewingProduct}
        loading={isProcessing}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
