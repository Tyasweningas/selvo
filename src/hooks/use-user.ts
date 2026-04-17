"use client";

import { useAuthStore } from "@/store/auth-store";
import { getSession } from "next-auth/react";

export function useUser() {
  const user = useAuthStore((state) => state.user);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const refetch = async () => {
    const session = await getSession();
    useAuthStore.getState().hydrateFromSession(session);
  };

  return {
    user,
    loading: !isHydrated,
    error: null,
    refetch,
  };
}
