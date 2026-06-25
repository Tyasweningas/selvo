"use client";
import React from "react";
import { motion } from "framer-motion";
import StarRating from "@/components/global/star-rating";

interface Testimonial {
  name: string;
  role: string;
  type: "Buyer" | "Seller";
  avatarText: string;
  rating: number;
  content: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Rian Hidayat",
      role: "Frontend Developer & UI Designer",
      type: "Buyer",
      avatarText: "RH",
      rating: 5,
      content: "Selvo sangat membantu kelancaran proyek klien saya. Template Tailwind & React UI Kit yang saya beli di sini sangat bersih, mudah dikustomisasi, dan menghemat waktu pengerjaan hingga 40%. Highly recommended!",
    },
    {
      name: "Amelia Putri",
      role: "3D Generalist & Illustrator",
      type: "Seller",
      avatarText: "AP",
      rating: 4.8,
      content: "Sebagai kreator 3D di Batam, menjual aset di platform luar sering terkendala metode pembayaran dan biaya komisi tinggi. Di Selvo, proses pendaftaran toko sangat cepat dan pembagian hasilnya sangat menguntungkan kreator lokal.",
    },
    {
      name: "Daffa Ramadhan",
      role: "Creative Director di Agensi Digital",
      type: "Buyer",
      avatarText: "DR",
      rating: 5,
      content: "Saya sering membeli aset suara dan templat After Effects untuk keperluan konten promosi media sosial. Harganya bersahabat, kualitasnya terkurasi, dan file bisa langsung diunduh secara instan.",
    },
    {
      name: "Viona Clarissa",
      role: "Vector Artist & Icon Designer",
      type: "Seller",
      avatarText: "VC",
      rating: 5,
      content: "Awalnya iseng mengunggah beberapa set ikon buatan saya di Selvo. Ternyata peminatnya banyak banget! Dashboard penjualannya sangat detail, mempermudah saya melacak produk mana yang paling laku.",
    },
  ];

  return (
    <section className="relative px-4 py-16 text-white sm:px-6 md:py-24">
      {/* Background shape */}
      <div className="absolute top-10 right-10 -z-10 h-[300px] w-[300px] rounded-full bg-primary-blue/5 blur-[80px]" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Apa Kata <span className="text-primary-blue">Kreator & Pengguna</span> Kami?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-gilroy mx-auto mt-4 max-w-2xl text-base text-gray-400 sm:text-lg"
          >
            Dengarkan langsung cerita sukses dari pembeli yang mempercepat pengerjaan proyeknya dan penjual yang menghasilkan pendapatan pasif.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col rounded-2xl border border-white/5 bg-[#111D22] p-6 shadow-xl sm:p-8"
            >
              {/* Header block */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-blue to-primary-green text-sm font-bold text-white">
                  {t.avatarText}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white sm:text-lg">{t.name}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      t.type === "Buyer" ? "bg-primary-blue/15 text-primary-blue" : "bg-primary-green/15 text-primary-green"
                    }`}>
                      {t.type === "Buyer" ? "Buyer" : "Seller"}
                    </span>
                  </div>
                  <p className="font-gilroy text-xs text-gray-400 sm:text-sm">{t.role}</p>
                </div>
              </div>

              {/* Stars rating */}
              <div className="mt-4">
                <StarRating value={t.rating} showNumber />
              </div>

              {/* Content */}
              <p className="font-gilroy mt-4 flex-1 text-sm leading-relaxed text-gray-300 sm:text-base">
                &ldquo;{t.content}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
