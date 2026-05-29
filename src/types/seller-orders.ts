/**
 * Tipe data untuk transaksi & review yang dilihat dari sisi seller.
 * Mengikuti shape response dari endpoint:
 *   GET /api/sellers/transactions
 *   GET /api/sellers/transactions/:transactionId
 *   GET /api/sellers/reviews
 */

/**
 * Status transaksi yang dapat dilihat oleh seller.
 * Backend menyembunyikan PENDING karena pembayaran belum selesai.
 */
export type SellerVisibleTransactionStatus = "SUCCESS" | "REJECTED";

export interface SellerTransactionItemSummary {
  transactionItemId: string;
  productId: string;
  price: number;
  product: {
    productId: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    categoryName: string | null;
  };
  review: {
    reviewId: string;
    star: number;
    message: string | null;
    name: string;
    createdAt: string;
  } | null;
}

/** Item ringkas untuk tabel daftar transaksi. */
export interface SellerTransactionListItem {
  transactionId: string;
  orderId: string;
  buyerName: string;
  buyerEmail: string;
  status: SellerVisibleTransactionStatus;
  date: string;
  createdAt: string;
  sellerSubtotal: number;
  itemsCount: number;
  reviewedCount: number;
}

/** Detail transaksi (dipakai di modal). */
export interface SellerTransactionDetail extends SellerTransactionListItem {
  items: SellerTransactionItemSummary[];
}

export interface SellerTransactionMeta {
  page: number;
  limit: number;
  total: number;
  counts: Record<SellerVisibleTransactionStatus | "ALL", number>;
}

export interface SellerReviewItem {
  reviewId: string;
  transactionItemId: string;
  productId: string;
  name: string;
  star: number;
  message: string | null;
  createdAt: string;
  product: {
    productId: string;
    name: string;
    slug: string;
    imageUrl: string | null;
  };
}

export type ReviewStarKey = "1" | "2" | "3" | "4" | "5";

export interface SellerReviewMeta {
  page: number;
  limit: number;
  total: number;
  averageStar: number;
  distribution: Record<ReviewStarKey, number>;
}

export interface ListSellerTransactionsParams {
  page?: number;
  limit?: number;
  status?: SellerVisibleTransactionStatus;
  search?: string;
  productId?: string;
}

export interface ListSellerReviewsParams {
  page?: number;
  limit?: number;
  productId?: string;
  star?: number;
}
