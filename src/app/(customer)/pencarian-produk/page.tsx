"use client";

import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import Breadcrumb from "@/components/customer/descrip-product/breadcrumb";
import Image from "next/image";
import { product_categories } from "@/data/product-categories";
import { FiChevronRight } from "react-icons/fi";
import { useRef } from "react";

export default function PencarianProdukPage() {
  const breadcrumbItems = ["Home", "Pencarian Produk"];


  const refIllustrasi = useRef<HTMLDivElement>(null);
  const refDesain = useRef<HTMLDivElement>(null);
  const refVideo = useRef<HTMLDivElement>(null);

  
  const categoryMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
    "Illustrasi": refIllustrasi,
    "Desain": refDesain,
    "Video": refVideo,
  };

  const scrollToCategory = (name: string) => {
    const ref = categoryMap[name];
    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        
      });
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#1A2B32_20%,#111D22_80%,#0F191E_100%)] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4">
        {/* BREADCRUMB */}
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-1 mb-4">
          <h2 className="text-lg font-bold">345 hasil untuk = ppt</h2>
        </div>

        {/* CATEGORY LIST */}
        <div className="flex flex-wrap gap-3 py-4">
          {product_categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.categorieName)}
              className="
                flex items-center gap-2 px-3 py-3 rounded-lg 
                bg-[#0F1E25] border border-[#1F2F38]
                hover:border-[#2EC8E6] transition cursor-pointer
                shadow-md w-fit
              "
            >
              <Image src={cat.icon} alt={cat.categorieName} width={22} height={22} />
              <span className="text-sm">{cat.categorieName}</span>
              <span className="text-xs text-gray-400">(84,412)</span>
            </button>
          ))}
        </div>

        {/* ============================================================= */}
        {/* 🔥 SECTION 1 — ILLUSTRASI */}
        {/* ============================================================= */}
        <div ref={refIllustrasi} className="mt-12 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EF4DA0]/20 flex items-center justify-center">
                <Image
                  src={product_categories.find((x) => x.categorieName === "Illustrasi")!.icon}
                  alt="Illustrasi"
                  width={22}
                  height={22}
                />
              </div>
              <p className="text-lg font-semibold">Illustrasi</p>
              <span className="text-sm text-gray-400">(84,412)</span>
            </div>

            <button className="flex items-center text-sm text-gray-300 hover:text-white transition">
              Lihat lebih banyak
              <FiChevronRight className="ml-1 text-lg" />
            </button>
          </div>

          <div className="h-40 mt-3 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
            <span className="text-gray-500">[Card Illustrasi tampil di sini]</span>
          </div>
        </div>

        {/* ============================================================= */}
        {/* 🔥 SECTION 2 — DESAIN */}
        {/* ============================================================= */}
        <div ref={refDesain} className="mt-16 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#4D9BEF]/20 flex items-center justify-center">
                <Image
                  src={product_categories.find((x) => x.categorieName === "Desain")!.icon}
                  alt="Desain"
                  width={22}
                  height={22}
                />
              </div>
              <p className="text-lg font-semibold">Desain</p>
              <span className="text-sm text-gray-400">(33,221)</span>
            </div>

            <button className="flex items-center text-sm text-gray-300 hover:text-white transition">
              Lihat lebih banyak
              <FiChevronRight className="ml-1 text-lg" />
            </button>
          </div>

          <div className="h-40 mt-3 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
            <span className="text-gray-500">[Card Desain tampil di sini]</span>
          </div>
        </div>

        {/* ============================================================= */}
        {/* 🔥 SECTION 3 — VIDEO */}
        {/* ============================================================= */}
        <div ref={refVideo} className="mt-16 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#4DEF8E]/20 flex items-center justify-center">
                <Image
                  src={product_categories.find((x) => x.categorieName === "Video")!.icon}
                  alt="Video"
                  width={22}
                  height={22}
                />
              </div>
              <p className="text-lg font-semibold">Video</p>
              <span className="text-sm text-gray-400">(12,004)</span>
            </div>

            <button className="flex items-center text-sm text-gray-300 hover:text-white transition">
              Lihat lebih banyak
              <FiChevronRight className="ml-1 text-lg" />
            </button>
          </div>

          <div className="h-40 mt-3 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
            <span className="text-gray-500">[Card Video tampil di sini]</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
