import Image from "next/image";
import { CartItem } from "@/types/cart";
import { IoClose } from "react-icons/io5";

interface Props {
  item: CartItem;
  onRemove: (id: number) => void;
}

export default function CartItemComponent({ item, onRemove }: Props) {
  return (
    <div className="flex gap-3 p-3 bg-[#0F1922] rounded-lg hover:bg-[#1A252B] transition-colors">
      {/* Product Image */}
      <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.name}
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-semibold text-sm line-clamp-1">
          {item.name}
        </h4>
        <p className="text-gray-400 text-xs mt-0.5">
          {item.creator}
        </p>
        <p className="text-[#FFD700] font-bold text-sm mt-1">
          IDR {item.price.toLocaleString("id-ID")}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        <IoClose size={20} />
      </button>
    </div>
  );
}
