import Link from 'next/link';
import BlogCard from '@/components/cards/BlogCard';
import SearchBar from '@/components/ui/SearchBar';
import SectionContainer from '@/components/ui/SectionContainer';
import { getAllPosts, getPostsBySearch, getPostsByCategorySlug, getAllCategories } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }) {
    const params = await searchParams;
    const q = params?.q || '';
    const categorySlug = params?.category || '';

    let blogs = [];
    if (q) {
        blogs = await getPostsBySearch(q);
    } else if (categorySlug) {
        blogs = await getPostsByCategorySlug(categorySlug);
    } else {
        blogs = await getAllPosts();
    }

    const categories = await getAllCategories();

    return (
        <SectionContainer>
            {/* Header */}
            <div className="mb-12 text-center space-y-4">
                <h1 className="text-4xl font-light tracking-tight text-gray-900">Journal</h1>
                <p className="text-gray-600 font-light max-w-2xl mx-auto">
                    Insights on craftsmanship, leather goods, and timeless design.
                </p>
            </div>

            {/* Search & Filter */}
            <div className="mb-12 space-y-6">
                <SearchBar
                    defaultValue={q}
                    placeholder="Search articles..."
                />

                {/* Category Filter Strip */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/blog"
                        className={`px-4 py-2 text-sm rounded-full transition-colors ${!categorySlug
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        All
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/blog?category=${cat.slug}`}
                            className={`px-4 py-2 text-sm rounded-full transition-colors ${categorySlug === cat.slug
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat.title}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Blog Grid */}
            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.slug} blog={blog} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 font-light">
                        {q ? `No articles found for "${q}".` : 'No articles available.'}
                    </p>
                </div>
            )}
        </SectionContainer>
    );
}
