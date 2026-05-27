import apiClient from "@/lib/api-client";
import type { Seller, SellerBankName } from "@/services/auth.service";
import { BaseResponse } from "@/types/api";

/**
 * Seller Service (client-side)
 * Handles seller profile / bank related API calls.
 */

export interface UpdateBankPayload {
  bankName: SellerBankName;
  bankNumber: string;
}

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

const sellerService = {
  updateBank,
};

export default sellerService;
