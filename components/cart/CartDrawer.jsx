'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function CartDrawer() {
    const { lines, isOpen, loading, checkoutUrl, closeCart, updateQuantity, removeFromCart } = useCartStore();

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') closeCart();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [closeCart]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const subtotal = lines.reduce((sum, line) => {
        const price = parseFloat(line.merchandise.priceV2.amount);
        return sum + (price * line.quantity);
    }, 0);

    const handleCheckout = () => {
        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-250 ease-out"
                onClick={closeCart}
                style={{ opacity: isOpen ? 1 : 0 }}
            />

            {/* Drawer */}
            <div
                className="relative w-full max-w-[380px] h-full bg-white shadow-xl flex flex-col transition-transform duration-250 ease-out"
                style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900">Your Cart</h2>
                    <button
                        onClick={closeCart}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {lines.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                            <p>Your cart is empty.</p>
                            <button
                                onClick={closeCart}
                                className="text-sm text-black underline underline-offset-4 hover:opacity-70"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        lines.map((line) => {
                            const imageUrl = line.merchandise.image?.url;
                            const price = parseFloat(line.merchandise.priceV2.amount);
                            const title = line.merchandise.product?.title || line.merchandise.title;

                            return (
                                <div key={line.id} className="flex gap-4">
                                    {/* Thumbnail */}
                                    <div className="w-20 h-20 bg-gray-100 flex-shrink-0 overflow-hidden">
                                        {imageUrl ? (
                                            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200" />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                                            <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {/* Qty Controls */}
                                            <div className="flex items-center border border-gray-200 rounded-sm">
                                                <button
                                                    onClick={() => updateQuantity(line.id, line.quantity - 1)}
                                                    disabled={loading}
                                                    className="px-2 py-1 text-gray-500 hover:text-black transition-colors disabled:opacity-50"
                                                >
                                                    -
                                                </button>
                                                <span className="text-xs font-medium w-6 text-center">{line.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(line.id, line.quantity + 1)}
                                                    disabled={loading}
                                                    className="px-2 py-1 text-gray-500 hover:text-black transition-colors disabled:opacity-50"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() => removeFromCart(line.id)}
                                                disabled={loading}
                                                className="text-xs text-gray-400 hover:text-red-500 transition-colors underline underline-offset-2 disabled:opacity-50"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                {lines.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                        <div className="flex items-center justify-between text-base font-medium text-gray-900">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <button
                            onClick={handleCheckout}
                            disabled={loading || !checkoutUrl}
                            className="w-full py-4 bg-black text-white text-sm font-medium uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Checkout'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
