import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            cartId: null,
            checkoutUrl: null,
            lines: [],
            isOpen: false,
            loading: false,

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            // Add item to cart
            addToCart: async (product) => {
                const { cartId, lines } = get();
                const merchandiseId = product.variantId;

                if (!merchandiseId) {
                    console.error('Missing variantId');
                    return;
                }

                // Open drawer immediately
                set({ isOpen: true, loading: true });

                try {
                    if (!cartId) {
                        // Create new cart
                        const res = await fetch('/api/cart/create', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                lines: [{ merchandiseId, quantity: 1 }]
                            })
                        });

                        const data = await res.json();

                        if (res.ok) {
                            set({
                                cartId: data.cart.id,
                                checkoutUrl: data.cart.checkoutUrl,
                                lines: data.cart.lines,
                                loading: false
                            });
                        } else {
                            set({ loading: false });
                        }
                    } else {
                        // Check if item exists
                        const existingLine = lines.find(line => line.merchandise.id === merchandiseId);

                        if (existingLine) {
                            // Update existing line
                            const res = await fetch('/api/cart/update', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    cartId,
                                    lines: [{ id: existingLine.id, quantity: existingLine.quantity + 1 }]
                                })
                            });

                            const data = await res.json();

                            if (res.ok) {
                                // Update the specific line
                                set({
                                    lines: lines.map(line =>
                                        line.id === existingLine.id
                                            ? { ...line, quantity: existingLine.quantity + 1 }
                                            : line
                                    ),
                                    loading: false
                                });
                            } else {
                                set({ loading: false });
                            }
                        } else {
                            // Add new line
                            const res = await fetch('/api/cart/add', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    cartId,
                                    lines: [{ merchandiseId, quantity: 1 }]
                                })
                            });

                            const data = await res.json();

                            if (res.ok && data.cart) {
                                set({
                                    lines: data.cart.lines,
                                    checkoutUrl: data.cart.checkoutUrl,
                                    loading: false
                                });
                            } else {
                                set({ loading: false });
                            }
                        }
                    }
                } catch (error) {
                    console.error('Cart error:', error);
                    set({ loading: false });
                }
            },

            // Update quantity
            updateQuantity: async (lineId, quantity) => {
                const { cartId, lines } = get();

                if (quantity === 0) {
                    await get().removeFromCart(lineId);
                    return;
                }

                // Optimistic update
                set({
                    lines: lines.map(line =>
                        line.id === lineId ? { ...line, quantity } : line
                    )
                });

                // Sync with Shopify
                try {
                    await fetch('/api/cart/update', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            cartId,
                            lines: [{ id: lineId, quantity }]
                        })
                    });
                } catch (error) {
                    console.error('Update error:', error);
                }
            },

            // Remove item
            removeFromCart: async (lineId) => {
                const { cartId, lines } = get();

                // Optimistic remove
                set({
                    lines: lines.filter(line => line.id !== lineId)
                });

                // Sync with Shopify
                try {
                    await fetch('/api/cart/remove', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            cartId,
                            lineIds: [lineId]
                        })
                    });
                } catch (error) {
                    console.error('Remove error:', error);
                }
            },

            clearCart: () => set({
                cartId: null,
                checkoutUrl: null,
                lines: [],
                isOpen: false
            })
        }),
        {
            name: 'ironwood-cart',
            partialize: (state) => ({
                cartId: state.cartId,
                checkoutUrl: state.checkoutUrl
            })
        }
    )
);
