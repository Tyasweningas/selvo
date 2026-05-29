"use client";

import CheckoutModal from "@/components/customer/checkout-modal";
import { createTransaction } from "@/services/transaction.service";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdShoppingBag, MdShoppingCart } from "react-icons/md";
import { toast } from "sonner";
import CartItemComponent from "./cart-item";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPopup({ isOpen, onClose }: Props) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.subtotal());

  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Lock body scroll saat drawer terbuka.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Tutup drawer kalau user menekan Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowCheckout(true);
  };

  const handleSubmitCheckout = async (data: {
    name: string;
    email: string;
  }) => {
    if (items.length === 0) return;
    try {
      setIsProcessing(true);
      const transaction = await createTransaction({
        name: data.name,
        email: data.email,
        items: items.map((i) => i.productId),
      });
      toast.success("Transaksi berhasil dibuat!");
      clearCart();
      setShowCheckout(false);
      onClose();
      router.push(`/transactions/${transaction.orderId}`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : (err as { message?: string })?.message || "Gagal membuat transaksi";
      console.error("❌ Failed to create transaction:", err);
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="animate-fadeIn fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Keranjang Belanja"
        aria-modal="true"
        className="bg-bg-nav border-bg-light animate-slideInRight fixed top-0 right-0 z-50 flex h-full w-full max-w-[400px] flex-col border-l shadow-2xl"
      >
        {/* Header */}
        <div className="border-bg-light flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-bg-blue text-primary-blue grid size-9 place-items-center rounded-xl">
              <MdShoppingCart className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">
                Keranjang Kamu
              </h2>
              <p className="text-tertier-netral text-xs">{items.length} item</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup keranjang"
            className="text-tertier-netral hover:bg-bg-div grid size-9 cursor-pointer place-items-center rounded-full transition hover:text-white"
          >
            <IoClose className="size-5" />
          </button>
        </div>

        {/* Items */}
        <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
              <div className="bg-bg-div border-bg-light grid size-20 place-items-center rounded-2xl border">
                <MdShoppingBag className="text-tertier-netral size-10" />
              </div>
              <div>
                <p className="font-bold text-white">Keranjang masih kosong</p>
                <p className="text-tertier-netral mt-1 text-sm">
                  Yuk cari produk digital favoritmu di Selvo.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push("/");
                }}
                className="bg-primary-blue hover:bg-secondary-blue cursor-pointer rounded-full px-5 py-2 text-sm font-bold text-white shadow-[5px_5px_0_#1086d5] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            items.map((item) => (
              <CartItemComponent
                key={item.productId}
                item={item}
                onRemove={removeItem}
                onNavigate={onClose}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-bg-light bg-bg-nav space-y-4 border-t px-5 py-4">
            <div className="border-bg-light bg-bg-div rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">
                  Subtotal
                </span>
                <span className="text-primary-yellow text-lg font-extrabold">
                  IDR {subtotal.toLocaleString("id-ID")}
                </span>
              </div>
              <p className="text-tertier-netral mt-1.5 text-xs">
                Biaya admin & layanan dihitung saat membuat pesanan.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isProcessing}
              className="bg-primary-blue hover:bg-secondary-blue inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-3 font-bold text-white shadow-[5px_5px_0_#1086d5] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <MdShoppingBag className="size-5" />
              Checkout ({items.length})
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm("Hapus semua item dari keranjang?")) {
                  clearCart();
                }
              }}
              className="text-tertier-netral w-full cursor-pointer text-center text-xs font-semibold transition hover:text-red-400"
            >
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </aside>

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => !isProcessing && setShowCheckout(false)}
        onSubmit={handleSubmitCheckout}
        isLoading={isProcessing}
        items={items}
      />
    </>
  );
}
