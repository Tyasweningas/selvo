"use client";

import type {
  SellerTransactionMeta,
  SellerVisibleTransactionStatus,
} from "@/types/seller-orders";
import clsx from "clsx";

type StatusFilter = SellerVisibleTransactionStatus | "ALL";

interface TransactionStatusTabsProps {
  active: StatusFilter;
  counts: SellerTransactionMeta["counts"];
  onChange: (status: StatusFilter) => void;
}

const TABS: { key: StatusFilter; label: string }[] = [
  { key: "ALL", label: "Semua" },
  { key: "SUCCESS", label: "Selesai" },
  { key: "REJECTED", label: "Dibatalkan" },
];

const TransactionStatusTabs = ({
  active,
  counts,
  onChange,
}: TransactionStatusTabsProps) => {
  return (
    <div className="border-bg-light from-bg-nav/42 to-bg-nav/58 flex overflow-x-auto rounded-xl border-2 bg-linear-to-b">
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        const count = counts[tab.key] ?? 0;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className="group min-w-[140px] grow"
          >
            <div className="flex items-center justify-center gap-2 py-5">
              <span
                className={clsx(
                  "text-sm font-semibold transition group-hover:text-white",
                  isActive ? "text-white" : "text-tertier-netral",
                )}
              >
                {tab.label}
              </span>
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 text-xs font-semibold transition",
                  isActive
                    ? "bg-primary-blue text-white"
                    : "bg-bg-div text-tertier-netral group-hover:text-white",
                )}
              >
                {count}
              </span>
            </div>
            <div
              className={clsx(
                "bg-primary-blue mx-1 h-1 rounded-full transition duration-200",
                !isActive && "opacity-0 group-hover:opacity-100",
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default TransactionStatusTabs;
