"use client";

import { CartItem } from "@/types/cart";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { MdImageNotSupported } from "react-icons/md";

interface Props {
  item: CartItem;
  onRemove: (productId: string) => void;
  onNavigate?: () => void;
}

export default function CartItemComponent({
  item,
  onRemove,
  onNavigate,
}: Props) {
  return (
    <div className="border-bg-light bg-bg-div hover:border-primary-blue/40 group relative flex gap-3 rounded-xl border p-3 transition-colors">
      {/* Thumbnail */}
      <Link
        href={`/products/${item.slug}`}
        onClick={onNavigate}
        className="bg-bg-light relative size-16 shrink-0 overflow-hidden rounded-lg"
      >
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="text-tertier-netral grid h-full w-full place-items-center">
            <MdImageNotSupported className="size-6" />
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <Link
          href={`/products/${item.slug}`}
          onClick={onNavigate}
          className="hover:text-primary-blue line-clamp-2 text-sm font-semibold text-white transition"
        >
          {item.name}
        </Link>

        {(item.categoryName || item.sellerName) && (
          <p className="text-tertier-netral mt-0.5 line-clamp-1 text-xs">
            {item.categoryName ?? ""}
            {item.categoryName && item.sellerName ? " · " : ""}
            {item.sellerName ? `oleh ${item.sellerName}` : ""}
          </p>
        )}

        <p className="text-primary-yellow mt-1.5 text-sm font-bold">
          IDR {item.price.toLocaleString("id-ID")}
        </p>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(item.productId)}
        aria-label={`Hapus ${item.name} dari keranjang`}
        className="border-bg-light text-tertier-netral absolute top-2 right-2 grid size-7 shrink-0 cursor-pointer place-items-center rounded-full border transition hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-400"
      >
        <IoClose className="size-4" />
      </button>
    </div>
  );
}
