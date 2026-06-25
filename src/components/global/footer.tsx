import LogoInstagram from "@/assets/logo/logo-instagram.png";
import LogoTiktok from "@/assets/logo/logo-tiktok.png";
import LogoTwitter from "@/assets/logo/logo-twitter.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0F191E] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <p className="text-3xl font-extrabold">SELVO</p>
            <p className="text-sm text-gray-300 sm:text-base">
              Pasar Digital Favoritmu
            </p>
          </div>

          <div className="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-200 sm:grid-cols-3 lg:grid-cols-6">
            <a href="#" className="transition hover:text-[#37A2EA]">
              Hubungi Kami
            </a>
            <a href="#" className="transition hover:text-[#37A2EA]">
              Bantuan & FAQ
            </a>
            <a href="#" className="transition hover:text-[#37A2EA]">
              Status Layanan
            </a>
            <a href="#" className="transition hover:text-[#37A2EA]">
              Syarat dan Ketentuan
            </a>
            <a href="#" className="transition hover:text-[#37A2EA]">
              Kebijakan Privasi
            </a>
            <a href="#" className="transition hover:text-[#37A2EA]">
              Changelog
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Image
                src={LogoInstagram}
                alt="Logo Instagram"
                width={20}
                height={20}
              />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Image
                src={LogoTiktok}
                alt="Logo Tiktok"
                width={20}
                height={20}
              />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Image
                src={LogoTwitter}
                alt="Logo Twitter"
                width={20}
                height={20}
              />
            </div>
          </div>

          <div className="mt-8 w-full border-t border-white/10 pt-6 text-center text-xs text-gray-300 sm:text-sm">
            <p>Copyright © 2026 Selvo. Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="mt-1">Dikembangkan oleh Selvo Founders di Batam</p>
          </div>

          {/* <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <Image
              src={LogoPolibatam}
              alt="Logo Polibatam"
              width={160}
              height={150}
              className="h-14 w-auto sm:h-16"
            />
            <Image
              src={LogoTRPL}
              alt="Logo TRPL"
              width={150}
              height={150}
              className="h-14 w-auto sm:h-16"
            />
          </div> */}
        </div>
      </div>
    </footer>
  );
}
