import axios from "axios";

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

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    seller: Seller;
  };
}

export interface MeResponse {
  status: string;
  data: {
    seller: Seller;
  };
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

class AuthService {
  /**
   * Register new seller
   * Calls /api/auth/register yang akan set httpOnly cookie
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await authApiClient.post<AuthResponse>("/register", data);
    return response.data;
  }

  /**
   * Login seller
   * Calls /api/auth/login yang akan set httpOnly cookie
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await authApiClient.post<AuthResponse>("/login", data);
    return response.data;
  }

  /**
   * Get current user
   * Token automatically sent via httpOnly cookie
   */
  async getCurrentUser(): Promise<MeResponse> {
    const response = await authApiClient.get<MeResponse>("/me");
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
