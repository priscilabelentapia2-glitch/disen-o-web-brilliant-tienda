import 'server-only'

import {client} from './client'
import {CATALOG_QUERY} from '../queries/catalog'
import type {CatalogCategory, CatalogData, CatalogProduct} from '../types/catalog'

type QueriedProduct = Omit<CatalogProduct, 'category'> & {
  category: CatalogCategory | null
}

type CatalogQueryResult = {
  products: QueriedProduct[]
  categories: CatalogCategory[]
}

function hasActiveCategory(product: QueriedProduct): product is CatalogProduct {
  return product.category?.active === true
}

export async function getCatalog(): Promise<CatalogData> {
  const result = await client.withConfig({useCdn: false}).fetch<CatalogQueryResult>(
    CATALOG_QUERY,
    {},
    {
      perspective: 'published',
      next: {revalidate: 60},
    },
  )

  return {
    categories: result.categories,
    products: result.products.filter(hasActiveCategory),
  }
}
