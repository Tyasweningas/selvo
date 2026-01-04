"use client";

import Input from "@/components/global/input";
import { MdClose } from "react-icons/md";

interface ProductDetailItemProps {
  detailKey: string;
  detailValue: string;
  onRemove?: () => void;
  onChange?: (data: { key: string; value: string }) => void;
  showRemove?: boolean;
}

const ProductDetailItem = ({
  detailKey,
  detailValue,
  onRemove,
  onChange,
  showRemove = true,
}: ProductDetailItemProps) => {
  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = event.target.value;
    onChange?.({ key: newKey, value: detailValue });
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange?.({ key: detailKey, value: newValue });
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        value={detailKey}
        onChange={handleKeyChange}
        placeholder="Ketikkan sesuatu"
        variant="colored"
        className="w-48 flex-shrink-0"
      />
      <div className="flex flex-1 items-center gap-3">
        <Input
          value={detailValue}
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
