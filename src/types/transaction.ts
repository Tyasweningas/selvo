export enum TransactionStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
}

export interface TransactionItem {
  transactionItemId: string;
  productId: string;
  price: number;
  createdAt: string;
  product?: {
    productId: string;
    sellerId: string;
    categoryId: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    totalSold: number;
    status: string;
    viewCount: number;
    productLink: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Transaction {
  transactionId: string;
  orderId: string;
  grandTotal: number;
  subTotal: number;
  adminFee: number;
  serviceFee: number;
  email: string;
  name: string;
  date: string;
  status: TransactionStatus;
  createdAt: string;
  transactionItems: TransactionItem[];
  qrCodeUrl?: string;
  isPaid?: boolean;
}

export interface CreateTransactionPayload {
  name: string;
  email: string;
  items: string[]; // Array of productId
}

export interface CreateTransactionResponse {
  error: boolean;
  message: string;
  data: {
    transaction: Transaction;
  };
}
