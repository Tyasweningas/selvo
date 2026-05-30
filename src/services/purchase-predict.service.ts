import axios, { AxiosError } from "axios";

/**
 * Purchase Prediction Service (client-side)
 *
 * Wrapper untuk service Python (Flask) yang memprediksi estimasi
 * pembelian berdasarkan target klik.
 *
 * Default base URL: `http://localhost:5000`. Override via env
 * `NEXT_PUBLIC_PURCHASE_PREDICT_API_URL`.
 */

export interface PredictPurchaseResponse {
  target_clicks: number;
  estimated_purchases: number;
  /** Backend mengirim string seperti "12.4%". */
  conversion_rate: string;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_PURCHASE_PREDICT_API_URL || "http://localhost:5000";

const predictClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

predictClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error?: string }>) => {
    const message =
      error.response?.data?.error ||
      (error.code === "ECONNABORTED"
        ? "Request timeout. Coba lagi."
        : !error.response
          ? "Tidak bisa terhubung ke server prediksi."
          : "Gagal memprediksi pembelian.");

    return Promise.reject({
      status: error.response?.status ?? 0,
      message,
      data: error.response?.data ?? null,
    });
  },
);

/**
 * POST /predict
 * @param clicks Jumlah target klik (harus > 0).
 */
export const predictPurchases = async (
  clicks: number,
): Promise<PredictPurchaseResponse> => {
  if (!Number.isFinite(clicks) || clicks <= 0) {
    throw {
      status: 0,
      message: "Target klik harus bilangan positif.",
      data: null,
    };
  }

  const response = await predictClient.post<PredictPurchaseResponse>(
    "/predict",
    { clicks: Math.trunc(clicks) },
  );
  return response.data;
};

const purchasePredictService = {
  predictPurchases,
};

export default purchasePredictService;
