import AddToCartButton from '@/components/products/AddToCartButton';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionContainer from '@/components/ui/SectionContainer';
import { getProductByHandle } from '@/lib/shopify';

export default async function ProductPage({ params }) {
    const { handle } = await params;

    // Fetch product from Shopify
    const data = await getProductByHandle(handle);
    const product = data?.product;

    if (!product) {
        notFound();
    }

    // Extract data from Shopify response
    const price = parseFloat(product.priceRange.minVariantPrice.amount);
    const category = product.collections.edges[0]?.node.title || product.productType || 'Uncategorized';
    const imageUrl = product.images.edges[0]?.node.url;
    const variantId = product.variants.edges[0]?.node.id;

    return (
        <SectionContainer>
            <div className="mb-8 text-sm text-gray-500">
                <Link href="/" className="hover:text-black transition-colors">
                    Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/products" className="hover:text-black transition-colors">
                    Products
                </Link>
                <span className="mx-2">/</span>
                <span className="text-black">{product.title}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                {/* Image */}
                <div className="aspect-square w-full bg-gray-100 overflow-hidden">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200" />
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                            {category}
                        </span>
                        <h1 className="text-3xl font-light tracking-tight text-gray-900">{product.title}</h1>
                        <p className="text-xl text-gray-900">${price}</p>
                    </div>

                    <p className="text-gray-600 font-light leading-relaxed">{product.description}</p>

                    <AddToCartButton product={{
                        id: product.id,
                        variantId: variantId,
                        title: product.title,
                        handle: product.handle,
                        price: price,
                        description: product.description,
                        category: category,
                        images: product.images.edges.map(edge => edge.node.url),
                    }} />
                </div>
            </div>
        </SectionContainer>
    );
}
