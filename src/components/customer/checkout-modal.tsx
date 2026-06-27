"use client";

import Input from "@/components/global/input";
import { CartItem } from "@/types/cart";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdShoppingBag } from "react-icons/md";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string }) => void;
  isLoading?: boolean;
  /**
   * Daftar item yang akan di-checkout. Bila ada, modal menampilkan
   * ringkasan singkat (jumlah item + subtotal). Untuk flow "Beli Produk"
   * single-item, prop ini boleh kosong.
   */
  items?: CartItem[];
}

export default function CheckoutModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  items,
}: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });

  const subtotal = items?.reduce((acc, item) => acc + item.price, 0) ?? 0;

  const validateForm = () => {
    const newErrors = { name: "", email: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Nama wajib diisi";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email wajib diisi";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format email tidak valid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ name: name.trim(), email: email.trim() });
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setName("");
      setEmail("");
      setErrors({ name: "", email: "" });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-bg-nav border-bg-light relative w-full max-w-md rounded-2xl border p-6 shadow-2xl">
        {!isLoading && (
          <button
            onClick={handleClose}
            aria-label="Tutup"
            className="text-tertier-netral hover:bg-bg-div absolute top-4 right-4 grid size-8 cursor-pointer place-items-center rounded-full transition hover:text-white"
          >
            <IoClose className="size-5" />
          </button>
        )}

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-2xl font-extrabold text-white">
            Checkout Pesanan
          </h2>
          <p className="text-tertier-netral mt-1 text-sm">
            Masukkan informasi penerima untuk melanjutkan pembelian.
          </p>
        </div>

        {/* Order summary (multi-item from cart) */}
        {items && items.length > 0 && (
          <div className="border-bg-light bg-bg-div mb-5 rounded-xl border p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-tertier-netral inline-flex items-center gap-2">
                <MdShoppingBag className="size-4" />
                {items.length} produk
              </span>
              <span className="text-primary-yellow text-base font-bold">
                IDR {subtotal.toLocaleString("id-ID")}
              </span>
            </div>
            <p className="text-tertier-netral mt-1.5 text-xs">
              Biaya admin & layanan dihitung otomatis pada langkah berikutnya.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="checkout-name"
              className="text-tertier-netral mb-2 block text-sm font-semibold"
            >
              Nama Lengkap <span className="text-red-400">*</span>
            </label>
            <Input
              id="checkout-name"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="w-full"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="checkout-email"
              className="text-tertier-netral mb-2 block text-sm font-semibold"
            >
              Email <span className="text-red-400">*</span>
            </label>
            <Input
              id="checkout-email"
              type="email"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
            <p className="text-tertier-netral mt-1.5 text-xs">
              Tautan unduhan dan invoice akan dikirim ke email ini.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="border-bg-light text-tertier-netral hover:bg-bg-div flex-1 cursor-pointer rounded-full border bg-transparent py-2.5 text-sm font-semibold transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary-blue hover:bg-secondary-blue flex-1 cursor-pointer rounded-full py-2.5 text-sm font-bold text-white shadow-[5px_5px_0_#1086d5] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[5px_5px_0_#1086d5]"
            >
              {isLoading ? "Memproses..." : "Lanjutkan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
