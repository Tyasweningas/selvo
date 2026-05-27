"use client";

import type { Withdrawal, WithdrawalStatus } from "@/types/admin";
import clsx from "clsx";

interface SellerWithdrawalTableProps {
  withdrawals: Withdrawal[];
  emptyMessage?: string;
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
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
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

const SellerWithdrawalTable = ({
  withdrawals,
  emptyMessage = "Belum ada riwayat withdrawal",
}: SellerWithdrawalTableProps) => {
  return (
    <>
      <div className="border-bg-div bg-bg-nav space-y-5 overflow-x-auto rounded-t-md border-2 p-5">
        <div className="border-bg-div grid min-w-[900px] grid-cols-[140px_180px_160px_180px_180px_1fr] text-left font-semibold text-gray-100">
          <div>Status</div>
          <div>Bank</div>
          <div>Jumlah</div>
          <div>Diajukan</div>
          <div>Direview</div>
          <div className="min-w-0">Catatan</div>
        </div>
      </div>
      <div className="border-bg-div bg-bg-nav overflow-x-auto rounded-b-md border-2 border-t-0">
        {withdrawals.length > 0 ? (
          withdrawals.map((withdrawal) => (
            <div
              key={withdrawal.withdrawalId}
              className="border-bg-div hover:bg-bg-div grid min-w-[900px] grid-cols-[140px_180px_160px_180px_180px_1fr] items-center px-5 py-5 text-left font-semibold text-gray-100 transition duration-100"
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
                <p className="truncate text-sm">{withdrawal.bankName}</p>
                <p className="truncate text-xs font-thin text-gray-400">
                  {withdrawal.bankNumber}
                </p>
              </div>
              <div>
                <span className="text-primary-yellow">IDR</span>{" "}
                {toAmountNumber(withdrawal.amount).toLocaleString("id-ID")}
              </div>
              <div className="text-sm">{formatDate(withdrawal.createdAt)}</div>
              <div className="text-sm">{formatDate(withdrawal.reviewedAt)}</div>
              <div className="min-w-0 text-sm font-normal text-gray-300">
                {withdrawal.note ? (
                  <p className="truncate" title={withdrawal.note}>
                    {withdrawal.note}
                  </p>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-400">{emptyMessage}</div>
        )}
      </div>
    </>
  );
};

export default SellerWithdrawalTable;
