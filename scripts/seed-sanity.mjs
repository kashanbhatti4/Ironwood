import { createClient } from '@sanity/client'

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8lc4elv3',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
})

const run = async () => {
    if (!process.env.SANITY_WRITE_TOKEN) {
        console.error('Error: SANITY_WRITE_TOKEN is not set.')
        process.exit(1)
    }

    console.log('Starting seed...')

    // 1. Upload a placeholder image
    // 1x1 pixel transparent gif
    const base64 = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    const buffer = Buffer.from(base64, 'base64')
    const imageAsset = await client.assets.upload('image', buffer, {
        filename: 'placeholder.gif'
    })
    console.log('Uploaded image asset:', imageAsset._id)

    // 2. Create Tags
    const tags = [
        { _type: 'tag', title: 'Leather', slug: { current: 'leather' } },
        { _type: 'tag', title: 'Craftsmanship', slug: { current: 'craftsmanship' } },
        { _type: 'tag', title: 'Design', slug: { current: 'design' } },
    ]

    const createdTags = []
    for (const tag of tags) {
        const res = await client.createOrReplace({
            _id: `tag-${tag.slug.current}`,
            ...tag
        })
        createdTags.push(res)
        console.log('Created tag:', res.title)
    }

    // 3. Create Categories
    const categories = [
        { _type: 'category', title: 'Journal', slug: { current: 'journal' }, order: 1 },
        { _type: 'category', title: 'Process', slug: { current: 'process' }, order: 2 },
        { _type: 'category', title: 'News', slug: { current: 'news' }, order: 3 },
    ]

    const createdCategories = []
    for (const cat of categories) {
        const res = await client.createOrReplace({
            _id: `category-${cat.slug.current}`,
            ...cat
        })
        createdCategories.push(res)
        console.log('Created category:', res.title)
    }

    // 4. Create Authors
    const authors = [
        {
            _type: 'author',
            name: 'Elena Rossi',
            slug: { current: 'elena-rossi' },
            avatar: { _type: 'image', asset: { _ref: imageAsset._id } },
            bio: [
                {
                    _type: 'block',
                    style: 'normal',
                    children: [{ _type: 'span', text: 'Master leather artisan with 15 years of experience.' }]
                }
            ]
        },
        {
            _type: 'author',
            name: 'Marcus Chen',
            slug: { current: 'marcus-chen' },
            avatar: { _type: 'image', asset: { _ref: imageAsset._id } },
            bio: [
                {
                    _type: 'block',
                    style: 'normal',
                    children: [{ _type: 'span', text: 'Design director and sustainability advocate.' }]
                }
            ]
        }
    ]

    const createdAuthors = []
    for (const author of authors) {
        const res = await client.createOrReplace({
            _id: `author-${author.slug.current}`,
            ...author
        })
        createdAuthors.push(res)
        console.log('Created author:', res.name)
    }

    // 5. Create Blog Posts
    const posts = [
        {
            _type: 'blog',
            title: 'The Art of Vegetable Tanning',
            slug: { current: 'art-of-vegetable-tanning' },
            excerpt: 'Exploring the traditional methods of tanning leather using natural tannins from tree bark and leaves.',
            coverImage: { _type: 'image', asset: { _ref: imageAsset._id } },
            publishedAt: new Date().toISOString(),
            readingTime: 5,
            featured: true,
            author: { _type: 'reference', _ref: createdAuthors[0]._id },
            categories: [{ _type: 'reference', _ref: createdCategories[1]._id }], // Process
            tags: [{ _type: 'reference', _ref: createdTags[0]._id }], // Leather
            richContent: [
                {
                    _type: 'block',
                    style: 'normal',
                    children: [{ _type: 'span', text: 'Vegetable tanning is an ancient tradition...' }]
                },
                {
                    _type: 'callout',
                    type: 'info',
                    text: 'Did you know? Veg-tan leather develops a unique patina over time.'
                }
            ]
        },
        {
            _type: 'blog',
            title: 'Designing for Longevity',
            slug: { current: 'designing-for-longevity' },
            excerpt: 'How we approach design to ensure our products last a lifetime, both in style and durability.',
            coverImage: { _type: 'image', asset: { _ref: imageAsset._id } },
            publishedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            readingTime: 4,
            featured: false,
            author: { _type: 'reference', _ref: createdAuthors[1]._id },
            categories: [{ _type: 'reference', _ref: createdCategories[2]._id }], // Design (mapped to News for now or create Design cat? used News)
            tags: [{ _type: 'reference', _ref: createdTags[2]._id }], // Design
            richContent: [
                {
                    _type: 'block',
                    style: 'normal',
                    children: [{ _type: 'span', text: 'Good design is timeless...' }]
                }
            ]
        },
        {
            _type: 'blog',
            title: 'Spring Collection Preview',
            slug: { current: 'spring-collection-preview' },
            excerpt: 'A first look at our upcoming collection featuring lighter tones and new silhouettes.',
            coverImage: { _type: 'image', asset: { _ref: imageAsset._id } },
            publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            readingTime: 3,
            featured: false,
            author: { _type: 'reference', _ref: createdAuthors[0]._id },
            categories: [{ _type: 'reference', _ref: createdCategories[2]._id }], // News
            tags: [{ _type: 'reference', _ref: createdTags[0]._id }],
            richContent: [
                {
                    _type: 'block',
                    style: 'normal',
                    children: [{ _type: 'span', text: 'We are excited to reveal...' }]
                }
            ]
        }
    ]

    for (const post of posts) {
        const res = await client.createOrReplace({
            _id: `blog-${post.slug.current}`,
            ...post
        })
        console.log('Created post:', res.title)
    }

    console.log('Seed completed successfully!')
}

run().catch(err => {
    console.error('Seed failed:', err)
    process.exit(1)
})
