"use client";

import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import sellerService from "@/services/seller.service";
import type {
  ListSellerReviewsParams,
  SellerReviewItem,
  SellerReviewMeta,
} from "@/types/seller-orders";
import { useCallback, useEffect, useState } from "react";

const INITIAL_META: SellerReviewMeta = {
  page: 1,
  limit: 10,
  total: 0,
  averageStar: 0,
  distribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
};

export function useSellerReviews(params: ListSellerReviewsParams) {
  const [data, setData] = useState<SellerReviewItem[]>([]);
  const [meta, setMeta] = useState<SellerReviewMeta>(INITIAL_META);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { page, limit, productId, star } = params;

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await sellerService.listMyReviews({
        page,
        limit,
        productId,
        star,
      });
      setData(response.data ?? []);
      if (response.meta) {
        setMeta(response.meta);
      }
    } catch (err: unknown) {
      logError(err, "useSellerReviews");
      setError(formatErrorForDisplay(err));
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, productId, star]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return { data, meta, loading, error, refetch: fetchList };
}
