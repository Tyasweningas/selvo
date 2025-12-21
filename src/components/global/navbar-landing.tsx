'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { IoSearch, IoChevronDownSharp, IoMenu, IoClose } from "react-icons/io5";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import TopBanner from "./top-banner";

export default function NavbarLanding() {
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

      {/* === Main Navbar === */}
     ```jsx
<div className="flex flex-wrap items-center justify-between px-4 sm:px-6 md:px-12 py-2 md:py-2 border-b border-[#0F191E] text-white">
  {/* Logo + Hamburger */}
  <div className="flex items-center justify-between w-full md:w-auto">
    <p className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#37A2EA] pr-4">
      SELVO.
    </p>

    {/* Hamburger (mobile only) */}
    <button
      className="md:hidden text-3xl text-gray-300 hover:text-white transition"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
      {mobileMenuOpen ? <IoClose /> : <IoMenu />}
    </button>
  </div>

  {/* Categories */}
  <div className="hidden md:flex flex-wrap items-center gap-6 text-sm font-semibold text-gray-300 flex-1 mx-4">
    {categories.map((cat) => (
      <div key={cat.name} className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => toggleDropdown(cat.name)}
          className="flex items-center gap-2 hover:text-primary-blue transition"
        >
          {cat.name}
          <IoChevronDownSharp
            className={`text-[14px] transition-transform duration-200 ${
              openDropdown === cat.name
                ? "rotate-180 text-primary-blue"
                : "text-gray-400"
            }`}
          />
        </button>

        {openDropdown === cat.name && (
          <div className="animate-fadeIn absolute top-[45px] left-0 z-50 w-[200px] rounded-md border border-[#263238] bg-[#1A252B] px-3 py-2 shadow-lg">
            {cat.items.map((sub) => (
              <Link
                key={sub}
                href="#"
                className="block rounded px-3 py-2 text-gray-300 hover:bg-[#222F35] hover:text-primary-blue transition"
              >
                {sub}
              </Link>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>

  {/* Right Section */}
  <div className="hidden md:flex items-center gap-6">
    <div className="flex cursor-pointer items-center gap-2 rounded-full bg-[#4EBD77] px-4 py-2 transition hover:bg-[#3ea066]">
      <FaRegCircleUser size={22} className="text-white" />
      <p className="font-semibold text-white hidden lg:block">
        Yuk Mulai Menjual
      </p>
    </div>

    <button className="relative rounded-full bg-primary-blue p-3 transition hover:bg-[#256ca3]">
      <FaShoppingCart size={22} className="text-white" />
      <span className="absolute -top-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary-blue">
        2
      </span>
    </button>
  </div>
</div>
```
      {/* === Bottom Navigation (Desktop) === */}


      {/* === Mobile Menu === */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col bg-[#0D171C]/95 px-4 py-4 border-t border-[#1E2A30] animate-fadeIn space-y-3">
          {/* Search (mobile) */}
          <div className="flex items-center gap-3 bg-[#0B1418] rounded-full border border-[#1F2C33] px-4 py-3">
            <IoSearch size={20} className="text-gray-400" />
            <input
              type="search"
              placeholder="Cari item digital..."
              className="bg-transparent text-base text-gray-300 w-full focus:outline-none"
            />
          </div>

          {/* Categories */}
          {categories.map((cat) => (
            <div key={cat.name} className="w-full">
              <button
                className="flex justify-between items-center w-full py-2 px-3 rounded hover:bg-[#1E2A30] text-left text-gray-300"
                onClick={() => toggleDropdown(cat.name)}
              >
                <span>{cat.name}</span>
                <IoChevronDownSharp
                  className={`transition-transform ${
                    openDropdown === cat.name ? "rotate-180 text-primary-blue" : ""
                  }`}
                />
              </button>

              {openDropdown === cat.name && (
                <div className="ml-4 border-l border-[#1E2A30] pl-3">
                  {cat.items.map((sub) => (
                    <Link
                      key={sub}
                      href="#"
                      className="block py-2 text-sm text-gray-400 hover:text-primary-blue"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Bottom Buttons */}
          <div className="flex flex-col gap-3 pt-3 border-t border-[#1E2A30]">
            <button className="flex items-center gap-2 text-green-400 hover:text-green-300 transition">
              <PiBookOpenTextDuotone size={20} />
              <span>Panduan Penjual</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-[#4EBD77] rounded-full py-2 font-semibold text-white hover:bg-[#3ea066]">
              <FaRegCircleUser size={20} />
              Yuk Mulai Menjual
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
