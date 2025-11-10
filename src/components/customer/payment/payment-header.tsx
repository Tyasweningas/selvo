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
    <div className="rounded-xl overflow-hidden shadow-lg bg-[#04243A] border border-[#0F4C75]">
      {/* Bar atas */}
      <div className="bg-[#1B6CA8] text-white px-6 py-2 text-sm font-semibold rounded-t-xl">
        Pembayaran untuk Keranjang Anda
      </div>

      {/* Konten utama */}
      <div className="flex justify-between items-center bg-gradient-to-b from-[#1B6CA8] via-[#0B1E2D] to-[#000000] p-6">
        {/* Kiri: ikon dan teks */}
        <div className="flex items-start gap-4">
          <div className="bg-[#0D1C2B] p-3 rounded-full flex items-center justify-center shadow-inner">
            <ShoppingCart size={30} className="text-[#1B6CA8]" />
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold">Selesaikan Pembayaran Anda</h2>
            <p className="text-gray-300 text-sm">
              Silakan selesaikan pembayaran sebelum batas waktu habis atau pesanan akan dibatalkan
            </p>
          </div>
        </div>

        {/* Kanan: timer */}
        <div className="bg-[#0D1C2B] px-6 py-3 rounded-lg font-mono text-primary-blue text-xl font-bold shadow-inner border border-shadow-primary-blue">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
}
