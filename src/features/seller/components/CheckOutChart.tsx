'use client'
import React from 'react'

interface Item {
  id: number;
  title: string;
  variant: string;
  price: number;
  qty: number;
  image: string;
}

const items: Item[] = [
  {
    id: 1,
    title: "Templat Laman Website",
    variant: "Varian warna pink",
    price: 1500000,
    qty: 1,
    image: "/images/item1.png"
  },
  {
    id: 2,
    title: "Kumpulan Vektor Olahraga",
    variant: "Varian warna pink",
    price: 1500000,
    qty: 2,
    image: "/images/item2.png"
  },
  {
    id: 3,
    title: "Video Stok Manuk Bakicau",
    variant: "Varian warna pink",
    price: 1500000,
    qty: 3,
    image: "/images/item3.png"
  },
  {
    id: 4,
    title: "Ikon Aesthetic",
    variant: "Varian warna pink",
    price: 1500000,
    qty: 4,
    image: "/images/item4.png"
  },
];

export default function CheckOutChart() {
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const biayaPlatform = 8000;
  const pajakDaerah = 9500;
  const biayaLayanan = 10000;
  const total = subtotal + biayaPlatform + pajakDaerah + biayaLayanan;

  return (
    <div className="w-full space-y-6">
      {/* Item List + Ringkasan Pesanan */}
      <div className="bg-[#111D22] border border-[#1A2B32] rounded-xl p-6 space-y-8">
        {/* Daftar Item */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-[#071115] rounded-xl p-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.variant}</p>
                  <div className="mt-2 bg-pink-700/60 px-3 py-1 rounded-md text-sm inline-block">
                    Qty {item.qty}
                  </div>
                </div>
              </div>
              <div className="text-[#facc15] font-semibold">
                IDR {item.price.toLocaleString("id-ID")}
              </div>
            </div>
          ))}
        </div>

        {/* Ringkasan Pesanan di Bawah */}
        <div className="bg-[#071115] rounded-xl p-5 space-y-3 border border-[#172122]">
          <h3 className="font-semibold text-lg text-white">Ringkasan Pesanan</h3>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Subtotal ({items.length} Item)</span>
            <span className="text-white">IDR {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Biaya Platform</span>
            <span className="text-white">IDR {biayaPlatform.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Pajak Daerah</span>
            <span className="text-white">IDR {pajakDaerah.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Biaya Layanan</span>
            <span className="text-white">IDR {biayaLayanan.toLocaleString("id-ID")}</span>
          </div>
          <hr className="border-gray-700 my-3" />
          <div className="flex justify-between text-pink-400 font-bold text-lg">
            <span>Total Pembayaran</span>
            <span>IDR {total.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
