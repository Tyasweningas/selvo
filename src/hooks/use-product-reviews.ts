"use client";

import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import reviewService, { ProductReviewMeta } from "@/services/review.service";
import type { Review } from "@/types/transaction";
import { useCallback, useEffect, useState } from "react";

const INITIAL_META: ProductReviewMeta = {
  page: 1,
  limit: 5,
  total: 0,
  averageStar: 0,
  distribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
};

interface UseProductReviewsParams {
  productId: string | null;
  page?: number;
  limit?: number;
}

/**
 * Mengambil daftar review beserta summary distribusi bintang untuk
 * satu produk. Public endpoint, tidak perlu autentikasi.
 */
export function useProductReviews({
  productId,
  page = 1,
  limit = 5,
}: UseProductReviewsParams) {
  const [data, setData] = useState<Review[]>([]);
  const [meta, setMeta] = useState<ProductReviewMeta>({
    ...INITIAL_META,
    limit,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchList = useCallback(async () => {
    if (!productId) {
      setData([]);
      setMeta({ ...INITIAL_META, limit });
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await reviewService.listProductReviews(productId, {
        page,
        limit,
      });
      setData(response.data ?? []);
      if (response.meta) {
        setMeta(response.meta);
      }
    } catch (err: unknown) {
      logError(err, "useProductReviews");
      setError(formatErrorForDisplay(err));
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [productId, page, limit]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return { data, meta, loading, error, refetch: fetchList };
}
