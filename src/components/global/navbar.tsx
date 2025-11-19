"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  IoSearch,
  IoChevronDownSharp,
  IoMenu,
  IoClose
} from "react-icons/io5";
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

  const categories = [
    { name: "Templat Video", items: ["After Effects", "Premiere Pro", "DaVinci Resolve"] },
    { name: "Desain Grafis", items: ["Logo", "Poster", "Mockup"] },
    { name: "Musik & Efek Suara", items: ["BGM", "SFX", "Loop"] },
    { name: "Fotografi", items: ["Stock Photo", "Lightroom Preset"] },
    { name: "Gambar & Ilustrasi", items: ["Vector", "Icon", "Clipart"] },
    { name: "Pengembangan Web", items: ["Template HTML", "Komponen React", "UI Kit"] },
    { name: "3D", items: ["Model 3D", "Texture", "Animation"] },
  ];

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`font-gilroy fixed top-0 w-full z-50 transition-all duration-300 ${
        isSticky
          ? "backdrop-blur-xl bg-[#0F191E]/95 shadow-lg shadow-black/30"
          : "bg-[#0D171C]"
      }`}
    >
      
      <div className="hidden sm:block">
        <TopBanner variant="blue" />
      </div>

    
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4 border-b border-[#1E2A30]">
        
       
        <div className="flex items-center w-full sm:w-auto justify-between sm:mr-6 lg:mr-10">
          <p className="text-3xl sm:text-4xl font-extrabold tracking-wide text-[#37A2EA]">
            SELVO
          </p>

          <button
            className="sm:hidden text-3xl text-gray-300 hover:text-white transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>

       
        <div className="hidden sm:flex relative h-[50px] w-full sm:w-[350px] lg:w-[650px] items-center rounded-full border border-[#1F2C33] bg-[#0B1418] px-4 lg:px-6 mt-4 sm:mt-0 transition-all ">
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoryDropdown(!categoryDropdown)}
              className="flex items-center gap-1 text-sm lg:text-base font-semibold text-gray-300 cursor-pointer"
            >
              {selectedCategory}
              <IoChevronDownSharp
                className={`ml-1 text-lg transition-transform ${
                  categoryDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoryDropdown && (
              <div className="absolute top-8 left-0 z-50 w-48 rounded-md border border-[#0F191E] bg-[#0F191E] shadow-xl">
                {categories.map((c) => (
                  <div
                    key={c.name}
                    onClick={() => {
                      setSelectedCategory(c.name);
                      setCategoryDropdown(false);
                    }}
                    className="cursor-pointer px-4 py-3 text-sm lg:text-base text-gray-300 hover:bg-[#263238] hover:text-primary-blue"
                  >
                    {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mx-3 h-[28px] w-[1px] bg-gray-700"></div>

         
          <input
            type="search"
            placeholder="Cari item digital..."
            className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none text-sm lg:text-base"
          />

          <button className="absolute right-6 text-gray-400 hover:text-white transition">
            <IoSearch size={20} />
          </button>
        </div>

        
        <div className="hidden sm:flex items-center gap-6">
          <button className="flex items-center gap-2 text-green-400 hover:text-green-300">
            <PiBookOpenTextDuotone size={20} />
            <span className="hidden lg:block font-medium text-sm">Panduan Penjual</span>
          </button>

          <button className=" bg-[#4EBD77] px-2 rounded-full hover:bg-[#3ea066] transition w-35 h-10">
            <p className="hidden lg:block font-medium text-xs text-white">
              Yuk Mulai Menjual
            </p>
          </button>

          <button className="relative p-3 rounded-full bg-primary-blue hover:bg-[#256ca3]">
            <FaShoppingCart size={18} className="text-white" />
            <span className="absolute -top-1 -right-1 bg-white text-primary-blue text-[10px] font-medium h-[18px] w-[18px] flex items-center justify-center rounded-full">
              2
            </span>
          </button>
        </div>
      </div>

     
      <div className="hidden lg:flex gap-6 border-t border-[#0F191E] bg-[#0F191E]/95 px-6 lg:px-12 py-3 text-base font-semibold text-gray-300">
        {categories.map((cat) => (
          <div key={cat.name} className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === cat.name ? null : cat.name)
              }
              className="flex items-center gap-2 hover:text-primary-blue transition"
            >
              {cat.name}
              <IoChevronDownSharp
                className={`text-sm transition-transform ${
                  openDropdown === cat.name ? "rotate-180 text-primary-blue" : ""
                }`}
              />
            </button>

            {openDropdown === cat.name && (
              <div className="absolute top-[45px] left-0 z-50 w-[200px] rounded-md border border-[#263238] bg-[#1A252B] shadow-lg px-3 py-2">
                {cat.items.map((sub) => (
                  <Link
                    key={sub}
                    href="#"
                    className="block py-2 px-3 text-gray-300 hover:bg-[#222F35] hover:text-primary-blue rounded transition"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0D171C]/95 border-t border-[#1E2A30] px-4 py-4 space-y-3 animate-fadeIn">
          
          
          <div className="flex items-center gap-3 bg-[#0B1418] rounded-full border border-[#1F2C33] px-4 py-3">
            <IoSearch size={20} className="text-gray-400" />
            <input
              type="search"
              placeholder="Cari item digital..."
              className="bg-transparent text-base text-gray-300 w-full focus:outline-none"
            />
          </div>

         
          {categories.map((cat) => (
            <div key={cat.name}>
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === cat.name ? null : cat.name)
                }
                className="w-full flex justify-between items-center text-gray-300 hover:bg-[#1E2A30] rounded px-3 py-2"
              >
                {cat.name}
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

          
          <div className="pt-3 border-t border-[#1E2A30] flex flex-col gap-3">
            <button className="flex items-center gap-2 text-green-400 hover:text-green-300">
              <PiBookOpenTextDuotone size={20} />
              Panduan Penjual
            </button>

            <button className="bg-[#4EBD77] text-white py-2 rounded-full flex items-center justify-center gap-2 font-semibold hover:bg-[#3ea066]">
              <FaRegCircleUser size={20} /> Yuk Mulai Menjual
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
