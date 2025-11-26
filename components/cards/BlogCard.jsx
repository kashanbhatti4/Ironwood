import Link from 'next/link';

export default function BlogCard({ blog }) {
    return (
        <Link
            href={`/blog/${blog.slug}`}
            className="group block bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300"
        >
            {/* Image */}
            <div className="aspect-[3/2] w-full bg-gray-100 overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    {blog.title}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
                {/* Category & Date */}
                <div className="flex items-center gap-3 text-xs text-gray-500 uppercase tracking-wider">
                    <span>{blog.category}</span>
                    <span>•</span>
                    <time dateTime={blog.publishedAt}>
                        {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>
                </div>

                {/* Title */}
                <h3 className="text-xl font-light text-gray-900 group-hover:text-gray-600 transition-colors">
                    {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 font-light line-clamp-2">
                    {blog.excerpt}
                </p>

                {/* Author */}
                <p className="text-xs text-gray-500 pt-2">
                    By {blog.author}
                </p>
            </div>
        </Link>
    );
}
