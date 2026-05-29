"use client";

import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import sellerService, {
  SellerDashboardSummary,
} from "@/services/seller.service";
import { useCallback, useEffect, useState } from "react";

export function useSellerDashboard() {
  const [data, setData] = useState<SellerDashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const summary = await sellerService.getDashboardSummary();
      setData(summary);
    } catch (err: unknown) {
      logError(err, "useSellerDashboard");
      setError(formatErrorForDisplay(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    summary: data,
    loading,
    error,
    refetch: fetchSummary,
  };
}
