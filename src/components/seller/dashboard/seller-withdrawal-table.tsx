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
      {/* Mobile Card List View (Visible on <md screens) */}
      <div className="md:hidden space-y-4">
        {withdrawals.length > 0 ? (
          withdrawals.map((withdrawal) => (
            <div
              key={withdrawal.withdrawalId}
              className="border-bg-div bg-bg-nav rounded-xl border-2 p-4 space-y-3 font-semibold text-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={clsx(
                      "size-2.5 rounded-full",
                      statusDot[withdrawal.status],
                    )}
                  />
                  <span
                    className={clsx("text-xs", statusColor[withdrawal.status])}
                  >
                    {statusLabel[withdrawal.status]}
                  </span>
                </div>
                <p className="text-sm font-bold text-white">
                  <span className="text-primary-yellow text-xs mr-1">IDR</span>
                  {toAmountNumber(withdrawal.amount).toLocaleString("id-ID")}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-gray-400">
                <p>
                  Bank: <span className="text-white font-medium">{withdrawal.bankName} - {withdrawal.bankNumber}</span>
                </p>
                <p>
                  Diajukan: <span className="text-white">{formatDate(withdrawal.createdAt)}</span>
                </p>
                <p>
                  Direview: <span className="text-white">{formatDate(withdrawal.reviewedAt)}</span>
                </p>
                {withdrawal.note ? (
                  <p className="text-gray-300 mt-1 font-thin bg-bg-div p-2 rounded">
                    Catatan: {withdrawal.note}
                  </p>
                ) : (
                  <p className="text-gray-500 mt-1 text-[11px] italic">Tidak ada catatan</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="border-bg-div bg-bg-nav rounded-xl border-2 py-10 text-center text-gray-400">
            {emptyMessage}
          </div>
        )}
      </div>

      {/* Desktop Table View (Visible on >=md screens) */}
      <div className="hidden md:block overflow-x-auto border-bg-div border-2 rounded-xl bg-bg-nav">
        <div className="min-w-[900px]">
          {/* Table Header */}
          <div className="border-bg-div p-5 border-b-2">
            <div className="grid grid-cols-[140px_180px_160px_180px_180px_1fr] text-left font-semibold text-gray-100">
              <div>Status</div>
              <div>Bank</div>
              <div>Jumlah</div>
              <div>Diajukan</div>
              <div>Direview</div>
              <div className="min-w-0">Catatan</div>
            </div>
          </div>
          {/* Table Body */}
          <div className="divide-y divide-bg-div">
            {withdrawals.length > 0 ? (
              withdrawals.map((withdrawal) => (
                <div
                  key={withdrawal.withdrawalId}
                  className="hover:bg-bg-div grid grid-cols-[140px_180px_160px_180px_180px_1fr] items-center px-5 py-5 text-left font-semibold text-gray-100 transition duration-100"
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
        </div>
      </div>
    </>
  );
};

export default SellerWithdrawalTable;
