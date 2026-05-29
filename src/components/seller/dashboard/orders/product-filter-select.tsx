"use client";

interface ProductOption {
  productId: string;
  name: string;
}

interface ProductFilterSelectProps {
  value: string | null;
  options: ProductOption[];
  onChange: (productId: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const ProductFilterSelect = ({
  value,
  options,
  onChange,
  disabled,
  placeholder = "Semua produk",
  className,
}: ProductFilterSelectProps) => {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || null)}
      disabled={disabled}
      className={
        "border-bg-light bg-bg-div text-sec-netral rounded-full border-2 px-4 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 " +
        (className ?? "")
      }
    >
      <option value="">{placeholder}</option>
      {options.map((product) => (
        <option key={product.productId} value={product.productId}>
          {product.name}
        </option>
      ))}
    </select>
  );
};

export default ProductFilterSelect;
