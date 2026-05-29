import type { SellerVisibleTransactionStatus } from "@/types/seller-orders";
import clsx from "clsx";

interface StatusPillProps {
  status: SellerVisibleTransactionStatus;
  size?: "sm" | "md";
}

const statusLabel: Record<SellerVisibleTransactionStatus, string> = {
  SUCCESS: "Selesai",
  REJECTED: "Dibatalkan",
};

const statusText: Record<SellerVisibleTransactionStatus, string> = {
  SUCCESS: "text-primary-green",
  REJECTED: "text-red-400",
};

const statusDot: Record<SellerVisibleTransactionStatus, string> = {
  SUCCESS: "bg-primary-green",
  REJECTED: "bg-red-400",
};

const statusBg: Record<SellerVisibleTransactionStatus, string> = {
  SUCCESS: "bg-primary-green/10 border-primary-green/40",
  REJECTED: "bg-red-400/10 border-red-400/40",
};

const StatusPill = ({ status, size = "md" }: StatusPillProps) => {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border-2",
        statusBg[status],
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
      )}
    >
      <div
        className={clsx(
          "rounded-full",
          statusDot[status],
          size === "sm" ? "size-1.5" : "size-2",
        )}
      />
      <span className={clsx("font-semibold", statusText[status])}>
        {statusLabel[status]}
      </span>
    </div>
  );
};

export default StatusPill;
