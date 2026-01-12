"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FiChevronRight } from "react-icons/fi";

import {
  category_3d,
  category_design,
  category_illustration,
  category_photography,
  category_videography,
  category_web,
} from "@/assets/icon/category";
import ProductCarousel from "@/components/customer/pencarian-produk/product-carousel";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { ProductCardSearch } from "@/components/global/product-card-search";
import { searchProductsData, type Product } from "@/data/search-products";
import type { StaticImageData } from "next/image";

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
    {
      id: 1,
      name: "Ilustrasi",
      icon: category_illustration,
      count: 84422,
      color: "bg-[#EF4DA0]",
      sectionName: "Gambar & Ilustrasi",
    },
    {
      id: 2,
      name: "Desain",
      icon: category_design,
      count: 33122,
      color: "bg-[#4EBD77]",
      sectionName: "Desain Grafis",
    },
    {
      id: 3,
      name: "Video",
      icon: category_videography,
      count: 8422,
      color: "bg-[#2EC8E6]",
      sectionName: "Videografi",
    },
    {
      id: 4,
      name: "Mockup",
      icon: category_videography,
      count: 18122,
      color: "bg-[#FF6B4D]",
      sectionName: "Gambar & Ilustrasi",
    },
    {
      id: 5,
      name: "Fotografi",
      icon: category_photography,
      count: 18422,
      color: "bg-[#F8DC61]",
      sectionName: "Gambar & Ilustrasi",
    },
    {
      id: 6,
      name: "Website",
      icon: category_web,
      count: 18422,
      color: "bg-[#9D4EDD]",
      sectionName: "Desain Grafis",
    },
    {
      id: 7,
      name: "3 Elemen",
      icon: category_3d,
      count: 18422,
      color: "bg-[#37A2EA]",
      sectionName: "Desain Grafis",
    },
  ];

  /* =====================
     Category Section Mapping
  ===================== */
  const sectionRefs: Record<string, React.RefObject<HTMLElement | null>> = {
    "Gambar & Ilustrasi": refIlustrasi,
    "Desain Grafis": refDesain,
    Videografi: refVideo,
  };

  const scrollToCategory = (sectionName: string) => {
    const ref = sectionRefs[sectionName];
    if (!ref?.current) return;

    const offset = 140; // Account for fixed navbar height
    const elementPosition = ref.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  /* =====================
     Carousel Scroll Functions
  ===================== */
  // const scrollCarousel = (sectionName: string, direction: "left" | "right") => {
  //   const carouselId = `carousel-${sectionName.replace(/\s+/g, "-").toLowerCase()}`;
  //   const carousel = document.getElementById(carouselId);
  //   if (!carousel) return;

  //   const scrollAmount = 300; // Pixels to scroll
  //   const newScrollPosition =
  //     direction === "left"
  //       ? carousel.scrollLeft - scrollAmount
  //       : carousel.scrollLeft + scrollAmount;

  //   carousel.scrollTo({
  //     left: newScrollPosition,
  //     behavior: "smooth",
  //   });
  // };

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
    <div className="font-gilroy min-h-screen bg-[#0F191E] text-white">
      {/* Navbar without top banner for search page */}
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Breadcrumb Bar */}
      <div className="text-gilroy mx-auto mb-4 max-w-7xl px-3 pt-32 sm:px-4 sm:pt-28 lg:px-5 lg:pt-40">
        <div className="rounded-lg border border-[#2A3B42] bg-[#1A252B] px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Breadcrumb - Kiri */}
            <nav
              className="flex items-center space-x-2 truncate text-sm text-gray-400 sm:text-base"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="shrink-0 transition-colors hover:text-white"
              >
                Beranda
              </Link>
              <FiChevronRight size={14} className="shrink-0" />
              <span className="truncate font-medium text-white">
                &quot;{searchQuery}&quot;
              </span>
            </nav>
            {/* Total Results - Kanan */}
            <span className="text-sm whitespace-nowrap text-gray-300 sm:text-base">
              {totalResults} hasil
            </span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-3 pb-16 sm:px-4 lg:px-5">
        {/* Category Filters - Horizontal Scrollable Carousel */}
        <div className="mb-8 sm:mb-12">
          <ProductCarousel
            showArrows={false}
            options={{ dragFree: true, align: "start" }}
            spacingClass="gap-2 sm:gap-3"
          >
            {categoryFilters.map((cat) => (
              <div key={cat.id} className="flex-none">
                <button
                  onClick={() => scrollToCategory(cat.sectionName)}
                  className="group flex items-center gap-2 rounded-lg border border-[#1F2F38] bg-[#0F1E25] px-3 py-2 transition-all hover:border-[#37A2EA] sm:px-4 sm:py-2.5"
                >
                  <span
                    className={`${cat.color} flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-white sm:gap-2 sm:px-3 sm:py-1.5`}
                  >
                    <div className="relative h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5">
                      <Image
                        src={cat.icon}
                        alt={cat.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="whitespace-nowrap">{cat.name}</span>
                  </span>
                  <span className="text-xs whitespace-nowrap text-gray-400 sm:text-sm">
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
            <div className="mb-4 flex items-center justify-between sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <span
                  className={`${
                    categoryName === "Gambar & Ilustrasi"
                      ? "bg-[#EF4DA0]"
                      : categoryName === "Desain Grafis"
                        ? "bg-[#4EBD77]"
                        : "bg-[#2EC8E6]"
                  } h-6 w-1.5 rounded-full sm:h-8 sm:w-2`}
                ></span>
                <h2 className="text-lg font-bold sm:text-xl">{categoryName}</h2>
                <span className="text-xs text-gray-400 sm:text-sm">
                  {products.length > 0 && `${products.length}+ item`}
                </span>
              </div>
              <button className="flex items-center gap-1 text-xs font-semibold text-[#37A2EA] transition-colors hover:text-[#2EC8E6] sm:gap-2 sm:text-sm">
                <span className="hidden sm:inline">Lihat lebih banyak</span>
                <span className="sm:hidden">Lihat</span>
                <FiChevronRight size={14} className="sm:h-4 sm:w-4" />
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
