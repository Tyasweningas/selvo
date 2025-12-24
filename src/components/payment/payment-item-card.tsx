import { ProductCardType } from "@/types/product-card";
import Image, { StaticImageData } from "next/image";
import Input from "../global/input";
import { FiCopy, FiTag } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";

interface PaymentItemCardProps {
  item: ProductCardType;
  downloadUrl: string;
  tag: string;
  categoryIcon: string | StaticImageData;
}

const PaymentItemCard = ({
  item,
  downloadUrl,
  tag,
  categoryIcon,
}: PaymentItemCardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border-2 border-bg-light bg-bg-div p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={item.thumbnail}
            alt={item.name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-white">{item.name}</h3>
          <p className="text-sm text-sec-netral">{item.creator}</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 md:w-2/3 md:items-end">
        <div className="flex">
          <span className="flex items-center gap-1 rounded-full bg-primary-blue px-3 py-1 text-xs font-bold text-white">
            <Image
              src={categoryIcon}
              alt={tag}
              width={14}
              height={14}
              className="h-[14px] w-[14px] object-contain"
            />
            {tag}
          </span>
        </div>
        
        <div className="w-full">
            <Input
            value={downloadUrl}
            readOnly
            suffix={
                <button
                className="cursor-pointer text-sec-netral hover:text-white"
                onClick={() => navigator.clipboard.writeText(downloadUrl)}
                title="Copy Link"
                >
                <FiCopy size={18} />
                </button>
            }
            className="w-full !bg-bg-main !py-2"
            />
        </div>
      </div>
    </div>
  );
};

export default PaymentItemCard;
