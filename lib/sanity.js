import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8lc4elv3';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllPosts() {
  return client.fetch(
    `*[_type=="blogPost"] | order(publishedAt desc){
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      publishedAt,
      readingTime,
      featured,
      "categories": categories[]->{title, "slug": slug.current},
      "tags": tags[]->{title, "slug": slug.current},
      "author": author->{name, "slug": slug.current, image},
      seo
    }`
  );
}

export async function getPostBySlug(slug) {
  return client.fetch(
    `*[_type=="blogPost" && slug.current==$slug][0]{
      ...,
      "slug": slug.current,
      "categories": categories[]->{title, "slug": slug.current},
      "tags": tags[]->{title, "slug": slug.current},
      "author": author->{name, "slug": slug.current, image, bio},
      content[]{
        ...,
        _type=="image" => { asset->{url} }
      }
    }`,
    { slug }
  );
}

export async function getPostsBySearch(q) {
  return client.fetch(
    `*[_type=="blogPost" && (
      title match $q ||
      excerpt match $q ||
      seo.title match $q
    )]{
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      publishedAt
    }`,
    { q: `*${q}*` }
  );
}

export async function getPostsByCategorySlug(slug) {
  return client.fetch(
    `*[_type=="blogPost" && $slug in categories[]->slug.current] | order(publishedAt desc){
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      publishedAt,
      readingTime,
      featured,
      "categories": categories[]->{title, "slug": slug.current},
      "tags": tags[]->{title, "slug": slug.current},
      "author": author->{name, "slug": slug.current, image},
      seo
    }`,
    { slug }
  );
}

export async function getAllCategories() {
  return client.fetch(
    `*[_type=="category"]{
      title,
      "slug": slug.current,
      description
    }`
  );
}

export async function getAllTags() {
  return client.fetch(
    `*[_type=="tag"]{
      title,
      "slug": slug.current
    }`
  );
}
