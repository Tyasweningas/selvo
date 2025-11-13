'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductPaymentItem } from '@/data/product-payment-items';
import { IoClose } from 'react-icons/io5';
import { Category } from '@/components/global/category'; 

type CheckOutCartProps = {
  items: ProductPaymentItem[];
};

export default function CheckOutCart({ items }: CheckOutCartProps) {
  const [cartItems, setCartItems] = useState(items);

  // Removed unused handler: qty changes are not supported in this component.
  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const biayaPlatform = 8000;
  const pajakDaerah = 9500;
  const biayaLayanan = 10000;
  const total = subtotal + biayaPlatform + pajakDaerah + biayaLayanan;

  return (
    <div className="w-full space-y-6">
      {/* Daftar Item + Ringkasan Pesanan */}
      <div className="bg-[#111D22] border border-[#1A2B32] rounded-2xl p-6 space-y-8">
        
        {/* Daftar Item */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center justify-between bg-[#1A2B32] rounded-2xl p-4"
            >
              {/* Tombol Hapus */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="absolute top-2 right-2 bg-primary-blue hover:bg-[#1c6ab8] text-white rounded-full p-1 transition"
              >
                <IoClose size={13} />
              </button>

              {/* Gambar + Info Produk */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-white">{item.name}</h4>
                  <p className="text-sm text-gray-400">{item.variant}</p>
                  
                 
                  <Category name={item.category ?? ''} />
                </div>
              </div>

              {/* Harga */}
              <div className="text-[#facc15] font-semibold text-right">
                IDR {(item.price * item.qty).toLocaleString('id-ID')}
              </div>
            </div>
          ))}
        </div>

        {/* Ringkasan Pesanan */}
        <div className="bg-[#071115] rounded-2xl p-5 space-y-3 border border-[#172122]">
          <h3 className="font-semibold text-lg text-white">Ringkasan Pesanan</h3>

          <div className="flex justify-between text-gray-400 text-sm">
            <span>Subtotal ({cartItems.length} Item)</span>
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
