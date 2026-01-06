"use client";
import { glow_carousel } from "@/assets/background";
import GlowCircle from "@/assets/background/glow-circle.png";
import CardLanding from "@/components/customer/landing-page/card-landing";
import BannerCarousel from "@/components/customer/landing-page/carousel/banner-carousel";
import Footer from "@/components/global/footer";
import NavbarLanding from "@/components/global/navbar-landing";
import { products as mockProducts } from "@/data/mock/product-card-mock";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoChevronDownSharp, IoSearch } from "react-icons/io5";

export default function Home() {
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        console.log("✅ Products loaded:", data);
      } catch (err: any) {
        console.error("❌ Failed to load products:", err);
        setError(err?.message || "Failed to load products");
        // Fallback to mock data if API fails
        setProducts(mockProducts as any);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <NavbarLanding />
      <div className="fixed inset-0 -z-20 bg-[linear-gradient(180deg,#1C4763_0%,#111D29_80%,#0F191E_100%)]" />

      <section className="relative flex min-h-screen flex-col items-center text-white">
        <div className="absolute top-[110px] left-1/2 -z-10 h-full w-full -translate-x-1/2">
          <Image
            src={GlowCircle}
            alt="Glow background"
            width={1600}
            height={1600}
            className="pointer-events-none object-contain opacity-80 select-none"
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

        <div className="z-10 flex flex-col items-center justify-center pt-[170px] text-center">
          <h1 className="bg-linear-to-b from-[#92CDEE] to-[#9DDAB7] bg-clip-text text-5xl font-bold text-transparent">
            Stop Desain Dari Nol <br /> Mulai dengan Aset Terbaik
          </h1>
          <p className="font-gilroy mb-4 pt-6 text-[20px]">
            Ribuan template UI/UX, font, dan ilustrasi untuk mempercepat
            workflow proyekmu.
          </p>

          {/* 🔍 Search Bar — Dipindahkan dari Navbar */}
          <div className="relative w-full max-w-2xl">
            <div className="relative flex h-[55px] items-center rounded-full border border-[#1F2C33] bg-[#0B1418] px-4">
              {/* Category Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoryDropdown((prev) => !prev)}
                  className="flex cursor-pointer items-center gap-1 text-base font-semibold text-gray-300"
                >
                  {selectedCategory}
                  <IoChevronDownSharp
                    className={`ml-1 text-xl transition-transform duration-200 ${
                      categoryDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {categoryDropdown && (
                  <div className="animate-fadeIn absolute top-12 left-0 z-20 w-48 rounded-md border border-[#1E2A30] bg-[#1A252B] shadow-lg">
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
                        className="cursor-pointer px-4 py-3 text-base text-gray-300 transition hover:bg-[#263238] hover:text-[#37A2EA]"
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
                className="absolute right-4 text-gray-400 transition hover:text-white"
              >
                <IoSearch size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-0 flex flex-col items-center justify-center pt-[100px] text-white">
        <Image
          src={glow_carousel}
          alt="Glow Carousel"
          width={1800}
          height={5}
          className="pointer-events-none absolute -z-20 translate-y-45 object-contain select-none"
        />
        <div className="relative z-10">
          <BannerCarousel />
        </div>
      </section>

      {/* Product Section */}
      <section className="relative z-0 flex flex-col items-center pt-20 pb-[100px] text-white">
        <div className="w-full max-w-[1400px] px-8">
          {/* Section Header */}
          <div className="mx-auto mb-8 flex max-w-[1000px] items-center justify-between">
            <h2 className="text-2xl font-bold">
              Telusuri berdasarkan Kategori
            </h2>
            <a
              href="/products"
              className="hover:text-primary-blue text-sm font-medium text-gray-400 transition"
            >
              Ekspor lebih banyak →
            </a>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500"></div>
                <p className="text-gray-400">Memuat produk...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="mx-auto max-w-md rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
              <p className="text-red-400">⚠️ {error}</p>
              <p className="mt-2 text-sm text-gray-400">
                Menampilkan data contoh
              </p>
            </div>
          )}

          {/* Products Grid */}
          {!loading && products.length > 0 && (
            <div className="space-y-6">
              {/* Top Row: 2 Medium-Large Cards */}
              <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-6 md:grid-cols-2">
                {products.slice(0, 2).map((product) => (
                  <CardLanding key={product.productId} item={product} />
                ))}
              </div>

              {/* Bottom Row: 3 Smaller Cards */}
              <div className="mx-auto grid max-w-[890px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.slice(2, 5).map((product) => (
                  <CardLanding key={product.productId} item={product} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-xl text-gray-400">Belum ada produk tersedia</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
