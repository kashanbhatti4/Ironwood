import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';

const PortableTextRenderer = ({ content }) => {
    const components = {
        types: {
            image: ({ value }) => {
                if (!value?.asset) return null;

                return (
                    <div className="my-8">
                        <img
                            src={urlFor(value).width(1200).url()}
                            alt={value.alt || value.caption || ''}
                            className="w-full h-auto"
                        />
                        {value.caption && (
                            <p className="text-sm text-gray-500 text-center mt-2 font-light">
                                {value.caption}
                            </p>
                        )}
                    </div>
                );
            },
            code: ({ value }) => (
                <pre className="bg-gray-100 p-4 rounded my-6 overflow-x-auto">
                    <code className="text-sm font-mono">{value.code}</code>
                </pre>
            ),
            callout: ({ value }) => {
                const bgColors = {
                    info: 'bg-blue-50 border-blue-200',
                    warning: 'bg-yellow-50 border-yellow-200',
                    success: 'bg-green-50 border-green-200'
                };

                return (
                    <div className={`p-4 border-l-4 my-6 ${bgColors[value.type] || bgColors.info}`}>
                        <p className="text-sm font-light">{value.text}</p>
                    </div>
                );
            }
        },
        block: {
            h1: ({ children }) => (
                <h1 className="text-3xl font-light mb-4 mt-8 text-gray-900">{children}</h1>
            ),
            h2: ({ children }) => (
                <h2 className="text-2xl font-light mb-3 mt-6 text-gray-900">{children}</h2>
            ),
            h3: ({ children }) => (
                <h3 className="text-xl font-light mb-2 mt-4 text-gray-900">{children}</h3>
            ),
            h4: ({ children }) => (
                <h4 className="text-lg font-medium mb-2 mt-4 text-gray-900">{children}</h4>
            ),
            normal: ({ children }) => (
                <p className="mb-4 font-light leading-relaxed text-gray-700">{children}</p>
            ),
            blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 my-6 italic text-gray-600">
                    {children}
                </blockquote>
            ),
        },
        list: {
            bullet: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 font-light">
                    {children}
                </ul>
            ),
            number: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 font-light">
                    {children}
                </ol>
            ),
        },
        listItem: {
            bullet: ({ children }) => <li className="ml-4">{children}</li>,
            number: ({ children }) => <li className="ml-4">{children}</li>,
        },
        marks: {
            strong: ({ children }) => <strong className="font-medium">{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            code: ({ children }) => (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                    {children}
                </code>
            ),
            link: ({ value, children }) => (
                <a
                    href={value.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black underline underline-offset-2 hover:opacity-70"
                >
                    {children}
                </a>
            ),
        },
    };

    return <PortableText value={content} components={components} />;
};

export default PortableTextRenderer;
