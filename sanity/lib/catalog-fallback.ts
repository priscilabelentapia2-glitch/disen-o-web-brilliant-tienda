import 'server-only'

import {
  categoryOrder,
  categories as legacyCategories,
  products as legacyProducts,
} from '@/components/catalog-data'
import type {CatalogCategory, CatalogData} from '../types/catalog'

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Snapshot de contingencia sincronizado con los documentos publicados en Sanity.
export function getLegacyCatalogFallback(): CatalogData {
  const categories: CatalogCategory[] = legacyCategories
    .filter((category) => category !== 'Todo')
    .map((name) => ({
      _id: `fallback-category-${slugify(name)}`,
      name,
      slug: slugify(name),
      order: categoryOrder[name],
      active: true,
    }))

  const categoriesByName = new Map(categories.map((category) => [category.name, category]))

  return {
    categories,
    products: legacyProducts.map((product) => ({
      _id: `fallback-product-${slugify(product.name)}`,
      name: product.name,
      slug: slugify(product.name),
      price: null,
      description: null,
      category: categoriesByName.get(product.category)!,
      image: product.image,
      alt: product.alt,
      available: true,
      tag: product.tag ?? null,
      order: product.order,
    })),
  }
}
