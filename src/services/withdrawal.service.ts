import apiClient from "@/lib/api-client";
import type { ReviewWithdrawalPayload, Withdrawal } from "@/types/admin";
import { BaseResponse, PaginatedResponse, PaginationParams } from "@/types/api";

/**
 * Withdrawal Service (client-side)
 * Handles all withdrawal-related API calls.
 */

export const getWithdrawals = async (
  params?: PaginationParams,
): Promise<PaginatedResponse<Withdrawal>> => {
  const response = await apiClient.get<PaginatedResponse<Withdrawal>>(
    "/withdrawals",
    {
      params,
    },
  );
  return response.data;
};

/**
 * GET /withdrawals/me
 * Fetch withdrawal history for the authenticated seller.
 */
export const getMyWithdrawals = async (
  params?: PaginationParams,
): Promise<PaginatedResponse<Withdrawal>> => {
  const response = await apiClient.get<PaginatedResponse<Withdrawal>>(
    "/withdrawals/me",
    {
      params,
    },
  );
  return response.data;
};

/**
 * POST /withdrawals
 * Seller creates a new withdrawal request.
 */
export const createWithdrawal = async (amount: number): Promise<Withdrawal> => {
  const response = await apiClient.post<BaseResponse<Withdrawal>>(
    "/withdrawals",
    { amount },
  );
  return response.data.data;
};

export const approveWithdrawal = async (
  withdrawalId: string,
  payload: ReviewWithdrawalPayload = {},
): Promise<Withdrawal> => {
  const body = payload.note ? { note: payload.note } : {};
  const response = await apiClient.patch<BaseResponse<Withdrawal>>(
    `/withdrawals/${withdrawalId}/approve`,
    body,
  );
  return response.data.data;
};

export const rejectWithdrawal = async (
  withdrawalId: string,
  payload: ReviewWithdrawalPayload = {},
): Promise<Withdrawal> => {
  const body = payload.note ? { note: payload.note } : {};
  const response = await apiClient.patch<BaseResponse<Withdrawal>>(
    `/withdrawals/${withdrawalId}/reject`,
    body,
  );
  return response.data.data;
};

const withdrawalService = {
  getWithdrawals,
  getMyWithdrawals,
  createWithdrawal,
  approveWithdrawal,
  rejectWithdrawal,
};

export default withdrawalService;
