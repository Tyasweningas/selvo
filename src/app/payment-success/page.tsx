"use client";

import Button from "@/components/global/button";
import Footer from "@/components/global/footer";
import Input from "@/components/global/input";
import Navbar from "@/components/global/navbar";
import { getTransactionByOrderId } from "@/services/transaction.service";
import { Transaction } from "@/types/transaction";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineDescription } from "react-icons/md";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      router.push("/");
      return;
    }

    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const data = await getTransactionByOrderId(orderId);
        setTransaction(data);

        // If not paid yet, redirect back to transaction page
        if (data.status !== "SUCCESS" && !data.isPaid) {
          router.push(`/transactions/${orderId}`);
        }
      } catch (err: any) {
        console.error("❌ Failed to load transaction:", err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [orderId, router]);

  if (loading || !transaction) {
    return (
      <>
        <Navbar />
        <div className="fixed inset-0 -z-20 bg-[linear-gradient(180deg,#1C4763_0%,#111D29_80%,#0F191E_100%)]" />
        <div className="relative flex min-h-screen flex-col items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500"></div>
            <p className="text-gray-400">Memuat...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="fixed inset-0 -z-20 bg-[linear-gradient(180deg,#1C4763_0%,#111D29_80%,#0F191E_100%)]" />
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-4 pt-40 pb-10 md:px-20">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            <FaCheck className="text-5xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Pembayaran Berhasil
            </h1>
            <p className="text-sec-netral mt-2">
              Kamu telah berhasil melakukan transaksi pembayaran dari item
              digitalmu
            </p>
          </div>
        </div>

        {/* Items List Section */}
        <div className="bg-bg-div border-bg-light w-full max-w-4xl rounded-3xl border-2 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
            <div className="bg-primary-blue rounded-lg p-2">
              <MdOutlineDescription className="text-white" />
            </div>
            <h2>Tautan Item Keranjangmu</h2>
          </div>

          <p className="text-sec-netral mb-4 text-sm">
            Berikut adalah tautan item keranjangmu
          </p>

          <div className="flex flex-col gap-4">
            {transaction.transactionItems.map((item) => (
              <div
                key={item.transactionItemId}
                className="flex flex-col gap-4 rounded-xl border border-[#1b2436] bg-[#0F1624] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-white">
                    {item.product?.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {item.product?.description?.substring(0, 100)}...
                  </p>
                  <p className="mt-2 font-semibold text-yellow-400">
                    IDR {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
                {item.product?.productLink && (
                  <a
                    href={item.product.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-sky-500 px-6 py-2 text-center font-semibold text-white transition hover:bg-sky-600"
                  >
                    Download
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Email Section */}
        <div className="bg-bg-div border-bg-light w-full max-w-4xl rounded-3xl border-2 p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
            <div className="bg-primary-blue rounded-lg p-2">
              <HiOutlineMail className="text-white" />
            </div>
            <h2>
              Cek Inbox Emailmu <span className="text-primary-blue">*</span>
            </h2>
          </div>

          <p className="text-sec-netral mb-6 text-sm">
            Tautan item-item mu sudah dikirimkan ke email yang sudah kamu
            masukkan
          </p>

          <Input
            value={transaction.email}
            readOnly
            className="text-sec-netral w-full !py-3"
          />
        </div>

        {/* Transaction Details */}
        <div className="bg-bg-div border-bg-light w-full max-w-4xl rounded-3xl border-2 p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-white">
            Rincian Transaksi
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-400">
              <span>Order ID</span>
              <span className="font-mono font-semibold text-white">
                {transaction.orderId}
              </span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="text-white">
                IDR {transaction.subTotal.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Biaya Admin</span>
              <span className="text-white">
                IDR {transaction.adminFee.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Biaya Layanan</span>
              <span className="text-white">
                IDR {transaction.serviceFee.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="border-t border-gray-700 pt-2">
              <div className="flex justify-between text-xl font-bold">
                <span className="text-white">Total</span>
                <span className="text-yellow-400">
                  IDR {transaction.grandTotal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <Link href="/">
          <Button variant="primary" size="lg" className="px-12">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
}
