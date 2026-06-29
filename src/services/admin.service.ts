import apiClient from "@/lib/api-client";
import { BaseResponse } from "@/types/api";

export interface ChartDataPoint {
  label: string;
  revenue: number;
  commission: number;
}

export interface AdminTransactionItem {
  transactionItemId: string;
  productId: string;
  price: number;
  productName: string;
}

export interface AdminTransaction {
  transactionId: string;
  orderId: string;
  grandTotal: number;
  subTotal: number;
  adminFee: number;
  serviceFee: number;
  email: string;
  name: string;
  status: "PENDING" | "SUCCESS" | "REJECTED";
  createdAt: string;
  items: AdminTransactionItem[];
}

export interface ListTransactionsParams {
  page?: number;
  limit?: number;
  status?: "PENDING" | "SUCCESS" | "REJECTED";
  search?: string;
}

export interface PaginatedTransactionsResponse {
  error: boolean;
  data: AdminTransaction[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export const getDashboardCharts = async (
  filter: string = "day"
): Promise<ChartDataPoint[]> => {
  const response = await apiClient.get<BaseResponse<ChartDataPoint[]>>(
    "/admin/dashboard/charts",
    { params: { filter } }
  );
  return response.data.data;
};

export const getTransactions = async (
  params: ListTransactionsParams = {}
): Promise<PaginatedTransactionsResponse> => {
  const response = await apiClient.get<PaginatedTransactionsResponse>(
    "/admin/transactions",
    { params }
  );
  return response.data;
};

const adminService = {
  getDashboardCharts,
  getTransactions,
};

export default adminService;
