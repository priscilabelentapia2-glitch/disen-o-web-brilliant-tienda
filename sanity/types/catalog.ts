export type CatalogCategory = {
  _id: string
  name: string
  slug: string | null
  order: number
  active: boolean
}

export type CatalogImage = {
  _type?: 'image'
  asset: {
    _id: string
    url: string
    metadata?: {
      lqip?: string
      dimensions?: {
        width: number
        height: number
        aspectRatio?: number
      }
    }
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  hotspot?: {
    x: number
    y: number
    width: number
    height: number
  }
}

export type CatalogProduct = {
  _id: string
  name: string
  slug: string | null
  price: number | null
  description: string | null
  category: CatalogCategory
  image: CatalogImage | string
  alt: string | null
  available: boolean
  tag: string | null
  order: number
  video?: string
  imagePosition?: string
}

export type CatalogData = {
  products: CatalogProduct[]
  categories: CatalogCategory[]
}
