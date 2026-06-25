"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaAward, FaPercentage } from "react-icons/fa";

export default function ValueProp() {
  const values = [
    {
      icon: <FaAward className="text-3xl text-primary-blue" />,
      title: "Kualitas Terkurasi",
      desc: "Setiap aset digital yang diunggah melewati proses review ketat untuk memastikan standar kualitas terbaik, kode bersih, dan kompatibilitas penuh.",
    },
    {
      icon: <FaPercentage className="text-3xl text-primary-green" />,
      title: "Komisi Hanya 3%",
      desc: "Kami mengenakan biaya layanan flat hanya 3% untuk setiap transaksi penjualan. Kreator membawa pulang 97% hasil kerja keras mereka secara transparan.",
    },
    {
      icon: <FaShieldAlt className="text-3xl text-red-400" />,
      title: "Transaksi Instan & Aman",
      desc: "Dukungan pembayaran instan eksklusif via QRIS dengan sistem perlindungan pembeli serta akses unduh langsung setelah pembayaran terkonfirmasi.",
    },
  ];

  return (
    <section className="relative px-4 py-16 text-white sm:px-6 md:py-24">
      {/* Background decoration */}
      <div className="absolute right-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-primary-green/5 blur-[80px]" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Mengapa Memilih <span className="text-primary-blue">Selvo</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-gilroy mx-auto mt-4 max-w-2xl text-base text-gray-400 sm:text-lg"
          >
            Solusi tepercaya bagi kreator independen untuk mendistribusikan karya, dan bagi para profesional untuk mempercepat workflow mereka.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6, borderColor: "rgba(55, 162, 234, 0.4)", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
              className="flex flex-col rounded-2xl border border-white/5 bg-[#111D22] p-6 transition-all duration-300"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{val.title}</h3>
              <p className="font-gilroy mt-3 flex-1 text-sm leading-relaxed text-gray-400">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
