"use client";

import { useMyProducts } from "@/hooks/use-my-products";
import { useSellerDashboard } from "@/hooks/use-seller-dashboard";
import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import adsService from "@/services/ads.service";
import purchasePredictService, {
  PredictPurchaseResponse,
} from "@/services/purchase-predict.service";
import { ProductStatus } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MdAutoAwesome,
  MdImage,
  MdInfoOutline,
  MdShoppingBag,
  MdTrendingUp,
  MdUpload,
} from "react-icons/md";
import { toast } from "sonner";

const COST_PER_CLICK = 50; // Sinkron dengan backend (5000 / 100 klik).
const MAX_BANNER_BYTES = 5 * 1024 * 1024;
const currencyFormatter = new Intl.NumberFormat("id-ID");
const integerFormatter = new Intl.NumberFormat("id-ID");

export default function CreateAdsPage() {
  const router = useRouter();
  const { data: myProducts, loading: loadingProducts } = useMyProducts();
  const {
    summary,
    loading: loadingSummary,
    refetch: refetchSummary,
  } = useSellerDashboard();

  const [productId, setProductId] = useState<string>("");
  const [targetClick, setTargetClick] = useState<string>("100");
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState<PredictPurchaseResponse | null>(
    null,
  );
  const [predictionError, setPredictionError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Hanya produk APPROVED yang boleh diiklankan (sesuai aturan backend).
  const eligibleProducts = useMemo(
    () => (myProducts ?? []).filter((p) => p.status === ProductStatus.APPROVED),
    [myProducts],
  );

  useEffect(() => {
    return () => {
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    };
  }, [bannerPreview]);

  const targetClickNumber = Number.parseInt(targetClick, 10);
  const targetClickValid =
    Number.isFinite(targetClickNumber) && targetClickNumber > 0;
  const cost = targetClickValid ? targetClickNumber * COST_PER_CLICK : 0;

  const balance = summary?.balance ?? 0;
  const insufficientBalance = cost > 0 && cost > balance;

  // Reset prediksi kalau target klik berubah supaya admin tidak misleading.
  useEffect(() => {
    if (
      prediction &&
      Number.parseInt(targetClick, 10) !== prediction.target_clicks
    ) {
      setPrediction(null);
      setPredictionError(null);
    }
  }, [targetClick, prediction]);

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setBanner(null);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
      setBannerPreview(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_BANNER_BYTES) {
      toast.error("Ukuran banner maksimal 5MB");
      e.target.value = "";
      return;
    }
    if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    setBanner(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handlePredict = async () => {
    if (!targetClickValid) {
      toast.error("Target klik harus angka lebih dari 0");
      return;
    }

    setPredicting(true);
    setPredictionError(null);
    try {
      const result =
        await purchasePredictService.predictPurchases(targetClickNumber);
      setPrediction(result);
    } catch (err) {
      logError(err, "CreateAdsPage:predict");
      const message = formatErrorForDisplay(err);
      setPredictionError(message);
      setPrediction(null);
      toast.error(message);
    } finally {
      setPredicting(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!productId) {
      toast.error("Pilih produk yang ingin diiklankan");
      return;
    }
    if (!targetClickValid) {
      toast.error("Target klik harus angka lebih dari 0");
      return;
    }
    if (!banner) {
      toast.error("Banner iklan wajib diunggah");
      return;
    }
    if (insufficientBalance) {
      toast.error(
        "Saldo tidak cukup untuk membuat iklan dengan target klik tersebut",
      );
      return;
    }

    setSubmitting(true);
    try {
      await adsService.createAds({
        productId,
        targetClick: targetClickNumber,
        banner,
      });
      toast.success("Iklan berhasil dibuat. Saldo telah dipotong.");
      void refetchSummary();
      router.push("/dashboard/ads");
    } catch (err) {
      logError(err, "CreateAdsPage");
      toast.error(formatErrorForDisplay(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="text-white">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Buat Iklan Baru</h1>
        <p className="text-tertier-netral text-sm">
          Pay-per-click. Saldo akan dipotong sesuai target klik yang dibeli.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]"
      >
        <div className="space-y-6">
          <section className="border-bg-light bg-bg-nav rounded-2xl border p-5">
            <h2 className="mb-4 font-semibold text-white">
              1. Pilih Produk yang Diiklankan
            </h2>
            {loadingProducts ? (
              <p className="text-tertier-netral text-sm">Memuat produk…</p>
            ) : eligibleProducts.length === 0 ? (
              <p className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-200">
                Belum ada produk yang berstatus APPROVED. Hanya produk yang
                sudah disetujui admin yang bisa diiklankan.
              </p>
            ) : (
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="border-bg-light bg-bg-div focus:border-primary-blue w-full rounded-lg border px-3 py-2.5 text-white focus:outline-none"
              >
                <option value="">— Pilih Produk —</option>
                {eligibleProducts.map((p) => (
                  <option key={p.productId} value={p.productId}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}
          </section>

          <section className="border-bg-light bg-bg-nav rounded-2xl border p-5">
            <h2 className="mb-4 font-semibold text-white">
              2. Tentukan Target Klik
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="text-tertier-netral mb-1 block text-xs font-semibold uppercase">
                  Target klik
                </label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={targetClick}
                  onChange={(e) => setTargetClick(e.target.value)}
                  className="border-bg-light bg-bg-div focus:border-primary-blue w-full rounded-lg border px-3 py-2.5 text-white focus:outline-none"
                  placeholder="Contoh: 250"
                />
              </div>
              <button
                type="button"
                onClick={handlePredict}
                disabled={predicting || !targetClickValid}
                className="border-primary-blue text-primary-blue hover:bg-bg-blue inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                <MdAutoAwesome size={18} />
                {predicting ? "Memprediksi…" : "Prediksi Target Pembelian"}
              </button>
            </div>
            <p className="text-tertier-netral mt-2 flex items-start gap-1.5 text-xs">
              <MdInfoOutline size={14} className="mt-0.5 shrink-0" />
              Tarif: Rp {currencyFormatter.format(COST_PER_CLICK)} per klik
              (setara Rp 5.000 / 100 klik).
            </p>

            {predictionError && (
              <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                {predictionError}
              </div>
            )}

            {prediction && (
              <div className="border-primary-blue/40 from-primary-blue/15 to-bg-nav/60 mt-4 grid grid-cols-1 gap-3 rounded-xl border-2 bg-linear-to-b p-4 sm:grid-cols-3">
                <div className="bg-bg-div rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <MdAutoAwesome className="text-primary-blue size-4" />
                    <p className="text-tertier-netral text-xs">Target klik</p>
                  </div>
                  <p className="mt-1 text-xl font-bold text-white">
                    {integerFormatter.format(prediction.target_clicks)}
                  </p>
                </div>
                <div className="bg-bg-div rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <MdShoppingBag className="text-primary-yellow size-4" />
                    <p className="text-tertier-netral text-xs">
                      Estimasi pembelian
                    </p>
                  </div>
                  <p className="mt-1 text-xl font-bold text-white">
                    {integerFormatter.format(prediction.estimated_purchases)}
                  </p>
                </div>
                <div className="bg-bg-div rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <MdTrendingUp className="text-primary-green size-4" />
                    <p className="text-tertier-netral text-xs">
                      Conversion rate
                    </p>
                  </div>
                  <p className="mt-1 text-xl font-bold text-white">
                    {prediction.conversion_rate}
                  </p>
                </div>
                <p className="text-tertier-netral text-xs sm:col-span-3">
                  Estimasi dihitung lewat model regresi linear berdasarkan
                  histori klik vs pembelian. Anggap angka ini sebagai panduan,
                  bukan jaminan hasil.
                </p>
              </div>
            )}
          </section>

          <section className="border-bg-light bg-bg-nav rounded-2xl border p-5">
            <h2 className="mb-4 font-semibold text-white">
              3. Unggah Banner Iklan
            </h2>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="hidden"
            />
            {bannerPreview ? (
              <div className="space-y-3">
                <div className="border-bg-light bg-bg-div relative aspect-16/10 w-full overflow-hidden rounded-lg border">
                  <Image
                    src={bannerPreview}
                    alt="Preview banner"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary-blue text-sm font-semibold"
                >
                  Ganti banner
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="border-bg-light hover:border-primary-blue grid w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed py-12 text-center"
              >
                <MdImage className="text-tertier-netral mb-2" size={36} />
                <p className="font-semibold text-white">
                  Klik untuk pilih banner
                </p>
                <p className="text-tertier-netral text-xs">
                  Format: JPG / PNG. Maksimal 5MB. Rasio rekomendasi 16:10.
                </p>
              </button>
            )}
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <section className="border-bg-light bg-bg-nav rounded-2xl border p-5">
            <h2 className="mb-4 font-semibold text-white">Ringkasan</h2>

            <dl className="text-tertier-netral space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Target klik</dt>
                <dd className="font-semibold text-white">
                  {targetClickValid
                    ? integerFormatter.format(targetClickNumber)
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Estimasi pembelian</dt>
                <dd className="font-semibold text-white">
                  {prediction
                    ? integerFormatter.format(prediction.estimated_purchases)
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Tarif per klik</dt>
                <dd className="text-white">
                  Rp {currencyFormatter.format(COST_PER_CLICK)}
                </dd>
              </div>
              <div className="border-bg-light flex justify-between border-t pt-2">
                <dt>Total biaya</dt>
                <dd className="text-primary-yellow text-base font-bold">
                  Rp {currencyFormatter.format(cost)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Saldo saat ini</dt>
                <dd
                  className={
                    insufficientBalance ? "text-red-300" : "text-white"
                  }
                >
                  {loadingSummary
                    ? "Memuat…"
                    : `Rp ${currencyFormatter.format(balance)}`}
                </dd>
              </div>
            </dl>

            {insufficientBalance && (
              <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                Saldo kamu tidak cukup. Kurangi target klik atau tambah saldo
                dulu.
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || insufficientBalance}
              className="bg-primary-blue hover:bg-secondary-blue mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50"
            >
              <MdUpload size={18} />
              {submitting ? "Mengirim…" : "Buat Iklan"}
            </button>
          </section>
        </aside>
      </form>
    </div>
  );
}
