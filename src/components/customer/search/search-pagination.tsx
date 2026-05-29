import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface Props {
  currentPage: number;
  totalPages: number;
  /**
   * Builder URL untuk halaman tertentu — pemanggil bertanggung jawab
   * mempertahankan query param lain (q, category, dll).
   */
  buildHref: (page: number) => string;
}

/**
 * Pagination compact dengan ellipsis. Maksimal menampilkan 7 nomor halaman
 * (1, 2, 3, ..., n-2, n-1, n). Pakai <Link> untuk prefetch & SSR friendly.
 */
function buildPageList(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 4) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let p = start; p <= end; p++) pages.push(p);

  if (current < total - 3) pages.push("ellipsis");

  pages.push(total);
  return pages;
}

export default function SearchPagination({
  currentPage,
  totalPages,
  buildHref,
}: Props) {
  if (totalPages <= 1) return null;

  const pages = buildPageList(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const baseClass =
    "border-bg-light bg-bg-div text-tertier-netral inline-flex size-9 items-center justify-center rounded-lg border text-sm font-semibold transition";
  const activeClass =
    "bg-primary-blue border-primary-blue text-white shadow-[3px_3px_0_#1086d5]";
  const hoverClass = "hover:border-primary-blue hover:text-white";
  const disabledClass = "cursor-not-allowed opacity-40";

  return (
    <nav
      aria-label="Navigasi halaman"
      className="mt-8 flex items-center justify-center gap-2"
    >
      {hasPrev ? (
        <Link
          href={buildHref(currentPage - 1)}
          aria-label="Halaman sebelumnya"
          className={`${baseClass} ${hoverClass}`}
        >
          <MdChevronLeft className="size-5" />
        </Link>
      ) : (
        <span aria-disabled className={`${baseClass} ${disabledClass}`}>
          <MdChevronLeft className="size-5" />
        </span>
      )}

      {pages.map((p, idx) =>
        p === "ellipsis" ? (
          <span
            key={`e-${idx}`}
            aria-hidden="true"
            className="text-tertier-netral inline-flex size-9 items-center justify-center text-sm"
          >
            …
          </span>
        ) : p === currentPage ? (
          <span
            key={p}
            aria-current="page"
            className={`${baseClass} ${activeClass}`}
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            className={`${baseClass} ${hoverClass}`}
          >
            {p}
          </Link>
        ),
      )}

      {hasNext ? (
        <Link
          href={buildHref(currentPage + 1)}
          aria-label="Halaman berikutnya"
          className={`${baseClass} ${hoverClass}`}
        >
          <MdChevronRight className="size-5" />
        </Link>
      ) : (
        <span aria-disabled className={`${baseClass} ${disabledClass}`}>
          <MdChevronRight className="size-5" />
        </span>
      )}
    </nav>
  );
}
