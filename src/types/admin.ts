export type UserRole = "SELLER" | "ADMIN";

export interface Admin {
  adminId: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface RecentTransaction {
  transactionId: string;
  orderId: string;
  grandTotal: number;
  email: string;
  name: string;
  createdAt: string;
  status: string;
}

export interface SellerLeaderboardItem {
  sellerId: string;
  name: string;
  email: string;
  gmv: number;
}

export interface CategoryContributionItem {
  categoryId: string;
  name: string;
  sales: number;
  percentage: number;
}

export interface PlatformStats {
  totalRevenue: number;
  platformProfit: number;
  withdrawalPending: number;
  productRequestPending: number;
  totalSellers: number;
  totalProducts: number;
  totalApprovedProducts: number;
  totalTransactionsCount: number;
  totalAdRevenue: number;
  totalAdsCount: number;
  recentTransactions: RecentTransaction[];
  // New Analytics fields
  newSellers30Days: number;
  newProducts30Days: number;
  totalWithdrawn: number;
  totalSellerBalance: number;
  sellerLeaderboard: SellerLeaderboardItem[];
  categoryContribution: CategoryContributionItem[];
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
