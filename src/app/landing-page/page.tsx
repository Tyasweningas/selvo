import Image from "next/image";
import Navbar from "@/components/global/navbar";
import ProductCard from "@/components/customer/landing-page/product-card";
import GlowCircle from "@/assets/background/glow-circle.png";
import LeftFloating from "@/assets/items/left-floating-items.png";
import RightFloating from "@/assets/items/right-floating-items.png";
import { glow_carousel } from "@/assets/background";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import BannerCarousel from "@/components/customer/landing-page/carousel/banner-carousel";

export default function LandingPage() {

  return (
     <>
  <Navbar />

 
  <div className="fixed inset-0 -z-20 bg-[linear-gradient(180deg,#1C4763_0%,#111D29_80%,#0F191E_100%)]" />

  <section className="relative min-h-screen flex flex-col items-center text-white">
    <div className="absolute top-[-110px] left-1/2 -translate-x-1/2 -z-10 w-full h-full">
      <Image
        src={GlowCircle}
        alt="Glow background"
        width={1600}
        height={1600}
        className="object-contain opacity-80 pointer-events-none select-none"
        priority
      />
    </div>

    <Image
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
    />

 
    <div className="flex flex-col items-center justify-center text-center pt-[120px] z-10">
      <p className="text-[28px] mb-4 font-gilroy">Evolve your sales with Selvo</p>
      <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#92CDEE] to-[#9DDAB7]">
        Bangun, Jual & Temukan <br /> Produk Digital Tanpa Batas
      </h1>
      <p className="text-[20px] mb-4 font-gilroy pt-10">
        Beli dengan mudah, jual dengan nyaman, semuanya <br />
        dalam satu platform yang ramah kreator
      </p>

      <div className="flex gap-6 mt-10">
        <button className="px-8 py-3 rounded-xl border border-[#37A2EA] text-[#37A2EA] font-semibold transition-all duration-300 hover:text-white hover:bg-[#37A2EA]/20 hover:shadow-[0_0_20px_#37A2EA80]">
          Ayo Jelajahi
        </button>
        <button className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#37A2EA] to-[#4EBD77] shadow-[0_0_25px_#4EBD77a0] transition-all duration-300 hover:shadow-[0_0_40px_#4EBD77cc] hover:scale-[1.03]">
          Mulai Menjual
        </button>
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
