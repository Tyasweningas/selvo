"use client";

import Button from "@/components/global/button";
import type { WithdrawalAction } from "@/types/admin";
import { useEffect, useState } from "react";

interface WithdrawalReviewModalProps {
  open: boolean;
  action: WithdrawalAction | null;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: (note: string) => void;
}

const titleMap: Record<WithdrawalAction, string> = {
  approve: "Setujui Withdrawal",
  reject: "Tolak Withdrawal",
};

const descriptionMap: Record<WithdrawalAction, string> = {
  approve:
    "Konfirmasi persetujuan withdrawal. Catatan bersifat opsional dan akan tersimpan di histori.",
  reject:
    "Berikan alasan penolakan agar seller bisa tahu kenapa withdrawal mereka ditolak. Catatan opsional namun disarankan.",
};

const confirmLabelMap: Record<WithdrawalAction, string> = {
  approve: "Setujui",
  reject: "Tolak",
};

const WithdrawalReviewModal = ({
  open,
  action,
  loading = false,
  onCancel,
  onConfirm,
}: WithdrawalReviewModalProps) => {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) {
      setNote("");
    }
  }, [open]);

  if (!open || !action) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="border-bg-light bg-bg-nav w-full max-w-lg rounded-2xl border-2 p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-white">{titleMap[action]}</h3>
        <p className="mt-2 text-sm text-[#D9D9D9]">{descriptionMap[action]}</p>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-white">
            Catatan {action === "reject" ? "(disarankan)" : "(opsional)"}
          </span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={loading}
            rows={4}
            placeholder={
              action === "approve"
                ? "Contoh: Saldo akan ditransfer maksimal 1x24 jam."
                : "Contoh: Nomor rekening tidak valid."
            }
            className="border-bg-light bg-bg-div mt-2 w-full resize-none rounded-xl border-2 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none disabled:opacity-50"
          />
        </label>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Batal
          </Button>
          <Button onClick={() => onConfirm(note.trim())} disabled={loading}>
            {loading ? "Memproses..." : confirmLabelMap[action]}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalReviewModal;
