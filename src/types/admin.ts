export type UserRole = "SELLER" | "ADMIN";

export interface Admin {
  adminId: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface PlatformStats {
  totalRevenue: number;
  platformProfit: number;
  withdrawalPending: number;
  productRequestPending: number;
}

export type WithdrawalStatus = "PENDING" | "APPROVED" | "REJECTED";

export type WithdrawalBankName =
  | "BCA"
  | "BNI"
  | "BRI"
  | "BSI"
  | "MANDIRI"
  | "BJB"
  | "PERMATA"
  | "CIMB"
  | "DANAMON"
  | "BTPN"
  | string;

export interface WithdrawalSellerSummary {
  sellerId: string;
  name: string;
  email: string;
}

export interface WithdrawalAdminSummary {
  adminId: string;
  name: string;
  email: string;
}

export interface Withdrawal {
  withdrawalId: string;
  sellerId: string;
  adminId: string | null;
  amount: number | string;
  bankName: WithdrawalBankName;
  bankNumber: string;
  status: WithdrawalStatus;
  note: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  seller?: WithdrawalSellerSummary;
  admin?: WithdrawalAdminSummary | null;
}

export type WithdrawalAction = "approve" | "reject";

export interface ReviewWithdrawalPayload {
  note?: string;
}
