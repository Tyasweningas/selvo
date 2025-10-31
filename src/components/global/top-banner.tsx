import clsx from "clsx";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface props {
  variant?: "blue" | "green";
  className?: string;
}

const TopBanner = ({ variant = "blue", className }: props) => {
  return (
    <div
      className={clsx({
        "bg-primary-blue": variant === "blue",
        "bg-primary-blue": variant === "green",
        [className || ""]: Boolean(className),
      })}
    >
      <div
        className={clsx(
          "container mx-auto flex h-[36px] w-full items-center justify-between text-sm text-white",
        )}
      >
        <ul className="flex gap-6 font-medium">
          <li>
            <Link href="#">Syarat & Ketentuan</Link>
          </li>
          <li>
            <Link href="#">Bantuan & FAQ</Link>
          </li>
          <li>
            <Link href="#">Hubungi Kami</Link>
          </li>
        </ul>

        <p className="font-light">Pasar Digital Favoritmu</p>

        <div className="flex items-center gap-2">
          <IndonesiaFlag />
          <p className="font-medium">Indonesia (Rupiah IDR)</p>
          <div className="ml-5 flex items-center gap-3">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white"
            >
              <FaInstagram size={16} className="hover:opacity-80" />
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-white"
            >
              <FaTiktok size={16} className="hover:opacity-80" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="text-white"
            >
              <FaXTwitter size={16} className="hover:opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;

// 🇮🇩 Komponen bendera Indonesia (React)
const IndonesiaFlag = () => (
  <span className="inline-block h-[12px] w-[18px] overflow-hidden rounded-sm border border-white">
    <span className="block h-1/2 w-full bg-red-600"></span>
    <span className="block h-1/2 w-full bg-white"></span>
  </span>
);
