import SellerIncomeCard from "@/components/seller/dashboard/statistic/seller-income-card";
import SellerMetricCard from "@/components/seller/dashboard/statistic/seller-metric-card";
import UploadProductCard from "@/components/seller/dashboard/statistic/upload-product-card";
import {
  MdCreditCard,
  MdGroups2,
  MdReceiptLong,
  MdShoppingCartCheckout,
} from "react-icons/md";

const DashboardStatisticPage = () => {
  return (
    <div className="mt-5">
      <div className="flex items-stretch gap-10">
        <SellerIncomeCard />
        <UploadProductCard />
      </div>
      <div className="mt-5 grid grid-cols-4 gap-5">
        <SellerMetricCard
          icon={<MdCreditCard className="text-primary-green size-6" />}
          title="Total Penjualan"
          footerText="04 September - 04 Oktober 2025"
        >
          <p className="text-3xl font-semibold text-white">
            <span className="text-primary-yellow mr-2">IDR</span>20.500.000
          </p>
        </SellerMetricCard>
        <SellerMetricCard
          icon={
            <MdShoppingCartCheckout className="text-primary-green size-6" />
          }
          title="Pendapatan Harian"
          footerText="Rata-rata pendapatan harian"
        >
          <p className="text-3xl font-semibold text-white">
            <span className="text-primary-yellow mr-2">IDR</span>150.000
          </p>
        </SellerMetricCard>
        <SellerMetricCard
          icon={<MdReceiptLong className="text-primary-green size-6" />}
          title="Total Transaksi"
          footerText="Total produk terjual"
        >
          <p className="text-3xl font-semibold text-white">
            <span className="mr-2">1300</span>Transaksi
          </p>
        </SellerMetricCard>
        <SellerMetricCard
          icon={<MdGroups2 className="text-primary-green size-6" />}
          title="Pengunjung bulanan"
          footerText="Interaksi Pengunjung"
        >
          <p className="text-3xl font-semibold text-white">
            <span className="mr-2">3000</span>Akun
          </p>
        </SellerMetricCard>
      </div>
    </div>
  );
};

export default DashboardStatisticPage;
