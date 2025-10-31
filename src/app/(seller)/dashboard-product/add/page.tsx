import Input from "@/components/global/input";
import { MdCategory, MdEdit } from "react-icons/md";

const AddProductPage = () => {
  return (
    <div>
      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-2">
            <MdEdit className="text-primary-blue size-8" />
          </div>
          <p className="text-3xl font-bold text-white">Nama Produk</p>
        </div>
        <p className="text-sec-netral text-sm">
          Masukkan judul produk yang jelas dan mudah dikenali
        </p>
        <Input
          type="text"
          placeholder="Masukkan Nama Produk..."
          name="name"
          className="mb-3 w-full"
        />
      </div>

      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-2">
            <MdCategory className="text-primary-blue size-8" />
          </div>
          <p className="text-3xl font-bold text-white">Kategori Produk</p>
        </div>
        <p className="text-sec-netral text-sm">
          Pilih kategori yang sesuai agar produkmu mudah ditemukan.
        </p>
        <div></div>
      </div>
    </div>
  );
};

export default AddProductPage;
