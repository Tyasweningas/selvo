"use client";

import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import sellerService from "@/services/seller.service";
import type {
  ListSellerTransactionsParams,
  SellerTransactionListItem,
  SellerTransactionMeta,
} from "@/types/seller-orders";
import { useCallback, useEffect, useState } from "react";

const INITIAL_META: SellerTransactionMeta = {
  page: 1,
  limit: 10,
  total: 0,
  counts: { ALL: 0, SUCCESS: 0, REJECTED: 0 },
};

export function useSellerTransactions(params: ListSellerTransactionsParams) {
  const [data, setData] = useState<SellerTransactionListItem[]>([]);
  const [meta, setMeta] = useState<SellerTransactionMeta>(INITIAL_META);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { page, limit, status, search, productId } = params;

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await sellerService.listMyTransactions({
        page,
        limit,
        status,
        search,
        productId,
      });
      setData(response.data ?? []);
      if (response.meta) {
        setMeta(response.meta);
      }
    } catch (err: unknown) {
      logError(err, "useSellerTransactions");
      setError(formatErrorForDisplay(err));
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, status, search, productId]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return {
    data,
    meta,
    loading,
    error,
    refetch: fetchList,
  };
}
