import { Product, ProductCategory } from "@/types/product";
import { product_categories } from "@/data/product-categories";
import { products as mockProducts } from "@/data/mock/product-card-mock";
import { categoryService } from "@/services/category.service";
import { getProducts } from "@/services/product.service";
import HomeClient from "./home-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selvo - Marketplace Digital Produk Kreatif",
  description:
    "Stop desain dari nol, mulai dengan aset terbaik. Ribuan template UI/UX, font, ilustrasi, audio, dan aset 3D untuk mempercepat workflow proyek Anda di Selvo.",
  alternates: {
    canonical: "https://selvo.web.id",
  },
};

export default async function HomePage() {
  let products: Product[] = [];
  let categories: ProductCategory[] = [];

  // Fetch products on server with error safety fallback
  try {
    products = await getProducts();
  } catch (err) {
    console.error("⚠️ Failed to fetch products on server, falling back to mock data:", err);
    products = mockProducts as any;
  }

  // Fetch categories on server with error safety fallback
  try {
    const rawCategories = await categoryService.getCategories();
    categories = rawCategories.map((cat) => {
      const icon = product_categories.find((pc) => pc.name === cat.name)?.icon;
      return {
        ...cat,
        icon: icon || undefined,
      };
    });
  } catch (err) {
    console.error("⚠️ Failed to fetch categories on server, falling back to empty list:", err);
  }

  return (
    <HomeClient
      initialProducts={products}
      initialCategories={categories}
    />
  );
}
