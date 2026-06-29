import apiClient from "@/lib/api-client";
import { BaseResponse, PaginatedResponse } from "@/types/api";
import type { Product } from "@/types/product";

export interface GetAdminProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  status?: "APPROVED" | "SUBMISSION" | "REJECTED";
}

/**
 * Admin Product Service (client-side)
 * Handles admin actions on products (review, approve, reject).
 */

export const getAllProducts = async (
  params: GetAdminProductsParams = {}
): Promise<PaginatedResponse<Product> & { data: Product[] }> => {
  const response = await apiClient.get<
    PaginatedResponse<Product> & { data: Product[] }
  >("/products/admin/all", {
    params,
  });
  return response.data;
};

/**
 * PATCH /products/:id/approve
 * Approve a product submission. No body required.
 */
export const approveProduct = async (productId: string): Promise<Product> => {
  const response = await apiClient.patch<BaseResponse<Product>>(
    `/products/${productId}/approve`,
  );
  return response.data.data;
};

/**
 * PATCH /products/:id/reject
 * Reject a product submission. No body required.
 */
export const rejectProduct = async (productId: string): Promise<Product> => {
  const response = await apiClient.patch<BaseResponse<Product>>(
    `/products/${productId}/reject`,
  );
  return response.data.data;
};

const adminProductService = {
  getAllProducts,
  approveProduct,
  rejectProduct,
};

export default adminProductService;
