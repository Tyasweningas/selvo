"use client";

import Input from "@/components/global/input";
import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import type { Seller, SellerBankName } from "@/services/auth.service";
import sellerService from "@/services/seller.service";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface BankUpdateModalProps {
  open: boolean;
  initialBankName?: SellerBankName | null;
  initialBankNumber?: string | null;
  onClose: () => void;
  onSaved: (seller: Seller) => void;
}

const BANK_OPTIONS: SellerBankName[] = ["BCA", "BNI", "BRI", "BSI", "MANDIRI"];

const BankUpdateModal = ({
  open,
  initialBankName,
  initialBankNumber,
  onClose,
  onSaved,
}: BankUpdateModalProps) => {
  const [bankName, setBankName] = useState<SellerBankName | "">("");
  const [bankNumber, setBankNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setBankName((initialBankName as SellerBankName) ?? "");
      setBankNumber(initialBankNumber ?? "");
      setError(null);
    }
  }, [open, initialBankName, initialBankNumber]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!bankName) {
      setError("Pilih bank tujuan.");
      return;
    }
    const trimmedNumber = bankNumber.trim();
    if (!trimmedNumber) {
      setError("Nomor rekening wajib diisi.");
      return;
    }
    if (!/^\d{6,20}$/.test(trimmedNumber)) {
      setError("Nomor rekening harus berupa 6-20 digit angka.");
      return;
    }

    setIsSubmitting(true);
    try {
      const updated = await sellerService.updateBank({
        bankName,
        bankNumber: trimmedNumber,
      });
      toast.success("Data bank berhasil diperbarui.");
      onSaved(updated);
      onClose();
    } catch (err: unknown) {
      logError(err, "BankUpdateModal");
      setError(formatErrorForDisplay(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isSubmitting) {
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <form
        onSubmit={handleSubmit}
        className="border-bg-light bg-bg-nav w-full max-w-lg rounded-2xl border-2 p-6 shadow-2xl"
      >
        <h3 className="text-xl font-bold text-white">Lengkapi Data Bank</h3>
        <p className="mt-2 text-sm text-[#D9D9D9]">
          Pilih bank dan masukkan nomor rekening atas nama akun seller kamu.
          Data ini akan dipakai untuk memproses penarikan saldo.
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/15 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-semibold text-white">Bank</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {BANK_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setBankName(option)}
                  className={
                    bankName === option
                      ? "border-primary-blue bg-bg-blue text-primary-blue rounded-full border-2 px-3 py-2 text-sm font-semibold transition disabled:opacity-50"
                      : "border-bg-light bg-bg-div text-tertier-netral hover:border-primary-blue rounded-full border-2 px-3 py-2 text-sm font-semibold transition disabled:opacity-50"
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-white">
              Nomor Rekening
            </label>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="Contoh: 1234567890"
              value={bankNumber}
              onChange={(e) =>
                setBankNumber(e.target.value.replace(/[^0-9]/g, ""))
              }
              disabled={isSubmitting}
              className="mt-2 w-full"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="bg-bg-div border-primary-blue text-primary-blue hover:bg-bg-blue hover:border-bg-blue cursor-pointer rounded-full border-2 px-4 py-2 font-semibold shadow-[5px_5px_0_#17547d] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:text-white hover:shadow-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-blue border-primary-blue hover:border-secondary-blue hover:bg-secondary-blue cursor-pointer rounded-full border-2 px-4 py-2 font-semibold text-white shadow-[5px_5px_0_#1086d5] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankUpdateModal;
