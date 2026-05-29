import { getCategoryIcon } from "@/lib/category-icon";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { MdImageNotSupported } from "react-icons/md";

interface Props {
  item: Product;
}

const integerFormatter = new Intl.NumberFormat("id-ID");

/**
 * Kartu produk versi kompak.
 *
 * Dirancang untuk grid padat (≥3 kolom dengan lebar kartu ~260–320px),
 * misalnya di halaman /search. Untuk landing page yang punya kartu
 * lebih lebar, gunakan `CardLanding`.
 */
export default function ProductCardCompact({ item }: Props) {
  const thumbnail = item.images?.[0]?.imageUrl ?? null;
  const creator = item.seller?.name ?? "Seller";
  const categoryName = item.category?.name ?? null;
  const categoryIcon = getCategoryIcon({
    categoryId: item.categoryId,
    categoryName,
  });
  const rate = 4.5;

  return (
    <Link
      href={`/products/${item.slug}`}
      aria-label={item.name}
      className="group block h-full focus:outline-none"
    >
      <article className="border-bg-light bg-bg-div hover:border-primary-blue/60 flex h-full min-w-0 flex-col overflow-hidden rounded-xl border shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        {/* Thumbnail */}
        <div className="bg-bg-light relative aspect-4/3 w-full shrink-0 overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="text-tertier-netral grid h-full w-full place-items-center">
              <MdImageNotSupported className="size-8" />
            </div>
          )}

          {/* Category chip — overlay top-left */}
          {(categoryName || categoryIcon) && (
            <span className="bg-bg-nav/90 absolute top-2 left-2 inline-flex max-w-[calc(100%-1rem)] items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
              {categoryIcon && (
                <Image
                  src={categoryIcon}
                  alt=""
                  width={12}
                  height={12}
                  aria-hidden="true"
                  className="size-3 shrink-0"
                />
              )}
              <span className="truncate">{categoryName ?? "Kategori"}</span>
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3">
          <h3
            title={item.name}
            className="line-clamp-2 min-h-[2.4em] text-[13px] leading-snug font-bold text-white"
          >
            {item.name}
          </h3>

          <p
            title={creator}
            className="text-tertier-netral truncate text-[11px]"
          >
            {creator}
          </p>

          {/* Price + rating dalam satu baris */}
          <div className="mt-auto flex min-w-0 items-end justify-between gap-2 pt-1">
            <p className="text-primary-yellow min-w-0 truncate text-sm leading-tight font-extrabold">
              <span className="mr-0.5 text-[10px] font-bold tracking-wide">
                IDR
              </span>
              {integerFormatter.format(item.price)}
            </p>
            <div className="text-tertier-netral flex shrink-0 items-center gap-0.5 text-[11px]">
              <IoStar className="size-3 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-white">
                {rate.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
