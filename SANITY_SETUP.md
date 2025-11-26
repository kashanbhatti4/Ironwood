# Sanity CMS Setup Instructions

## Environment Variables

Add the following to your `.env.local` file:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-01
SANITY_WRITE_TOKEN=your_write_token_here
```

## Getting Started with Sanity

### 1. Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io/)
2. Sign up or log in
3. Create a new project
4. Note your Project ID
5. Create a "production" dataset

### 2. Set Up Sanity Studio

The schemas are already created in `/sanity/schemas/`. To run Sanity Studio:

```bash
# Install Sanity CLI globally (if not already installed)
npm install -g @sanity/cli

# Initialize Sanity Studio in your project
# Use the existing schemas in /sanity/schemas/
npx sanity init

# Start Sanity Studio
npx sanity dev
```

### 3. Configure Environment Variables

Update your `.env.local` with:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: From your Sanity project dashboard
- `SANITY_WRITE_TOKEN`: Create an API token in Sanity project settings

### 4. Add Content

1. Open Sanity Studio (usually at `http://localhost:3333`)
2. Create Authors
3. Create Categories
4. Create Tags
5. Create Blog Posts

## Schemas Included

- **Blog**: Main blog post with rich content, images, SEO
- **Author**: Author information with bio and avatar
- **Category**: Blog categories
- **Tag**: Blog tags
- **SEO**: SEO metadata object

## Features

- ✅ Rich text editor with PortableText
- ✅ Image uploads with CDN
- ✅ Categories and tags
- ✅ Author management
- ✅ SEO fields
- ✅ Gallery support
- ✅ Reading time
- ✅ Featured posts
- ✅ Search functionality
- ✅ Existing UI preserved

## Blog Pages

- `/blog` - Blog listing with search
- `/blog/[slug]` - Individual blog post

All pages use Sanity data while maintaining the existing UI design.
