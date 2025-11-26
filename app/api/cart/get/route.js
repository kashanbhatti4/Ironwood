import { NextResponse } from 'next/server';
import { getCart } from '@/lib/shopify';

export async function POST(request) {
    try {
        const { cartId } = await request.json();

        if (!cartId) {
            return NextResponse.json(
                { error: 'Cart ID required' },
                { status: 400 }
            );
        }

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
        console.error('Cart get error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to get cart' },
            { status: 500 }
        );
    }
}
