'use client';
import Navbar from '@/components/global/navbar';
import Footer from '@/components/global/footer';
import PaymentHeader from '@/components/customer/payment/payment-header';
import CheckOutCart from '@/components/customer/payment/check-out-cart';
import Image from 'next/image';
import { useState } from 'react';
import bsi from '@/assets/logo/bsi.png';
import bni from '@/assets/logo/bni.png';
import bri from '@/assets/logo/bri.png';
import bjb from '@/assets/logo/bjb.png';
import { productPaymentItems } from '@/data/product-payment-items';

export default function PaymentPage() {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const subtotal = productPaymentItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const banks = [
    { id: 'bsi', img: bsi, name: 'BSI', width: 180, height: 90 },
    { id: 'bni', img: bni, name: 'BNI', width: 160, height: 80 },
    { id: 'bri', img: bri, name: 'BRI', width: 160, height: 80 },
    { id: 'bjb', img: bjb, name: 'BJB', width: 160, height: 80 },
  ];

  return (
    <>
      {/* Navbar stay di atas */}
      <Navbar />

      <main className="min-h-screen px-6 md:px-16 py-10 bg-gradient-to-b from-bg-blue via-bg-nav to-bg-nav text-white font-gilroy">
        <PaymentHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* 🧾 Kiri: Form */}
          <div className="flex flex-col gap-6">
            {/* 📨 Informasi Pemesan */}
            <div className="bg-bg-nav border-2 border-bg-div rounded-2xl p-6 shadow-lg hover:shadow-primary-blue/10 transition-all duration-300">
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
                  className="w-full bg-bg-div rounded-lg px-5 py-4 border border-bg-blue text-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
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
                  className="w-full bg-bg-div rounded-lg px-5 py-4 border border-bg-blue mb-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <select className="w-full bg-bg-div rounded-lg px-5 py-4 border border-bg-blue mb-3 text-lg focus:outline-none">
                  <option>INDONESIA</option>
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nama depan..."
                    className="bg-bg-div rounded-lg px-5 py-4 border border-bg-blue text-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Nama belakang..."
                    className="bg-bg-div rounded-lg px-5 py-4 border border-bg-blue text-lg focus:outline-none"
                  />
                </div>
                <label className="flex items-center gap-2 mt-3 text-base text-sec-netral">
                  <input type="checkbox" /> Simpan informasi ini untuk pembayaran berikutnya
                </label>
              </div>
            </div>

            {/* 💳 Metode Pembayaran */}
            <div className="bg-bg-nav border-2 border-bg-div rounded-2xl p-6 shadow-lg hover:shadow-primary-blue/10 transition-all duration-300">
              <h2 className="text-xl font-bold mb-4 text-white">
                Metode Pembayaran <span className="text-primary-blue">*</span>
              </h2>
              <p className="text-base text-sec-netral mb-3">Pilih Bank atau E-wallet:</p>

              <div className="grid grid-cols-2 gap-6 mb-4">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`rounded-xl border-2 transition-all duration-300 p-6 bg-bg-div hover:scale-110 ${
                      selectedBank === bank.id
                        ? 'border-primary-blue'
                        : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={bank.img}
                      alt={bank.name}
                      width={bank.width * 1.2}
                      height={bank.height * 1.2}
                      className="mx-auto object-contain"
                    />
                    <p className="text-center mt-3 text-lg font-semibold text-white">
                      {bank.name}
                    </p>
                  </button>
                ))}
              </div>

              <button className="w-full bg-primary-blue hover:bg-bg-blue text-white py-4 rounded-lg mt-4 font-bold text-lg">
                Selesaikan Pembayaran
              </button>
            </div>
          </div>

          {/* 🛒 Kanan: CheckOut Cart */}
          <div className="scale-100 transform transition-all duration-600">
            <CheckOutCart items={productPaymentItems} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
