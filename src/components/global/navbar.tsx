"use client";

import { useState } from "react";
import Link from "next/link";
import { IoSearch, IoChevronDownSharp } from "react-icons/io5";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import TopBanner from "./global/top-banner";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  const categories = [
    {
      name: "Templat Video",
      items: ["After Effects", "Premiere Pro", "DaVinci Resolve"],
    },
    { name: "Desain Grafis", items: ["Logo", "Poster", "Mockup"] },
    { name: "Musik & Efek Suara", items: ["BGM", "SFX", "Loop"] },
    { name: "Fotografi", items: ["Stock Photo", "Lightroom Preset"] },
    { name: "Gambar & Ilustrasi", items: ["Vector", "Icon", "Clipart"] },
    {
      name: "Pengembangan Web",
      items: ["Template HTML", "Komponen React", "UI Kit"],
    },
    { name: "3D", items: ["Model 3D", "Texture", "Animation"] },
  ];

  return (
    <nav className="font-gilroy flex w-full flex-col">
      {/* === Top Bar === */}
      <TopBanner variant="blue" />

      {/* === Main Navbar === */}
      <div className="flex h-[90px] w-full items-center justify-between bg-[#111D22] px-10 text-white">
        {/* Logo */}
        <p className="text-3xl font-extrabold tracking-wide text-[#37A2EA]">
          SELVO
        </p>

        {/* Search Bar */}
        <div className="relative flex h-[47px] w-[580px] items-center rounded-full border border-[#1F2C33] bg-[#0B1418] px-4">
          <div className="relative flex items-center gap-1">
            <select
              className="cursor-pointer appearance-none bg-transparent pr-6 text-sm font-medium text-gray-300 outline-none"
              defaultValue="all"
            >
              <option value="all" className="bg-[#111D22] text-white">
                Semua Kategori
              </option>
              <option value="desain" className="bg-[#111D22] text-white">
                Desain Grafis
              </option>
              <option value="musik" className="bg-[#111D22] text-white">
                Musik & Efek Suara
              </option>
              <option value="3d" className="bg-[#111D22] text-white">
                3D
              </option>
            </select>
            <IoChevronDownSharp className="pointer-events-none absolute right-1 text-xs text-gray-400" />
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

          <button
            type="submit"
            className="absolute right-5 text-gray-400 hover:text-white"
          >
            <IoSearch size={20} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex cursor-pointer items-center gap-2 px-3 py-1 text-green-400 transition">
            <PiBookOpenTextDuotone size={20} />
            <p>Panduan Penjual</p>
          </div>

          <div className="flex cursor-pointer items-center gap-2 rounded-full bg-[#4EBD77] px-4 py-2 transition hover:bg-[#1f3f1f]">
            <FaRegCircleUser size={20} className="text-white" />
            <p className="text-gray-100">Yuk Mulai Menjual</p>
          </div>

          <button className="relative rounded-full bg-[#FF6CB3] p-3 transition hover:bg-[#402535]">
            <FaShoppingCart size={24} className="text-white" />
            <span className="absolute -top-1 -right-1 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-white text-[10px] font-bold text-pink-500">
              2
            </span>
          </button>
        </div>
      </div>

      {/* === Bottom Navigation (Dropdowns - onClick) === */}
      <div className="relative flex h-[48px] w-full items-center gap-8 border-t border-[#1E2A30] bg-[#111D22] px-10 text-sm font-medium text-gray-300">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="relative"
            onClick={(e) => e.stopPropagation()} // cegah nutup saat klik di dalam
          >
            {/* Tombol kategori */}
            <button
              onClick={() => toggleDropdown(cat.name)}
              className="flex items-center gap-1 transition hover:text-pink-400"
            >
              {cat.name}
              <IoChevronDownSharp
                className={`text-[12px] transition-transform duration-200 ${
                  openDropdown === cat.name
                    ? "rotate-180 text-pink-400"
                    : "text-gray-400"
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {openDropdown === cat.name && (
              <div className="animate-fadeIn absolute top-[40px] left-0 z-50 w-[220px] rounded-md border border-[#263238] bg-[#1A252B] px-3 py-2 shadow-lg">
                {cat.items.map((sub) => (
                  <Link
                    key={sub}
                    href="#"
                    className="block rounded px-2 py-1 text-gray-300 transition hover:bg-[#222F35] hover:text-pink-400"
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
