"use client";

import React from "react";
import Button from "@/components/global/button";
import PaymentItemCard from "@/components/payment/payment-item-card";
import { ProductCardType } from "@/types/product-card";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import Input from "@/components/global/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdOutlineDescription } from "react-icons/md";

// Mock Data
const MOCK_ITEMS: ProductCardType[] = [
  {
    id: 1,
    name: "Templat Laman Website",
    creator: "Ibnu Hanif",
    thumbnail: "https://placehold.co/100x100/jpg", // Placeholder
    price: 0,
    rate: 5,
    categoryId: 1,
  },
  {
    id: 2,
    name: "Templat Laman Website",
    creator: "Ibnu Hanif",
    thumbnail: "https://placehold.co/100x100/jpg",
    price: 0,
    rate: 5,
    categoryId: 1,
  },
  {
    id: 3,
    name: "Templat Laman Website",
    creator: "Ibnu Hanif",
    thumbnail: "https://placehold.co/100x100/jpg",
    price: 0,
    rate: 5,
    categoryId: 1,
  },
  {
    id: 4,
    name: "Templat Laman Website",
    creator: "Ibnu Hanif",
    thumbnail: "https://placehold.co/100x100/jpg",
    price: 0,
    rate: 5,
    categoryId: 1,
  },
];

const MOCK_DOWNLOAD_URL =
  "https://play.google.com/store/apps/details?id=com.google.android.apps.docs&hl=id";

export default function PaymentSuccessPage() {
  const userEmail = "ibnuhanif2000@gmail.com"; // Mock email for now

  return (
    <>
      <div className="fixed inset-0 -z-20 bg-[linear-gradient(180deg,#1C4763_0%,#111D29_80%,#0F191E_100%)]" />
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-10 md:px-20 overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
          <FaCheck className="text-5xl text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Pembayaran Berhasil</h1>
          <p className="mt-2 text-sec-netral">
            Kamu telah berhasil melakukan transaksi pembayaran dari item digitalmu
          </p>
        </div>
      </div>

      {/* Items List Section */}
      <div className="w-full max-w-4xl rounded-3xl border-2 border-bg-light bg-bg-main p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
          <div className="rounded-lg bg-primary-blue p-2">
            <MdOutlineDescription className="text-white" />
          </div>
          <h2>Tautan Item Keranjangmu</h2>
        </div>
        
        <p className="mb-4 text-sm text-sec-netral">
          Berikut adalah tautan item keranjangmu
        </p>

        <div className="flex flex-col gap-4">
          {MOCK_ITEMS.map((item) => (
            <PaymentItemCard
              key={item.id}
              item={item}
              downloadUrl={MOCK_DOWNLOAD_URL}
              tag="Ilustrasi"
            />
          ))}
        </div>
      </div>

      {/* Email Section */}
      <div className="w-full max-w-4xl rounded-3xl border-2 border-bg-light bg-bg-main p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
            <div className="rounded-lg bg-primary-blue p-2">
                <HiOutlineMail className="text-white" />
            </div>
          <h2>Cek Inbox Emailmu <span className="text-primary-blue">*</span></h2>
        </div>
        
        <p className="mb-6 text-sm text-sec-netral">
          Tautan item-item mu sudah dikirimkan ke email yang sudah kamu masukkan
        </p>

        <Input
          value={userEmail}
          readOnly
          className="w-full !py-3 !text-sec-netral"
        />
      </div>

      {/* Footer Action */}
      <Link href="/">
        <Button variant="primary" size="lg" className="px-12">
          Kembali ke Beranda
        </Button>
      </Link>
    </div>

    </>
  );
}
