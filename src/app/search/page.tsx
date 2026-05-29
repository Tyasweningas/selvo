import ProductCardCompact from "@/components/customer/search/product-card-compact";
import SearchPagination from "@/components/customer/search/search-pagination";
import SearchSkeleton from "@/components/customer/search/search-skeleton";
import SearchToolbar from "@/components/customer/search/search-toolbar";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { product_categories } from "@/data/product-categories";
import {
  getCategoriesServer,
  getPublicProductsServer,
} from "@/services/product.server.service";
import { Product, ProductCategory } from "@/types/product";
import Link from "next/link";
import { Suspense } from "react";
import { MdSearchOff } from "react-icons/md";

const PAGE_SIZE = 12;

interface SearchPageProps {
  // Next.js 15: searchParams adalah Promise.
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/* ----------------------------------------------------------------------
 * Helpers
 * -------------------------------------------------------------------- */

function pickStringParam(
  value: string | string[] | undefined,
): string | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value[0];
  return value;
}

function pickCategoryIdsParam(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const arr = Array.isArray(value) ? value : [value];
  return arr
    .flatMap((v) => v.split(","))
    .map((s) => s.trim())
    .filter(Boolean);
}

function pickPageParam(value: string | string[] | undefined): number {
  const raw = pickStringParam(value);
  const parsed = raw ? Number.parseInt(raw, 10) : 1;
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
}

function buildHref(q: string, categoryIds: string[], page: number): string {
  const sp = new URLSearchParams();
  if (q) sp.set("q", q);
  if (categoryIds.length > 0) sp.set("category", categoryIds.join(","));
  if (page > 1) sp.set("page", String(page));
  const qs = sp.toString();
  return qs ? `/search?${qs}` : "/search";
}

/* ----------------------------------------------------------------------
 * Result list (Server Component, di-stream lewat Suspense)
 * -------------------------------------------------------------------- */

interface ResultListProps {
  q: string;
  categoryIds: string[];
  page: number;
  categoriesPromise: Promise<ProductCategory[]>;
}

async function ResultList({
  q,
  categoryIds,
  page,
  categoriesPromise,
}: ResultListProps) {
  const [rawCategories, productResult] = await Promise.all([
    categoriesPromise,
    getPublicProductsServer({
      page,
      limit: PAGE_SIZE,
      search: q || undefined,
      categoryId: categoryIds.length > 0 ? categoryIds : undefined,
    }).catch((err) => {
      console.error("[search] failed to fetch products", err);
      return null;
    }),
  ]);

  // Merge icon dari mock lokal ke kategori API (API tidak balikin icon URL).
  const categories: ProductCategory[] = rawCategories.map((cat) => {
    const local = product_categories.find(
      (c) =>
        c.productCategoryId === cat.productCategoryId ||
        c.name.toLowerCase() === cat.name.toLowerCase(),
    );
    return { ...cat, icon: local?.icon ?? cat.icon };
  });

  const products: Product[] = productResult?.data ?? [];
  const total = productResult?.meta.total ?? 0;
  const totalPages =
    productResult && productResult.meta.limit > 0
      ? Math.max(Math.ceil(total / productResult.meta.limit), 1)
      : 1;

  const overflow = page > totalPages && total > 0;

  return (
    <div className="space-y-6">
      <SearchToolbar
        categories={categories}
        initialQuery={q}
        initialCategoryIds={categoryIds}
        totalResults={total}
      />

      {productResult === null ? (
        <div className="border-bg-light bg-bg-div flex flex-col items-center justify-center gap-3 rounded-2xl border p-12 text-center">
          <p className="font-semibold text-red-300">
            Gagal memuat produk. Silakan coba lagi.
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="border-bg-light bg-bg-div flex flex-col items-center justify-center gap-4 rounded-2xl border p-12 text-center">
          <div className="bg-bg-light grid size-16 place-items-center rounded-2xl">
            <MdSearchOff className="text-tertier-netral size-8" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">
              {overflow
                ? "Halaman tidak ditemukan"
                : "Tidak ada produk ditemukan"}
            </p>
            <p className="text-tertier-netral mt-1 text-sm">
              {overflow
                ? `Halaman ${page} di luar jangkauan.`
                : "Coba ubah kata kunci atau hapus beberapa filter kategori."}
            </p>
          </div>
          <Link
            href={overflow ? buildHref(q, categoryIds, 1) : "/search"}
            className="bg-primary-blue hover:bg-secondary-blue inline-flex cursor-pointer items-center justify-center rounded-full px-5 py-2 text-sm font-bold text-white shadow-[5px_5px_0_#1086d5] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95"
          >
            {overflow ? "Kembali ke halaman 1" : "Reset Filter"}
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCardCompact key={product.productId} item={product} />
            ))}
          </div>

          <SearchPagination
            currentPage={page}
            totalPages={totalPages}
            buildHref={(p) => buildHref(q, categoryIds, p)}
          />
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------
 * Page (Server Component)
 * -------------------------------------------------------------------- */

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const q = pickStringParam(params.q)?.trim() ?? "";
  const categoryIds = pickCategoryIdsParam(params.category);
  const page = pickPageParam(params.page);

  // Pre-fire categories request (akan di-await di dalam ResultList,
  // ini memungkinkan paralelisasi dengan products fetch).
  const categoriesPromise = getCategoriesServer().catch((err) => {
    console.error("[search] failed to fetch categories", err);
    return [] as ProductCategory[];
  });

  // Suspense key memastikan skeleton muncul lagi saat user ganti filter
  // (URL berubah → server re-render dengan key baru).
  const suspenseKey = `${q}|${categoryIds.join(",")}|${page}`;

  return (
    <div className="bg-bg-body min-h-screen text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
            Pencarian Produk
          </h1>
          <p className="text-tertier-netral mt-1 text-sm">
            Temukan template, font, ilustrasi, dan aset digital lainnya.
          </p>
        </header>

        <Suspense
          key={suspenseKey}
          fallback={
            <div className="space-y-6">
              <div className="border-bg-light bg-bg-nav h-44 animate-pulse rounded-2xl border" />
              <SearchSkeleton />
            </div>
          }
        >
          <ResultList
            q={q}
            categoryIds={categoryIds}
            page={page}
            categoriesPromise={categoriesPromise}
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
