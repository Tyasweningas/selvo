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
  const [isExpanded, setIsExpanded] = useState(false);
  const keywords =
    product.details
      ?.filter((detail) => detail.key.toLowerCase() === "keywords")
      .map((detail) => detail.value)
      .flatMap((value) => value.split(",").map((k) => k.trim()))
      .filter(Boolean) ?? [];

  const descriptionText = product.description || "Tidak ada deskripsi";
  const isLong = descriptionText.length > 280;

  return (
    <section className="border-bg-light bg-bg-nav rounded-2xl border p-5 shadow-xl sm:p-6">
      <SectionHeader
        icon={<MdDescription size={22} />}
        title="Deskripsi Produk"
        subtitle="Detail produk dari penjual"
      />

      <div className="border-bg-light bg-bg-div mt-5 rounded-xl border p-5 text-sm leading-relaxed text-gray-300 sm:p-6 sm:text-base relative overflow-hidden">
        <p className="mb-3 font-semibold text-white">{product.name}</p>
        <div className={`transition-all duration-300 ${!isExpanded && isLong ? "max-h-[140px] overflow-hidden" : ""}`}>
          <p className="whitespace-pre-wrap">
            {descriptionText}
          </p>
          {!isExpanded && isLong && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a2b32] via-[#1a2b32]/80 to-transparent pointer-events-none" />
          )}
        </div>
      </div>

      {isLong && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary-blue hover:text-secondary-blue mt-3 text-sm font-semibold flex items-center justify-center w-full py-1 cursor-pointer transition active:scale-95"
        >
          {isExpanded ? "Sembunyikan Deskripsi ↑" : "Baca Selengkapnya ↓"}
        </button>
      )}

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
  const [activeTab, setActiveTab] = useState<"detail" | "reviews">("detail");

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
    <div className="from-bg-div via-bg-nav to-bg-body min-h-screen bg-linear-to-b text-white pb-24 sm:pb-28 lg:pb-0">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-2">
        <Breadcrumb items={breadcrumb} />

        {/* 📱 MOBILE VIEWPORT LAYOUT (lg:hidden) */}
        <div className="flex flex-col gap-6 lg:hidden">
          {/* 1. Gallery Hero Image */}
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

          {/* Thumbnails list */}
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

          {/* 2. Product Name & Meta Info Card */}
          <section className="border-bg-light bg-bg-nav rounded-2xl border p-5 shadow-xl text-left">
            {product.category?.name && (
              <span className="bg-bg-green text-primary-green inline-flex rounded-full px-3 py-1 text-xs font-semibold">
                {product.category.name}
              </span>
            )}

            <h1 className="mt-2 text-xl leading-tight font-bold text-white sm:text-2xl">
              {product.name}
            </h1>

            {/* Ratings & Sold statistics */}
            <div className="text-tertier-netral mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5">
                <StarRating value={averageStar} size={15} />
                <span className="font-semibold text-white">
                  {totalReviews > 0 ? averageStar.toFixed(1) : "Belum dinilai"}
                </span>
                {totalReviews > 0 && (
                  <span>· {integerFormatter.format(totalReviews)} ulasan</span>
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
            <div className="border-bg-light bg-bg-div mt-4 rounded-xl border p-4">
              <p className="text-tertier-netral text-xs">Harga</p>
              <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                <span className="text-primary-yellow mr-1 text-lg">IDR</span>
                {integerFormatter.format(product.price)}
              </p>
            </div>
          </section>

          {/* 3. Mobile Navigation Tabs */}
          <div>
            <div className="border-b border-bg-light flex w-full mb-5">
              <button
                type="button"
                onClick={() => setActiveTab("detail")}
                className={`flex-1 pb-3 text-center text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === "detail"
                    ? "border-primary-blue text-primary-blue"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Detail & Spesifikasi
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={`flex-1 pb-3 text-center text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === "reviews"
                    ? "border-primary-blue text-primary-blue"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Ulasan ({totalReviews})
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === "detail" ? (
              <div className="space-y-6">
                <ProductDescription product={product} />
                {specifications.length > 0 && (
                  <ProductSpecifications details={specifications} />
                )}
              </div>
            ) : (
              <div className="border-bg-light bg-bg-nav rounded-2xl border p-2 shadow-xl">
                <ProductReviews productId={product.productId} />
              </div>
            )}
          </div>
        </div>

        {/* 🖥️ DESKTOP VIEWPORT LAYOUT (hidden lg:grid) */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
          {/* LEFT COLUMN: Gallery & Description */}
          <div className="space-y-6 lg:col-span-2">
            {/* Gallery */}
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
          </div>

          {/* RIGHT COLUMN: Sidebar Purchase Card & Specs */}
          <aside className="flex h-fit flex-col gap-6 lg:sticky lg:top-24">
            <section className="border-bg-light bg-bg-nav rounded-2xl border p-6 shadow-xl text-left">
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
                    {totalReviews > 0 ? averageStar.toFixed(1) : "Belum dinilai"}
                  </span>
                  {totalReviews > 0 && (
                    <span>· {integerFormatter.format(totalReviews)} ulasan</span>
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
              <ProductSpecifications details={specifications} />
            )}
          </aside>
        </div>

        {/* Desktop Reviews (hidden on mobile, handled by mobile tabs instead) */}
        <div className="hidden lg:block mt-8">
          <ProductReviews productId={product.productId} />
        </div>
      </main>

      <Footer />

      {/* 🛎️ STICKY BOTTOM ACTION BAR FOR MOBILE VIEWPORT (lg:hidden) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#29373d] bg-[#111d22]/95 px-5 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md flex items-center justify-between gap-4 lg:hidden">
        <div className="flex flex-col min-w-0 text-left">
          <span className="text-tertier-netral text-xs uppercase tracking-wider font-semibold">Harga</span>
          <span className="text-xl font-extrabold text-white truncate sm:text-2xl">
            <span className="text-primary-yellow mr-1 text-sm">IDR</span>
            {integerFormatter.format(product.price)}
          </span>
        </div>

        <div className="flex gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className="bg-[#1a2b32] border border-[#29373d] text-primary-blue hover:text-white hover:bg-primary-blue/20 grid size-12 place-items-center rounded-xl transition cursor-pointer active:scale-95"
            aria-label="Tambah ke keranjang"
          >
            <MdAddShoppingCart className="size-5.5" />
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="bg-primary-blue hover:bg-secondary-blue px-6 h-12 rounded-xl font-bold text-white text-sm shadow-[3px_3px_0_#1086d5] transition-all duration-200 cursor-pointer active:scale-95 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            Beli Sekarang
          </button>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onSubmit={handleCheckoutSubmit}
        isLoading={isProcessingCheckout}
      />
    </div>
  );
}
