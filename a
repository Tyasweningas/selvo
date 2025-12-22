'use client';
import Image from "next/image";
import Navbar from "@/components/global/navbar";
import ProductCard from "@/components/global/product-card";
import GlowCircle from "@/assets/background/glow-circle.png";
import LeftFloating from "@/assets/items/left-floating-items.png";
import RightFloating from "@/assets/items/right-floating-items.png";
import { glow_carousel } from "@/assets/background";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import BannerCarousel from "@/components/customer/landing-page/carousel/banner-carousel";
import { products } from "@/data/mock/product-card-mock";
import NavbarLanding from "@/components/global/navbar-landing";
import { useState } from "react";
import { IoSearch, IoChevronDownSharp } from "react-icons/io5";

export default function LandingPage() {
console.log("products:", products);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");

  return (
     <>
  <NavbarLanding/>
  <div className="fixed inset-0 -z-20 bg-[linear-gradient(180deg,#1C4763_0%,#111D29_80%,#0F191E_100%)]" />

  <section className="relative min-h-screen flex flex-col items-center text-white">
    <div className="absolute top-[110px] left-1/2 -translate-x-1/2 -z-10 w-full h-full">
      <Image
        src={GlowCircle}
        alt="Glow background"
        width={1600}
        height={1600}
        className="object-contain opacity-80 pointer-events-none select-none"
        priority
      />
    </div>

    {/* <Image
      src={LeftFloating}
      alt="Left Floating"
      width={600}
      height={600}
      className="absolute left-0 bottom-20 pointer-events-none select-none translate-x-210 translate-y-40"
      priority
    />
    <Image
      src={RightFloating}
      alt="Right Floating"
      width={600}
      height={600}
      className="absolute right-0 bottom-20 pointer-events-none select-none -translate-x-220 translate-y-40 "
      priority
    /> */}

 
    <div className="flex flex-col items-center justify-center text-center pt-[170px] z-10">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#92CDEE] to-[#9DDAB7]">
        Stop Desain Dari Nol <br /> Mulai dengan Aset Terbaik
      </h1>
      <p className="text-[20px] mb-4 font-gilroy pt-6">
        Ribuan template UI/UX, font, dan ilustrasi untuk mempercepat workflow proyekmu.
      </p>

      {/* 🔍 Search Bar — Dipindahkan dari Navbar */}
    <div className="relative w-full max-w-2xl">
      <div className="relative h-[55px] flex items-center rounded-full border border-[#1F2C33] bg-[#0B1418] px-4">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setCategoryDropdown((prev) => !prev)}
            className="flex items-center gap-1 text-base font-semibold text-gray-300 cursor-pointer"
          >
            {selectedCategory}
            <IoChevronDownSharp
              className={`ml-1 text-xl transition-transform duration-200 ${
                categoryDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {categoryDropdown && (
            <div className="absolute top-12 left-0 z-20 w-48 rounded-md border border-[#1E2A30] bg-[#1A252B] shadow-lg animate-fadeIn">
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
                  className="cursor-pointer px-4 py-3 text-base text-gray-300 hover:bg-[#263238] hover:text-[#37A2EA] transition"
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mx-3 h-[30px] w-[1px] bg-gray-600"></div>

        {/* Search Input */}
        <form action="/search" method="GET" className="flex-1">
          <input
            type="search"
            name="q"
            placeholder="Cari template, font, ilustrasi..."
            className="h-[40px] w-full border-none bg-transparent pr-10 pl-2 text-base text-white placeholder-gray-400 focus:outline-none"
          />
        </form>

        <button
          type="submit"
          className="absolute right-4 text-gray-400 hover:text-white transition"
        >
          <IoSearch size={22} />
        </button>
      </div>
    </div>


    
    </div>
  </section>

  <section className="relative z-0 pt-[100px] flex flex-col items-center justify-center text-white">
    <Image 
    src={glow_carousel} 
    alt="Glow Carousel" 
    width={1800} 
    height={5} 
    className="absolute object-contain pointer-events-none select-none -z-20 translate-y-45"
    />
  <div className="relative z-10">
   <BannerCarousel/>
   </div>
    <div>
      {products.map((p) => (
    <ProductCard key={p.id} item={p} />
  ))}
    </div>
  </section>

  <section className="relative min-h-screen flex items-center justify-center text-white">
    <h2 className="text-4xl font-semibold">Slide ketiga</h2>
  </section>

  <section className="relative min-h-screen flex items-center justify-center text-white">
    <h2 className="text-4xl font-semibold">Slide ketiga</h2>
  </section>

  <section className="relative min-h-screen flex items-center justify-center text-white">
    <h2 className="text-4xl font-semibold">Slide ketiga</h2>
  </section>
</>


  );

}
