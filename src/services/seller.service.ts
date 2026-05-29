import apiClient from "@/lib/api-client";
import type { Seller, SellerBankName } from "@/services/auth.service";
import { BaseResponse, PaginatedResponse } from "@/types/api";
import type {
  ListSellerReviewsParams,
  ListSellerTransactionsParams,
  SellerReviewItem,
  SellerReviewMeta,
  SellerTransactionDetail,
  SellerTransactionListItem,
  SellerTransactionMeta,
} from "@/types/seller-orders";

/**
 * Seller Service (client-side)
 * Handles seller profile / bank related API calls.
 */

export interface UpdateBankPayload {
  bankName: SellerBankName;
  bankNumber: string;
}

export interface SellerDashboardSummary {
  totalProducts: number;
  totalSold: number;
  averageRating: number;
  totalReviews: number;
  balance: number;
}

/**
 * GET /sellers/dashboard
 * Fetch seller dashboard summary metrics.
 */
export const getDashboardSummary =
  async (): Promise<SellerDashboardSummary> => {
    const response =
      await apiClient.get<BaseResponse<SellerDashboardSummary>>(
        "/sellers/dashboard",
      );
    return response.data.data;
  };

/**
 * PATCH /sellers/me/bank
 * Update seller bank information.
 */
export const updateBank = async (
  payload: UpdateBankPayload,
): Promise<Seller> => {
  const response = await apiClient.patch<BaseResponse<{ seller: Seller }>>(
    "/sellers/me/bank",
    payload,
  );
  const seller = response.data.data?.seller;
  if (!seller) {
    throw new Error("Gagal memperbarui data bank.");
  }
  return seller;
};

/**
 * GET /sellers/transactions
 * Daftar ringkas transaksi yang melibatkan produk milik seller.
 */
export const listMyTransactions = async (
  params: ListSellerTransactionsParams = {},
): Promise<
  PaginatedResponse<SellerTransactionListItem> & {
    meta: SellerTransactionMeta;
  }
> => {
  const response = await apiClient.get<
    PaginatedResponse<SellerTransactionListItem> & {
      meta: SellerTransactionMeta;
    }
  >("/sellers/transactions", { params });
  return response.data;
};

/**
 * GET /sellers/transactions/:transactionId
 * Detail transaksi seller (items + review).
 */
export const getMyTransactionDetail = async (
  transactionId: string,
): Promise<SellerTransactionDetail> => {
  const response = await apiClient.get<
    BaseResponse<{ transaction: SellerTransactionDetail }>
  >(`/sellers/transactions/${transactionId}`);
  const detail = response.data.data?.transaction;
  if (!detail) {
    throw new Error("Detail transaksi tidak tersedia.");
  }
  return detail;
};

/**
 * GET /sellers/reviews
 * Daftar review yang masuk untuk produk milik seller.
 */
export const listMyReviews = async (
  params: ListSellerReviewsParams = {},
): Promise<
  PaginatedResponse<SellerReviewItem> & { meta: SellerReviewMeta }
> => {
  const response = await apiClient.get<
    PaginatedResponse<SellerReviewItem> & { meta: SellerReviewMeta }
  >("/sellers/reviews", { params });
  return response.data;
};

const sellerService = {
  getDashboardSummary,
  updateBank,
  listMyTransactions,
  getMyTransactionDetail,
  listMyReviews,
};

export default sellerService;
