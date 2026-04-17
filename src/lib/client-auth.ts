import { useAuthStore } from "@/store/auth-store";
import { getSession } from "next-auth/react";

export async function getClientAccessToken(): Promise<string | null> {
  const tokenInStore = useAuthStore.getState().accessToken;
  if (tokenInStore) {
    return tokenInStore;
  }

  if (typeof window === "undefined") {
    return null;
  }

  const session = await getSession();
  useAuthStore.getState().hydrateFromSession(session);

  return session?.accessToken ?? null;
}

export async function withAuthHeader(
  headers: Record<string, string> = {},
): Promise<Record<string, string>> {
  const accessToken = await getClientAccessToken();

  if (!accessToken) {
    return headers;
  }

  return {
    ...headers,
    Authorization: `Bearer ${accessToken}`,
  };
}
