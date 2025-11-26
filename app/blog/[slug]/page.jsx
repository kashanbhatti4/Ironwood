import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionContainer from '@/components/ui/SectionContainer';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import { getPostBySlug, getAllPosts, urlFor } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const post = await getPostBySlug(slug);

        if (!post) {
            return { title: 'Blog Post Not Found' };
        }

        return {
            title: post.seo?.title || post.title,
            description: post.seo?.description || post.excerpt,
            openGraph: {
                title: post.seo?.title || post.title,
                description: post.seo?.description || post.excerpt,
                images: post.seo?.ogImage
                    ? [urlFor(post.seo.ogImage).width(1200).height(630).url()]
                    : post.coverImage
                        ? [urlFor(post.coverImage).width(1200).height(630).url()]
                        : [],
            },
        };
    } catch (error) {
        return { title: 'Blog Post' };
    }
}

export async function generateStaticParams() {
    try {
        const posts = await getAllPosts();
        return posts.map((post) => ({
            slug: post.slug,
        }));
    } catch (error) {
        return [];
    }
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const coverImageUrl = post.coverImage
        ? urlFor(post.coverImage).width(1200).height(600).url()
        : null;

    const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const category = post.categories && post.categories.length > 0
        ? post.categories[0].title
        : null;

    const authorName = post.author?.name || 'Anonymous';

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
                    {category && (
                        <div className="text-xs text-gray-500 uppercase tracking-wider">
                            {category}
                        </div>
                    )}

                    <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            {post.author?.image && (
                                <img
                                    src={urlFor(post.author.image).width(40).height(40).url()}
                                    alt={authorName}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                            )}
                            <span>By {authorName}</span>
                        </div>
                        <span>•</span>
                        <time dateTime={post.publishedAt}>{publishedDate}</time>
                        {post.readingTime && (
                            <>
                                <span>•</span>
                                <span>{post.readingTime} min read</span>
                            </>
                        )}
                    </div>
                </header>

                {/* Featured Image */}
                {coverImageUrl && (
                    <div className="mb-12 aspect-[2/1] w-full bg-gray-100 overflow-hidden">
                        <img
                            src={coverImageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <p className="text-lg font-light leading-relaxed text-gray-700 mb-6">
                        {post.excerpt}
                    </p>

                    {post.content && (
                        <PortableTextRenderer content={post.content} />
                    )}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag.slug}
                                    className="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded-full"
                                >
                                    {tag.title}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Author Bio */}
                {post.author && post.author.bio && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex items-start gap-4">
                            {post.author.image && (
                                <img
                                    src={urlFor(post.author.image).width(80).height(80).url()}
                                    alt={post.author.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            )}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-1">About {post.author.name}</h3>
                                <div className="text-sm text-gray-600 font-light">
                                    <PortableTextRenderer content={post.author.bio} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </article>
        </SectionContainer>
    );
}
