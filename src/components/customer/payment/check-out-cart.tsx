'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { ProductPaymentItem } from '@/data/product-payment-items';

type CheckOutCartProps = {
  items: ProductPaymentItem[];
};

export default function CheckOutCart({ items }: CheckOutCartProps) {
  // Hitung subtotal
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const biayaPlatform = 8000;
  const pajakDaerah = 9500;
  const biayaLayanan = 10000;
  const total = subtotal + biayaPlatform + pajakDaerah + biayaLayanan;

  return (
    <div className="w-full space-y-6">
      {/* 🛒 Item List + Ringkasan Pesanan */}
      <div className="bg-[#111D22] border border-[#1A2B32] rounded-xl p-6 space-y-8">
        
        {/* Daftar Item */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-[#071115] rounded-xl p-4"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{item.name}</h4>
                  <p className="text-sm text-gray-400">{item.variant}</p>
                  <div className="mt-2 bg-bg-blue px-3 py-1 rounded-md text-sm inline-block">
                    Qty {item.qty}
                  </div>
                </div>
              </div>
              <div className="text-[#facc15] font-semibold">
                IDR {(item.price * item.qty).toLocaleString('id-ID')}
              </div>
            </div>
          ))}
        </div>

        {/* Ringkasan Pesanan */}
        <div className="bg-[#071115] rounded-xl p-5 space-y-3 border border-[#172122]">
          <h3 className="font-semibold text-lg text-white">Ringkasan Pesanan</h3>

          <div className="flex justify-between text-gray-400 text-sm">
            <span>Subtotal ({items.length} Item)</span>
            <span className="text-white">IDR {subtotal.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex justify-between text-gray-400 text-sm">
            <span>Biaya Platform</span>
            <span className="text-white">IDR {biayaPlatform.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex justify-between text-gray-400 text-sm">
            <span>Pajak Daerah</span>
            <span className="text-white">IDR {pajakDaerah.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex justify-between text-gray-400 text-sm">
            <span>Biaya Layanan</span>
            <span className="text-white">IDR {biayaLayanan.toLocaleString('id-ID')}</span>
          </div>

          <hr className="border-gray-700 my-3" />

          <div className="flex justify-between text-primary-blue font-bold text-lg">
            <span>Total Pembayaran</span>
            <span>IDR {total.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
