"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoSearch, IoChevronDownSharp, IoMenu, IoClose } from "react-icons/io5";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`font-gilroy fixed top-0 z-50 w-full transition-all duration-300 ${
        isSticky
          ? "bg-[#0F191E]/95 shadow-lg shadow-black/30 backdrop-blur-xl"
          : "bg-[#0D171C]"
      }`}
    >
      {/* <div className="hidden sm:block">
        <TopBanner variant="blue" />
      </div> */}

      <div className="flex items-center justify-between border-b border-[#1E2A30] px-4 py-4 sm:px-6 lg:px-12">
        <div className="flex w-full items-center justify-between sm:mr-6 sm:w-auto lg:mr-10">
          <p className="text-3xl font-extrabold tracking-wide text-[#37A2EA] sm:text-4xl">
            SELVO
          </p>

          <button
            className="text-3xl text-gray-300 transition hover:text-white sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>

        <div className="relative mt-4 hidden h-[50px] w-full items-center rounded-full border border-[#1F2C33] bg-[#0B1418] px-4 transition-all sm:mt-0 sm:flex sm:w-[350px] lg:w-[650px] lg:px-6">
          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoryDropdown(!categoryDropdown)}
              className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-gray-300 lg:text-base"
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
                    className="hover:text-primary-blue cursor-pointer px-4 py-3 text-sm text-gray-300 hover:bg-[#263238] lg:text-base"
                  >
                    {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mx-3 h-7 w-px bg-gray-700"></div>

          <input
            type="search"
            placeholder="Cari item digital..."
            className="flex-1 bg-transparent text-sm text-gray-300 placeholder-gray-500 focus:outline-none lg:text-base"
          />

          <button className="absolute right-6 text-gray-400 transition hover:text-white">
            <IoSearch size={20} />
          </button>
        </div>

        <div className="hidden items-center gap-6 sm:flex">
          <button className="flex items-center gap-2 text-green-400 hover:text-green-300">
            <PiBookOpenTextDuotone size={20} />
            <span className="hidden text-sm font-medium lg:block">
              Panduan Penjual
            </span>
          </button>

          <button className="h-10 w-35 rounded-full bg-[#4EBD77] px-2 transition hover:bg-[#3ea066]">
            <p className="hidden text-xs font-medium text-white lg:block">
              Yuk Mulai Menjual
            </p>
          </button>

          <button className="bg-primary-blue relative rounded-full p-3 hover:bg-[#256ca3]">
            <FaShoppingCart size={18} className="text-white" />
            <span className="text-primary-blue absolute -top-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[10px] font-medium">
              2
            </span>
          </button>
        </div>
      </div>

      <div className="hidden gap-6 border-t border-[#0F191E] bg-[#0F191E]/95 px-6 py-3 text-base font-semibold text-gray-300 lg:flex lg:px-12">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="relative"
            onClick={(e) => e.stopPropagation()} // cegah nutup saat klik di dalam
          >
            {/* Tombol kategori */}
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === cat.name ? null : cat.name)
              }
              className="hover:text-primary-blue flex items-center gap-2 transition"
            >
              {cat.name}
              <IoChevronDownSharp
                className={`text-sm transition-transform ${
                  openDropdown === cat.name
                    ? "text-primary-blue rotate-180"
                    : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {openDropdown === cat.name && (
              <div className="absolute top-[45px] left-0 z-50 w-[200px] rounded-md border border-[#263238] bg-[#1A252B] px-3 py-2 shadow-lg">
                {cat.items.map((sub) => (
                  <Link
                    key={sub}
                    href="#"
                    className="hover:text-primary-blue block rounded px-3 py-2 text-gray-300 transition hover:bg-[#222F35]"
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
        <div className="animate-fadeIn space-y-3 border-t border-[#1E2A30] bg-[#0D171C]/95 px-4 py-4 sm:hidden">
          <div className="flex items-center gap-3 rounded-full border border-[#1F2C33] bg-[#0B1418] px-4 py-3">
            <IoSearch size={20} className="text-gray-400" />
            <input
              type="search"
              placeholder="Cari item digital..."
              className="w-full bg-transparent text-base text-gray-300 focus:outline-none"
            />
          </div>

          {categories.map((cat) => (
            <div key={cat.name}>
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === cat.name ? null : cat.name)
                }
                className="flex w-full items-center justify-between rounded px-3 py-2 text-gray-300 hover:bg-[#1E2A30]"
              >
                {cat.name}
                <IoChevronDownSharp
                  className={`transition-transform ${
                    openDropdown === cat.name
                      ? "text-primary-blue rotate-180"
                      : ""
                  }`}
                />
              </button>

              {openDropdown === cat.name && (
                <div className="ml-4 border-l border-[#1E2A30] pl-3">
                  {cat.items.map((sub) => (
                    <Link
                      key={sub}
                      href="#"
                      className="hover:text-primary-blue block py-2 text-sm text-gray-400"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex flex-col gap-3 border-t border-[#1E2A30] pt-3">
            <button className="flex items-center gap-2 text-green-400 hover:text-green-300">
              <PiBookOpenTextDuotone size={20} />
              Panduan Penjual
            </button>

            <button className="flex items-center justify-center gap-2 rounded-full bg-[#4EBD77] py-2 font-semibold text-white hover:bg-[#3ea066]">
              <FaRegCircleUser size={20} /> Yuk Mulai Menjual
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
