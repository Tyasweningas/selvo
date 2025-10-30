'use client';
import { useEffect, useState } from 'react';

const ShoppingCart = ({ size = 26, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export default function PaymentHeader() {
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 menit (600 detik)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')} : ${m
      .toString()
      .padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-xl bg-gradient-to-b from-[#f24e9d]  via-[#5e153858] to-[#170b11] p-6 shadow-lg">
      {/* Bar atas */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-black/20 p-3 rounded-full">
            <ShoppingCart size={26} className="text-pink-400" />
          </div>
          <h1 className="text-white font-semibold text-4xl">
            Pembayaran untuk Keranjang Anda
          </h1>
        </div>

        {/* Timer */}
        <div className="bg-black/60 px-8 py-6 rounded-xl font-mono text-pink-400 text-2xl font-bold shadow-lg border border-pink-500/30 ">
            {formatTime(timeLeft)}
        </div>

      </div>

      {/* Teks utama */}
      <div className="text-white mt-2">
        <h2 className="text-2xl font-bold mb-1">
          Selesaikan Pembayaran Anda
        </h2>
        <p className="text-sm text-gray-300">
          Silakan selesaikan pembayaran sebelum batas waktu habis atau pesanan akan dibatalkan
        </p>
      </div>
    </div>
  );
}
