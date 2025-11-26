'use client';

import { useState } from 'react';
import SectionContainer from '@/components/ui/SectionContainer';
import SearchBar from '@/components/ui/SearchBar';
import CategoryTabs from '@/components/ui/CategoryTabs';
import ProductCard from '@/components/cards/ProductCard';

export default function ProductsClient({ products, collections }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            activeCategory === 'All' ||
            product.collections?.includes(activeCategory);
        return matchesSearch && matchesCategory;
    });

    return (
        <SectionContainer>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-3xl font-light tracking-tight text-gray-900">Shop</h1>
                    <SearchBar placeholder="Search products..." onChange={setSearchQuery} />
                </div>

                <CategoryTabs
                    categories={collections}
                    activeCategory={activeCategory}
                    onSelect={setActiveCategory}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No products found matching your criteria.
                    </div>
                )}
            </div>
        </SectionContainer>
    );
}
