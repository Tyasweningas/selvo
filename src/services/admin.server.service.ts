import serverApiClient from "@/lib/server-api-client";
import type { PlatformStats } from "@/types/admin";
import { BaseResponse, PaginatedResponse } from "@/types/api";
import type { Product } from "@/types/product";

/**
 * Admin Server Service
 * Handles server-side admin-related API calls.
 * Use this ONLY in Server Components or Server Actions.
 */

export const getPlatformStats = async (): Promise<PlatformStats> => {
  const response =
    await serverApiClient.get<BaseResponse<PlatformStats>>("/api/admin/stats");
  return response.data;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await serverApiClient.get<
    PaginatedResponse<Product> & { data: Product[] }
  >("/api/admin/products");
  return response.data || [];
};

const adminServerService = {
  getPlatformStats,
  getAllProducts,
};

export default adminServerService;
