"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IoSearch, IoChevronDownSharp, IoMenu, IoClose } from "react-icons/io5";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import TopBanner from "./top-banner";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
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
        isSticky
          ? "backdrop-blur-md bg-[#0D171C]/95 shadow-lg shadow-black/30"
          : "bg-[#0D171C]"
      }`}
    >
      <TopBanner variant="blue" />

      {/* === Main Navbar === */}
      <div className="flex flex-wrap h-auto md:h-[100px] items-center justify-between px-6 md:px-12 border-b border-[#1E2A30] text-white">
        {/* Logo + Hamburger */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <p className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#37A2EA]">
            SELVO
          </p>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden text-3xl text-gray-300 hover:text-white transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative hidden md:flex h-[60px] w-full md:w-[700px] items-center rounded-full border border-[#1F2C33] bg-[#0B1418] px-6 mt-4 md:mt-0">
          {/* Kategori Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoryDropdown((prev) => !prev)}
              className="flex items-center gap-1 text-base md:text-lg font-semibold text-gray-300 cursor-pointer"
            >
              {selectedCategory}
              <IoChevronDownSharp
                className={`ml-1 text-xl transition-transform duration-200 ${
                  categoryDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoryDropdown && (
              <div className="absolute top-8 left-0 z-50 w-48 md:w-56 rounded-md border border-[#1E2A30] bg-[#1A252B] shadow-lg animate-fadeIn">
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
                    className="cursor-pointer px-4 py-3 text-base text-gray-300 hover:bg-[#263238] hover:text-primary-blue"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mx-3 md:mx-4 h-[30px] w-[1px] bg-gray-600"></div>

          {/* Search Input */}
          <form action="/" className="flex-1">
            <input
              type="search"
              name="search"
              placeholder="Cari item digital..."
              className="h-[40px] w-full border-none bg-transparent pr-6 pl-2 text-base md:text-lg text-gray-300 placeholder-gray-500 focus:outline-none"
            />
          </form>

          <button
            type="submit"
            className="absolute right-6 text-gray-400 hover:text-white transition"
          >
            <IoSearch size={24} />
          </button>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6 md:gap-8 text-lg mt-4 md:mt-0">
          <div className="flex cursor-pointer items-center gap-2 px-2 md:px-4 py-2 text-green-400 hover:text-green-300 transition text-base md:text-lg">
            <PiBookOpenTextDuotone size={22} />
            <p className="font-semibold hidden lg:block">Panduan Penjual</p>
          </div>

          <div className="flex cursor-pointer items-center gap-2 md:gap-3 rounded-full bg-[#4EBD77] px-4 md:px-6 py-2 md:py-3 transition hover:bg-[#3ea066]">
            <FaRegCircleUser size={22} className="text-white" />
            <p className="font-semibold text-white hidden lg:block">
              Yuk Mulai Menjual
            </p>
          </div>

          <button className="relative rounded-full bg-primary-blue p-3 md:p-4 transition hover:bg-[#256ca3]">
            <FaShoppingCart size={24} className="text-white" />
            <span className="absolute -top-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary-blue">
              2
            </span>
          </button>
        </div>
      </div>

      {/* === Bottom Navigation (Desktop) === */}
      <div className="hidden md:flex h-[56px] items-center gap-6 md:gap-10 border-t border-[#1E2A30] bg-[#111D22]/95 px-6 md:px-12 text-base md:text-lg font-semibold text-gray-300">
        {categories.map((cat) => (
          <div key={cat.name} className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => toggleDropdown(cat.name)}
              className="flex items-center gap-2 hover:text-primary-blue transition"
            >
              {cat.name}
              <IoChevronDownSharp
                className={`text-[14px] md:text-[16px] transition-transform duration-200 ${
                  openDropdown === cat.name
                    ? "rotate-180 text-primary-blue"
                    : "text-gray-400"
                }`}
              />
            </button>

            {openDropdown === cat.name && (
              <div className="animate-fadeIn absolute top-[45px] left-0 z-50 w-[200px] md:w-[240px] rounded-md border border-[#263238] bg-[#1A252B] px-3 py-2 shadow-lg">
                {cat.items.map((sub) => (
                  <Link
                    key={sub}
                    href="#"
                    className="block rounded px-3 py-2 text-gray-300 text-base md:text-lg hover:bg-[#222F35] hover:text-primary-blue transition"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* === Mobile Menu === */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col bg-[#0D171C]/95 px-6 py-4 border-t border-[#1E2A30] animate-fadeIn">
          {/* Search (mobile version) */}
          <div className="flex items-center gap-3 bg-[#0B1418] rounded-full border border-[#1F2C33] px-4 py-3 mb-4">
            <IoSearch size={22} className="text-gray-400" />
            <input
              type="search"
              placeholder="Cari item digital..."
              className="bg-transparent text-base text-gray-300 w-full focus:outline-none"
            />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-col gap-2 text-gray-300">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="flex justify-between items-center py-2 px-3 rounded hover:bg-[#1E2A30] text-left"
                onClick={() => toggleDropdown(cat.name)}
              >
                <span>{cat.name}</span>
                <IoChevronDownSharp
                  className={`transition-transform ${
                    openDropdown === cat.name ? "rotate-180 text-primary-blue" : ""
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
