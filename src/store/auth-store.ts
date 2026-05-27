import { Seller } from "@/services/auth.service";
import type { Admin, UserRole } from "@/types/admin";
import { Session } from "next-auth";
import { create } from "zustand";

interface AuthStoreState {
  user: Seller | null;
  admin: Admin | null;
  role: UserRole | null;
  accessToken: string | null;
  isHydrated: boolean;
  hydrateFromSession: (session: Session | null) => void;
  clearAuthState: () => void;
}

function mapSessionToSeller(session: Session | null): Seller | null {
  if (
    !session ||
    session.user?.role !== "SELLER" ||
    !session.user?.sellerId ||
    !session.user.email ||
    !session.user.name
  ) {
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

function mapSessionToAdmin(session: Session | null): Admin | null {
  if (
    !session ||
    session.user?.role !== "ADMIN" ||
    !session.user?.adminId ||
    !session.user.email ||
    !session.user.name
  ) {
    return null;
  }

  return {
    adminId: session.user.adminId,
    email: session.user.email,
    name: session.user.name,
    createdAt: session.user.createdAt ?? "",
  };
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  admin: null,
  role: null,
  accessToken: null,
  isHydrated: false,
  hydrateFromSession: (session) => {
    set({
      user: mapSessionToSeller(session),
      admin: mapSessionToAdmin(session),
      role: session?.user?.role ?? null,
      accessToken: session?.accessToken ?? null,
      isHydrated: true,
    });
  },
  clearAuthState: () => {
    set({
      user: null,
      admin: null,
      role: null,
      accessToken: null,
      isHydrated: true,
    });
  },
}));
