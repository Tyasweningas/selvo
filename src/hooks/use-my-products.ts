"use client";

import { logError } from "@/lib/error-handler";
import productService from "@/services/product.service";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";

/**
 * Mengambil daftar produk milik seller (untuk dropdown filter).
 * Cukup ringan dan dipanggil sekali per mount; jika butuh refresh,
 * panggil `refetch`.
 */
export function useMyProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOnce = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await productService.getMyProducts();
      setData(list);
    } catch (err: unknown) {
      logError(err, "useMyProducts");
      setError("Gagal memuat daftar produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    productService
      .getMyProducts()
      .then((list) => {
        if (!cancelled) {
          setData(list);
          setLoading(false);
        }
      })
      .catch((err) => {
        logError(err, "useMyProducts");
        if (!cancelled) {
          setError("Gagal memuat daftar produk");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error, refetch: fetchOnce };
}
