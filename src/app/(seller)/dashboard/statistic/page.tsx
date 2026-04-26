"use client";

import SellerIncomeCard from "@/components/seller/dashboard/statistic/seller-income-card";
import SellerMetricCard from "@/components/seller/dashboard/statistic/seller-metric-card";
import UploadProductCard from "@/components/seller/dashboard/statistic/upload-product-card";
import { useUser } from "@/hooks/use-user";
import {
  MdBadge,
  MdCalendarMonth,
  MdMail,
  MdVerifiedUser,
} from "react-icons/md";

function formatMemberSince(dateValue?: string) {
  if (!dateValue) {
    return "-";
  }

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const DashboardStatisticPage = () => {
  const { user, loading } = useUser();

  return (
    <div className="mt-5">
      <div className="flex items-stretch gap-10">
        <SellerIncomeCard />
        <UploadProductCard />
      </div>
      <div className="mt-5 grid grid-cols-4 gap-5">
        <SellerMetricCard
          icon={<MdBadge className="text-primary-blue size-6" />}
          title="ID Penjual"
          footerText="Identifier akun dari session"
        >
          <p className="truncate text-2xl font-semibold text-white">
            {loading ? "Memuat..." : (user?.sellerId ?? "-")}
          </p>
        </SellerMetricCard>
        <SellerMetricCard
          icon={<MdMail className="text-primary-blue size-6" />}
          title="Email Penjual"
          footerText="Alamat email dari session"
        >
          <p className="truncate text-xl font-semibold text-white">
            {loading ? "Memuat..." : (user?.email ?? "-")}
          </p>
        </SellerMetricCard>
        <SellerMetricCard
          icon={<MdVerifiedUser className="text-primary-blue size-6" />}
          title="Status Session"
          footerText="Validasi status akun login"
        >
          <p className="text-2xl font-semibold text-white">
            {loading ? "Memuat..." : user ? "Akun Aktif" : "Tidak Ada Session"}
          </p>
        </SellerMetricCard>
        <SellerMetricCard
          icon={<MdCalendarMonth className="text-primary-blue size-6" />}
          title="Bergabung Sejak"
          footerText="Tanggal pembuatan akun"
        >
          <p className="text-2xl font-semibold text-white">
            {loading ? "Memuat..." : formatMemberSince(user?.createdAt)}
          </p>
        </SellerMetricCard>
      </div>
    </div>
  );
};

export default DashboardStatisticPage;
