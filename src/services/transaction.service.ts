import apiClient from "@/lib/api-client";
import { BaseResponse } from "@/types/api";
import {
  CreateTransactionPayload,
  CreateTransactionResponse,
  Transaction,
} from "@/types/transaction";

/**
 * Transaction Service
 * Handles all transaction-related API calls
 */

/**
 * Create a new transaction
 * @param payload - Transaction data
 * @returns Created transaction data
 */
export const createTransaction = async (
  payload: CreateTransactionPayload,
): Promise<Transaction> => {
  try {
    const response = await apiClient.post<CreateTransactionResponse>(
      "/transactions",
      payload,
    );

    return response.data.data.transaction;
  } catch (error: any) {
    console.error("❌ Create Transaction Error:", error);
    throw error;
  }
};

/**
 * Get transaction by order ID
 * @param orderId - Transaction order ID
 * @returns Transaction detail
 */
export const getTransactionByOrderId = async (
  orderId: string,
): Promise<Transaction> => {
  try {
    const response = await apiClient.get<
      BaseResponse & { data: { transaction: Transaction } }
    >(`/transactions/order/${orderId}`);

    return response.data.data.transaction;
  } catch (error: any) {
    console.error("❌ Get Transaction Error:", error);
    throw error;
  }
};

/**
 * Check payment status
 * @param orderId - Transaction order ID
 * @returns Transaction detail with payment status
 */
export const checkPaymentStatus = async (
  orderId: string,
): Promise<{ transaction: Transaction; isPaid: boolean }> => {
  try {
    const response = await apiClient.post<
      BaseResponse & { data: { transaction: Transaction; isPaid: boolean } }
    >(`/transactions/check-payment/${orderId}`);

    return response.data.data;
  } catch (error: any) {
    console.error("❌ Check Payment Status Error:", error);
    throw error;
  }
};

const transactionService = {
  createTransaction,
  getTransactionByOrderId,
  checkPaymentStatus,
};

export default transactionService;
