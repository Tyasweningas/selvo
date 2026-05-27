"use client";

import type { Withdrawal, WithdrawalStatus } from "@/types/admin";
import clsx from "clsx";
import { MdCheckCircle, MdClose } from "react-icons/md";

interface AdminWithdrawalTableProps {
  withdrawals: Withdrawal[];
  processingId?: string | null;
  onApprove?: (withdrawal: Withdrawal) => void;
  onReject?: (withdrawal: Withdrawal) => void;
}

const statusLabel: Record<WithdrawalStatus, string> = {
  PENDING: "Menunggu",
  APPROVED: "Disetujui",
  REJECTED: "Ditolak",
};

const statusColor: Record<WithdrawalStatus, string> = {
  PENDING: "text-primary-yellow",
  APPROVED: "text-primary-green",
  REJECTED: "text-red-400",
};

const statusDot: Record<WithdrawalStatus, string> = {
  PENDING: "bg-primary-yellow",
  APPROVED: "bg-primary-green",
  REJECTED: "bg-red-400",
};

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatDate(value?: string | null) {
  if (!value) {
    return "-";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }
  return dateFormatter.format(parsed);
}

function toAmountNumber(value: number | string): number {
  if (typeof value === "number") {
    return value;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

const AdminWithdrawalTable = ({
  withdrawals,
  processingId = null,
  onApprove,
  onReject,
}: AdminWithdrawalTableProps) => {
  return (
    <>
      <div className="border-bg-div bg-bg-nav space-y-5 overflow-x-auto rounded-t-md border-2 p-5">
        <div className="border-bg-div grid min-w-[1100px] grid-cols-[140px_1fr_220px_160px_180px_180px_160px] text-left font-semibold text-gray-100">
          <div>Status</div>
          <div className="min-w-0">Penjual</div>
          <div>Bank</div>
          <div>Jumlah</div>
          <div>Diajukan</div>
          <div>Direview</div>
          <div className="text-right">Aksi</div>
        </div>
      </div>
      <div className="border-bg-div bg-bg-nav overflow-x-auto rounded-b-md border-2 border-t-0">
        {withdrawals.length > 0 ? (
          withdrawals.map((withdrawal) => {
            const isProcessing = processingId === withdrawal.withdrawalId;
            const isPending = withdrawal.status === "PENDING";

            return (
              <div
                key={withdrawal.withdrawalId}
                className="border-bg-div hover:bg-bg-div grid min-w-[1100px] grid-cols-[140px_1fr_220px_160px_180px_180px_160px] items-center px-5 py-5 text-left font-semibold text-gray-100 transition duration-100"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={clsx(
                      "size-3 rounded-full",
                      statusDot[withdrawal.status],
                    )}
                  />
                  <span
                    className={clsx("text-sm", statusColor[withdrawal.status])}
                  >
                    {statusLabel[withdrawal.status]}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate">{withdrawal.seller?.name ?? "-"}</p>
                  <p className="truncate text-xs font-thin text-gray-400">
                    {withdrawal.seller?.email ?? withdrawal.sellerId}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm">{withdrawal.bankName}</p>
                  <p className="truncate text-xs font-thin text-gray-400">
                    {withdrawal.bankNumber}
                  </p>
                </div>
                <div>
                  <span className="text-primary-yellow">IDR</span>{" "}
                  {toAmountNumber(withdrawal.amount).toLocaleString("id-ID")}
                </div>
                <div className="text-sm">
                  {formatDate(withdrawal.createdAt)}
                </div>
                <div className="text-sm">
                  {formatDate(withdrawal.reviewedAt)}
                  {withdrawal.note && (
                    <p className="mt-1 line-clamp-2 text-xs font-thin text-gray-400">
                      {withdrawal.note}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  {isPending ? (
                    <>
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => onApprove?.(withdrawal)}
                        className="bg-primary-green/20 text-primary-green hover:bg-primary-green/30 inline-flex items-center justify-center rounded-full p-2 transition disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Setujui withdrawal"
                        title="Setujui"
                      >
                        <MdCheckCircle className="size-5" />
                      </button>
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => onReject?.(withdrawal)}
                        className="inline-flex items-center justify-center rounded-full bg-red-500/20 p-2 text-red-300 transition hover:bg-red-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Tolak withdrawal"
                        title="Tolak"
                      >
                        <MdClose className="size-5" />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-medium text-gray-400">
                      Sudah direview
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-10 text-center text-gray-400">
            Belum ada permintaan withdrawal
          </div>
        )}
      </div>
    </>
  );
};

export default AdminWithdrawalTable;
