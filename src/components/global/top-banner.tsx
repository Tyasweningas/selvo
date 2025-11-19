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
        "w-full text-white text-[11px]", 
        {
          "bg-primary-blue": variant === "blue",
          "bg-[#4EBD77]": variant === "green",
        },
        className
      )}
    >
      <div
        className={clsx(
          "container mx-auto flex flex-col items-center gap-1 px-4 py-2",
          "md:flex-row md:justify-between md:py-1.5"
        )}
      >
        
        <ul className="flex items-center gap-3 font-semibold overflow-x-auto whitespace-nowrap md:text-[12px] md:gap-4">
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

        
        <p className="text-[10px] font-bold text-center md:text-[11px]">
          Pasar Digital Favoritmu
        </p>

        
        <div className="flex items-center gap-2 text-[11px] md:text-[12px]">
          <div className="flex items-center gap-1.5">
            <IndonesiaFlag />
            <p className="font-semibold hidden sm:block text-[11px]">
              Indonesia (IDR)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <FaInstagram size={13} /> 
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <FaTiktok size={13} /> 
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <FaXTwitter size={13} /> 
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;

const IndonesiaFlag = () => (
  <span className="inline-block h-[10px] w-[16px] overflow-hidden rounded-sm border border-white">
    <span className="block h-1/2 w-full bg-red-600"></span>
    <span className="block h-1/2 w-full bg-white"></span>
  </span>
);
