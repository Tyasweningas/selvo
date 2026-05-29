import apiClient from "@/lib/api-client";
import { Ads, CreateAdsPayload } from "@/types/ads";
import { BaseResponse, PaginatedResponse, PaginationParams } from "@/types/api";

/**
 * Ads Service (client-side)
 *
 * Wrapper untuk endpoint `/api/ads` di backend.
 */

/**
 * GET /ads
 * Public list iklan aktif (totalClick < targetClick), order acak.
 */
export const listActiveAds = async (
  params: PaginationParams = {},
): Promise<PaginatedResponse<Ads>> => {
  const response = await apiClient.get<PaginatedResponse<Ads>>("/ads", {
    params,
  });
  return response.data;
};

/**
 * GET /ads/me
 * Iklan milik seller yang sedang login.
 */
export const listMyAds = async (
  params: PaginationParams = {},
): Promise<PaginatedResponse<Ads>> => {
  const response = await apiClient.get<PaginatedResponse<Ads>>("/ads/me", {
    params,
  });
  return response.data;
};

/**
 * GET /ads/:id
 */
export const getAdsById = async (adsId: string): Promise<Ads> => {
  const response = await apiClient.get<BaseResponse<{ ads: Ads }>>(
    `/ads/${adsId}`,
  );
  return response.data.data.ads;
};

/**
 * POST /ads
 * Submit iklan baru (multipart). Saldo seller akan dipotong sesuai
 * `targetClick * tarif_per_klik`.
 */
export const createAds = async (payload: CreateAdsPayload): Promise<Ads> => {
  const formData = new FormData();
  formData.append("productId", payload.productId);
  formData.append("targetClick", String(payload.targetClick));
  formData.append("banner", payload.banner);

  const response = await apiClient.post<BaseResponse<{ ads: Ads }>>(
    "/ads",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data.data.ads;
};

const adsService = {
  listActiveAds,
  listMyAds,
  getAdsById,
  createAds,
};

export default adsService;
