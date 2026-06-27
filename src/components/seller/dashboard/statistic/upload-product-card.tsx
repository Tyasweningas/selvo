import { add_product } from "@/assets/illustration";
import Button from "@/components/global/button";
import Image from "next/image";
import Link from "next/link";

const UploadProductCard = () => {
  return (
    <div className="bg-primary-blue flex flex-col sm:flex-row gap-5 rounded-xl px-6 py-8 sm:py-10 items-center justify-between">
      <div className="flex flex-col grow justify-between h-full min-h-[140px] w-full sm:w-auto">
        <p className="grow text-2xl sm:text-3xl leading-snug sm:leading-12 font-semibold text-white mb-6 sm:mb-0 text-center sm:text-left">
          Tambahkan <br className="hidden sm:inline" /> Produk <br className="hidden sm:inline" /> Digitalmu
        </p>
        <Link href={"/dashboard-product/add"} className="w-full sm:w-auto">
          <Button variant="white" size="lg" className="w-full">
            Unggah
          </Button>
        </Link>
      </div>
      <Image
        src={add_product}
        alt="Tambahkan Product"
        className="h-auto w-36 sm:w-48 object-contain shrink-0"
      />
    </div>
  );
};

export default UploadProductCard;
