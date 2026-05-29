"use client";

import { ProductCategory } from "@/types/product";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import {
  MdChevronLeft,
  MdChevronRight,
  MdRefresh,
  MdTune,
} from "react-icons/md";

interface Props {
  categories: ProductCategory[];
  initialQuery: string;
  initialCategoryIds: string[];
  totalResults: number;
}

const QUERY_KEY = "q";
const CATEGORY_KEY = "category";
const PAGE_KEY = "page";

/**
 * Toolbar pencarian — top-anchored layout:
 *
 * 1. Search bar besar
 * 2. Strip kategori dengan icon image (horizontal scroll, multi-select)
 * 3. Active filter chips + reset
 *
 * Pattern ini sengaja TIDAK pakai sidebar sehingga grid hasil tetap
 * full-width dan tidak fragile saat berpindah breakpoint.
 */
export default function SearchToolbar({
  categories,
  initialQuery,
  initialCategoryIds,
  totalResults,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [queryInput, setQueryInput] = useState(initialQuery);

  // Sync input bila URL berubah dari luar (klik kategori dll).
  useEffect(() => {
    setQueryInput(initialQuery);
  }, [initialQuery]);

  /**
   * Push state ke URL. Reset page ke 1 setiap filter berubah.
   */
  const pushFilters = useCallback(
    (next: { q?: string; category?: string[] }) => {
      const sp = new URLSearchParams(searchParams.toString());

      const nextQ = next.q ?? sp.get(QUERY_KEY) ?? "";
      if (nextQ.trim()) sp.set(QUERY_KEY, nextQ.trim());
      else sp.delete(QUERY_KEY);

      const nextCategories =
        next.category ??
        (sp.get(CATEGORY_KEY)
          ? sp
              .get(CATEGORY_KEY)!
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : []);
      if (nextCategories.length > 0) {
        sp.set(CATEGORY_KEY, nextCategories.join(","));
      } else {
        sp.delete(CATEGORY_KEY);
      }

      sp.delete(PAGE_KEY);

      const queryString = sp.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  // Debounced search input
  useEffect(() => {
    const trimmed = queryInput.trim();
    if (trimmed === initialQuery) return;
    const t = setTimeout(() => pushFilters({ q: trimmed }), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryInput]);

  const toggleCategory = useCallback(
    (categoryId: string) => {
      const next = initialCategoryIds.includes(categoryId)
        ? initialCategoryIds.filter((id) => id !== categoryId)
        : [...initialCategoryIds, categoryId];
      pushFilters({ category: next });
    },
    [initialCategoryIds, pushFilters],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      pushFilters({ q: queryInput.trim() });
    },
    [pushFilters, queryInput],
  );

  const resetAll = useCallback(() => {
    setQueryInput("");
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const activeCount = useMemo(
    () => initialCategoryIds.length + (initialQuery ? 1 : 0),
    [initialCategoryIds.length, initialQuery],
  );

  /* ----------------------------------------------------------------
   * Category strip — horizontal scrolling dengan tombol prev/next
   * -------------------------------------------------------------- */
  const stripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, categories.length]);

  const scrollByAmount = (dir: "left" | "right") => {
    const el = stripRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 240);
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="border-bg-light bg-bg-nav overflow-hidden rounded-2xl border shadow-lg">
      {/* Search bar */}
      <div className="border-bg-light border-b p-4 sm:p-5">
        <form
          onSubmit={handleSubmit}
          role="search"
          className="border-bg-light bg-bg-div focus-within:border-primary-blue/60 focus-within:bg-bg-body flex h-12 items-center gap-3 rounded-full border px-5 transition"
        >
          <IoSearch className="text-tertier-netral size-5 shrink-0" />
          <input
            type="search"
            name={QUERY_KEY}
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Cari berdasarkan judul produk..."
            aria-label="Cari produk"
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none sm:text-base"
          />
          {queryInput && (
            <button
              type="button"
              onClick={() => {
                setQueryInput("");
                pushFilters({ q: "" });
              }}
              aria-label="Bersihkan input pencarian"
              className="text-tertier-netral hover:bg-bg-light grid size-7 cursor-pointer place-items-center rounded-full transition hover:text-white"
            >
              <IoClose className="size-4" />
            </button>
          )}
        </form>
      </div>

      {/* Category strip */}
      <div className="relative px-2 py-3 sm:px-3">
        <div className="flex items-center gap-2 px-2 sm:px-3">
          <MdTune className="text-tertier-netral size-4 shrink-0" />
          <span className="text-tertier-netral text-xs font-bold tracking-wide uppercase">
            Kategori
          </span>
          {initialCategoryIds.length > 0 && (
            <span className="bg-primary-blue ml-1 inline-flex items-center justify-center rounded-full px-1.5 py-px text-[10px] font-bold text-white">
              {initialCategoryIds.length}
            </span>
          )}
        </div>

        <div className="relative mt-2">
          {/* Prev arrow */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollByAmount("left")}
              aria-label="Geser kategori ke kiri"
              className="bg-bg-nav/95 border-bg-light text-tertier-netral absolute top-1/2 left-1 z-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border p-1.5 shadow-lg backdrop-blur hover:text-white sm:inline-flex"
            >
              <MdChevronLeft className="size-5" />
            </button>
          )}

          {/* Strip */}
          <div
            ref={stripRef}
            className="custom-scrollbar -mx-1 flex gap-2 overflow-x-auto px-3 py-1 sm:gap-3"
            style={{ scrollbarWidth: "none" }}
          >
            {categories.length === 0 ? (
              <p className="text-tertier-netral px-2 py-3 text-sm">
                Belum ada kategori tersedia.
              </p>
            ) : (
              categories.map((cat) => {
                const checked = initialCategoryIds.includes(
                  cat.productCategoryId,
                );
                return (
                  <button
                    key={cat.productCategoryId}
                    type="button"
                    onClick={() => toggleCategory(cat.productCategoryId)}
                    aria-pressed={checked}
                    className={`group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                      checked
                        ? "bg-primary-blue border-primary-blue text-white shadow-[0_4px_14px_rgba(55,162,234,0.35)]"
                        : "border-bg-light bg-bg-div text-tertier-netral hover:border-primary-blue/60 hover:bg-bg-light hover:text-white"
                    }`}
                  >
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full transition`}
                    >
                      {cat.icon ? (
                        <Image
                          src={cat.icon}
                          alt=""
                          width={20}
                          height={20}
                          aria-hidden="true"
                          className="size-7 rounded-full object-contain"
                          unoptimized
                        />
                      ) : (
                        <span className="text-tertier-netral text-[10px] font-bold">
                          {cat.name.slice(0, 1).toUpperCase()}
                        </span>
                      )}
                    </span>
                    <span className="whitespace-nowrap">{cat.name}</span>
                  </button>
                );
              })
            )}
          </div>

          {/* Next arrow */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollByAmount("right")}
              aria-label="Geser kategori ke kanan"
              className="bg-bg-nav/95 border-bg-light text-tertier-netral absolute top-1/2 right-1 z-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border p-1.5 shadow-lg backdrop-blur hover:text-white sm:inline-flex"
            >
              <MdChevronRight className="size-5" />
            </button>
          )}
        </div>
      </div>

      {/* Results meta + active filters + reset */}
      <div className="border-bg-light flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-tertier-netral text-xs sm:text-sm">
            <span className="font-bold text-white">
              {totalResults.toLocaleString("id-ID")}
            </span>{" "}
            hasil ditemukan
          </span>

          {initialQuery && (
            <span className="bg-bg-blue text-primary-blue inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
              &quot;{initialQuery}&quot;
              <button
                type="button"
                onClick={() => {
                  setQueryInput("");
                  pushFilters({ q: "" });
                }}
                aria-label="Hapus filter pencarian"
                className="hover:text-white"
              >
                <IoClose className="size-3.5" />
              </button>
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={resetAll}
            className="text-tertier-netral hover:text-primary-blue inline-flex cursor-pointer items-center gap-1 text-xs font-semibold transition"
          >
            <MdRefresh className="size-4" />
            Reset filter
          </button>
        )}
      </div>
    </section>
  );
}
