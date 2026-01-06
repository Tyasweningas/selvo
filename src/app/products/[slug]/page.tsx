"use client";

import CheckoutModal from "@/components/customer/checkout-modal";
import Breadcrumb from "@/components/customer/descrip-product/breadcrumb";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { getProductBySlug } from "@/services/product.service";
import { createTransaction } from "@/services/transaction.service";
import { Product } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import img2 from "@/assets/items/img-desc-product-2.png";
import img1 from "@/assets/items/img-desc-product.png";

const productImages = [img1, img2];

interface ProductDescriptionProps {
  product: Product | null;
}

function ProductDescription({ product }: ProductDescriptionProps) {
  if (!product) return null;

  // Extract keywords from product details or use empty array
  const keywords =
    product.details
      ?.filter((detail) => detail.key.toLowerCase() === "keywords")
      .map((detail) => detail.value)
      .flatMap((value) => value.split(",").map((k) => k.trim())) || [];

  return (
    <div className="mt-2 w-full rounded-2xl border border-[#1b2436] bg-[#0A0F1C] p-5 shadow-xl sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-bg-blue flex h-10 w-10 items-center justify-center rounded-xl sm:h-11 sm:w-11">
          <span className="text-primary-blue text-xl">✏️</span>
        </div>
        <h2 className="text-xl font-bold sm:text-2xl">Deskripsi Produk</h2>
      </div>

      <div className="w-full rounded-2xl border border-[#2a3345] bg-[#0F1624] p-5 text-sm leading-relaxed text-gray-300 sm:p-7 sm:text-base">
        <p className="mb-4">
          <strong>{product.name}</strong>
        </p>

        <p className="mb-4 whitespace-pre-wrap">
          {product.description || "Tidak ada deskripsi"}
        </p>
      </div>

      {keywords.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-[#2a3345] bg-[#0F1624] p-4 sm:p-6">
          {keywords.map((item, i) => (
            <span
              key={i}
              className="rounded-xl bg-[#162231] px-4 py-2 text-xs whitespace-nowrap text-gray-300 sm:text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    initialize();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductBySlug(slug);
        setProduct(data);

        // Set first image as active
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0].imageUrl);
        }

        console.log("✅ Product loaded:", data);
      } catch (err: any) {
        console.error("❌ Failed to load product:", err);
        setError(err?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const breadcrumb = [
    "Beranda",
    product?.category?.name || "Kategori",
    product?.name || "Produk",
  ];

  // Get product details for specifications
  const specifications =
    product?.details?.filter(
      (detail) => detail.key.toLowerCase() !== "keywords",
    ) || [];

  const handleBuyNow = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleCheckoutSubmit = async (data: {
    name: string;
    email: string;
  }) => {
    if (!product) return;

    try {
      setIsProcessingCheckout(true);

      const transaction = await createTransaction({
        name: data.name,
        email: data.email,
        items: [product.productId],
      });

      toast.success("Transaksi berhasil dibuat!");

      // Redirect to transaction page
      router.push(`/transactions/${transaction.orderId}`);
    } catch (err: any) {
      console.error("❌ Failed to create transaction:", err);
      toast.error(err?.message || "Gagal membuat transaksi");
      setIsProcessingCheckout(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#1A2B32_20%,#111D22_80%,#0F191E_100%)] text-white">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 pt-20">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500"></div>
              <p className="text-gray-400">Memuat produk...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#1A2B32_20%,#111D22_80%,#0F191E_100%)] text-white">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 pt-20">
          <div className="flex items-center justify-center py-20">
            <div className="mx-auto max-w-md rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
              <p className="text-red-400">
                ⚠️ {error || "Produk tidak ditemukan"}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#1A2B32_20%,#111D22_80%,#0F191E_100%)] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-2">
        <Breadcrumb items={breadcrumb} />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="col-span-2">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-[#1C2434] p-4">
              <div className="relative h-full w-full">
                <Image
                  src={activeImage || "/placeholder-product.png"}
                  alt={product.name}
                  fill
                  className="rounded-lg object-cover"
                  unoptimized
                />
              </div>
            </div>

            {product.images && product.images.length > 0 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {product.images.map((image, i) => (
                  <button
                    key={image.productImageId}
                    onClick={() => setActiveImage(image.imageUrl)}
                    className={`relative aspect-16/10 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition sm:w-32 ${
                      activeImage === image.imageUrl
                        ? "border-yellow-400"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={`${product.name} - Image ${i + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 w-full">
              <ProductDescription product={product} />
            </div>
          </div>

          <div className="flex h-fit flex-col gap-8 lg:sticky lg:top-24">
            <div className="h-fit rounded-xl bg-[#111827] p-6 shadow-lg">
              <span className="font-medium text-green-400">
                {product.category?.name || "Kategori"}
              </span>

              <h3 className="mt-1 text-xl font-bold">{product.name}</h3>

              <p className="mt-3 text-2xl font-bold text-yellow-400">
                IDR {product.price.toLocaleString("id-ID")}
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <button
                  onClick={handleBuyNow}
                  className="rounded-xl bg-sky-500 py-2 font-semibold text-white hover:bg-sky-600"
                >
                  Beli Produk
                </button>
                <button className="rounded-xl bg-pink-500 py-2 font-semibold text-white hover:bg-pink-600">
                  Tambah ke Keranjang
                </button>
              </div>
            </div>

            {specifications.length > 0 && (
              <div className="rounded-xl border border-[#1b2436] bg-[#0F1624] p-6 shadow-lg">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A84FF]/20 text-xl text-[#0A84FF]">
                    ✏️
                  </div>
                  <h3 className="text-xl font-bold">Spesifikasi Produk</h3>
                </div>

                <div className="space-y-4">
                  {specifications.map((spec) => (
                    <div
                      key={spec.productDetailId}
                      className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
                    >
                      <div className="w-full rounded-2xl bg-[#1E3A8A] px-5 py-3 text-center text-sm font-medium text-white sm:w-48">
                        {spec.key}
                      </div>
                      <div className="w-full flex-1 rounded-2xl border border-[#1e293b] bg-[#0A0F1C] px-5 py-3 text-sm text-gray-300">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 mb-20">
          <h3 className="mb-4 text-lg font-bold sm:text-xl">Ulasan Pembeli</h3>

          <div className="mb-8 rounded-xl border border-[#6D5D14] bg-[#5F5B35] p-5 shadow-lg sm:p-6">
            <p className="bg-gradient-to-r from-yellow-400 to-[#5F5B35] bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
              4.0 ⭐
            </p>
            <p className="text-xs text-gray-400 sm:text-sm">
              999+ rating • 258 ulasan
            </p>

            <div className="mt-4 space-y-2">
              {[
                { star: 5, width: "80%" },
                { star: 4, width: "60%" },
                { star: 3, width: "40%" },
                { star: 2, width: "15%" },
                { star: 1, width: "20%" },
              ].map((item) => (
                <div key={item.star} className="flex items-center gap-3">
                  <div className="flex w-10 items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#FACC15"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                    >
                      <path
                        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 
                               8.279L12 18.896l-7.416 4.517 1.48-8.279L0 
                               9.306l8.332-1.151z"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm">{item.star}</span>
                  </div>

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-b from-yellow-400 via-[#5F5B35] to-[#403d24]"
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {[
            {
              name: "Ibnu Hanif Salsabila",
              date: "15 November 2025",
              stars: 5,
              review: "Secara keseluruhan mantep!",
              detail:
                "Packing bubble nya rapi, pengiriman cepat, kualitas sesuai deskripsi. Sangat recommended.",
            },
            {
              name: "Rahel Simanjuntak",
              date: "13 November 2025",
              stars: 4,
              review: "Bagus tapi agak lama.",
              detail:
                "Desain oke dan file lengkap. Hanya saja pengiriman download lumayan lama.",
            },
            {
              name: "Tyas Wening Ayu Sawitri",
              date: "10 November 2025",
              stars: 3,
              review: "Cukup lah.",
              detail:
                "Desain bagus tapi ukuran file terlalu besar. Bisa dioptimalkan lagi.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="mb-4 rounded-xl border border-[#1b2436] bg-[#111827] p-4 shadow-lg sm:p-5"
            >
              <p className="text-sm font-semibold sm:text-base">
                {item.name} • {item.date}
              </p>

              <p className="mt-1 bg-gradient-to-r from-yellow-400 to-[#5F5B35] bg-clip-text text-sm font-bold text-transparent sm:text-base">
                {"⭐".repeat(item.stars)}
              </p>

              <p className="mt-2 text-xs text-gray-300 sm:text-sm">
                {item.review}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-gray-400 sm:text-sm">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onSubmit={handleCheckoutSubmit}
        isLoading={isProcessingCheckout}
      />
    </div>
  );
}
