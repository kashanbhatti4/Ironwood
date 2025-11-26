import ProductsClient from '@/components/products/ProductsClient';
import { getAllCollections, getAllProducts } from '@/store/shopifyProducts';

export default async function ProductsPage() {
    // Fetch data from Shopify
    const collections = await getAllCollections();
    const products = await getAllProducts();

    // Map collections to category format (handle-based)
    const categoryHandles = collections.map((collection) => ({
        title: collection.title,
        handle: collection.handle,
    }));

    return <ProductsClient products={products} collections={categoryHandles} />;
}
