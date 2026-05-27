import apiClient from "@/lib/api-client";
import type { ReviewWithdrawalPayload, Withdrawal } from "@/types/admin";
import { BaseResponse, PaginatedResponse } from "@/types/api";

/**
 * Withdrawal Service (client-side)
 * Handles all withdrawal-related API calls for the admin dashboard.
 */

export const getWithdrawals = async (params?: {
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<Withdrawal>> => {
  const response = await apiClient.get<PaginatedResponse<Withdrawal>>(
    "/withdrawals",
    {
      params,
    },
  );
  return response.data;
};

export const approveWithdrawal = async (
  withdrawalId: string,
  payload: ReviewWithdrawalPayload = {},
): Promise<Withdrawal> => {
  const body = payload.note ? { note: payload.note } : {};
  const response = await apiClient.post<BaseResponse<Withdrawal>>(
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
  const response = await apiClient.post<BaseResponse<Withdrawal>>(
    `/withdrawals/${withdrawalId}/reject`,
    body,
  );
  return response.data.data;
};

const withdrawalService = {
  getWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
};

export default withdrawalService;
