'use client';

import { useCartStore } from '@/store/cartStore';

export default function AddToCartButton({ product }) {
    const { addToCart, loading } = useCartStore();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full py-4 bg-black text-white text-sm font-medium uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
            {loading ? 'Adding...' : 'Add to Cart'}
        </button>
    );
}
