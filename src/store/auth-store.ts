import { Seller } from "@/services/auth.service";
import { Session } from "next-auth";
import { create } from "zustand";

interface AuthStoreState {
  user: Seller | null;
  accessToken: string | null;
  isHydrated: boolean;
  hydrateFromSession: (session: Session | null) => void;
  clearAuthState: () => void;
}

function mapSessionToSeller(session: Session | null): Seller | null {
  if (!session?.user?.sellerId || !session.user.email || !session.user.name) {
    return null;
  }

  return {
    sellerId: session.user.sellerId,
    email: session.user.email,
    name: session.user.name,
    balance: session.user.balance ?? 0,
    createdAt: session.user.createdAt ?? "",
  };
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  accessToken: null,
  isHydrated: false,
  hydrateFromSession: (session) => {
    set({
      user: mapSessionToSeller(session),
      accessToken: session?.accessToken ?? null,
      isHydrated: true,
    });
  },
  clearAuthState: () => {
    set({
      user: null,
      accessToken: null,
      isHydrated: true,
    });
  },
}));
