"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaMagnifyingGlass,
  FaBell,
  FaEnvelope,
  FaUser,
} from "react-icons/fa6";

export default function SellerNavbar() {
  const [language, setLanguage] = useState("Indonesia (Rupiah IDR)");

  return (
    <header className="w-full font-gilroy">
      {/* 🔝 Top bar */}
      <div className="bg-[#4EBD77] text-white text-[12px] flex justify-between items-center px-6 py-1.5">
        {/* Kiri */}
        <div className="flex gap-4">
          <a href="#" className="hover:underline">
            Syarat dan Ketentuan
          </a>
          <a href="#" className="hover:underline">
            Bantuan & FAQ
          </a>
          <a href="#" className="hover:underline">
            Hubungi Kami
          </a>
        </div>

        {/* Tengah */}
        <span className="text-center text-[13px] font-medium hidden md:inline">
          Pasar Digital Favoritmu
        </span>

        {/* Kanan */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="https://flagcdn.com/w20/id.png"
              alt="Indonesia Flag"
              width={18}
              height={12}
              className="rounded-sm"
            />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent outline-none cursor-pointer"
            >
              <option>Indonesia (Rupiah IDR)</option>
              <option>English (USD)</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <FaInstagram className="cursor-pointer hover:opacity-80 transition" />
            <FaTiktok className="cursor-pointer hover:opacity-80 transition" />
            <FaXTwitter className="cursor-pointer hover:opacity-80 transition" />
          </div>
        </div>
      </div>

      {/* 🔻 Main bar */}
      <div className="bg-gradient-to-b from-[#111D22] via-[#111D22] to-[#16291e] text-white flex justify-between items-center px-8 py-4 transition-all">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-[#4EBD77] font-[700]" style={{ fontSize: "40px" }}>
            SELVO
          </span>
          <span
            className="text-[#4EBD77] font-[300]"
            style={{ fontSize: "24px" }}
          >
            Seller<span className="text-[#4EBD77]">.</span>
          </span>
        </div>

        {/* Search bar */}
        <div className="relative w-[500px]">
          <input
            type="text"
            placeholder="Cari sesuatu..."
            className="w-full bg-white/4 backdrop-blur-md text-white rounded-full pl-5 pr-10 py-2 outline-none placeholder-gray-300 border border-white/20"
          />
          <FaMagnifyingGlass className="absolute right-3 top-2.5 text-gray-300" />
        </div>

        {/* Icons & Profile */}
        <div className="flex items-center gap-5">
          {/* Transparent Cards for icons */}
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition cursor-pointer">
            <FaBell className="text-xl text-gray-200" />
          </div>
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition cursor-pointer">
            <FaEnvelope className="text-xl text-gray-200" />
          </div>

          <div className="w-px h-10 bg-gray-600 mx-1" />

          <button className="flex items-center gap-2 border border-[#4EBD77] rounded-full px-4 py-1 hover:bg-[#4EBD77]/20 transition">
            <FaUser className="text-[#4EBD77]" />
            <span className="text-[#4EBD77] font-medium">Jane Doee</span>
          </button> 
        </div>
      </div>
    </header>
  );
}
