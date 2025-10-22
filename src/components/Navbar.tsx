"use client";

import { useState } from "react";
import Link from "next/link";
import { IoSearch, IoChevronDownSharp } from "react-icons/io5";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

// 🇮🇩 Komponen bendera Indonesia (React)
const IndonesiaFlag = () => (
  <span className="inline-block w-[18px] h-[12px] rounded-sm overflow-hidden border border-white">
    <span className="block w-full h-1/2 bg-red-600"></span>
    <span className="block w-full h-1/2 bg-white"></span>
  </span>
);

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  const categories = [
    { name: "Templat Video", items: ["After Effects", "Premiere Pro", "DaVinci Resolve"] },
    { name: "Desain Grafis", items: ["Logo", "Poster", "Mockup"] },
    { name: "Musik & Efek Suara", items: ["BGM", "SFX", "Loop"] },
    { name: "Fotografi", items: ["Stock Photo", "Lightroom Preset"] },
    { name: "Gambar & Ilustrasi", items: ["Vector", "Icon", "Clipart"] },
    { name: "Pengembangan Web", items: ["Template HTML", "Komponen React", "UI Kit"] },
    { name: "3D", items: ["Model 3D", "Texture", "Animation"] },
  ];

  return (
    <nav className="flex flex-col w-full font-gilroy">
      {/* === Top Bar === */}
      <div className="flex h-[32px] w-full items-center justify-between bg-[#37A2EA] px-8 text-sm text-white">
        <ul className="flex gap-6 font-medium">
          <li><Link href="#">Syarat & Ketentuan</Link></li>
          <li><Link href="#">Bantuan & FAQ</Link></li>
          <li><Link href="#">Hubungi Kami</Link></li>
        </ul>

        <p className="font-light">Pasar Digital Favoritmu</p>

        <div className="flex items-center gap-2">
          <IndonesiaFlag />
          <p className="font-medium">Indonesia (Rupiah IDR)</p>
        </div>
      </div>

      {/* === Main Navbar === */}
      <div className="flex h-[90px] w-full items-center justify-between bg-[#111D22] px-10 text-white">
        {/* Logo */}
        <p className="text-3xl font-extrabold text-[#37A2EA] tracking-wide">SELVO</p>

        {/* Search Bar */}
        <div className="relative flex h-[47px] w-[580px] items-center rounded-full bg-[#0B1418] px-4 border border-[#1F2C33]">
          <div className="flex items-center gap-1 relative">
            <select
              className="cursor-pointer bg-transparent pr-6 font-medium text-gray-300 outline-none text-sm appearance-none"
              defaultValue="all"
            >
              <option value="all" className="bg-[#111D22] text-white">Semua Kategori</option>
              <option value="desain" className="bg-[#111D22] text-white">Desain Grafis</option>
              <option value="musik" className="bg-[#111D22] text-white">Musik & Efek Suara</option>
              <option value="3d" className="bg-[#111D22] text-white">3D</option>
            </select>
            <IoChevronDownSharp className="absolute right-1 text-gray-400 text-xs pointer-events-none" />
          </div>

          <div className="mx-3 h-[25px] w-[1px] bg-gray-600"></div>

          <form action="/" className="flex-1">
            <input
              type="search"
              name="search"
              placeholder="Cari item digital..."
              className="h-[30px] w-full border-none bg-transparent pr-4 pl-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none"
            />
          </form>

          <button type="submit" className="absolute right-5 text-gray-400 hover:text-white">
            <IoSearch size={20} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1 cursor-pointer text-green-400 transition">
            <PiBookOpenTextDuotone size={20} />
            <p>Panduan Penjual</p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-full bg-[#4EBD77] hover:bg-[#1f3f1f] transition">
            <FaRegCircleUser size={20} className="text-white" />
            <p className="text-gray-100">Yuk Mulai Menjual</p>
          </div>

          <button className="relative p-3 rounded-full bg-[#FF6CB3] hover:bg-[#402535] transition">
            <FaShoppingCart size={24} className="text-white" />
            <span className="absolute -top-1 -right-1 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-white text-[10px] font-bold text-pink-500">
              2
            </span>
          </button>
        </div>
      </div>

      {/* === Bottom Navigation (Dropdowns - onClick) === */}
      <div className="flex h-[48px] w-full items-center bg-[#111D22] px-10 text-sm font-medium text-gray-300 border-t border-[#1E2A30] gap-8 relative">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="relative"
            onClick={(e) => e.stopPropagation()} // cegah nutup saat klik di dalam
          >
            {/* Tombol kategori */}
            <button
              onClick={() => toggleDropdown(cat.name)}
              className="flex items-center gap-1 hover:text-pink-400 transition"
            >
              {cat.name}
              <IoChevronDownSharp
                className={`text-[12px] transition-transform duration-200 ${
                  openDropdown === cat.name ? "rotate-180 text-pink-400" : "text-gray-400"
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {openDropdown === cat.name && (
              <div className="absolute top-[40px] left-0 bg-[#1A252B] border border-[#263238] rounded-md shadow-lg py-2 px-3 w-[220px] z-50 animate-fadeIn">
                {cat.items.map((sub) => (
                  <Link
                    key={sub}
                    href="#"
                    className="block px-2 py-1 text-gray-300 hover:text-pink-400 hover:bg-[#222F35] rounded transition"
                    onClick={(e) => {
                      e.stopPropagation(); // biar gak nutup otomatis
                      console.log(`Klik ${sub}`);
                      // setOpenDropdown(null); // kalau mau langsung nutup setelah klik
                    }}
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
