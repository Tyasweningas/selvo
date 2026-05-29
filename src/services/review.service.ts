import apiClient from "@/lib/api-client";
import { BaseResponse } from "@/types/api";
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

const reviewService = {
  createReview,
};

export default reviewService;
