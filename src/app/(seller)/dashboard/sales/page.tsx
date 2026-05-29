import { Suspense } from "react";
import SalesContent from "./sales-content";

const SalesLoading = () => {
  return (
    <div className="border-bg-div bg-bg-nav mt-5 rounded-xl border-2 py-16 text-center text-gray-400">
      Memuat halaman pesanan...
    </div>
  );
};

const SalesPage = () => {
  return (
    <Suspense fallback={<SalesLoading />}>
      <SalesContent />
    </Suspense>
  );
};

export default SalesPage;
