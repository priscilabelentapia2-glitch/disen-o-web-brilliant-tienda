import {defineQuery} from 'next-sanity'

export const CATALOG_QUERY = defineQuery(/* groq */ `{
  "categories": *[_type == "category" && active == true]
    | order(order asc, name asc, _id asc) {
      _id,
      name,
      "slug": slug.current,
      "order": coalesce(order, 0),
      active
    },
  "products": *[_type == "product"]
    | order(order asc, name asc, _id asc) {
      _id,
      name,
      "slug": slug.current,
      price,
      description,
      category->{
        _id,
        name,
        "slug": slug.current,
        "order": coalesce(order, 0),
        "active": coalesce(active, true)
      },
      image{
        _type,
        asset->{
          _id,
          url,
          metadata{
            lqip,
            dimensions{
              width,
              height,
              aspectRatio
            }
          }
        },
        crop,
        hotspot
      },
      alt,
      "available": coalesce(available, true),
      tag,
      "order": coalesce(order, 0)
    }
}`)
