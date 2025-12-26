/**
 * API Error Handler Utilities
 * Untuk handle errors dari API secara konsisten
 */

export interface ApiError {
  status: number;
  message: string;
  data?: any;
}

/**
 * Check if error is ApiError
 */
export function isApiError(error: any): error is ApiError {
  return (
    error &&
    typeof error === "object" &&
    "status" in error &&
    "message" in error
  );
}

/**
 * Get error message from error object
 */
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred";
}

/**
 * Get error status from error object
 */
export function getErrorStatus(error: unknown): number {
  if (isApiError(error)) {
    return error.status;
  }

  return 500;
}

/**
 * Check if error is authentication error (401)
 */
export function isAuthError(error: unknown): boolean {
  return isApiError(error) && error.status === 401;
}

/**
 * Check if error is forbidden (403)
 */
export function isForbiddenError(error: unknown): boolean {
  return isApiError(error) && error.status === 403;
}

/**
 * Check if error is not found (404)
 */
export function isNotFoundError(error: unknown): boolean {
  return isApiError(error) && error.status === 404;
}

/**
 * Check if error is validation error (400)
 */
export function isValidationError(error: unknown): boolean {
  return isApiError(error) && error.status === 400;
}

/**
 * Check if error is server error (5xx)
 */
export function isServerError(error: unknown): boolean {
  return isApiError(error) && error.status >= 500;
}

/**
 * Check if error is network error
 */
export function isNetworkError(error: unknown): boolean {
  return isApiError(error) && error.status === 0;
}

/**
 * Format error for display to user
 */
export function formatErrorForDisplay(error: unknown): string {
  const message = getErrorMessage(error);

  if (isNetworkError(error)) {
    return "Koneksi bermasalah. Mohon periksa internet Anda.";
  }

  if (isServerError(error)) {
    return "Server sedang bermasalah. Silakan coba lagi nanti.";
  }

  if (isAuthError(error)) {
    return "Sesi Anda telah berakhir. Silakan login kembali.";
  }

  if (isForbiddenError(error)) {
    return "Anda tidak memiliki akses ke resource ini.";
  }

  if (isNotFoundError(error)) {
    return "Data yang Anda cari tidak ditemukan.";
  }

  return message;
}

/**
 * Log error untuk debugging
 */
export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === "development") {
    console.group(`❌ Error${context ? ` in ${context}` : ""}`);
    console.error("Error:", error);
    if (isApiError(error)) {
      console.error("Status:", error.status);
      console.error("Message:", error.message);
      if (error.data) {
        console.error("Data:", error.data);
      }
    }
    console.groupEnd();
  }
}
