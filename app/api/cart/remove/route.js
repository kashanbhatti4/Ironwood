import { NextResponse } from 'next/server';
import { cartLinesRemove } from '@/lib/shopify';

export async function POST(request) {
    try {
        const { cartId, lineIds } = await request.json();

        // Remove lines - returns lightweight response
        const cart = await cartLinesRemove(cartId, lineIds);

        return NextResponse.json({
            success: true,
            totalQuantity: cart.totalQuantity,
            subtotal: cart.cost.subtotalAmount.amount
        });
    } catch (error) {
        console.error('Cart remove error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to remove items' },
            { status: 500 }
        );
    }
}
