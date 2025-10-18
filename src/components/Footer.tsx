
import Image from 'next/image'
import LogoPolibatam from '@/assets/logo/Logo-Polibatam.png'
import LogoTRPL from '@/assets/logo/Logo-TRPL.png'
import LogoInstagram from '@/assets/logo/Logo-Instagram.png'
import LogoTiktok from '@/assets/logo/Logo-Tiktok.png'
import LogoTwitter from '@/assets/logo/Logo-Twitter.png'
export default function Footer() {
    return (
        <>
        <footer className="bg-[#0F191E] mx-auto my-auto text-white flex justify-center ">
          <div className="flex flex-col items-center pt-5 ">
            <div className="flex flex-row gap-5 pt-5">
                <p className="text-3xl font-extrabold">SELVO</p>
                <p>Pasar Digital Favoritmu</p>
            </div>
            <div className="flex flex-row gap-5 pt-5">
                <a href="#">Hubungi Kami</a>
                <a href="#">Bantuan&Faq</a>
                <a href="#">Status Layanan</a>
                <a href="#">Syarat dan Ketentuan</a>
                <a href="#">Kebijakan Privasi</a>
                <a href="#">Changelog</a>
            </div>
           <div className="flex flex-row gap-5 pt-6">
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
              <Image src={LogoInstagram} alt="Logo Instagram" width={20} height={20} />
            </div>
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
              <Image src={LogoTiktok} alt="Logo Tiktok" width={20} height={20} />
            </div>
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
              <Image src={LogoTwitter} alt="Logo Twitter" width={20} height={20} />
            </div>
            </div>
            
            <div className="text-center pt-8">
              <p>Copyright © 2025 Selvo. Hak Cipta Dilindungi Undang-Undang.</p>
              <p>Dikembangkan oleh PBL-TRPL502 Politeknik Negeri Batam</p>
            </div>

            <div className="flex flex-row py-8">
              <Image src={LogoPolibatam} alt="Logo Polibatam" width={160} height={150} />
              <Image src={LogoTRPL} alt="Logo-TRPL" width={150} height={150} />
            </div>
        </div>
        </footer>
        </>
    )

}