'use client';

import { useState } from 'react';
import BlogCard from '@/components/cards/BlogCard';
import SearchBar from '@/components/ui/SearchBar';
import SectionContainer from '@/components/ui/SectionContainer';
import { blogs } from '@/data/blogs';

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter blogs
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <SectionContainer>
            {/* Header */}
            <div className="mb-12 text-center space-y-4">
                <h1 className="text-4xl font-light tracking-tight text-gray-900">Journal</h1>
                <p className="text-gray-600 font-light max-w-2xl mx-auto">
                    Insights on craftsmanship, leather goods, and timeless design.
                </p>
            </div>

            {/* Search */}
            <div className="mb-12">
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search articles..."
                />
            </div>

            {/* Blog Grid */}
            {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 font-light">No articles found matching your criteria.</p>
                </div>
            )}
        </SectionContainer>
    );
}
