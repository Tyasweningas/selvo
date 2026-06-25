"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaRocket, FaSearch } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-16 text-center sm:px-6 md:pt-40 lg:pt-48">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue/20 blur-[120px] sm:h-[600px] sm:w-[600px]" />
      <div className="absolute top-1/3 left-1/3 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-green/10 blur-[100px]" />

      <div className="z-10 flex max-w-5xl flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-primary-blue/30 bg-primary-blue/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary-blue uppercase sm:text-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary-green animate-pulse" />
          Ekosistem Kreatif Selvo
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-white via-[#92CDEE] to-[#9DDAB7] bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Satu Platform, <br />
          Ribuan Peluang Kreatif
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-gilroy mt-6 max-w-3xl text-base text-gray-300 sm:text-lg md:text-xl lg:text-2xl"
        >
          Menghubungkan desainer dan developer berbakat dengan pembeli yang membutuhkan aset digital berkualitas tinggi. Mulai cari aset terbaik atau buka toko digital Anda hari ini.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          {/* Buyer CTA */}
          <Link
            href="/search"
            className="group flex items-center justify-center gap-2 rounded-full bg-primary-blue px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-primary-blue/90 hover:shadow-lg hover:shadow-primary-blue/20"
          >
            <FaSearch size={18} />
            <span>Jelajahi Aset Digital</span>
            <FaArrowRight className="transition-transform group-hover:translate-x-1" size={14} />
          </Link>

          {/* Seller CTA */}
          <Link
            href="/auth"
            className="flex items-center justify-center gap-2 rounded-full border border-gray-600 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary-green hover:bg-primary-green/10"
          >
            <FaRocket className="text-primary-green" size={18} />
            <span>Mulai Menjual</span>
          </Link>
        </motion.div>
      </div>

      {/* Product Cards Visual Showcase */}
      <div className="relative mt-16 w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: 3D Asset */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -8 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#1A2B32]/40 p-6 backdrop-blur-md shadow-xl text-left"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-lg bg-pink-500/10 px-3 py-1 text-xs font-bold text-pink-400">3D Asset</span>
              <span className="text-sm font-bold text-primary-blue">⭐ 4.9</span>
            </div>
            <div className="relative h-48 overflow-hidden rounded-xl border border-white/5 bg-gray-900">
              <Image
                src="/images/spaceship_model_3d.png"
                alt="Futuristic Spaceship Model"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">Futuristic Spaceship Model</h3>
            <p className="mt-1 text-sm text-gray-400">High-poly FBX/OBJ for games and animations.</p>
          </motion.div>

          {/* Card 2: Web Template */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ y: -8 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#1A2B32]/40 p-6 backdrop-blur-md shadow-xl text-left"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-lg bg-primary-blue/10 px-3 py-1 text-xs font-bold text-primary-blue">Web Template</span>
              <span className="text-sm font-bold text-primary-blue">⭐ 5.0</span>
            </div>
            <div className="relative h-48 overflow-hidden rounded-xl border border-white/5 bg-gray-900">
              <Image
                src="/images/saas_landing_page.png"
                alt="SaaS Landing Page Kit"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">SaaS Landing Page Kit</h3>
            <p className="mt-1 text-sm text-gray-400">Responsive Next.js & Tailwind CSS UI components.</p>
          </motion.div>

          {/* Card 3: Audio Track */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ y: -8 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#1A2B32]/40 p-6 backdrop-blur-md shadow-xl sm:col-span-2 lg:col-span-1 text-left"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-lg bg-primary-green/10 px-3 py-1 text-xs font-bold text-primary-green">Audio / BGM</span>
              <span className="text-sm font-bold text-primary-blue">⭐ 4.8</span>
            </div>
            <div className="relative h-48 overflow-hidden rounded-xl border border-white/5 bg-gray-900">
              <Image
                src="/images/synthwave_beat_cover.png"
                alt="Cyberpunk Synthwave Beat"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">Cyberpunk Synthwave Beat</h3>
            <p className="mt-1 text-sm text-gray-400">Royalty-free energetic background music.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
