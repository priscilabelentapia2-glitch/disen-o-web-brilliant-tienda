import { StorePage } from '@/components/storefront'
import {getCatalog} from '@/sanity/lib/catalog'
import {getLegacyCatalogFallback} from '@/sanity/lib/catalog-fallback'

export const revalidate = 60

export default async function Page() {
  let catalog

  try {
    catalog = await getCatalog()
  } catch (error) {
    console.error('[catalog] No se pudo consultar Sanity. Se utilizará el fallback temporal.', error)
    catalog = getLegacyCatalogFallback()
  }

  return <StorePage catalog={catalog} />
}

