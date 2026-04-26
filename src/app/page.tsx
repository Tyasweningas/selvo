"use client";
import { glow_carousel } from "@/assets/background";
import GlowCircle from "@/assets/background/glow-circle.png";
import CardLanding from "@/components/customer/landing-page/card-landing";
import BannerCarousel from "@/components/customer/landing-page/carousel/banner-carousel";
import Footer from "@/components/global/footer";
import NavbarLanding from "@/components/global/navbar-landing";
import { products as mockProducts } from "@/data/mock/product-card-mock";
import { product_categories } from "@/data/product-categories";
import { categoryService } from "@/services/category.service";
import { getProducts } from "@/services/product.service";
import { Product, ProductCategory } from "@/types/product";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoChevronDownSharp, IoSearch } from "react-icons/io5";
import { MdCategory } from "react-icons/md";

// export default function Home() {
//   return (
//     <>
//       redirect('/landing-page');
//     </>
//   )
// }

// app/page.tsx

export default function Home() {
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        const categories = data.map((cat) => {
          const icon = product_categories.find(
            (pc) => pc.name === cat.name,
          )?.icon;

          return {
            ...cat,
            icon: icon || undefined,
          };
        });

        console.log("New Category", categories);

        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#1C4763_0%,#111D29_80%,#0F191E_100%)]" />
      <NavbarLanding />

      <section className="relative flex min-h-screen flex-col items-center text-white">
        <div className="absolute top-[110px] left-1/2 -z-10 h-full w-full -translate-x-1/2">
          <Image
            src={GlowCircle}
            alt="Glow background"
            width={1600}
            height={1600}
            className="pointer-events-none w-full object-contain opacity-80 select-none"
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

        <div className="z-10 flex w-full flex-col items-center justify-center px-4 pt-32 text-center sm:px-6 sm:pt-40 lg:pt-[170px]">
          <h1 className="bg-linear-to-b from-[#92CDEE] to-[#9DDAB7] bg-clip-text text-3xl leading-tight font-bold text-transparent sm:text-4xl lg:text-5xl">
            Stop Desain Dari Nol <br /> Mulai dengan Aset Terbaik
          </h1>
          <p className="font-gilroy mb-4 max-w-3xl pt-4 text-base sm:pt-6 sm:text-lg lg:text-[20px]">
            Ribuan template UI/UX, font, dan ilustrasi untuk mempercepat
            workflow proyekmu.
          </p>

          {/* 🔍 Search Bar — Dipindahkan dari Navbar */}
          <div className="relative w-full max-w-2xl">
            <div className="relative flex min-h-[55px] flex-col gap-3 rounded-3xl border border-[#1F2C33] bg-[#0B1418] px-3 py-3 sm:h-[55px] sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:px-4 sm:py-0">
              {/* Category Dropdown */}
              <div className="relative w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setCategoryDropdown((prev) => !prev)}
                  className="flex w-full cursor-pointer items-center justify-between gap-1 text-sm font-semibold text-gray-300 sm:w-auto sm:justify-start sm:text-base"
                >
                  <span className="truncate">{selectedCategory}</span>
                  <IoChevronDownSharp
                    className={`ml-1 text-xl transition-transform duration-200 ${
                      categoryDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {categoryDropdown && (
                  <div className="animate-fadeIn absolute top-12 left-0 z-20 w-full rounded-md border border-[#1E2A30] bg-[#1A252B] shadow-lg sm:w-48">
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

              <div className="mx-3 hidden h-[30px] w-px bg-gray-600 sm:block"></div>

              {/* Search Input */}
              <form action="/search" method="GET" className="relative flex-1">
                <input
                  type="search"
                  name="q"
                  placeholder="Cari template, font, ilustrasi..."
                  className="h-10 w-full border-none bg-transparent pr-10 pl-2 text-sm text-white placeholder-gray-400 focus:outline-none sm:text-base"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-400 transition hover:text-white"
                >
                  <IoSearch size={22} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-bg-div bg-bg-nav mt-12 w-[calc(100%-2rem)] max-w-6xl space-y-5 rounded-xl border-2 p-4 sm:mt-16 sm:w-[calc(100%-3rem)] sm:p-5 lg:mt-20">
          <p className="text-xl font-bold text-white sm:text-2xl">
            Telusuri Berdasarkan Kategori
          </p>
          <hr className="border-gray-400" />
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="my-2 flex h-16 w-full items-center gap-3 sm:my-3"
                >
                  <div className="bg-bg-div h-12 w-12 animate-pulse rounded-xl sm:size-16"></div>
                  <div className="w-full space-y-2">
                    <div className="bg-bg-div h-4 w-14 animate-pulse rounded-full sm:w-20"></div>
                    <div className="bg-bg-div h-4 w-20 animate-pulse rounded-full sm:w-32"></div>
                  </div>
                </div>
                // <div
                //   key={index}
                //   className="bg-bg-div h-22 w-full animate-pulse rounded-lg"
                // ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {categories.map((category) => (
                <button
                  key={category.productCategoryId}
                  className={clsx(
                    "hover:bg-bg-div flex cursor-pointer items-center gap-2 rounded-lg p-2 text-left transition duration-100 active:scale-95 sm:gap-3 sm:p-3",
                  )}
                >
                  {category.icon ? (
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 sm:h-12 sm:w-12"
                    />
                  ) : (
                    <div className="bg-bg-blue rounded-xl p-1.5 sm:p-2">
                      <MdCategory className="text-primary-blue size-6 sm:size-8" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white sm:text-base">
                      {category.name}
                    </p>
                    <p className="line-clamp-2 text-xs text-white sm:text-sm">
                      {category.description || "No description"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative z-0 flex flex-col items-center justify-center px-4 pt-14 text-white sm:px-6 sm:pt-20 md:pt-[100px]">
        <Image
          src={glow_carousel}
          alt="Glow Carousel"
          width={1800}
          height={5}
          className="pointer-events-none absolute -z-20 w-full max-w-[1400px] translate-y-20 object-contain select-none sm:translate-y-32 md:translate-y-45"
        />
        <div className="relative z-10">
          <BannerCarousel />
        </div>
      </section>

      {/* Product Section */}
      <section className="relative z-0 flex flex-col items-center pt-14 pb-16 text-white sm:pt-20 sm:pb-[100px]">
        <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto mb-8 flex max-w-[1000px] flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold sm:text-2xl">
              Telusuri berdasarkan Kategori
            </h2>
            <Link
              href="/products"
              className="hover:text-primary-blue text-sm font-medium text-gray-400 transition"
            >
              Ekspor lebih banyak →
            </Link>
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
              <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                {products.slice(0, 2).map((product) => (
                  <CardLanding key={product.productId} item={product} />
                ))}
              </div>

              {/* Bottom Row: 3 Smaller Cards */}
              <div className="mx-auto grid max-w-[890px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
    </div>
  );
}
