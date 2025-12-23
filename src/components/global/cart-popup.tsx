'use client';
import { IoClose } from "react-icons/io5";
import CartItemComponent from "./cart-item";
import { CartItem } from "@/types/cart";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  totalPrice: number;
}

export default function CartPopup({ isOpen, onClose, items, onRemoveItem, totalPrice }: Props) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* Cart Popup */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[320px] bg-[#0D171C] z-50 shadow-2xl animate-slideInRight flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-white font-bold text-lg">Keranjang Kamu</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-400 text-sm">Keranjang kamu masih kosong</p>
              <p className="text-gray-500 text-xs mt-1">Mulai belanja sekarang!</p>
            </div>
          ) : (
            items.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onRemove={onRemoveItem}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-800 p-4 space-y-3">
            {/* Promo Code Button */}
            <button className="w-full py-2.5 border border-primary-blue text-primary-blue rounded-lg font-semibold text-sm hover:bg-primary-blue/10 transition-colors">
              Tukarkan Kode Promo →
            </button>

            {/* Total */}
            <div className="flex justify-between items-center py-2">
              <span className="text-white font-semibold">Perkiraan total</span>
              <span className="text-[#FFD700] font-bold text-lg">
                IDR {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>

            <p className="text-gray-400 text-xs text-center">
              Belum termasuk pajak dan ongkos kirim
            </p>

            {/* Checkout Button */}
            <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-bold hover:from-pink-600 hover:to-pink-700 transition-all">
              Checkout ({items.length})
            </button>
          </div>
        )}
      </div>
    </>
  );
}
