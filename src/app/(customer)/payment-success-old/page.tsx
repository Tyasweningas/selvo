"use client";

import Button from "@/components/global/button";
import Input from "@/components/global/input";
import Navbar from "@/components/global/navbar";
import PaymentItemCard from "@/components/payment/payment-item-card";
import { products } from "@/data/mock/product-card-mock";
import { product_categories } from "@/data/product-categories";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineDescription } from "react-icons/md";

// Mock Data

const MOCK_DOWNLOAD_URL =
  "https://play.google.com/store/apps/details?id=com.google.android.apps.docs&hl=id"; //Mock URL Download

export default function PaymentSuccessPage() {
  const userEmail = "ibnuhanif2000@gmail.com"; // Mock email

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
        <div className="border-bg-light bg-bg-div w-full max-w-4xl rounded-3xl border-2 p-6 sm:p-8">
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
            {products.slice(0, 4).map((item) => {
              // Check both .ts and .tsx property names
              const category: any =
                product_categories[(item.categoryId || 1) - 1] ||
                product_categories[0];
              const categoryName =
                category.categorieName || category.name || "Kategori";
              return (
                <PaymentItemCard
                  key={item.id}
                  item={item}
                  downloadUrl={MOCK_DOWNLOAD_URL}
                  tag={categoryName}
                  categoryIcon={category.icon}
                />
              );
            })}
          </div>
        </div>

        {/* Email Section */}
        <div className="border-bg-light bg-bg-div w-full max-w-4xl rounded-3xl border-2 p-6 sm:p-8">
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
            value={userEmail}
            readOnly
            className="!text-sec-netral w-full !py-3"
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
