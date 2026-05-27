"use client";

import Input from "@/components/global/input";
import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import withdrawalService from "@/services/withdrawal.service";
import type { Withdrawal } from "@/types/admin";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface CreateWithdrawalModalProps {
  open: boolean;
  availableBalance: number;
  hasBank: boolean;
  onClose: () => void;
  onCreated: (withdrawal: Withdrawal) => void;
}

const currencyFormatter = new Intl.NumberFormat("id-ID");
const MIN_WITHDRAWAL_AMOUNT = 10_000;

const CreateWithdrawalModal = ({
  open,
  availableBalance,
  hasBank,
  onClose,
  onCreated,
}: CreateWithdrawalModalProps) => {
  const [amountInput, setAmountInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setAmountInput("");
      setError(null);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const parsedAmount = Number(amountInput.replace(/[^0-9]/g, ""));
  const amount = Number.isFinite(parsedAmount) ? parsedAmount : 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!hasBank) {
      setError("Lengkapi data bank terlebih dahulu sebelum menarik saldo.");
      return;
    }

    if (!amount || amount < MIN_WITHDRAWAL_AMOUNT) {
      setError(
        `Nominal penarikan minimal IDR ${currencyFormatter.format(
          MIN_WITHDRAWAL_AMOUNT,
        )}.`,
      );
      return;
    }

    if (amount > availableBalance) {
      setError("Nominal melebihi saldo tersedia.");
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await withdrawalService.createWithdrawal(amount);
      toast.success("Permintaan withdrawal berhasil dikirim.");
      onCreated(created);
      onClose();
    } catch (err: unknown) {
      logError(err, "CreateWithdrawalModal");
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
        <h3 className="text-xl font-bold text-white">Tarik Saldo</h3>
        <p className="mt-2 text-sm text-[#D9D9D9]">
          Masukkan nominal yang ingin kamu tarik. Permintaan akan diproses oleh
          admin setelah dikirim.
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/15 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mt-5 space-y-4">
          <div className="bg-bg-div rounded-xl p-4">
            <p className="text-sm text-[#D9D9D9]">Saldo Tersedia</p>
            <p className="mt-1 text-2xl font-bold text-white">
              <span className="text-primary-yellow mr-2">IDR</span>
              {currencyFormatter.format(availableBalance)}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-white">
              Nominal Penarikan
            </label>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="Contoh: 100000"
              value={amountInput}
              onChange={(e) => {
                const digits = e.target.value.replace(/[^0-9]/g, "");
                setAmountInput(digits);
              }}
              disabled={isSubmitting}
              prefix={
                <span className="text-sec-netral border-r-sec-netral/50 border-r py-1.5 pr-3 text-sm font-semibold whitespace-nowrap">
                  Rupiah - IDR
                </span>
              }
              className="mt-2 w-full"
            />
            {amount > 0 && (
              <p className="text-tertier-netral mt-2 text-sm">
                Setara dengan{" "}
                <span className="text-white">
                  IDR {currencyFormatter.format(amount)}
                </span>
              </p>
            )}
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
            {isSubmitting ? "Mengirim..." : "Tarik Saldo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWithdrawalModal;
