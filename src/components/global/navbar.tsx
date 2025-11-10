"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IoSearch, IoChevronDownSharp } from "react-icons/io5";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import TopBanner from "./top-banner";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`font-gilroy fixed top-0 w-full z-50 transition-all duration-300 ${
        isSticky ? "backdrop-blur-md bg-[#0D171C]/95 shadow-lg shadow-black/30" : "bg-[#0D171C]"
      }`}
    >
      <TopBanner variant="blue" />

      {/* === Main Navbar === */}
      <div className="flex h-[100px] items-center justify-between px-12 border-b border-[#1E2A30] text-white">
        {/* Logo */}
        <p className="text-4xl font-extrabold tracking-wide text-[#37A2EA]">SELVO</p>

        {/* Search Bar */}
        <div className="relative flex h-[60px] w-[700px] items-center rounded-full border border-[#1F2C33] bg-[#0B1418] px-6">
          {/* Kategori Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoryDropdown((prev) => !prev)}
              className="flex items-center gap-1 text-lg font-semibold text-gray-300 cursor-pointer"
            >
              {selectedCategory}
              <IoChevronDownSharp
                className={`ml-1 text-xl transition-transform duration-200 ${
                  categoryDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoryDropdown && (
              <div className="absolute top-8 left-0 z-50 w-56 rounded-md border border-[#1E2A30] bg-[#1A252B] shadow-lg animate-fadeIn">
                {[
                  "Semua Kategori",
                  "Desain Grafis",
                  "Musik & Efek Suara",
                  "3D",
                  "Templat Video",
                  "Pengembangan Web",
                  "Fotografi",
                  "Gambar & Ilustrasi",
                ].map((cat) => (
                  <div
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCategoryDropdown(false);
                    }}
                    className="cursor-pointer px-4 py-3 text-lg text-gray-300 hover:bg-[#263238] hover:text-primary-blue"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mx-4 h-[30px] w-[1px] bg-gray-600"></div>

          {/* Search Input */}
          <form action="/" className="flex-1">
            <input
              type="search"
              name="search"
              placeholder="Cari item digital..."
              className="h-[40px] w-full border-none bg-transparent pr-6 pl-2 text-lg text-gray-300 placeholder-gray-500 focus:outline-none"
            />
          </form>

          <button
            type="submit"
            className="absolute right-6 text-gray-400 hover:text-white transition"
          >
            <IoSearch size={28} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-8 text-lg">
          <div className="flex cursor-pointer items-center gap-2 px-4 py-2 text-green-400 hover:text-green-300 transition">
            <PiBookOpenTextDuotone size={26} />
            <p className="font-semibold">Panduan Penjual</p>
          </div>

          <div className="flex cursor-pointer items-center gap-3 rounded-full bg-[#4EBD77] px-6 py-3 transition hover:bg-[#3ea066]">
            <FaRegCircleUser size={26} className="text-white" />
            <p className="font-semibold text-white">Yuk Mulai Menjual</p>
          </div>

          <button className="relative rounded-full bg-primary-blue p-4 transition hover:bg-[#256ca3]">
            <FaShoppingCart size={28} className="text-white" />
            <span className="absolute -top-1 -right-1 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white text-[12px] font-bold text-primary-blue">
              2
            </span>
          </button>
        </div>
      </div>

      {/* === Bottom Navigation === */}
      <div className="flex h-[56px] items-center gap-10 border-t border-[#1E2A30] bg-[#111D22]/95 px-12 text-lg font-semibold text-gray-300">
        {categories.map((cat) => (
          <div key={cat.name} className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => toggleDropdown(cat.name)}
              className="flex items-center gap-2 hover:text-primary-blue transition"
            >
              {cat.name}
              <IoChevronDownSharp
                className={`text-[16px] transition-transform duration-200 ${
                  openDropdown === cat.name
                    ? "rotate-180 text-primary-blue"
                    : "text-gray-400"
                }`}
              />
            </button>

            {openDropdown === cat.name && (
              <div className="animate-fadeIn absolute top-[45px] left-0 z-50 w-[240px] rounded-md border border-[#263238] bg-[#1A252B] px-3 py-2 shadow-lg">
                {cat.items.map((sub) => (
                  <Link
                    key={sub}
                    href="#"
                    className="block rounded px-3 py-2 text-gray-300 text-lg hover:bg-[#222F35] hover:text-primary-blue transition"
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
