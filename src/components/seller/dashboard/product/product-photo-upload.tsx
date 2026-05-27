"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { IoImage } from "react-icons/io5";

interface ProductPhotoUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  value?: File | null;
}

const ProductPhotoUpload = ({
  label,
  onChange,
  value,
}: ProductPhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }

    onChange(file);
    event.target.value = "";
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={`photo-upload-${label}`}
        />
        <label
          htmlFor={`photo-upload-${label}`}
          className={`border-bg-light bg-bg-div hover:border-primary-blue group flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all ${preview ? "p-2" : ""}`}
        >
          {preview ? (
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image src={preview} alt={label} fill className="object-cover" />
            </div>
          ) : (
            <>
              <div className="bg-bg-light group-hover:bg-bg-blue rounded-xl p-3 transition-colors">
                <IoImage className="text-sec-netral group-hover:text-primary-blue size-8 transition-colors" />
              </div>
              <p className="text-sec-netral text-center text-sm">{label}</p>
            </>
          )}
        </label>
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600"
            aria-label="Remove photo"
          >
            <FiX className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductPhotoUpload;
