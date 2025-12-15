import { add_product } from "@/assets/illustration";
import Button from "@/components/global/button";
import Image from "next/image";
import Link from "next/link";

const UploadProductCard = () => {
  return (
    <div className="bg-primary-blue flex gap-3 rounded-xl px-5 py-10">
      <div className="flex flex-col">
        <p className="grow text-3xl leading-12 font-semibold text-white">
          Tambahkan <br /> Produk <br /> Digitalmu
        </p>
        <Link href={"/dashboard-product/add"}>
          <Button variant="white" size="lg" className="w-full">
            Unggah
          </Button>
        </Link>
      </div>
      <Image
        src={add_product}
        alt="Tambahkan Product"
        className="h-auto w-48 object-contain"
      />
    </div>
  );
};

export default UploadProductCard;
