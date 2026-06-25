"use client";

import CheckoutModal from "@/components/customer/checkout-modal";
import Breadcrumb from "@/components/customer/descrip-product/breadcrumb";
import ProductReviews from "@/components/customer/descrip-product/product-reviews";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import StarRating from "@/components/global/star-rating";
import { useProductReviews } from "@/hooks/use-product-reviews";
import { getProductBySlug } from "@/services/product.service";
import { createTransaction } from "@/services/transaction.service";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types/product";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  MdAddShoppingCart,
  MdDescription,
  MdLocalOffer,
  MdShoppingBag,
  MdTune,
  MdVisibility,
} from "react-icons/md";
import { toast } from "sonner";

interface ProductClientProps {
  initialProduct: Product;
  slug: string;
}

const integerFormatter = new Intl.NumberFormat("id-ID");

const SectionHeader = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) => (
  <div className="flex items-center gap-3">
    <div className="bg-bg-blue text-primary-blue grid size-11 shrink-0 place-items-center rounded-xl">
      {icon}
    </div>
    <div className="min-w-0">
      <h2 className="text-lg font-bold text-white sm:text-xl">{title}</h2>
      {subtitle && (
        <p className="text-tertier-netral text-xs sm:text-sm">{subtitle}</p>
      )}
    </div>
  </div>
);

function ProductDescription({ product }: { product: Product }) {
  const keywords =
    product.details
      ?.filter((detail) => detail.key.toLowerCase() === "keywords")
      .map((detail) => detail.value)
      .flatMap((value) => value.split(",").map((k) => k.trim()))
      .filter(Boolean) ?? [];

  return (
    <section className="border-bg-light bg-bg-nav rounded-2xl border p-5 shadow-xl sm:p-6">
      <SectionHeader
        icon={<MdDescription size={22} />}
        title="Deskripsi Produk"
        subtitle="Detail produk dari penjual"
      />

      <div className="border-bg-light bg-bg-div mt-5 rounded-xl border p-5 text-sm leading-relaxed text-gray-300 sm:p-6 sm:text-base">
        <p className="mb-3 font-semibold text-white">{product.name}</p>
        <p className="whitespace-pre-wrap">
          {product.description || "Tidak ada deskripsi"}
        </p>
      </div>

      {keywords.length > 0 && (
        <div className="mt-5">
          <div className="text-tertier-netral mb-2 flex items-center gap-2 text-xs font-semibold uppercase">
            <MdLocalOffer className="size-4" />
            Tag Produk
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="border-bg-light bg-bg-div rounded-full border px-3 py-1.5 text-xs text-gray-300 sm:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ProductSpecifications({ details }: { details: NonNullable<Product["details"]> }) {
  return (
    <section className="border-bg-light bg-bg-nav rounded-2xl border p-5 shadow-lg sm:p-6">
      <SectionHeader
        icon={<MdTune size={22} />}
        title="Spesifikasi Produk"
        subtitle="Informasi teknis"
      />

      <dl className="border-bg-light divide-bg-light bg-bg-div mt-5 divide-y rounded-xl border">
        {details.map((spec) => (
          <div
            key={spec.productDetailId}
            className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-4"
          >
            <dt className="text-tertier-netral text-xs font-semibold uppercase">
              {spec.key}
            </dt>
            <dd className="text-sm text-white sm:text-base">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function ProductClient({ initialProduct, slug }: ProductClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [product, setProduct] = useState<Product>(initialProduct);
  const [activeImage, setActiveImage] = useState<string>(
    initialProduct.images?.[0]?.imageUrl ?? "/placeholder-product.png"
  );
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [adsId, setAdsId] = useState<string | null>(null);

  // Cart store
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const isInCart = useCartStore((s) => s.isInCart(product.productId));

  // Background ad-tracking and ad-id state hydration
  useEffect(() => {
    const queryAdsId = searchParams.get("adsId");
    if (queryAdsId) {
      setAdsId(queryAdsId);
      
      const trackClick = async () => {
        try {
          // Send request with ad ID to backend to track clicked event
          const data = await getProductBySlug(slug, { adsId: queryAdsId });
          setProduct(data);
          
          // Clear query adsId from browser url to prevent duplicate tracks on reload
          const params = new URLSearchParams(searchParams.toString());
          params.delete("adsId");
          const next = params.toString();
          router.replace(next ? `?${next}` : "?", { scroll: false });
        } catch (err) {
          console.error("❌ Failed to track dynamic ad click:", err);
        }
      };
      
      trackClick();
    }
  }, [slug, searchParams, router]);

  // Review statistics
  const { meta: reviewMeta } = useProductReviews({
    productId: product.productId,
    page: 1,
    limit: 1,
  });

  const breadcrumb = useMemo(
    () => [
      "Beranda",
      product.category?.name || "Kategori",
      product.name || "Produk",
    ],
    [product],
  );

  const specifications = useMemo(
    () =>
      product.details?.filter(
        (detail) => detail.key.toLowerCase() !== "keywords",
      ) ?? [],
    [product],
  );

  const handleBuyNow = () => setIsCheckoutModalOpen(true);

  const handleAddToCart = () => {
    if (isInCart) {
      openCart();
      return;
    }

    const added = addItem({
      productId: product.productId,
      slug: product.slug,
      name: product.name,
      price: product.price,
      thumbnail: product.images?.[0]?.imageUrl ?? null,
      sellerName: product.seller?.name ?? null,
      categoryName: product.category?.name ?? null,
    });

    if (added) {
      toast.success("Ditambahkan ke keranjang");
      openCart();
    }
  };

  const handleCheckoutSubmit = async (data: {
    name: string;
    email: string;
  }) => {
    try {
      setIsProcessingCheckout(true);
      const transaction = await createTransaction({
        name: data.name,
        email: data.email,
        items: [product.productId],
        adsIds: adsId ? [adsId] : undefined,
      });
      toast.success("Transaksi berhasil dibuat!");
      router.push(`/transactions/${transaction.orderId}`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : (err as { message?: string })?.message || "Gagal membuat transaksi";
      console.error("❌ Failed to create transaction:", err);
      toast.error(message);
      setIsProcessingCheckout(false);
    }
  };

  const totalReviews = reviewMeta?.total ?? 0;
  const averageStar = reviewMeta?.averageStar ?? 0;

  return (
    <div className="from-bg-div via-bg-nav to-bg-body min-h-screen bg-linear-to-b text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-2 pb-20">
        <Breadcrumb items={breadcrumb} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* LEFT: gallery + description + spec */}
          <div className="space-y-6 lg:col-span-2">
            {/* Hero image */}
            <div className="border-bg-light bg-bg-nav relative aspect-16/10 w-full overflow-hidden rounded-2xl border p-3 sm:p-4">
              <div className="bg-bg-div relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={activeImage || "/placeholder-product.png"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {product.images && product.images.length > 1 && (
              <div className="custom-scrollbar flex gap-3 overflow-x-auto pb-1">
                {product.images.map((image, i) => {
                  const isActive = activeImage === image.imageUrl;
                  return (
                    <button
                      key={image.productImageId}
                      type="button"
                      onClick={() => setActiveImage(image.imageUrl)}
                      className={`relative aspect-16/10 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition sm:w-28 ${
                        isActive
                          ? "border-primary-blue"
                          : "border-bg-light hover:border-primary-blue/60"
                      }`}
                      aria-label={`Lihat gambar ${i + 1}`}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={`${product.name} - Image ${i + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  );
                })}
              </div>
            )}

            <ProductDescription product={product} />

            {specifications.length > 0 && (
              <div className="lg:hidden">
                <ProductSpecifications details={specifications} />
              </div>
            )}
          </div>

          {/* RIGHT: sticky purchase card + spec (desktop) */}
          <aside className="flex h-fit flex-col gap-6 lg:sticky lg:top-24">
            <section className="border-bg-light bg-bg-nav rounded-2xl border p-6 shadow-xl">
              {product.category?.name && (
                <span className="bg-bg-green text-primary-green inline-flex rounded-full px-3 py-1 text-xs font-semibold">
                  {product.category.name}
                </span>
              )}

              <h1 className="mt-3 text-2xl leading-tight font-bold text-white">
                {product.name}
              </h1>

              {/* Rating + meta strip */}
              <div className="text-tertier-netral mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <StarRating value={averageStar} size={16} />
                  <span className="font-semibold text-white">
                    {totalReviews > 0
                      ? averageStar.toFixed(1)
                      : "Belum dinilai"}
                  </span>
                  {totalReviews > 0 && (
                    <span>
                      · {integerFormatter.format(totalReviews)} ulasan
                    </span>
                  )}
                </div>
                <span className="bg-bg-light h-3 w-px" />
                <span className="inline-flex items-center gap-1">
                  <MdShoppingBag className="size-4" />
                  {integerFormatter.format(product.totalSold ?? 0)} terjual
                </span>
                <span className="inline-flex items-center gap-1">
                  <MdVisibility className="size-4" />
                  {integerFormatter.format(product.viewCount ?? 0)} dilihat
                </span>
              </div>

              {/* Price */}
              <div className="border-bg-light bg-bg-div mt-5 rounded-xl border p-4">
                <p className="text-tertier-netral text-xs">Harga</p>
                <p className="mt-1 text-3xl font-bold text-white">
                  <span className="text-primary-yellow mr-2 text-xl">IDR</span>
                  {integerFormatter.format(product.price)}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="bg-primary-blue border-primary-blue hover:bg-secondary-blue inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 px-4 py-2.5 font-semibold text-white shadow-[5px_5px_0_#1086d5] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95"
                >
                  <MdShoppingBag className="size-5" />
                  Beli Produk
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="bg-bg-div border-primary-blue text-primary-blue hover:bg-bg-blue hover:border-bg-blue inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 px-4 py-2.5 font-semibold shadow-[5px_5px_0_#17547d] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:text-white hover:shadow-none active:scale-95"
                >
                  <MdAddShoppingCart className="size-5" />
                  {isInCart ? "Sudah di Keranjang" : "Tambah ke Keranjang"}
                </button>
              </div>
            </section>

            {specifications.length > 0 && (
              <div className="hidden lg:block">
                <ProductSpecifications details={specifications} />
              </div>
            )}
          </aside>
        </div>

        <ProductReviews productId={product.productId} />
      </main>

      <Footer />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onSubmit={handleCheckoutSubmit}
        isLoading={isProcessingCheckout}
      />
    </div>
  );
}
