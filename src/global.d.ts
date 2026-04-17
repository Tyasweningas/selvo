declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";
declare module "*.css";

import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    sellerId: string;
    balance: number;
    createdAt: string;
    accessToken: string;
  }

  interface Session {
    accessToken?: string;
    user: {
      sellerId?: string;
      balance?: number;
      createdAt?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    sellerId?: string;
    balance?: number;
    createdAt?: string;
  }
}
