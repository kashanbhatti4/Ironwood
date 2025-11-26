import { shopifyFetch } from '@/lib/shopify';

/**
 * Get all collections from Shopify
 */
export async function getAllCollections() {
  const query = `
    {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            image {
              url
              altText
            }
            products(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query);
    return data.collections.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      image: node.image,
      productsCount: node.products.edges.length,
    }));
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export async function getAllProducts() {
  const query = `
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            collections(first: 5) {
              edges {
                node {
                  title
                  handle
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query);
    return data.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      description: node.description,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      category: node.collections.edges[0]?.node.title || 'Uncategorized',
      collections: node.collections.edges.map(({ node: collection }) => collection.handle),
      images: node.images.edges.map(({ node: image }) => image.url),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Get products by collection handle
 */
export async function getProductsByCollection(collectionHandle) {
  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              description
              collections(first: 5) {
                edges {
                  node {
                    handle
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { handle: collectionHandle });
    if (!data.collection) return [];

    return data.collection.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      description: node.description,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      category: node.collections.edges[0]?.node.handle || 'uncategorized',
      collections: node.collections.edges.map(({ node: collection }) => collection.handle),
      images: node.images.edges.map(({ node: image }) => image.url),
    }));
  } catch (error) {
    console.error('Error fetching products by collection:', error);
    return [];
  }
}
