declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";
declare module "*.css";

import type { UserRole } from "@/types/admin";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    sellerId?: string;
    adminId?: string;
    balance?: number;
    createdAt?: string;
    accessToken: string;
    role: UserRole;
  }

  interface Session {
    accessToken?: string;
    role?: UserRole;
    user: {
      sellerId?: string;
      adminId?: string;
      balance?: number;
      createdAt?: string;
      role?: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    sellerId?: string;
    adminId?: string;
    balance?: number;
    createdAt?: string;
    role?: UserRole;
  }
}
