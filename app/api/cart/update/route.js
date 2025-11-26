import { NextResponse } from 'next/server';
import { cartLinesUpdate } from '@/lib/shopify';

export async function POST(request) {
    try {
        const { cartId, lines } = await request.json();

        // Update lines - returns lightweight response
        const cart = await cartLinesUpdate(cartId, lines);

        return NextResponse.json({
            success: true,
            totalQuantity: cart.totalQuantity,
            subtotal: cart.cost.subtotalAmount.amount
        });
    } catch (error) {
        console.error('Cart update error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update cart' },
            { status: 500 }
        );
    }
}
