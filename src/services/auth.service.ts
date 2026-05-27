import { BaseResponse } from "@/types/api";
import axios, { AxiosError } from "axios";

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Seller {
  sellerId: string;
  email: string;
  name: string;
  balance: number;
  createdAt: string;
}

/**
 * Auth API Client untuk endpoint register
 */
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  process.env.BACKEND_API_URL ||
  "http://localhost:3001";

const authApiClient = axios.create({
  baseURL: `${BACKEND_URL}/api/auth`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Response Interceptor untuk handle errors dari API
 */
authApiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Auth API Error:", {
        status: error.response?.status,
        url: error.config?.url,
        data: error.response?.data,
      });
    }

    // Handle error response
    if (error.response) {
      const { status, data } = error.response;

      // Extract error message from API response
      // Priority: data.message > data.error > data
      let errorMessage = "An error occurred";
      if (data) {
        if (typeof data.message === "string" && data.message) {
          errorMessage = data.message;
        } else if (typeof data.error === "string" && data.error) {
          errorMessage = data.error;
        } else if (typeof data === "string" && data) {
          errorMessage = data;
        }
      }

      // Return formatted error with API message
      return Promise.reject({
        status,
        message: errorMessage,
        data: data,
      });
    }

    // Network error or timeout
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        status: 0,
        message: "Request timeout. Please try again.",
        data: null,
      });
    }

    if (!error.response) {
      return Promise.reject({
        status: 0,
        message: "Network error. Please check your connection.",
        data: null,
      });
    }

    return Promise.reject(error);
  },
);

/**
 * Register new seller
 */
export const register = async (
  data: RegisterData,
): Promise<BaseResponse<{ seller: Seller }>> => {
  const response = await authApiClient.post<BaseResponse<{ seller: Seller }>>(
    "/register",
    { ...data, role: "SELLER" },
  );
  return response.data;
};

const authService = {
  register,
};

export default authService;
