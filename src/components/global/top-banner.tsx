import clsx from "clsx";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface Props {
  variant?: "blue" | "green";
  className?: string;
}

const TopBanner = ({ variant = "blue", className }: Props) => {
  return (
    <div
      className={clsx(
        "w-full text-white text-base",
        {
          "bg-primary-blue": variant === "blue",
          "bg-[#4EBD77]": variant === "green",
        },
        className
      )}
    >
      <div
        className={clsx(
          // pakai grid agar kiri–tengah–kanan sejajar
          "container mx-auto grid h-auto grid-cols-3 items-center px-4 py-2 text-center",
          "md:h-[36px]"
        )}
      >
        {/* === Kiri === */}
        <ul className="flex flex-wrap items-center justify-start gap-4 font-bold text-[13px] md:text-base">
          <li>
            <Link href="#" className="hover:underline">
              Syarat & Ketentuan
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Bantuan & FAQ
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Hubungi Kami
            </Link>
          </li>
        </ul>

        {/* === Tengah === */}
        <p className="text-xs font-bold md:text-base text-center">
          Pasar Digital Favoritmu
        </p>

        {/* === Kanan === */}
        <div className="flex items-center justify-end gap-3 text-sm md:text-base">
          <div className="flex items-center gap-3">
            <IndonesiaFlag />
            <p className="font-bold hidden sm:block">Indonesia (Rupiah IDR)</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:opacity-80"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-white hover:opacity-80"
            >
              <FaTiktok size={16} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="text-white hover:opacity-80"
            >
              <FaXTwitter size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;

const IndonesiaFlag = () => (
  <span className="inline-block h-[12px] w-[18px] overflow-hidden rounded-sm border border-white">
    <span className="block h-1/2 w-full bg-red-600"></span>
    <span className="block h-1/2 w-full bg-white"></span>
  </span>
);
