'use client';
import { useState } from 'react';
import { CartItem, CartState } from '@/types/cart';

export function useCart() {
    const [cart, setCart] = useState<CartState>({
        items: [],
        isOpen: false,
    });

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCart((prev) => {
            const existingItem = prev.items.find((i) => i.id === item.id);

            if (existingItem) {
                return {
                    ...prev,
                    items: prev.items.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }

            return {
                ...prev,
                items: [...prev.items, { ...item, quantity: 1 }],
            };
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== id),
        }));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }

        setCart((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === id ? { ...item, quantity } : item
            ),
        }));
    };

    const toggleCart = () => {
        setCart((prev) => ({ ...prev, isOpen: !prev.isOpen }));
    };

    const openCart = () => {
        setCart((prev) => ({ ...prev, isOpen: true }));
    };

    const closeCart = () => {
        setCart((prev) => ({ ...prev, isOpen: false }));
    };

    const getTotalPrice = () => {
        return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getTotalItems = () => {
        return cart.items.reduce((total, item) => total + item.quantity, 0);
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        openCart,
        closeCart,
        getTotalPrice,
        getTotalItems,
    };
}
