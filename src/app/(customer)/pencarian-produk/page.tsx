"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import { ProductCardSearch } from "@/components/global/product-card-search";
import ProductCarousel from "@/components/customer/pencarian-produk/product-carousel";
import {
  category_illustration,
  category_design,
  category_video,
  category_mockup,
  category_photography,
  category_web,
  category_3d
} from "@/assets/icon/category";
import type { StaticImageData } from "next/image";
import { searchProductsData, type Product } from "@/data/search-products";

/* =====================
   Types
===================== */

interface CategoryFilter {
  id: number;
  name: string;
  icon: StaticImageData;
  count: number;
  color: string;
  sectionName: string; // Links to the actual section name
}

/* =====================
   Page Component
===================== */
export default function PencarianProdukPage() {
  const [searchQuery] = useState<string>("foto");
  const totalResults = 345;

  /* =====================
     Refs for Category Sections
  ===================== */
  const refIlustrasi = useRef<HTMLElement>(null);
  const refDesain = useRef<HTMLElement>(null);
  const refVideo = useRef<HTMLElement>(null);

  /* =====================
     Category Filters
  ===================== */
  const categoryFilters: CategoryFilter[] = [
    { id: 1, name: "Ilustrasi", icon: category_illustration, count: 84422, color: "bg-[#EF4DA0]", sectionName: "Gambar & Ilustrasi" },
    { id: 2, name: "Desain", icon: category_design, count: 33122, color: "bg-[#4EBD77]", sectionName: "Desain Grafis" },
    { id: 3, name: "Video", icon: category_video, count: 8422, color: "bg-[#2EC8E6]", sectionName: "Videografi" },
    { id: 4, name: "Mockup", icon: category_mockup, count: 18122, color: "bg-[#FF6B4D]", sectionName: "Gambar & Ilustrasi" },
    { id: 5, name: "Fotografi", icon: category_photography, count: 18422, color: "bg-[#F8DC61]", sectionName: "Gambar & Ilustrasi" },
    { id: 6, name: "Website", icon: category_web, count: 18422, color: "bg-[#9D4EDD]", sectionName: "Desain Grafis" },
    { id: 7, name: "3 Elemen", icon: category_3d, count: 18422, color: "bg-[#37A2EA]", sectionName: "Desain Grafis" },
  ];

  /* =====================
     Category Section Mapping
  ===================== */
  const sectionRefs: Record<string, React.RefObject<HTMLElement>> = {
    "Gambar & Ilustrasi": refIlustrasi,
    "Desain Grafis": refDesain,
    "Videografi": refVideo,
  };

  const scrollToCategory = (sectionName: string) => {
    const ref = sectionRefs[sectionName];
    if (!ref?.current) return;

    const offset = 140; // Account for fixed navbar height
    const elementPosition = ref.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  /* =====================
     Carousel Scroll Functions
  ===================== */
  const scrollCarousel = (sectionName: string, direction: 'left' | 'right') => {
    const carouselId = `carousel-${sectionName.replace(/\s+/g, '-').toLowerCase()}`;
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const scrollAmount = 300; // Pixels to scroll
    const newScrollPosition = direction === 'left'
      ? carousel.scrollLeft - scrollAmount
      : carousel.scrollLeft + scrollAmount;

    carousel.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  };

  /* =====================
     Products Data
  ===================== */
  const productsByCategory = searchProductsData;

  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product);
  };

  /* =====================
     Render
  ===================== */
  return (
    <div className="min-h-screen bg-[#0F191E] text-white font-gilroy">
      {/* Navbar without top banner for search page */}
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 pt-32 sm:pt-28 lg:pt-40 mb-4 text-gilroy">
        <div className="bg-[#1A252B] border border-[#2A3B42] rounded-lg px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Breadcrumb - Kiri */}
            <nav
              className="flex items-center space-x-2 text-sm sm:text-base text-gray-400 truncate"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white transition-colors shrink-0">
                Beranda
              </Link>
              <FiChevronRight size={14} className="shrink-0" />
              <span className="text-white font-medium truncate">
                "{searchQuery}"
              </span>
            </nav>
            {/* Total Results - Kanan */}
            <span className="text-sm sm:text-base text-gray-300 whitespace-nowrap">
              {totalResults} hasil
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 pb-16">

        {/* Category Filters - Horizontal Scrollable Carousel */}
        <div className="mb-8 sm:mb-12">
          <ProductCarousel
            showArrows={false}
            options={{ dragFree: true, align: 'start' }}
            spacingClass="gap-2 sm:gap-3"
          >
            {categoryFilters.map((cat) => (
              <div key={cat.id} className="flex-none">
                <button
                  onClick={() => scrollToCategory(cat.sectionName)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0F1E25] rounded-lg border border-[#1F2F38] hover:border-[#37A2EA] transition-all group"
                >
                  <span className={`${cat.color} text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 sm:gap-2`}>
                    <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">
                      <Image
                        src={cat.icon}
                        alt={cat.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="whitespace-nowrap">{cat.name}</span>
                  </span>
                  <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
                    {cat.count.toLocaleString("id-ID")}
                  </span>
                </button>
              </div>
            ))}
          </ProductCarousel>
        </div>

        {/* Product Sections */}
        {Object.entries(productsByCategory).map(([categoryName, products]) => (
          <section
            key={categoryName}
            ref={sectionRefs[categoryName]}
            className="mb-10 sm:mb-12"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={`${categoryName === "Gambar & Ilustrasi"
                  ? "bg-[#EF4DA0]"
                  : categoryName === "Desain Grafis"
                    ? "bg-[#4EBD77]"
                    : "bg-[#2EC8E6]"
                  } w-1.5 sm:w-2 h-6 sm:h-8 rounded-full`}></span>
                <h2 className="text-lg sm:text-xl font-bold">{categoryName}</h2>
                <span className="text-gray-400 text-xs sm:text-sm">
                  {products.length > 0 && `${products.length}+ item`}
                </span>
              </div>
              <button className="flex items-center gap-1 sm:gap-2 text-[#37A2EA] hover:text-[#2EC8E6] transition-colors text-xs sm:text-sm font-semibold">
                <span className="hidden sm:inline">Lihat lebih banyak</span>
                <span className="sm:hidden">Lihat</span>
                <FiChevronRight size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Product Carousel via Embla */}
            <ProductCarousel>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_160px] sm:flex-[0_0_200px] md:flex-[0_0_220px] lg:flex-[0_0_240px]"
                >
                  <ProductCardSearch
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </ProductCarousel>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
