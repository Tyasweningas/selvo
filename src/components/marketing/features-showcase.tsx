"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  FaBullhorn,
  FaChartLine,
  FaDownload,
  FaFilter,
  FaShoppingBag,
  FaShoppingCart,
  FaUpload,
  FaWallet,
} from "react-icons/fa";

type TabType = "buyer" | "seller";

export default function FeaturesShowcase() {
  const [activeTab, setActiveTab] = useState<TabType>("buyer");

  const buyerFeatures = [
    {
      icon: <FaFilter className="text-primary-blue text-xl" />,
      title: "Pencarian & Filter Canggih",
      desc: "Temukan aset digital yang tepat dalam hitungan detik berdasarkan kategori, harga, lisensi, dan ulasan.",
    },
    {
      icon: <FaShoppingBag className="text-primary-blue text-xl" />,
      title: "Satu Keranjang untuk Semua",
      desc: "Masukkan produk dari berbagai kreator berbeda dan bayar sekaligus dengan satu kali transaksi checkout.",
    },
    {
      icon: <FaDownload className="text-primary-blue text-xl" />,
      title: "Pengiriman Instan & Terpusat",
      desc: "Setelah pembayaran terkonfirmasi, file siap diunduh dari riwayat pembelian akun Anda kapan saja tanpa batas.",
    },
  ];

  const sellerFeatures = [
    {
      icon: <FaUpload className="text-primary-green text-xl" />,
      title: "Manajemen Produk Mudah",
      desc: "Unggah file, deskripsi, harga, dan tangkapan layar produk dengan formulir penjual yang intuitif.",
    },
    {
      icon: <FaChartLine className="text-primary-green text-xl" />,
      title: "Statistik Penjualan Real-time",
      desc: "Pantau tren pendapatan, tayangan halaman, jumlah download, dan ulasan bintang secara transparan.",
    },
    {
      icon: <FaBullhorn className="text-primary-green text-xl" />,
      title: "Promosi Toko Terintegrasi",
      desc: "Gunakan fitur manajemen iklan/ads Selvo untuk menyorot produk unggulan Anda di banner beranda utama.",
    },
    {
      icon: <FaWallet className="text-primary-green text-xl" />,
      title: "Penarikan Dana Fleksibel",
      desc: "Tarik saldo hasil penjualan Anda langsung ke rekening bank lokal dengan proses verifikasi cepat dan transparan.",
    },
  ];

  return (
    <section className="relative px-4 py-16 text-white sm:px-6 md:py-24">
      {/* Radial glow decor */}
      <div className="bg-primary-blue/5 absolute top-1/2 left-1/4 -z-10 h-[400px] w-[400px] rounded-full blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Satu Platform,{" "}
            <span className="text-primary-green">Dua Solusi Hebat</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-gilroy mx-auto mt-4 max-w-2xl text-base text-gray-400 sm:text-lg"
          >
            Jelajahi fitur yang dirancang secara khusus untuk memenuhi kebutuhan
            pembeli dan memudahkan para kreator aset kreatif.
          </motion.p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="mb-16 flex justify-center">
          <div className="relative flex rounded-full border border-white/10 bg-[#111D22] p-1.5">
            <button
              onClick={() => setActiveTab("buyer")}
              className={`relative z-10 rounded-full px-6 py-2.5 text-sm font-bold transition-colors duration-300 sm:px-8 sm:text-base ${
                activeTab === "buyer"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Untuk Pembeli (Buyer)
            </button>
            <button
              onClick={() => setActiveTab("seller")}
              className={`relative z-10 rounded-full px-6 py-2.5 text-sm font-bold transition-colors duration-300 sm:px-8 sm:text-base ${
                activeTab === "seller"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Untuk Penjual (Seller)
            </button>

            {/* Sliding backdrop */}
            <motion.div
              layoutId="activeTabIndicator"
              className={`absolute top-1.5 bottom-1.5 rounded-full ${
                activeTab === "buyer" ? "bg-primary-blue" : "bg-primary-green"
              }`}
              style={{
                left: activeTab === "buyer" ? "6px" : "calc(50% + 2px)",
                width: "calc(50% - 8px)",
              }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === "buyer" ? (
            <motion.div
              key="buyer-tab"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
            >
              {/* Info grid */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  Dapatkan Aset Digital Berkualitas dalam Sekali Klik
                </h3>
                <p className="font-gilroy leading-relaxed text-gray-400">
                  Akselerasi proyek Anda dengan koleksi template siap pakai.
                  Tidak ada langganan bulanan yang membebani — Anda hanya
                  membayar untuk aset yang Anda butuhkan.
                </p>

                <div className="mt-8 space-y-4">
                  {buyerFeatures.map((f, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="bg-primary-blue/10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                        {f.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white sm:text-lg">
                          {f.title}
                        </h4>
                        <p className="font-gilroy mt-1 text-sm text-gray-400">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic/Visual Representation */}
              <div className="relative rounded-2xl border border-white/10 bg-[#1A2B32]/30 p-8 backdrop-blur-sm">
                <div className="bg-primary-blue absolute -top-3 -left-3 flex h-12 w-12 items-center justify-center rounded-lg">
                  <FaShoppingCart className="text-xl text-white" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-sm font-bold text-gray-400">
                      Keranjang Belanja
                    </span>
                    <span className="bg-primary-blue/20 text-primary-blue rounded px-2 py-0.5 text-xs">
                      3 Item
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Website UI Kit Pro", price: "Rp 150,000" },
                      { name: "3D Coffee Cup Model", price: "Rp 75,000" },
                      { name: "Chill Lofi Music Track", price: "Rp 45,000" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3"
                      >
                        <span className="text-sm font-semibold">
                          {item.name}
                        </span>
                        <span className="text-primary-blue text-sm font-bold">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-bold">Total Pembayaran</span>
                    <span className="text-primary-green text-lg font-extrabold">
                      Rp 270,000
                    </span>
                  </div>
                  <button className="bg-primary-blue hover:bg-primary-blue/95 w-full rounded-xl py-3 font-bold text-white transition">
                    Checkout Sekarang via QRIS
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="seller-tab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
            >
              {/* Graphic/Visual Representation */}
              <div className="relative order-2 rounded-2xl border border-white/10 bg-[#1A2B32]/30 p-8 backdrop-blur-sm lg:order-1">
                <div className="bg-primary-green absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center rounded-lg">
                  <FaChartLine className="text-xl text-white" />
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-sm font-bold text-gray-400">
                      Dashboard Toko Kreator
                    </span>
                    <span className="bg-primary-green/20 text-primary-green rounded-full px-2 py-0.5 text-xs font-bold">
                      Toko Aktif
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                      <p className="text-xs text-gray-400">
                        Pendapatan Bulan Ini
                      </p>
                      <p className="text-primary-green mt-1 text-lg font-bold">
                        Rp 4,850,000
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                      <p className="text-xs text-gray-400">Total Transaksi</p>
                      <p className="mt-1 text-lg font-bold text-white">
                        112 Pcs
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-gray-400">
                      Riwayat Penarikan Dana Terbaru
                    </p>
                    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3 text-sm">
                      <span>BCA - 8920***</span>
                      <span className="text-primary-green font-bold">
                        Rp 2,500,000 (Selesai)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info grid */}
              <div className="order-1 space-y-6 lg:order-2">
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  Mulai Hasilkan Pendapatan dari Hasil Desain & Kode Anda
                </h3>
                <p className="font-gilroy leading-relaxed text-gray-400">
                  Ubah file proyek Anda yang menganggur di harddisk menjadi
                  sumber pendapatan pasif. Proses registrasi gratis, mudah, dan
                  langsung diverifikasi oleh tim internal kami.
                </p>

                <div className="mt-8 space-y-4">
                  {sellerFeatures.map((f, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="bg-primary-green/10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                        {f.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white sm:text-lg">
                          {f.title}
                        </h4>
                        <p className="font-gilroy mt-1 text-sm text-gray-400">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
