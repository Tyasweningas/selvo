"use client";

import { logError } from "@/lib/error-handler";
import adsService from "@/services/ads.service";
import { Ads } from "@/types/ads";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdAddCircleOutline, MdShowChart } from "react-icons/md";

const integerFormatter = new Intl.NumberFormat("id-ID");
const currencyFormatter = new Intl.NumberFormat("id-ID");

export default function MyAdsPage() {
  const [ads, setAds] = useState<Ads[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    adsService
      .listMyAds({ limit: 50 })
      .then((res) => {
        if (cancelled) return;
        setAds(res.data ?? []);
      })
      .catch((err) => {
        logError(err, "MyAdsPage");
        if (!cancelled) setError("Gagal memuat daftar iklan");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="text-white">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Iklan Saya</h1>
          <p className="text-tertier-netral text-sm">
            Pantau performa iklan dan saldo kuota klik kamu.
          </p>
        </div>
        <Link
          href="/dashboard/ads/new"
          className="bg-primary-blue hover:bg-secondary-blue inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition"
        >
          <MdAddCircleOutline size={20} />
          Buat Iklan
        </Link>
      </header>

      {loading && (
        <div className="border-bg-light bg-bg-nav rounded-xl border p-12 text-center">
          <div className="border-bg-light border-t-primary-blue mx-auto mb-4 size-10 animate-spin rounded-full border-4" />
          <p className="text-tertier-netral text-sm">Memuat iklan…</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center text-sm text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && ads.length === 0 && (
        <div className="border-bg-light bg-bg-nav rounded-xl border p-10 text-center">
          <MdShowChart className="text-tertier-netral mx-auto mb-3" size={48} />
          <p className="font-semibold text-white">Belum ada iklan</p>
          <p className="text-tertier-netral mt-1 text-sm">
            Buat iklan pertama kamu untuk meningkatkan visibilitas produk.
          </p>
          <Link
            href="/dashboard/ads/new"
            className="bg-primary-blue mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
          >
            <MdAddCircleOutline size={18} />
            Buat Iklan
          </Link>
        </div>
      )}

      {!loading && !error && ads.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ads.map((ad) => {
            const progress =
              ad.targetClick > 0
                ? Math.min(100, (ad.totalClick / ad.targetClick) * 100)
                : 0;
            const exhausted = ad.totalClick >= ad.targetClick;
            return (
              <article
                key={ad.adsId}
                className="border-bg-light bg-bg-nav overflow-hidden rounded-xl border"
              >
                <div className="bg-bg-div relative aspect-16/10">
                  <Image
                    src={ad.bannerUrl}
                    alt={ad.product?.name || "Banner iklan"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 360px"
                    unoptimized
                  />
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        exhausted
                          ? "bg-red-500/15 text-red-300"
                          : "bg-primary-green/15 text-primary-green"
                      }`}
                    >
                      {exhausted ? "Kuota habis" : "Aktif"}
                    </span>
                    <span className="text-tertier-netral text-xs">
                      Biaya: Rp {currencyFormatter.format(ad.cost)}
                    </span>
                  </div>
                  <h2 className="line-clamp-1 font-semibold text-white">
                    {ad.product?.name ?? "Produk"}
                  </h2>

                  <div>
                    <div className="text-tertier-netral mb-1 flex justify-between text-xs">
                      <span>
                        {integerFormatter.format(ad.totalClick)} /{" "}
                        {integerFormatter.format(ad.targetClick)} klik
                      </span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                    <div className="bg-bg-div h-2 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-primary-blue h-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-tertier-netral text-xs">
                    Konversi pembelian:{" "}
                    <span className="font-semibold text-white">
                      {integerFormatter.format(ad.totalPurchases)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
