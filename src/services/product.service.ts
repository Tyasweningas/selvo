import apiClient from "@/lib/api-client";
import { BaseResponse, PaginatedResponse, PaginationMeta } from "@/types/api";
import { CreateProductPayload, Product } from "@/types/product";

/**
 * Product Service
 * Handles all product-related API calls
 */

interface CreateProductResponse extends BaseResponse {
  data: Product;
}

/** Filter & pagination options for `getProducts`. */
export interface GetProductsParams {
  page?: number;
  limit?: number;
  /** Cari berdasarkan judul produk (single keyword). */
  search?: string;
  /** Filter kategori. Boleh single id atau array untuk multi-kategori. */
  categoryId?: string | string[];
  sellerId?: string;
  status?: string;
}

export interface GetProductsResult {
  data: Product[];
  meta: PaginationMeta & { totalPages: number };
}

/**
 * Serialize array params jadi comma-separated supaya konsisten dengan
 * parser backend (`?categoryId=a,b,c`).
 */
const serializeParams = (params: Record<string, unknown>): string => {
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
 * Create a new product
 * @param payload - Product data from form
 * @returns Created product data
 */
export const createProduct = async (
  payload: CreateProductPayload,
): Promise<Product> => {
  try {
    // Prepare FormData for file upload
    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("price", payload.price.toString());
    formData.append("categoryId", payload.categoryId);

    if (payload.details && payload.details.length > 0) {
      const details = payload.details.map(({ key, value }) => ({
        key,
        value,
      }));
      formData.append("details", JSON.stringify(details));
    }

    if (payload.productLink) {
      formData.append("productLink", payload.productLink);
    }

    if (payload.images && payload.images.length > 0) {
      payload.images.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image);
        }
      });
    }

    const response = await apiClient.post<CreateProductResponse>(
      "/products",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.data;
  } catch (error) {
    console.error("❌ Create Product Error:", error);
    throw error;
  }
};

/**
 * Get products with filter & pagination.
 *
 * Mengembalikan `{ data, meta }` lengkap dari backend.
 */
export const getProductsPaginated = async (
  params: GetProductsParams = {},
): Promise<GetProductsResult> => {
  const queryString = serializeParams({
    page: params.page,
    limit: params.limit,
    search: params.search,
    categoryId: params.categoryId,
    sellerId: params.sellerId,
    status: params.status,
  });

  const url = queryString ? `/products?${queryString}` : "/products";
  const response = await apiClient.get<PaginatedResponse<Product>>(url);

  const meta = response.data.meta;
  const totalPages = meta.limit > 0 ? Math.ceil(meta.total / meta.limit) : 1;

  return {
    data: response.data.data ?? [],
    meta: {
      ...meta,
      totalPages: Math.max(totalPages, 1),
    },
  };
};

/**
 * Convenience: get only the data array (backward-compatible dengan
 * pemanggil lama yang cuma butuh list produk).
 */
export const getProducts = async (
  params: GetProductsParams = {},
): Promise<Product[]> => {
  const result = await getProductsPaginated(params);
  return result.data;
};

/**
 * Get authenticated seller's own products (client-side)
 * Includes all statuses (APPROVED / SUBMISSION / REJECTED).
 */
export const getMyProducts = async (params?: {
  page?: number;
  limit?: number;
}): Promise<Product[]> => {
  const response = await apiClient.get<BaseResponse & { data: Product[] }>(
    "/products/me/products",
    { params: { limit: 100, ...params } },
  );
  return response.data.data ?? [];
};

/**
 * Get product by slug
 */
export const getProductBySlug = async (
  slug: string,
  options: { adsId?: string } = {},
): Promise<Product> => {
  try {
    const response = await apiClient.get<
      BaseResponse & { data: { product: Product } }
    >(`/products/slug/${slug}`, {
      params: options.adsId ? { adsId: options.adsId } : undefined,
    });

    return response.data.data.product;
  } catch (error) {
    console.error("❌ Get Product By Slug Error:", error);
    throw error;
  }
};

const productService = {
  createProduct,
  getProducts,
  getProductsPaginated,
  getMyProducts,
  getProductBySlug,
};

export default productService;
