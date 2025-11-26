import Link from 'next/link';

export default function ProductCard({ product }) {
    const imageUrl = product.images?.[0];

    return (
        <Link href={`/products/${product.handle}`} className="group block">
            <div className="aspect-square w-full bg-gray-100 overflow-hidden mb-4">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-500" />
                )}
            </div>
            <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-black transition-colors">
                    {product.title}
                </h3>
                <p className="text-sm text-gray-500">${product.price}</p>
            </div>
        </Link>
    );
}
