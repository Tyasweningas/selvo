"use client";

import Button from "@/components/global/button";
import BankUpdateModal from "@/components/seller/dashboard/bank-update-modal";
import CreateWithdrawalModal from "@/components/seller/dashboard/create-withdrawal-modal";
import SellerWithdrawalTable from "@/components/seller/dashboard/seller-withdrawal-table";
import { useUser } from "@/hooks/use-user";
import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import authService, { Seller } from "@/services/auth.service";
import withdrawalService from "@/services/withdrawal.service";
import type { Withdrawal } from "@/types/admin";
import type { PaginationMeta } from "@/types/api";
import { useCallback, useEffect, useState } from "react";
import {
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdHistory,
  MdMail,
  MdPerson,
  MdRefresh,
} from "react-icons/md";

const currencyFormatter = new Intl.NumberFormat("id-ID");
const HISTORY_PAGE_SIZE = 10;

const DashboardWithdrawPage = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState<Seller | null>(null);
  const [isLoadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [isBankModalOpen, setBankModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const [history, setHistory] = useState<Withdrawal[]>([]);
  const [historyMeta, setHistoryMeta] = useState<PaginationMeta>({
    page: 1,
    limit: HISTORY_PAGE_SIZE,
    total: 0,
  });
  const [isLoadingHistory, setLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyPage, setHistoryPage] = useState(1);

  const fetchProfile = useCallback(async () => {
    setLoadingProfile(true);
    setProfileError(null);
    try {
      const data = await authService.getMe();
      setProfile(data);
    } catch (err: unknown) {
      logError(err, "DashboardWithdrawPage:profile");
      setProfileError(formatErrorForDisplay(err));
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  const fetchHistory = useCallback(async (page: number) => {
    setLoadingHistory(true);
    setHistoryError(null);
    try {
      const response = await withdrawalService.getMyWithdrawals({
        page,
        limit: HISTORY_PAGE_SIZE,
      });
      setHistory(response.data ?? []);
      if (response.meta) {
        setHistoryMeta(response.meta);
      }
    } catch (err: unknown) {
      logError(err, "DashboardWithdrawPage:history");
      setHistoryError(formatErrorForDisplay(err));
      setHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    fetchHistory(historyPage);
  }, [fetchHistory, historyPage]);

  const handleSavedBank = (updated: Seller) => {
    setProfile((prev) => ({ ...(prev ?? updated), ...updated }));
  };

  const handleWithdrawalCreated = (created: Withdrawal) => {
    if (historyPage !== 1) {
      setHistoryPage(1);
    } else {
      setHistory((prev) => [created, ...prev].slice(0, HISTORY_PAGE_SIZE));
      setHistoryMeta((prev) => ({ ...prev, total: prev.total + 1 }));
    }
    fetchProfile();
  };

  const displayName = profile?.name ?? user?.name ?? "-";
  const displayEmail = profile?.email ?? user?.email ?? "-";
  const displayBalance = profile?.balance ?? user?.balance ?? 0;
  const bankName = profile?.bankName ?? null;
  const bankNumber = profile?.bankNumber ?? null;
  const hasBank = Boolean(bankName && bankNumber);

  const totalPages = Math.max(
    1,
    Math.ceil(
      (historyMeta.total ?? 0) / (historyMeta.limit || HISTORY_PAGE_SIZE),
    ),
  );
  const startIndex =
    historyMeta.total === 0
      ? 0
      : (historyMeta.page - 1) * historyMeta.limit + 1;
  const endIndex = Math.min(
    historyMeta.page * historyMeta.limit,
    historyMeta.total ?? 0,
  );

  const goToPrevPage = () => {
    if (historyPage > 1) {
      setHistoryPage(historyPage - 1);
    }
  };

  const goToNextPage = () => {
    if (historyPage < totalPages) {
      setHistoryPage(historyPage + 1);
    }
  };

  return (
    <div className="mt-5 space-y-5">
      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-bg-blue rounded-xl p-2">
            <MdAccountBalanceWallet className="text-primary-blue size-7" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">Penarikan Saldo</p>
            <p className="text-sm text-[#D9D9D9]">
              Data akun seller dimuat langsung dari endpoint /auth/me.
            </p>
          </div>
        </div>
      </div>

      {profileError && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {profileError}
        </div>
      )}

      <div className="border-bg-blue from-primary-blue/25 to-bg-nav/70 rounded-xl border-2 bg-linear-to-b p-6">
        <p className="text-sm text-[#D9D9D9]">Saldo Tersedia</p>
        <p className="mt-2 text-4xl font-bold text-white">
          <span className="text-primary-yellow mr-3">IDR</span>
          {isLoadingProfile ? "..." : currencyFormatter.format(displayBalance)}
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-bg-div rounded-xl p-4">
            <div className="mb-2 flex items-center gap-2">
              <MdPerson className="text-primary-blue" size={20} />
              <p className="text-sm text-[#D9D9D9]">Nama Penjual</p>
            </div>
            <p className="truncate font-semibold text-white">
              {isLoadingProfile ? "Memuat..." : displayName}
            </p>
          </div>
          <div className="bg-bg-div rounded-xl p-4">
            <div className="mb-2 flex items-center gap-2">
              <MdMail className="text-primary-blue" size={20} />
              <p className="text-sm text-[#D9D9D9]">Email</p>
            </div>
            <p className="truncate font-semibold text-white">
              {isLoadingProfile ? "Memuat..." : displayEmail}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => setWithdrawModalOpen(true)}
            disabled={isLoadingProfile || !hasBank || displayBalance <= 0}
            className="grow"
          >
            Tarik Saldo
          </Button>
          <Button
            variant="outline"
            onClick={() => setBankModalOpen(true)}
            disabled={isLoadingProfile}
            className="grow"
          >
            {hasBank ? "Perbarui Rekening" : "Hubungkan Rekening"}
          </Button>
        </div>
      </div>

      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-bg-blue rounded-xl p-2">
            <MdAccountBalance className="text-primary-blue size-6" />
          </div>
          <div className="grow">
            <p className="text-lg font-bold text-white">Rekening Penarikan</p>
            <p className="text-sm text-[#D9D9D9]">
              Data bank yang akan dipakai saat menarik saldo.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-bg-div rounded-xl p-4">
            <p className="text-sm text-[#D9D9D9]">Bank</p>
            <p className="mt-1 truncate font-semibold text-white">
              {isLoadingProfile
                ? "Memuat..."
                : bankName
                  ? bankName
                  : "Belum dilengkapi"}
            </p>
          </div>
          <div className="bg-bg-div rounded-xl p-4">
            <p className="text-sm text-[#D9D9D9]">Nomor Rekening</p>
            <p className="mt-1 truncate font-semibold text-white">
              {isLoadingProfile
                ? "Memuat..."
                : bankNumber
                  ? bankNumber
                  : "Belum dilengkapi"}
            </p>
          </div>
        </div>

        {!isLoadingProfile && !hasBank && (
          <p className="mt-4 text-sm text-[#D9D9D9]">
            Lengkapi data bank kamu terlebih dahulu sebelum melakukan penarikan
            saldo.
          </p>
        )}
      </div>

      <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-bg-blue rounded-xl p-2">
              <MdHistory className="text-primary-blue size-6" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Riwayat Withdrawal</p>
              <p className="text-sm text-[#D9D9D9]">
                Daftar permintaan penarikan saldo yang pernah kamu ajukan.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => fetchHistory(historyPage)}
            disabled={isLoadingHistory}
            className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MdRefresh
              className={isLoadingHistory ? "size-5 animate-spin" : "size-5"}
            />
            <span>Muat ulang</span>
          </button>
        </div>
      </div>

      {historyError && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {historyError}
        </div>
      )}

      {isLoadingHistory ? (
        <div className="border-bg-div bg-bg-nav rounded-xl border-2 py-10 text-center text-gray-400">
          Memuat riwayat withdrawal...
        </div>
      ) : (
        <SellerWithdrawalTable withdrawals={history} />
      )}

      {historyMeta.total > 0 && !isLoadingHistory && (
        <div className="border-bg-div bg-bg-nav flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border-2 px-5 py-3 text-sm text-[#D9D9D9]">
        <p>
          Menampilkan{" "}
          <span className="text-white">
            {startIndex}-{endIndex}
          </span>{" "}
          dari <span className="text-white">{historyMeta.total}</span> riwayat
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={goToPrevPage}
            disabled={historyPage <= 1 || isLoadingHistory}
            className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 rounded-full border-2 px-4 py-1.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            Sebelumnya
          </button>
          <span className="text-white text-xs sm:text-sm">
            Halaman {historyMeta.page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={goToNextPage}
            disabled={historyPage >= totalPages || isLoadingHistory}
            className="border-bg-light bg-bg-div text-primary-blue hover:bg-bg-blue/30 rounded-full border-2 px-4 py-1.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            Berikutnya
          </button>
        </div>
      </div>
      )}

      <BankUpdateModal
        open={isBankModalOpen}
        initialBankName={bankName}
        initialBankNumber={bankNumber}
        onClose={() => setBankModalOpen(false)}
        onSaved={handleSavedBank}
      />

      <CreateWithdrawalModal
        open={isWithdrawModalOpen}
        availableBalance={displayBalance}
        hasBank={hasBank}
        onClose={() => setWithdrawModalOpen(false)}
        onCreated={handleWithdrawalCreated}
      />
    </div>
  );
};

export default DashboardWithdrawPage;
