import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Number', value: 'number' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Code', value: 'code' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
                {
                    type: 'object',
                    name: 'callout',
                    title: 'Callout',
                    fields: [
                        {
                            name: 'type',
                            type: 'string',
                            title: 'Type',
                            options: {
                                list: [
                                    { title: 'Info', value: 'info' },
                                    { title: 'Warning', value: 'warning' },
                                    { title: 'Success', value: 'success' },
                                ],
                            },
                            initialValue: 'info',
                        },
                        {
                            name: 'text',
                            type: 'text',
                            title: 'Text',
                            rows: 3,
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'tag' }] }],
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'readingTime',
            title: 'Reading Time (minutes)',
            type: 'number',
        }),
        defineField({
            name: 'featured',
            title: 'Featured Post',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                defineField({ name: 'title', title: 'Meta Title', type: 'string' }),
                defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3 }),
                defineField({ name: 'ogImage', title: 'OG Image', type: 'image' }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            publishedAt: 'publishedAt',
            media: 'coverImage',
        },
        prepare({ title, publishedAt, media }) {
            return {
                title,
                subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date',
                media,
            }
        },
    },
})
