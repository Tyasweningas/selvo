import { MetadataRoute } from "next";
import { getProducts } from "@/services/product.service";

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://selvo.web.id";

  // 1. Static Routes
  const staticRoutes = ["", "/about", "/panduan-penjual", "/search"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1.0 : 0.8,
    }),
  );

  // 2. Dynamic Product Routes
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    productRoutes = products
      .filter((p) => p.status === "APPROVED" || !p.status) // safe default
      .map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch (err) {
    console.error("⚠️ Failed to generate dynamic product routes for sitemap:", err);
  }

  return [...staticRoutes, ...productRoutes];
}
