import { NextResponse } from 'next/server';
import { cartLinesAdd, getCart } from '@/lib/shopify';

export async function POST(request) {
    try {
        const { cartId, lines } = await request.json();

        // Add lines
        await cartLinesAdd(cartId, lines);

        // Get updated cart
        const cart = await getCart(cartId);

        return NextResponse.json({
            success: true,
            cart: {
                id: cart.id,
                checkoutUrl: cart.checkoutUrl,
                lines: cart.lines.edges.map(edge => edge.node),
                cost: cart.cost,
                totalQuantity: cart.totalQuantity
            }
        });
    } catch (error) {
        console.error('Cart add error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to add items' },
            { status: 500 }
        );
    }
}
