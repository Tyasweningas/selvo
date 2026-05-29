import serverApiClient from "@/lib/server-api-client";
import { PaginatedResponse } from "@/types/api";
import { Product } from "@/types/product";

/**
 * Product Server Service
 * Handles server-side product-related API calls
 * Use this ONLY in Server Components or Server Actions
 */

/**
 * Get seller's own products (server-side only)
 * @returns List of seller's products
 */
export const getMyProducts = async (): Promise<PaginatedResponse<Product>> => {
  try {
    const response = await serverApiClient.get<
      PaginatedResponse<Product> & { data: Product[] }
    >("/api/products/me/products");

    return response;
  } catch (error: any) {
    console.error("❌ Get My Products Error:", error);
    throw error;
  }
};

const productServerService = {
  getMyProducts,
};

export default productServerService;

/* ============================================================
 * Public catalog (server-side)
 * ============================================================ */

export interface GetPublicProductsServerParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string | string[];
}

const buildQueryString = (params: Record<string, unknown>): string => {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      const filtered = value
        .map((v) => (v == null ? "" : String(v).trim()))
        .filter(Boolean);
      if (filtered.length > 0) {
        sp.append(key, filtered.join(","));
      }
    } else {
      sp.append(key, String(value));
    }
  }
  return sp.toString();
};

/**
 * Server-side fetch untuk katalog produk publik.
 * Note: `serverApiClient` sudah memprefix `/api`, sedangkan endpoint resmi
 * di gateway juga memprefix `/api`, jadi kita panggil dengan path tanpa
 * prefix `/api` lagi (lihat implementasi `ServerApiClient`). Tetapi
 * environment FE saat ini terhubung ke `BACKEND_URL` (tanpa `/api`),
 * sehingga path harus diawali `/api`.
 */
export const getPublicProductsServer = async (
  params: GetPublicProductsServerParams = {},
): Promise<PaginatedResponse<Product>> => {
  const queryString = buildQueryString({
    page: params.page,
    limit: params.limit,
    search: params.search,
    categoryId: params.categoryId,
  });

  const path = queryString ? `/api/products?${queryString}` : "/api/products";

  return await serverApiClient.get<PaginatedResponse<Product>>(path);
};

/**
 * Server-side fetch kategori untuk filter sidebar.
 */
export const getCategoriesServer = async () => {
  type CategoryListResponse = {
    error: boolean;
    data: import("@/types/product").ProductCategory[];
  };
  const res =
    await serverApiClient.get<CategoryListResponse>("/api/categories");
  return res.data ?? [];
};
