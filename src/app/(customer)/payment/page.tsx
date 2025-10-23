'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PaymentHeader from '@/features/seller/components/PaymentHeader'
import CheckOutChart from '@/features/seller/components/CheckOutChart'
import Image from 'next/image'
import { useState } from 'react'
import bsi from '@/assets/logo/bsi.png'
import bni from '@/assets/logo/bni.png'
import bri from '@/assets/logo/bri.png'
import bjb from '@/assets/logo/bjb.png'

export default function PaymentPage() {
  const [selectedBank, setSelectedBank] = useState<string | null>(null)

  const items = [
    { id: 1, name: 'Templat Laman Website', variant: 'Varian warna pink', qty: 1, price: 1500000, img: '/images/item1.png' },
    { id: 2, name: 'Kumpulan Vektor Olahraga', variant: 'Varian warna pink', qty: 2, price: 1500000, img: '/images/item2.png' },
    { id: 3, name: 'Video Stok Manuk Bakicau', variant: 'Varian warna pink', qty: 3, price: 1500000, img: '/images/item3.png' },
    { id: 4, name: 'Ikon Aesthetic', variant: 'Varian warna pink', qty: 4, price: 1500000, img: '/images/item4.png' },
  ]

  const banks = [
    { id: 'bsi', img: bsi, name: 'BSI', width: 180, height: 90 },
    { id: 'bni', img: bni, name: 'BNI', width: 160, height: 80 },
    { id: 'bri', img: bri, name: 'BRI', width: 160, height: 80 },
    { id: 'bjb', img: bjb, name: 'BJB', width: 160, height: 80 },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 md:px-16 py-10 bg-gradient-to-b from-[#78063de6] via-[#0F191E] to-[#0a0f10] text-white font-gilroy">
        <PaymentHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Kiri: Form */}
          <div className="flex flex-col gap-6">
            
            {/* 📨 Card: Email + Data Pemesan */}
            <div className="bg-[#111D22] border border-[#1A2B32] rounded-2xl p-6 shadow-lg hover:shadow-pink-500/10 transition-all duration-300">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📨 Informasi Pemesan <span className="text-pink-400">*</span>
              </h2>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-2 font-medium">Alamat Email</label>
                <input
                  type="email"
                  placeholder="Masukkan alamat emailmu..."
                  className="w-full bg-[#0f1b1d] rounded-lg px-4 py-3 border border-[#1f2a2d] focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <label className="flex items-center gap-2 mt-3 text-sm text-gray-300">
                  <input type="checkbox" /> Ingat email saya
                </label>
              </div>

              {/* Data Pemesan */}
              <div className="border-t border-[#1A2B32] pt-5 mt-3">
                <h3 className="text-md font-semibold mb-4">📱 Data Pemesan</h3>
                <input
                  type="text"
                  placeholder="Nomor WhatsApp..."
                  className="w-full bg-[#0f1b1d] rounded-lg px-4 py-3 border border-[#1f2a2d] mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <select className="w-full bg-[#0f1b1d] rounded-lg px-4 py-3 border border-[#1f2a2d] mb-3 focus:outline-none">
                  <option>INDONESIA</option>
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nama depan..."
                    className="bg-[#0f1b1d] rounded-lg px-4 py-3 border border-[#1f2a2d] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Nama belakang..."
                    className="bg-[#0f1b1d] rounded-lg px-4 py-3 border border-[#1f2a2d] focus:outline-none"
                  />
                </div>
                <label className="flex items-center gap-2 mt-3 text-sm text-gray-300">
                  <input type="checkbox" /> Simpan informasi ini untuk pembayaran berikutnya
                </label>
              </div>
            </div>

            {/* 💳 Card: Metode Pembayaran */}
            <div className="bg-[#10191e] border border-[#1f2a2d] rounded-2xl p-6 shadow-lg hover:shadow-pink-500/10 transition-all duration-300">
              <h2 className="text-lg font-semibold mb-4">
                💳 Metode Pembayaran <span className="text-pink-400">*</span>
              </h2>
              <p className="text-sm text-gray-400 mb-3">Pilih Bank atau E-wallet:</p>

              <div className="grid grid-cols-2 gap-6 mb-4">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`rounded-xl border-2 transition-all duration-300 p-6 bg-[#0f1b1d] hover:scale-110 ${
                      selectedBank === bank.id ? 'border-pink-500' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={bank.img}
                      alt={bank.name}
                      width={bank.width * 1.2} // 👈 logo diperbesar 20%
                      height={bank.height * 1.2}
                      className="mx-auto object-contain"
                    />
                    <p className="text-center mt-3 text-lg font-medium">{bank.name}</p>
                  </button>
                ))}
              </div>

              <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg mt-4 font-semibold">
                Selesaikan Pembayaran
              </button>
            </div>
          </div>

          {/* Kanan: CheckOut Chart (Diperbesar) */}
          <div className="scale-100 transform transition-all duration-600">
            <CheckOutChart items={items} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
