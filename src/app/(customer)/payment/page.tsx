"use client";
import qrisCode from "@/assets/logo/qrisCode.png";
import qrisLogo from "@/assets/logo/qrisLogo.png";
import CheckOutCart from "@/components/customer/payment/check-out-cart";
import PaymentHeader from "@/components/customer/payment/payment-header";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { productPaymentItems } from "@/data/mock/product-payment-items";
import Image from "next/image";
import { useState } from "react";
import { FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

export default function PaymentPage() {
  // const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [orderId] = useState("00000001389520251110");
  const [orderDate] = useState("10 November 2025");
  const [showQRIS, setShowQRIS] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    alert("ID Pesanan disalin!");
  };

  return (
    <>
      <Navbar />
      <main className="from-bg-blue via-bg-nav to-bg-nav font-gilroy bg-gradient-to-b px-6 py-55 text-white md:px-16">
        <PaymentHeader />

        {/*Layout utama dua kolom */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {/* 📦 Informasi Pesanan */}
            <div className="rounded-2xl border border-[#1f2a2d] bg-[#0f191e] p-6 text-white shadow-lg">
              <div className="mb-2 flex items-center gap-2">
                <div className="bg-primary-blue/20 rounded-lg p-2">
                  <FaClipboardList size={18} className="text-primary-blue" />
                </div>
                <h2 className="font-[Gilroy] text-lg font-bold">
                  Informasi Pesanan <span className="text-primary-blue">*</span>
                </h2>
              </div>

              <p className="mb-6 text-sm text-gray-400">
                Tautan dari item digital yang anda beli akan dikirimkan lewat
                email yang anda cantumkan
              </p>

              <div className="space-y-4">
                {/* Tanggal Pesanan */}
                <div className="flex items-center gap-4">
                  {/* Label */}
                  <div className="bg-primary-blue flex min-w-[220px] items-center justify-center gap-2 rounded-[25px] px-5 py-3 text-base font-semibold text-white">
                    <FaCalendarAlt size={18} />
                    <span>Tanggal Pesanan</span>
                  </div>

                  {/* Nilai Tanggal */}
                  <div className="flex flex-1 items-center justify-between rounded-[25px] border border-[#23343b] bg-[#1a2b32] px-6 py-3 text-base text-gray-200">
                    {orderDate}
                  </div>
                </div>

                {/* ID Pesanan */}
                <div className="flex items-center gap-4">
                  <div className="bg-primary-blue flex min-w-[220px] items-center justify-center gap-2 rounded-[25px] px-5 py-3 text-base font-semibold text-white">
                    <FaClipboardList size={18} />
                    <span>ID Pesanan</span>
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-[25px] border border-[#23343b] bg-[#1a2b32] px-6 py-3 text-base text-gray-200">
                    <span className="truncate">{orderId}</span>
                    <button
                      onClick={handleCopy}
                      className="text-gray-400 transition hover:text-white"
                      aria-label="Salin ID Pesanan"
                    >
                      <IoCopyOutline size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 📨 Informasi Pemesan */}
            <div className="bg-bg-nav border-bg-div rounded-2xl border-2 p-6 shadow-lg">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                Informasi Pemesan <span className="text-primary-blue">*</span>
              </h2>

              {/* Email */}
              <div className="mb-4">
                <label className="mb-2 block text-lg font-semibold text-white">
                  Alamat Email
                </label>
                <input
                  type="email"
                  placeholder="Masukkan alamat emailmu..."
                  className="bg-bg-div border-bg-blue focus:ring-primary-blue w-full rounded-[25px] border px-5 py-4 text-lg focus:ring-2 focus:outline-none"
                />
                <label className="text-sec-netral mt-3 flex items-center gap-2 text-base">
                  <input type="checkbox" /> Ingat email saya
                </label>
              </div>

              {/* Data Pemesan */}
              <div className="border-bg-div mt-3 border-t pt-5">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Data Pemesan
                </h3>
                <input
                  type="text"
                  placeholder="Nomor WhatsApp..."
                  className="bg-bg-div border-bg-blue focus:ring-primary-blue mb-3 w-full rounded-[25px] border px-5 py-4 text-lg focus:ring-2 focus:outline-none"
                />
                <select className="bg-bg-div border-bg-blue mb-3 w-full rounded-[25px] border px-5 py-4 text-lg focus:outline-none">
                  <option>INDONESIA</option>
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nama depan..."
                    className="bg-bg-div border-bg-blue rounded-[25px] border px-5 py-4 text-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Nama belakang..."
                    className="bg-bg-div border-bg-blue rounded-[25px] border px-5 py-4 text-lg focus:outline-none"
                  />
                </div>
                <label className="text-sec-netral mt-3 flex items-center gap-2 text-base">
                  <input type="checkbox" /> Simpan informasi ini untuk
                  pembayaran berikutnya
                </label>
              </div>
            </div>

            {/* 💳 Metode Pembayaran */}
            <div className="bg-bg-nav border-bg-div rounded-2xl border-2 p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-white">
                Metode Pembayaran <span className="text-primary-blue">*</span>
              </h2>

              {!showQRIS ? (
                // Tampilan sebelum generate
                <div className="flex items-center justify-between rounded-2xl bg-[#0f191e] p-5">
                  <div className="flex items-center gap-3">
                    <Image
                      src={qrisLogo}
                      alt="QRIS Logo"
                      width={120}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <button
                    onClick={() => setShowQRIS(true)}
                    className="bg-bg-blue hover:bg-primary-blue rounded-full px-6 py-3 font-semibold text-white transition-all duration-300"
                  >
                    Generate QRIS
                  </button>
                </div>
              ) : (
                // Tampilan setelah tombol diklik
                <div className="border-bg-div rounded-2xl border bg-[#0f191e] p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={qrisLogo}
                      alt="QRIS Logo"
                      width={120}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mb-6 text-base text-gray-300">
                    Scan Kode QRIS dibawah
                  </h3>
                  <div className="mb-6 flex justify-center">
                    <Image
                      src={qrisCode}
                      alt="QRIS Code"
                      width={230}
                      height={230}
                      className="rounded-xl"
                    />
                  </div>
                  <button className="bg-bg-blue hover:bg-primary-blue w-full rounded-full px-8 py-3 font-bold text-white transition-all duration-300">
                    Cek Pembayaran
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ===================== */}
          {/* 🛒 DIV 2 - Kanan */}
          {/* ===================== */}
          <div className="scale-100 transform transition-all duration-600">
            <CheckOutCart items={productPaymentItems} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
