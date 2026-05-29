import apiClient from "@/lib/api-client";
import { BaseResponse, PaginatedResponse } from "@/types/api";
import type { Review } from "@/types/transaction";

/**
 * Review Service (client-side)
 * Handles creating product reviews tied to a transaction item.
 */

export interface CreateReviewPayload {
  transactionItemId: string;
  star: number;
  message?: string;
}

export type ProductReviewStarKey = "1" | "2" | "3" | "4" | "5";

export interface ProductReviewMeta {
  page: number;
  limit: number;
  total: number;
  averageStar: number;
  distribution: Record<ProductReviewStarKey, number>;
}

export const createReview = async (
  payload: CreateReviewPayload,
): Promise<Review> => {
  const body: Record<string, unknown> = {
    transactionItemId: payload.transactionItemId,
    star: payload.star,
  };
  if (payload.message && payload.message.trim()) {
    body.message = payload.message.trim();
  }

  const response = await apiClient.post<BaseResponse<Review>>("/reviews", body);
  return response.data.data;
};

/**
 * GET /reviews/products/:productId
 * Public endpoint untuk list review pada satu produk.
 */
export const listProductReviews = async (
  productId: string,
  params: { page?: number; limit?: number } = {},
): Promise<PaginatedResponse<Review> & { meta: ProductReviewMeta }> => {
  const response = await apiClient.get<
    PaginatedResponse<Review> & { meta: ProductReviewMeta }
  >(`/reviews/products/${productId}`, { params });
  return response.data;
};

const reviewService = {
  createReview,
  listProductReviews,
};

export default reviewService;
