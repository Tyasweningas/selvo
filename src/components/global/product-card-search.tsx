"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

/* =====================
   Types
===================== */
export interface Product {
    id: number;
    category: string;
    title: string;
    image: string;
    rating: number;
    downloads: string;
    price: number;
}

interface ProductCardSearchProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onLike?: (productId: number) => void;
}

/* =====================
   Component
===================== */
export const ProductCardSearch: React.FC<ProductCardSearchProps> = ({
    product,
    onAddToCart,
    onLike
}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLiked((prev) => !prev);
        onLike?.(product.id);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        onAddToCart?.(product);
    };

    return (
        <Link
            href={`/desc-product?id=${product.id}`}
            className="block h-full bg-[#0F1E25] rounded-xl overflow-hidden hover:shadow-xl hover:shadow-cyan-500/20 transition-all group border border-[#1F2F38]"
        >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-[#1A2B32]">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#EF4DA0] text-white text-xs font-semibold rounded-full">
                        {product.category}
                    </span>
                </div>

                {/* Like Button */}
                <button
                    onClick={handleLike}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all z-10"
                >
                    <FiHeart
                        size={18}
                        className={`${isLiked ? "fill-[#EF4DA0] text-[#EF4DA0]" : "text-white"
                            } transition-colors`}
                    />
                </button>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-white font-semibold mb-2 line-clamp-2 text-sm leading-snug">
                    {product.title}
                </h3>

                <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center text-yellow-400">
                        <FaStar size={14} />
                        <span className="text-xs ml-1">{product.rating}</span>
                    </div>
                    <span className="text-gray-500 text-xs">•</span>
                    <span className="text-gray-400 text-xs">{product.downloads}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-white">
                        IDR {product.price.toLocaleString("id-ID")}
                    </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-auto">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-[#2EC8E6] hover:bg-[#26b3cf] text-white font-semibold py-2 rounded-full transition-all text-sm"
                    >
                        Beli
                    </button>

                    <button
                        onClick={handleAddToCart}
                        className="w-10 h-10 bg-[#EF4DA0] hover:bg-[#d63d87] rounded-full flex items-center justify-center transition-all flex-shrink-0"
                    >
                        <FiShoppingCart size={18} className="text-white" />
                    </button>
                </div>
            </div>
        </Link>
    );
};