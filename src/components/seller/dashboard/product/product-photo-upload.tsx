"use client";

import Image from "next/image";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { IoImage } from "react-icons/io5";

interface ProductPhotoUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  value?: string | null;
}

const ProductPhotoUpload = ({
  label,
  onChange,
  value,
}: ProductPhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      onChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
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
          className={`border-bg-light bg-bg-div hover:border-primary-blue group flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all $${preview ? "p-2" : ""}`}
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
