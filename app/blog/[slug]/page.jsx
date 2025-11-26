import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionContainer from '@/components/ui/SectionContainer';
import { blogs } from '@/data/blogs';

export async function generateStaticParams() {
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const blog = blogs.find(b => b.slug === slug);

    if (!blog) {
        notFound();
    }

    return (
        <SectionContainer>
            {/* Back Link */}
            <div className="mb-8">
                <Link
                    href="/blog"
                    className="text-sm text-gray-500 hover:text-black transition-colors inline-flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Journal
                </Link>
            </div>

            {/* Article */}
            <article className="max-w-3xl mx-auto">
                {/* Header */}
                <header className="mb-8 space-y-4">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                        {blog.category}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
                        {blog.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>By {blog.author}</span>
                        <span>•</span>
                        <time dateTime={blog.publishedAt}>
                            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="mb-12 aspect-[2/1] w-full bg-gray-100 overflow-hidden">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        {blog.title}
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <p className="text-lg font-light leading-relaxed text-gray-700 mb-6">
                        {blog.excerpt}
                    </p>
                    <p className="font-light leading-relaxed text-gray-700">
                        {blog.content}
                    </p>
                </div>
            </article>
        </SectionContainer>
    );
}
