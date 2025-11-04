"use client";

import ChipsInput from "@/components/global/chips-input";
import TextArea from "@/components/global/textarea";
import { Fragment, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdDescription } from "react-icons/md";

const AddProductDescription = () => {
  const [searchKeywords, setSearchKeywords] = useState<string[]>([]);

  return (
    <Fragment>
      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-2">
            <MdDescription className="text-primary-blue size-8" />
          </div>
          <p className="text-3xl font-bold text-white">Deskripsi Produk</p>
        </div>
        <p className="text-sec-netral text-sm">
          Jelaskan Fitur, Manfaat, atau Detail penting produk digitalmu.
        </p>
        <TextArea
          className="h-48 w-full"
          placeholder="Tuliskan deksripsi produk"
        />
      </div>

      <div className="border-bg-div bg-bg-nav mt-5 space-y-5 rounded-xl border-2 p-5">
        <div className="flex items-center gap-5">
          <div className="bg-bg-blue rounded-xl p-2">
            <IoSearch className="text-primary-blue size-8" />
          </div>
          <p className="text-3xl font-bold text-white">
            Kata Kunci Pencarian Produk
          </p>
        </div>
        <p className="text-sec-netral text-sm">
          Tambahkan kata kunci agar produkmu lebih mudah dicari.
        </p>
        <ChipsInput
          value={searchKeywords}
          onChange={setSearchKeywords}
          placeholder="Ketik kata kunci dan tekan spasi..."
          className="min-h-48 w-full overflow-y-auto"
        />
      </div>
    </Fragment>
  );
};

export default AddProductDescription;
