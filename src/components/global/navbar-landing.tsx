"use client";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoChevronDownSharp, IoClose, IoMenu, IoSearch } from "react-icons/io5";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import CartPopup from "./cart-popup";

export default function NavbarLanding() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart hook
  const {
    cart,
    toggleCart,
    closeCart,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`font-gilroy fixed top-0 z-50 w-full transition-all duration-300 ${
        isSticky
          ? "bg-[#0D171C]/95 shadow-lg shadow-black/30 backdrop-blur-md"
          : "bg-[#0D171C]"
      }`}
    >
      {/* === Main Navbar === */}
      ```jsx
      <div className="flex flex-wrap items-center justify-between border-b border-[#0F191E] px-4 py-2 text-white sm:px-6 md:px-12 md:py-2">
        {/* Logo + Hamburger */}
        <div className="flex w-full items-center justify-between md:w-auto">
          <p className="pr-4 text-2xl font-extrabold tracking-wide text-[#37A2EA] md:text-3xl">
            SELVO.
          </p>

          {/* Hamburger (mobile only) */}
          <button
            className="text-3xl text-gray-300 transition hover:text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>

        {/* Categories */}
        <div className="mx-4 hidden flex-1 flex-wrap items-center gap-6 text-sm font-semibold text-gray-300 md:flex">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => toggleDropdown(cat.name)}
                className="hover:text-primary-blue flex items-center gap-2 transition"
              >
                {cat.name}
                <IoChevronDownSharp
                  className={`text-[14px] transition-transform duration-200 ${
                    openDropdown === cat.name
                      ? "text-primary-blue rotate-180"
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

        {/* Right Section */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex cursor-pointer items-center gap-2 rounded-full bg-[#4EBD77] px-4 py-2 transition hover:bg-[#3ea066]">
            <FaRegCircleUser size={22} className="text-white" />
            <p className="hidden font-semibold text-white lg:block">
              Yuk Mulai Menjual
            </p>
          </div>

          <button
            onClick={toggleCart}
            className="bg-primary-blue relative rounded-full p-3 transition hover:bg-[#256ca3]"
          >
            <FaShoppingCart size={22} className="text-white" />
            {getTotalItems() > 0 && (
              <span className="text-primary-blue absolute -top-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[10px] font-bold">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>
      ```
      {/* === Bottom Navigation (Desktop) === */}
      {/* === Mobile Menu === */}
      {mobileMenuOpen && (
        <div className="animate-fadeIn flex flex-col space-y-3 border-t border-[#1E2A30] bg-[#0D171C]/95 px-4 py-4 md:hidden">
          {/* Search (mobile) */}
          <div className="flex items-center gap-3 rounded-full border border-[#1F2C33] bg-[#0B1418] px-4 py-3">
            <IoSearch size={20} className="text-gray-400" />
            <input
              type="search"
              placeholder="Cari item digital..."
              className="w-full bg-transparent text-base text-gray-300 focus:outline-none"
            />
          </div>

          {/* Categories */}
          {categories.map((cat) => (
            <div key={cat.name} className="w-full">
              <button
                className="flex w-full items-center justify-between rounded px-3 py-2 text-left text-gray-300 hover:bg-[#1E2A30]"
                onClick={() => toggleDropdown(cat.name)}
              >
                <span>{cat.name}</span>
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

          {/* Bottom Buttons */}
          <div className="flex flex-col gap-3 border-t border-[#1E2A30] pt-3">
            <button className="flex items-center gap-2 text-green-400 transition hover:text-green-300">
              <PiBookOpenTextDuotone size={20} />
              <span>Panduan Penjual</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-full bg-[#4EBD77] py-2 font-semibold text-white hover:bg-[#3ea066]">
              <FaRegCircleUser size={20} />
              Yuk Mulai Menjual
            </button>
          </div>
        </div>
      )}
      {/* Cart Popup */}
      <CartPopup
        isOpen={cart.isOpen}
        onClose={closeCart}
        items={cart.items}
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice()}
      />
    </nav>
  );
}
