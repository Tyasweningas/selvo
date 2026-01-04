import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

/**
 * API Client untuk Next.js
 *
 * Base URL: /api/proxy
 * Semua requests akan di-proxy oleh Next.js ke backend
 * Token automatically attached via httpOnly cookies
 *
 * Usage:
 * - auth endpoints: apiClient.post('/auth/login', data)
 * - other endpoints: apiClient.get('/products'), apiClient.post('/orders', data)
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: "/api/proxy",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies untuk httpOnly cookies
});

/**
 * Request Interceptor
 * - Log request untuk debugging
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log("📤 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 * - Handle common errors (401, 403, 500, etc)
 * - Log response untuk debugging
 * - Auto redirect untuk unauthorized
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log("✅ API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  (error: AxiosError<any>) => {
    // Log error
    if (process.env.NODE_ENV === "development") {
      console.error("❌ API Error:", {
        status: error.response?.status,
        url: error.config?.url,
        message: error.response?.data?.message || error.message,
      });
    }

    // Handle specific error codes
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

      switch (status) {
        case 401:
          // Unauthorized - Redirect to login
          if (typeof window !== "undefined") {
            console.warn("🔒 Unauthorized - Redirecting to login...");

            // Redirect to login (only if not already on auth page)
            if (!window.location.pathname.includes("/auth")) {
              window.location.href =
                "/auth?redirect=" +
                encodeURIComponent(window.location.pathname);
            }
          }
          break;

        case 403:
          // Forbidden
          console.error("🚫 Access Forbidden:", errorMessage);
          break;

        case 404:
          // Not Found
          console.error("🔍 Resource Not Found:", errorMessage);
          break;

        case 500:
          // Internal Server Error
          console.error("💥 Internal Server Error:", errorMessage);
          break;

        case 503:
          // Service Unavailable
          console.error("⚠️ Service Unavailable:", errorMessage);
          break;
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

export default apiClient;
