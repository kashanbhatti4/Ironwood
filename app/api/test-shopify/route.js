import { shopifyFetch } from '@/lib/shopify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = `
      {
        collections(first: 10) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }
    `;

    const data = await shopifyFetch(query);

    return NextResponse.json({
      success: true,
      collections: data.collections.edges.map(edge => edge.node),
    });
  } catch (error) {
    console.error("Shopify collections error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch Shopify collections",
      },
      { status: 500 }
    );
  }
}
