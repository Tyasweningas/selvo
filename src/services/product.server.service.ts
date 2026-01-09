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

export default {
  getMyProducts,
};
