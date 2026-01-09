import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "http://localhost:3000/api";

/**
 * Server-side API Client untuk Server Components
 *
 * Usage:
 * ```tsx
 * import { serverApiClient } from '@/lib/server-api-client';
 *
 * export default async function ProductsPage() {
 *   const products = await serverApiClient.get('/products');
 *   return <div>{products.data}</div>
 * }
 * ```
 */
export class ServerApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = BACKEND_API_URL;
  }

  /**
   * Get token from httpOnly cookie
   */
  private async getToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get("token")?.value;
  }

  /**
   * Generic fetch method
   */
  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = await this.getToken();
    const url = `${this.baseURL}${endpoint}`;

    // Prepare headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add Authorization header if token exists
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle 401 Unauthorized
      if (response.status === 401) {
        // Clear the invalid token
        const cookieStore = await cookies();
        cookieStore.delete("token");

        // Redirect to login
        redirect("/auth");
      }

      // Handle other errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Extract error message from API response
        // Priority: errorData.message > errorData.error > errorData
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        if (errorData) {
          if (typeof errorData.message === "string" && errorData.message) {
            errorMessage = errorData.message;
          } else if (typeof errorData.error === "string" && errorData.error) {
            errorMessage = errorData.error;
          } else if (typeof errorData === "string" && errorData) {
            errorMessage = errorData;
          }
        }

        // Create and throw ApiError-compatible error
        const apiError: any = new Error(errorMessage);
        apiError.status = response.status;
        apiError.data = errorData;
        throw apiError;
      }

      return await response.json();
    } catch (error) {
      console.error(`[Server API] Error calling ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    let url = endpoint;

    // Add query params if provided
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return this.fetch<T>(url, {
      method: "GET",
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: "DELETE",
    });
  }
}

// Export singleton instance
export const serverApiClient = new ServerApiClient();

// Export default for convenience
export default serverApiClient;
