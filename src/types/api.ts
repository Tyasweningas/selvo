/**
 * Base API Response Structure
 * All API responses follow this format
 */
export interface BaseResponse<T = any> {
  error: boolean;
  message?: string;
  data: T;
  errors?: Record<string, string[]>;
  stack?: string;
}

/**
 * Paginated Response Structure
 * Used for list endpoints with pagination
 */
export interface PaginatedResponse<T> {
  error: boolean;
  message?: string;
  data: T[];
  meta: PaginationMeta;
}

/**
 * Pagination Metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

/**
 * API Error Response
 */
export interface ApiError {
  error: boolean;
  message: string;
  data: null;
  errors?: Record<string, string[]>;
  stack?: string;
}

/**
 * API Success Response
 */
export interface ApiSuccess<T = any> {
  error: false;
  message?: string;
  data: T;
}

/**
 * Query Parameters for Pagination
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Query Parameters for Search & Filter
 */
export interface SearchParams extends PaginationParams {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
