"use client";

import { useActiveAdsPick } from "@/hooks/use-active-ads";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const SHOWN_ONCE_KEY = "selvo:ads-popup-shown";

/**
 * Modal iklan di landing page.
 *
 * Behavior:
 * - Muncul ~600ms setelah landing page selesai render.
 * - Hanya tampil sekali per session (flag di sessionStorage).
 * - Klik banner / tombol → navigasi ke `/products/[slug]?adsId=...`
 *   dan tracking klik dilakukan di halaman produk.
 * - Tombol close baru aktif setelah 2 detik agar tidak misclick.
 */
export default function AdsPopup() {
  const { ad, loading } = useActiveAdsPick();
  const [open, setOpen] = useState(false);
  const [closeReady, setCloseReady] = useState(false);

  useEffect(() => {
    if (loading || !ad) return;
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(SHOWN_ONCE_KEY) === "1") return;

    const showTimer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SHOWN_ONCE_KEY, "1");
    }, 600);

    return () => clearTimeout(showTimer);
  }, [loading, ad]);

  useEffect(() => {
    if (!open) {
      setCloseReady(false);
      return;
    }
    const t = setTimeout(() => setCloseReady(true), 2000);
    return () => clearTimeout(t);
  }, [open]);

  if (!open || !ad || !ad.product) return null;

  const slug = ad.product.slug;
  const targetUrl = `/products/${slug}?adsId=${encodeURIComponent(ad.adsId)}`;

  const handleClose = () => {
    if (!closeReady) return;
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ads-popup-title"
    >
      <div
        className="border-bg-light bg-bg-nav relative w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          disabled={!closeReady}
          aria-label="Tutup iklan"
          className={`absolute top-3 right-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full transition ${
            closeReady
              ? "bg-black/60 text-white hover:bg-black/80"
              : "cursor-not-allowed bg-black/30 text-white/40"
          }`}
        >
          <MdClose size={20} />
        </button>

        <Link href={targetUrl} prefetch={false} className="block">
          <div className="bg-bg-div relative aspect-16/10 w-full">
            <Image
              src={ad.bannerUrl}
              alt={ad.product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 512px"
              unoptimized
              priority
            />
          </div>

          <div className="space-y-3 p-5">
            <span className="bg-primary-yellow/15 text-primary-yellow inline-flex rounded-full px-3 py-1 text-xs font-semibold">
              Sponsored
            </span>
            <h2
              id="ads-popup-title"
              className="text-xl font-bold text-white sm:text-2xl"
            >
              {ad.product.name}
            </h2>
            {ad.seller?.name && (
              <p className="text-tertier-netral text-sm">
                oleh {ad.seller.name}
              </p>
            )}

            <div className="bg-primary-blue hover:bg-secondary-blue mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition">
              Lihat Produk
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
