import { getCategoryIcon } from "@/lib/category-icon";
import { Product } from "@/types/product";
import { ProductCardType } from "@/types/product-card";
import Image from "next/image";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { MdImageNotSupported } from "react-icons/md";

interface Props {
  item: ProductCardType | Product;
}

function isProductAPI(item: ProductCardType | Product): item is Product {
  return "productId" in item;
}

const integerFormatter = new Intl.NumberFormat("id-ID");

/**
 * Kartu landing — versi besar, cocok untuk hero/landing grid (1–2 kolom)
 * atau showcase. Untuk grid padat seperti /search dengan ≥3 kolom,
 * pakai `ProductCardCompact`.
 */
export default function CardLanding({ item }: Props) {
  const isApi = isProductAPI(item);

  const name = item.name;
  const price = item.price;
  const slug = isApi ? item.slug : `product-${item.id}`;

  const thumbnail = isApi
    ? (item.images?.[0]?.imageUrl ?? null)
    : (item as ProductCardType).thumbnail;

  const creator = isApi
    ? (item.seller?.name ?? "Seller")
    : (item as ProductCardType).creator;

  const categoryName = isApi ? (item.category?.name ?? null) : null;

  const categoryIcon = isApi
    ? getCategoryIcon({
        categoryId: item.categoryId,
        categoryName,
      })
    : null;

  const rate = isApi ? 4.5 : (item as ProductCardType).rate;

  return (
    <Link
      href={`/products/${slug}`}
      aria-label={name}
      className="group block h-full"
    >
      <article className="border-bg-light bg-bg-div hover:border-primary-blue/60 flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
        <div className="bg-bg-light relative aspect-4/3 w-full shrink-0 overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              unoptimized={isApi}
            />
          ) : (
            <div className="text-tertier-netral grid h-full w-full place-items-center">
              <MdImageNotSupported className="size-10" />
            </div>
          )}

          {(categoryName || categoryIcon) && (
            <span className="bg-bg-nav/90 absolute top-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
              {categoryIcon && (
                <Image
                  src={categoryIcon}
                  alt=""
                  width={14}
                  height={14}
                  aria-hidden="true"
                  className="size-3.5 shrink-0"
                />
              )}
              <span className="truncate">{categoryName ?? "Kategori"}</span>
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-4">
          <h3
            title={name}
            className="line-clamp-2 min-h-[2.6em] text-[15px] leading-snug font-bold text-white"
          >
            {name}
          </h3>
          <p
            title={creator}
            className="text-tertier-netral mt-1.5 truncate text-xs"
          >
            oleh {creator}
          </p>
          <div className="text-tertier-netral mt-2 flex items-center gap-1.5 text-xs">
            <IoStar className="size-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-white">{rate.toFixed(1)}</span>
            <span>·</span>
            <span>Penilaian</span>
          </div>
          <div className="flex-1" />
          <div className="border-bg-light mt-3 border-t pt-3">
            <p className="text-tertier-netral text-[10px] tracking-wide uppercase">
              Harga
            </p>
            <p className="text-primary-yellow truncate text-lg leading-tight font-extrabold">
              <span className="mr-1 text-sm">IDR</span>
              {integerFormatter.format(price)}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
