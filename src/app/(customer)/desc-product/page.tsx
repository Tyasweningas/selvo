"use client";

import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import Breadcrumb from "@/components/customer/descrip-product/breadcrumb";
import Image from "next/image";
import { useState } from "react";

import img1 from "@/assets/items/img-desc-product.png";
import img2 from "@/assets/items/img-desc-product-2.png";

const productImages = [img1, img2];


function ProductDescription() {
  return (
    <div className="w-full mt-2 bg-[#0A0F1C] p-5 sm:p-7 rounded-2xl border border-[#1b2436] shadow-xl">

    
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-bg-blue rounded-xl flex items-center justify-center">
          <span className="text-primary-blue text-xl">✏️</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">Deskripsi Produk</h2>
      </div>

     
      <div className="w-full bg-[#0F1624] border border-[#2a3345] rounded-2xl p-5 sm:p-7 leading-relaxed text-gray-300 text-sm sm:text-base">
        <p className="mb-4">
          <strong>Soundcore R50i NC</strong><br />
          Nomor Postel: 99665/SDPPI/2024
        </p>

        <p className="mb-4">
          Tempat Pengisian dan Penyangga Ponsel 2-in-1: Nikmati pengalaman menonton
          yang nyaman. Cukup buka panel belakang casing dan letakkan ponsel Anda
          di penyangga. Pembatalan Kebisingan hingga 42dB dengan sistem adaptif,
          dan Mode Transparansi untuk tetap mendengar suara sekitar.
        </p>

        <p>
          <strong>Kelengkapan:</strong><br />
          1x Soundcore R50i NC<br />
          1x Buds Cadangan
        </p>
      </div>

    
      <div className="mt-6 bg-[#0F1624] border border-[#2a3345] rounded-2xl p-4 sm:p-6 flex flex-wrap gap-3">
        {[
          "kaos polos pria",
          "kaos katun combed",
          "kaos basic, baju polos cowo",
          "kaos lengan pendek",
          "kaos pria",
          "kaos polos pria",
        ].map((item, i) => (
          <span
            key={i}
            className="px-4 py-2 rounded-xl bg-[#162231] text-gray-300 text-xs sm:text-sm whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>

    </div>
  );
}




export default function ProductPage() {
  const breadcrumb = ["Beranda", "Desain", "Ikon Aesthetic Tema Bintang"];
  const [activeImage, setActiveImage] = useState(productImages[0]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#1A2B32_20%,#111D22_80%,#0F191E_100%)] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-2">
        <Breadcrumb items={breadcrumb} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-[#1C2434] p-2 rounded-lg flex items-center justify-center w-full">
              <Image
                src={activeImage}
                alt="Product Detail"
                width={900}
                height={900}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
              {productImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(src)}
                  className={`w-24 h-20 sm:w-32 sm:h-24 rounded-lg overflow-hidden border-2 transition ${
                    activeImage === src ? "border-yellow-400" : "border-transparent"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${i}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

           
            <div className="mt-6 w-full">
              <ProductDescription />
            </div>
          </div>


          
          <div className="flex flex-col gap-8 lg:sticky lg:top-24 h-fit">

            
            <div className="bg-[#111827] p-6 rounded-xl shadow-lg h-fit">
              <span className="text-green-400 font-medium">Desain</span>

              <h3 className="text-xl font-bold mt-1">
                Ikon Aesthetic Tema Bintang
              </h3>

              <p className="text-yellow-400 text-2xl font-bold mt-3">
                IDR 500.000
              </p>

              <div className="flex flex-col gap-3 mt-4">
                <button className="bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-xl font-semibold">
                  Beli Produk
                </button>
                <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl font-semibold">
                  Tambah ke Keranjang
                </button>
              </div>
            </div>

            
            <div className="bg-[#0F1624] p-6 rounded-xl shadow-lg border border-[#1b2436]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#0A84FF]/20 text-[#0A84FF] flex items-center justify-center rounded-xl text-xl">
                  ✏️
                </div>
                <h3 className="text-xl font-bold">Spesifikasi Produk</h3>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Ukuran unduh file", value: "1.2 GB" },
                  { label: "Jenis format file", value: ".zip (.eps & .psd)" },
                  { label: "Jumlah halaman file", value: "4 halaman" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <div className="bg-[#1E3A8A] text-white px-5 py-3 rounded-2xl w-full sm:w-48 text-center text-sm font-medium">
                      {item.label}
                    </div>
                    <div className="flex-1 bg-[#0A0F1C] border border-[#1e293b] px-5 py-3 rounded-2xl text-sm text-gray-300 w-full">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>


       
        <div className="mt-14 mb-20">

          <h3 className="text-lg sm:text-xl font-bold mb-4">Ulasan Pembeli</h3>

          <div className="bg-[#5F5B35] p-5 sm:p-6 rounded-xl shadow-lg mb-8 border border-[#6D5D14]">
            <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-[#5F5B35] bg-clip-text text-transparent">
              4.0 ⭐
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">999+ rating • 258 ulasan</p>

            
            <div className="mt-4 space-y-2">
              {[
                { star: 5, width: "80%" },
                { star: 4, width: "60%" },
                { star: 3, width: "40%" },
                { star: 2, width: "15%" },
                { star: 1, width: "20%" },
              ].map((item) => (
                <div key={item.star} className="flex items-center gap-3">

                  <div className="flex items-center gap-1 w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FACC15" viewBox="0 0 24 24" className="w-4 h-4">
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 
                               8.279L12 18.896l-7.416 4.517 1.48-8.279L0 
                               9.306l8.332-1.151z" />
                    </svg>
                    <span className="text-xs sm:text-sm">{item.star}</span>
                  </div>

                 
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-b from-yellow-400 via-[#5F5B35] to-[#403d24]"
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          {[
            {
              name: "Ibnu Hanif Salsabila",
              date: "15 November 2025",
              stars: 5,
              review: "Secara keseluruhan mantep!",
              detail: "Packing bubble nya rapi, pengiriman cepat, kualitas sesuai deskripsi. Sangat recommended."
            },
            {
              name: "Rahel Simanjuntak",
              date: "13 November 2025",
              stars: 4,
              review: "Bagus tapi agak lama.",
              detail: "Desain oke dan file lengkap. Hanya saja pengiriman download lumayan lama."
            },
            {
              name: "Tyas Wening Ayu Sawitri",
              date: "10 November 2025",
              stars: 3,
              review: "Cukup lah.",
              detail: "Desain bagus tapi ukuran file terlalu besar. Bisa dioptimalkan lagi."
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#111827] p-4 sm:p-5 rounded-xl shadow-lg mb-4 border border-[#1b2436]"
            >
              <p className="font-semibold text-sm sm:text-base">{item.name} • {item.date}</p>

              <p className="mt-1 text-sm sm:text-base bg-gradient-to-r from-yellow-400 to-[#5F5B35] bg-clip-text text-transparent font-bold">
                {"⭐".repeat(item.stars)}
              </p>

              <p className="text-gray-300 text-xs sm:text-sm mt-2">{item.review}</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-2 leading-relaxed">{item.detail}</p>
            </div>
          ))}

        </div>

      </main>

      <Footer />
    </div>
  );
}
