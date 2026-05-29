import { product_categories } from "@/data/product-categories";

/**
 * Cari ikon kategori berdasarkan UUID atau nama.
 *
 * Sumber kebenaran ikon adalah `data/product-categories.ts` (FE-only),
 * sedangkan API hanya mengembalikan `productCategoryId` + `name`.
 * Jadi kita map dengan UUID dulu, fallback ke nama (case-insensitive).
 */
export function getCategoryIcon(input?: {
  categoryId?: string | null;
  categoryName?: string | null;
}): string | null {
  if (!input) return null;

  const { categoryId, categoryName } = input;

  if (categoryId) {
    const byId = product_categories.find(
      (c) => c.productCategoryId === categoryId,
    );
    if (byId?.icon) return byId.icon as string;
  }

  if (categoryName) {
    const target = categoryName.trim().toLowerCase();
    const byName = product_categories.find(
      (c) => c.name.trim().toLowerCase() === target,
    );
    if (byName?.icon) return byName.icon as string;
  }

  return null;
}
