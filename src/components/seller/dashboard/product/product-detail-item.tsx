"use client";

import Input from "@/components/global/input";
import { useState } from "react";
import { MdClose } from "react-icons/md";

interface ProductDetailItemProps {
  onRemove?: () => void;
  onChange?: (data: { key: string; value: string }) => void;
  showRemove?: boolean;
}

const ProductDetailItem = ({
  onRemove,
  onChange,
  showRemove = true,
}: ProductDetailItemProps) => {
  const [keyLabel, setKeyLabel] = useState<string>("");
  const [valueLabel, setValueLabel] = useState<string>("");

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = event.target.value;
    setKeyLabel(newKey);
    onChange?.({ key: newKey, value: valueLabel });
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValueLabel(newValue);
    onChange?.({ key: keyLabel, value: newValue });
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        value={keyLabel}
        onChange={handleKeyChange}
        placeholder="Ketikkan sesuatu"
        variant="colored"
        className="w-48 flex-shrink-0"
      />
      <div className="flex flex-1 items-center gap-3">
        <Input
          value={valueLabel}
          onChange={handleValueChange}
          placeholder="Ketikkan alamat emailmu..."
          className="w-full pr-12"
        />
        {showRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="bg-primary-blue hover:bg-primary-blue/90 grid size-8 cursor-pointer place-items-center rounded-full p-1.5 text-white transition-colors"
            aria-label="Remove item"
          >
            <MdClose className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailItem;
