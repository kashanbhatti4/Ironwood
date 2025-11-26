import { NextResponse } from 'next/server';
import { cartCreate, getCart } from '@/lib/shopify';

export async function POST(request) {
    try {
        const { lines } = await request.json();

        // Create cart
        const cart = await cartCreate(lines);

        // Get full cart data
        const fullCart = await getCart(cart.id);

        return NextResponse.json({
            success: true,
            cart: {
                id: fullCart.id,
                checkoutUrl: fullCart.checkoutUrl,
                lines: fullCart.lines.edges.map(edge => edge.node),
                cost: fullCart.cost,
                totalQuantity: fullCart.totalQuantity
            }
        });
    } catch (error) {
        console.error('Cart create error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create cart' },
            { status: 500 }
        );
    }
}
