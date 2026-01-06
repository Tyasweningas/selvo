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
 * Auth API Client - Direct ke /api/auth (bukan lewat proxy)
 * Karena auth endpoints tidak perlu token
 */
const authApiClient = axios.create({
  baseURL: "/api/auth",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies
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

class AuthService {
  /**
   * Register new seller
   * Calls /api/auth/register yang akan set httpOnly cookie
   */
  async register(
    data: RegisterData,
  ): Promise<BaseResponse<{ seller: Seller }>> {
    const response = await authApiClient.post<BaseResponse<{ seller: Seller }>>(
      "/register",
      data,
    );
    return response.data;
  }

  /**
   * Login seller
   * Calls /api/auth/login yang akan set httpOnly cookie
   */
  async login(data: LoginData): Promise<BaseResponse<{ seller: Seller }>> {
    const response = await authApiClient.post<BaseResponse<{ seller: Seller }>>(
      "/login",
      data,
    );
    return response.data;
  }

  /**
   * Get current user
   * Token automatically sent via httpOnly cookie
   */
  async getCurrentUser(): Promise<BaseResponse<{ seller: Seller }>> {
    const response =
      await authApiClient.get<BaseResponse<{ seller: Seller }>>("/me");
    return response.data;
  }

  /**
   * Get user from HTTP-only cookie
   * Retrieves user data stored in cookie after login
   */
  async getUser(): Promise<BaseResponse<Seller>> {
    const response = await authApiClient.get<BaseResponse<Seller>>("/user");
    return response.data;
  }

  /**
   * Logout
   * Clears httpOnly cookie
   */
  async logout(): Promise<void> {
    await authApiClient.post("/logout");
  }
}

export default new AuthService();
