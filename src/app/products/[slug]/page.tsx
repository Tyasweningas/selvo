import { getProductBySlug } from "@/services/product.service";
import ProductClient from "./product-client";
import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import { Metadata } from "next";
import { Product } from "@/types/product";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for search engines and social card previews
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    const product = await getProductBySlug(slug);
    if (!product) {
      return {
        title: "Produk Tidak Ditemukan",
        description: "Detail produk tidak tersedia.",
      };
    }

    const imageUrl = product.images?.[0]?.imageUrl || "/placeholder-product.png";
    const productDesc = product.description
      ? product.description.substring(0, 160)
      : `Beli ${product.name} di Selvo - Marketplace Digital Produk Kreatif.`;

    return {
      title: product.name,
      description: productDesc,
      alternates: {
        canonical: `https://selvo.web.id/products/${slug}`,
      },
      openGraph: {
        type: "article",
        title: `${product.name} | Selvo`,
        description: productDesc,
        url: `https://selvo.web.id/products/${slug}`,
        images: [
          {
            url: imageUrl,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} | Selvo`,
        description: productDesc,
        images: [imageUrl],
      },
    };
  } catch (err) {
    console.error("Error generating metadata:", err);
    return {
      title: "Detail Produk",
      description: "Marketplace digital untuk produk kreatif.",
    };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let product: Product | null = null;
  let errorMsg: string | null = null;

  try {
    product = await getProductBySlug(slug);
  } catch (err: any) {
    console.error("❌ Error loading product on server:", err);
    errorMsg = err.message || "Gagal memuat detail produk";
  }

  if (!product) {
    return (
      <div className="bg-bg-body min-h-screen text-white">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 pt-20">
          <div className="flex items-center justify-center py-24">
            <div className="mx-auto max-w-md rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
              <p className="font-semibold text-red-300">
                {errorMsg || "Produk tidak ditemukan"}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Define structured JSON-LD data for Product schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images?.map((img) => img.imageUrl) || ["https://selvo.web.id/placeholder-product.png"],
    "description": product.description || `Aset digital ${product.name} di Selvo`,
    "sku": product.productId,
    "offers": {
      "@type": "Offer",
      "url": `https://selvo.web.id/products/${slug}`,
      "priceCurrency": "IDR",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": product.seller?.name || "Selvo Creator",
        "url": "https://selvo.web.id"
      }
    }
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient initialProduct={product} slug={slug} />
    </>
  );
}
