"use client";

import { useAuthStore } from "@/store/auth-store";
import { getSession } from "next-auth/react";

export function useAdmin() {
  const admin = useAuthStore((state) => state.admin);
  const role = useAuthStore((state) => state.role);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const refetch = async () => {
    const session = await getSession();
    useAuthStore.getState().hydrateFromSession(session);
  };

  return {
    admin,
    role,
    loading: !isHydrated,
    error: null,
    refetch,
  };
}
