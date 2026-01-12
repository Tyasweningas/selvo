"use client";

import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import {
  checkPaymentStatus,
  getTransactionByOrderId,
} from "@/services/transaction.service";
import { Transaction } from "@/types/transaction";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoCopy } from "react-icons/io5";
import { toast } from "sonner";

export default function TransactionPage() {
  const router = useRouter();
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId;
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const data = await getTransactionByOrderId(orderId);
        setTransaction(data);
        console.log("✅ Transaction loaded:", data);

        // If already paid, redirect to success page
        if (data.status === "SUCCESS" || data.isPaid) {
          router.push(`/payment-success?orderId=${orderId}`);
        }
      } catch (err: any) {
        console.error("❌ Failed to load transaction:", err);
        setError(err?.message || "Failed to load transaction");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [orderId, router]);

  const handleCheckPayment = async () => {
    if (!orderId) return;

    try {
      setIsCheckingPayment(true);
      const result = await checkPaymentStatus(orderId);

      if (result.isPaid) {
        toast.success(
          "Pembayaran berhasil! Email telah dikirim ke alamat email Anda.",
        );
        // Redirect to payment success page
        router.push(`/payment-success?orderId=${orderId}`);
      } else {
        toast.info("Pembayaran belum diterima. Silakan coba lagi.");
        // Refresh transaction data
        const data = await getTransactionByOrderId(orderId);
        setTransaction(data);
      }
    } catch (err: any) {
      console.error("❌ Failed to check payment:", err);
      toast.error(err?.message || "Gagal memeriksa status pembayaran");
    } finally {
      setIsCheckingPayment(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Disalin ke clipboard!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#1A2B32_20%,#111D22_80%,#0F191E_100%)] text-white">
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-20">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500"></div>
              <p className="text-gray-400">Memuat transaksi...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#1A2B32_20%,#111D22_80%,#0F191E_100%)] text-white">
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-20">
          <div className="flex items-center justify-center py-20">
            <div className="mx-auto max-w-md rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
              <p className="text-red-400">
                ⚠️ {error || "Transaksi tidak ditemukan"}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#1A2B32_20%,#111D22_80%,#0F191E_100%)] text-white">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Success Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
            <IoCheckmarkCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">Transaksi Berhasil!</h1>
          <p className="text-gray-400">
            Silakan scan QR code untuk melakukan pembayaran
          </p>
        </div>

        {/* Transaction Info */}
        <div className="mb-6 rounded-xl border border-[#1b2436] bg-[#0F1624] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Detail Transaksi</h2>
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                transaction.status === "PENDING"
                  ? "bg-yellow-500/20 text-yellow-500"
                  : transaction.status === "SUCCESS"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-red-500/20 text-red-500"
              }`}
            >
              {transaction.status}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-700 pb-3">
              <span className="text-gray-400">Order ID</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-semibold">
                  {transaction.orderId}
                </span>
                <button
                  onClick={() => copyToClipboard(transaction.orderId)}
                  className="text-gray-400 transition hover:text-white"
                >
                  <IoCopy size={18} />
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Nama</span>
              <span className="font-semibold">{transaction.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Email</span>
              <span className="font-semibold">{transaction.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Tanggal</span>
              <span className="font-semibold">
                {new Date(transaction.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* QR Code */}
        {transaction.qrCodeUrl && (
          <div className="mb-6 rounded-xl border border-[#1b2436] bg-[#0F1624] p-6 text-center">
            <h3 className="mb-4 text-lg font-bold">QR Code Pembayaran</h3>
            <div className="mx-auto max-w-xs rounded-lg bg-white p-4">
              <Image
                src={transaction.qrCodeUrl}
                alt="QR Code Pembayaran"
                width={300}
                height={300}
                className="h-auto w-full"
                unoptimized
              />
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Scan QR code dengan aplikasi GoPay atau QRIS untuk melakukan
              pembayaran
            </p>

            {/* Check Payment Button */}
            <button
              onClick={handleCheckPayment}
              disabled={isCheckingPayment}
              className="mt-6 w-full rounded-xl bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCheckingPayment
                ? "Memeriksa Pembayaran..."
                : "Cek Status Pembayaran"}
            </button>
          </div>
        )}

        {/* Products */}
        <div className="mb-6 rounded-xl border border-[#1b2436] bg-[#0F1624] p-6">
          <h3 className="mb-4 text-lg font-bold">Produk yang Dibeli</h3>
          <div className="space-y-3">
            {transaction.transactionItems.map((item) => (
              <div
                key={item.transactionItemId}
                className="flex justify-between rounded-lg bg-[#1A252B] p-4"
              >
                <div>
                  <p className="font-semibold">{item.product?.name}</p>
                  <p className="text-sm text-gray-400">
                    {item.product?.description?.substring(0, 100)}...
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-yellow-400">
                    IDR {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="rounded-xl border border-[#1b2436] bg-[#0F1624] p-6">
          <h3 className="mb-4 text-lg font-bold">Rincian Pembayaran</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>IDR {transaction.subTotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Biaya Admin</span>
              <span>IDR {transaction.adminFee.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Biaya Layanan</span>
              <span>IDR {transaction.serviceFee.toLocaleString("id-ID")}</span>
            </div>
            <div className="border-t border-gray-700 pt-2">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-yellow-400">
                  IDR {transaction.grandTotal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
