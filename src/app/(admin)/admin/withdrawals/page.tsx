"use client";

import AdminWithdrawalTable from "@/components/admin/dashboard/admin-withdrawal-table";
import WithdrawalReviewModal from "@/components/admin/dashboard/withdrawal-review-modal";
import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import withdrawalService from "@/services/withdrawal.service";
import type { Withdrawal, WithdrawalAction } from "@/types/admin";
import { useCallback, useEffect, useState } from "react";
import { MdAccountBalanceWallet, MdRefresh } from "react-icons/md";
import { toast } from "sonner";

const AdminWithdrawalsPage = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState<{
    withdrawal: Withdrawal;
    action: WithdrawalAction;
  } | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchWithdrawals = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await withdrawalService.getWithdrawals();
      setWithdrawals(response.data ?? []);
    } catch (error: unknown) {
      logError(error, "AdminWithdrawalsPage");
      setFetchError(formatErrorForDisplay(error));
      setWithdrawals([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWithdrawals();
  }, [fetchWithdrawals]);

  const handleApprove = (withdrawal: Withdrawal) => {
    setReviewing({ withdrawal, action: "approve" });
  };

  const handleReject = (withdrawal: Withdrawal) => {
    setReviewing({ withdrawal, action: "reject" });
  };

  const handleConfirm = async (note: string) => {
    if (!reviewing) {
      return;
    }

    const { withdrawal, action } = reviewing;
    setProcessingId(withdrawal.withdrawalId);

    try {
      const payload = note ? { note } : {};
      const updated =
        action === "approve"
          ? await withdrawalService.approveWithdrawal(
              withdrawal.withdrawalId,
              payload,
            )
          : await withdrawalService.rejectWithdrawal(
              withdrawal.withdrawalId,
              payload,
            );

      setWithdrawals((prev) =>
        prev.map((item) =>
          item.withdrawalId === withdrawal.withdrawalId
            ? { ...item, ...updated }
            : item,
        ),
      );

      toast.success(
        action === "approve"
          ? "Withdrawal berhasil disetujui."
          : "Withdrawal berhasil ditolak.",
      );
      setReviewing(null);
    } catch (error: unknown) {
      logError(error, "AdminWithdrawalsPage:review");
      toast.error(formatErrorForDisplay(error));
    } finally {
      setProcessingId(null);
    }
  };

  const handleCancel = () => {
    if (processingId) {
      return;
    }
    setReviewing(null);
  };

  const totalPending = withdrawals.filter((w) => w.status === "PENDING").length;

  return (
    <div className="mt-5 space-y-5">
      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-bg-blue rounded-xl p-2">
              <MdAccountBalanceWallet className="text-primary-blue size-7" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">
                Daftar Withdrawal
              </p>
              <p className="text-sm text-[#D9D9D9]">
                Permintaan penarikan saldo dari seller. Setujui atau tolak yang
                masih berstatus PENDING.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={fetchWithdrawals}
            disabled={isLoading}
            className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MdRefresh
              className={isLoading ? "size-5 animate-spin" : "size-5"}
            />
            <span>Muat ulang</span>
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#D9D9D9]">
          <span className="border-bg-light bg-bg-div rounded-full border-2 px-3 py-1">
            Total: <span className="text-white">{withdrawals.length}</span>
          </span>
          <span className="border-bg-light bg-bg-div rounded-full border-2 px-3 py-1">
            Menunggu:{" "}
            <span className="text-primary-yellow">{totalPending}</span>
          </span>
        </div>
      </div>

      {fetchError && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {fetchError}
        </div>
      )}

      {isLoading ? (
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 py-10 text-center text-gray-400">
          Memuat daftar withdrawal...
        </div>
      ) : (
        <AdminWithdrawalTable
          withdrawals={withdrawals}
          processingId={processingId}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      <WithdrawalReviewModal
        open={!!reviewing}
        action={reviewing?.action ?? null}
        loading={!!processingId}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default AdminWithdrawalsPage;
