"use client";

import { useState, useEffect } from "react";
import authService from "@/services/auth.service";
import { Seller } from "@/services/auth.service";

export function useUser() {
  const [user, setUser] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getUser();
        setUser(response.data);
      } catch (err: any) {
        if (err?.response?.status === 404) {
          setUser(null);
        } else {
          setError(
            err?.response?.data?.message ||
              err.message ||
              "Failed to fetch user",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.getUser();
      setUser(response.data);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setUser(null);
      } else {
        setError(
          err?.response?.data?.message || err.message || "Failed to fetch user",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, refetch };
}
