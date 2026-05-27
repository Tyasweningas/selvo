import { Seller } from "@/services/auth.service";
import type { Admin } from "@/types/admin";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:3001";

interface BackendLoginResponse {
  error: boolean;
  message?: string;
  data?: {
    token?: string;
    seller?: Seller;
    admin?: Admin;
  };
}

interface BackendMeResponse {
  error: boolean;
  message?: string;
  data?: {
    seller?: Seller;
    admin?: Admin;
  };
}

function getErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const maybeMessage = (payload as { message?: unknown }).message;
  if (typeof maybeMessage === "string" && maybeMessage.trim()) {
    return maybeMessage;
  }

  const maybeError = (payload as { error?: unknown }).error;
  if (typeof maybeError === "string" && maybeError.trim()) {
    return maybeError;
  }

  return fallback;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email dan password wajib diisi.");
        }

        const loginResponse = await fetch(`${BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            role: "SELLER",
          }),
        });

        const loginData = (await loginResponse
          .json()
          .catch(() => null)) as BackendLoginResponse | null;

        if (!loginResponse.ok || !loginData?.data?.token) {
          const fallbackMessage = "Email atau kata sandi tidak valid.";
          throw new Error(getErrorMessage(loginData, fallbackMessage));
        }

        const accessToken = loginData.data.token;
        let seller = loginData.data.seller;

        if (!seller) {
          const meResponse = await fetch(`${BACKEND_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const meData = (await meResponse
            .json()
            .catch(() => null)) as BackendMeResponse | null;

          if (!meResponse.ok || !meData?.data?.seller) {
            throw new Error(
              getErrorMessage(meData, "Gagal mengambil data pengguna."),
            );
          }

          seller = meData.data.seller;
        }

        return {
          id: seller.sellerId,
          email: seller.email,
          name: seller.name,
          sellerId: seller.sellerId,
          balance: seller.balance,
          createdAt: seller.createdAt,
          accessToken,
          role: "SELLER",
        };
      },
    }),
    CredentialsProvider({
      id: "admin-credentials",
      name: "admin-credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email dan password wajib diisi.");
        }

        const loginResponse = await fetch(`${BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            role: "ADMIN",
          }),
        });

        const loginData = (await loginResponse
          .json()
          .catch(() => null)) as BackendLoginResponse | null;

        if (!loginResponse.ok || !loginData?.data?.token) {
          const fallbackMessage = "Email atau kata sandi admin tidak valid.";
          throw new Error(getErrorMessage(loginData, fallbackMessage));
        }

        const accessToken = loginData.data.token;
        let admin = loginData.data.admin;

        if (!admin) {
          const meResponse = await fetch(`${BACKEND_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const meData = (await meResponse
            .json()
            .catch(() => null)) as BackendMeResponse | null;

          const fallbackAdmin = meData?.data?.admin;
          if (!meResponse.ok || !fallbackAdmin) {
            throw new Error(
              getErrorMessage(meData, "Gagal mengambil data admin."),
            );
          }

          admin = fallbackAdmin;
        }

        return {
          id: admin.adminId,
          email: admin.email,
          name: admin.name,
          adminId: admin.adminId,
          createdAt: admin.createdAt,
          accessToken,
          role: "ADMIN",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.sellerId = user.sellerId;
        token.adminId = user.adminId;
        token.balance = user.balance;
        token.createdAt = user.createdAt;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.sellerId = token.sellerId as string | undefined;
        session.user.adminId = token.adminId as string | undefined;
        session.user.balance = token.balance as number | undefined;
        session.user.createdAt = token.createdAt as string | undefined;
        session.user.role = token.role;
      }

      session.accessToken = token.accessToken as string | undefined;
      session.role = token.role;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
