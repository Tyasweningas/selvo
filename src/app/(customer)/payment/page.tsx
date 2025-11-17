'use client';
import Navbar from '@/components/global/navbar';
import Footer from '@/components/global/footer';
import PaymentHeader from '@/components/customer/payment/payment-header';
import CheckOutCart from '@/components/customer/payment/check-out-cart';
import Image from 'next/image';
import { useState } from 'react';
import { FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { IoCopyOutline } from 'react-icons/io5';
import { productPaymentItems } from '@/data/mock/product-payment-items';
import qrisLogo from '@/assets/logo/qrisLogo.png'
import qrisCode from '@/assets/logo/qrisCode.png'

export default function PaymentPage() {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [orderId] = useState('00000001389520251110');
  const [orderDate] = useState('10 November 2025');
  const [showQRIS, setShowQRIS] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    alert('ID Pesanan disalin!');
  };

  const subtotal = productPaymentItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );


  return (
    <>
      <Navbar />
      <main className="px-6 md:px-16 py-55 bg-gradient-to-b from-bg-blue via-bg-nav to-bg-nav text-white font-gilroy">
        <PaymentHeader />

        {/*Layout utama dua kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
          
          <div className="flex flex-col gap-6">
            {/* 📦 Informasi Pesanan */}
            <div className="bg-[#0f191e] text-white rounded-2xl border border-[#1f2a2d] p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-primary-blue/20 p-2 rounded-lg">
                  <FaClipboardList size={18} className="text-primary-blue" />
                </div>
                <h2 className="text-lg font-bold font-[Gilroy]">
                  Informasi Pesanan <span className="text-primary-blue">*</span>
                </h2>
              </div>

              <p className="text-sm text-gray-400 mb-6">
                Tautan dari item digital yang anda beli akan dikirimkan lewat email
                yang anda cantumkan
              </p>

              <div className="space-y-4">
                {/* Tanggal Pesanan */}               
                <div className="flex items-center gap-4">
                  {/* Label */}
                  <div className="flex items-center gap-2 bg-primary-blue px-5 py-3 rounded-[25px] font-semibold text-base text-white min-w-[220px] justify-center">
                    <FaCalendarAlt size={18} />
                  <span>Tanggal Pesanan</span>
                </div>

                  {/* Nilai Tanggal */}
                  <div className="flex items-center bg-[#1a2b32] text-gray-200 text-base px-6 py-3 rounded-[25px] border border-[#23343b] flex-1 justify-between">
                    {orderDate}
                  </div>
                </div>


                {/* ID Pesanan */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-primary-blue px-5 py-3 rounded-[25px] font-semibold text-base text-white min-w-[220px] justify-center">
                    <FaClipboardList size={18} />
                    <span>ID Pesanan</span>
                  </div>
                  <div className="flex items-center bg-[#1a2b32] text-gray-200 text-base px-6 py-3 rounded-[25px] border border-[#23343b] flex-1 justify-between">
                    <span className="truncate">{orderId}</span>
                    <button
                      onClick={handleCopy}
                      className="text-gray-400 hover:text-white transition"
                      aria-label="Salin ID Pesanan"
                    >
                      <IoCopyOutline size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 📨 Informasi Pemesan */}
            <div className="bg-bg-nav border-2 border-bg-div rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                Informasi Pemesan <span className="text-primary-blue">*</span>
              </h2>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-white text-lg">
                  Alamat Email
                </label>
                <input
                  type="email"
                  placeholder="Masukkan alamat emailmu..."
                  className="w-full bg-bg-div rounded-[25px] px-5 py-4 border border-bg-blue text-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <label className="flex items-center gap-2 mt-3 text-base text-sec-netral">
                  <input type="checkbox" /> Ingat email saya
                </label>
              </div>

              {/* Data Pemesan */}
              <div className="border-t border-bg-div pt-5 mt-3">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Data Pemesan
                </h3>
                <input
                  type="text"
                  placeholder="Nomor WhatsApp..."
                  className="w-full bg-bg-div rounded-[25px] px-5 py-4 border border-bg-blue mb-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <select className="w-full bg-bg-div rounded-[25px] px-5 py-4 border border-bg-blue mb-3 text-lg focus:outline-none">
                  <option>INDONESIA</option>
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nama depan..."
                    className="bg-bg-div rounded-[25px] px-5 py-4 border border-bg-blue text-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Nama belakang..."
                    className="bg-bg-div rounded-[25px] px-5 py-4 border border-bg-blue text-lg focus:outline-none"
                  />
                </div>
                <label className="flex items-center gap-2 mt-3 text-base text-sec-netral">
                  <input type="checkbox" /> Simpan informasi ini untuk pembayaran berikutnya
                </label>
              </div>
            </div>

            {/* 💳 Metode Pembayaran */}
            <div className="bg-bg-nav border-2 border-bg-div rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-white">
                Metode Pembayaran <span className="text-primary-blue">*</span>
              </h2>

              {!showQRIS ? (
                // Tampilan sebelum generate
                <div className="flex justify-between items-center bg-[#0f191e] rounded-2xl p-5">
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
                    className="bg-bg-blue hover:bg-primary-blue text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
                  >
                    Generate QRIS
                  </button>
                </div>
              ) : (
                // Tampilan setelah tombol diklik
                <div className="bg-[#0f191e] border border-bg-div rounded-2xl p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <Image
                      src={qrisLogo}
                      alt="QRIS Logo"
                      width={120}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-base text-gray-300 mb-6">
                    Scan Kode QRIS dibawah
                  </h3>
                  <div className="flex justify-center mb-6">
                    <Image
                      src={qrisCode}
                      alt="QRIS Code"
                      width={230}
                      height={230}
                      className="rounded-xl"
                    />
                  </div>
                  <button
                    className="bg-bg-blue hover:bg-primary-blue text-white font-bold px-8 py-3 rounded-full w-full transition-all duration-300"
                  >
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
