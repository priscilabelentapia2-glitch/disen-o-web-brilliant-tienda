export const categories = [
  'Todo',
  'Tops',
  'Bodys',
  'Vestidos de gala',
  'Vestidos cortos',
  'Botas',
  'Blazers',
  'Novedades',
] as const

export type Category = (typeof categories)[number]
export type CatalogCategoryName = Exclude<Category, 'Todo'>

export const categoryOrder: Record<CatalogCategoryName, number> = {
  Tops: 0,
  Bodys: 1,
  'Vestidos de gala': 5,
  'Vestidos cortos': 6,
  Botas: 8,
  Blazers: 9,
  Novedades: 10,
}

export type Product = {
  name: string
  category: CatalogCategoryName
  image: string
  alt: string
  tag?: string
  order: number
}

// Snapshot de respaldo sincronizado con el catálogo publicado en Sanity.
// No agregar aquí productos descartados: Sanity es la fuente de verdad.
export const products: Product[] = [
  {
    name: 'Top lunares negro hombros descubiertos',
    category: 'Tops',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/245fec830206276ae76655e672b8017082d33f41-1086x1448.png',
    alt: 'Top negro con lunares blancos y hombros descubiertos',
    tag: 'Nuevo',
    order: 1,
  },
  {
    name: 'Top lunares blanco hombros descubiertos',
    category: 'Tops',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/108b0ac4ea0d5bd695ba9780923ba8e9f4aac37d-1086x1448.png',
    alt: 'Top blanco con lunares negros y hombros descubiertos',
    tag: 'Nuevo',
    order: 2,
  },
  {
    name: 'Top lunares negro halter',
    category: 'Tops',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/45bfd0af4307806f64d9cfa9aaa1cd397e659ebc-1086x1448.png',
    alt: 'Top halter negro con lunares blancos y escote en V',
    tag: 'Nuevo',
    order: 3,
  },
  {
    name: 'Body strass con pantalón de tela',
    category: 'Bodys',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/dc8455d14ddb68192ee285daa197a9901a1db764-1086x1448.png',
    alt: 'Body negro de transparencia con strass y cuello alto, combinado con pantalón negro de tela',
    tag: 'Nuevo',
    order: 4,
  },
  {
    name: 'Body strass con pantalón de cuero',
    category: 'Bodys',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/b11991b8c5116acc844f785c213c364c9ccc92f9-1086x1448.png',
    alt: 'Body negro de transparencia con strass y cuello alto, combinado con pantalón ancho de cuero',
    tag: 'Nuevo',
    order: 5,
  },
  {
    name: 'Top lunares blanco halter',
    category: 'Tops',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/dbdfbd9b2755200fa2c1cae07a814ec16d614e6e-1086x1448.png',
    alt: 'Top halter blanco con lunares negros y amarre al cuello',
    tag: 'Nuevo',
    order: 6,
  },
  {
    name: 'Vestido de gala fucsia',
    category: 'Vestidos de gala',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/c65341911602062374aac5416ee0e8941073fff4-1086x1448.png',
    alt: 'Vestido largo strapless fucsia para gala',
    order: 10,
  },
  {
    name: 'Vestido de gala celeste',
    category: 'Vestidos de gala',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/0d94cba4ae7e3ec265a746e162056d24b99fec28-1086x1448.png',
    alt: 'Vestido largo celeste strapless de gala',
    order: 11,
  },
  {
    name: 'Vestido de gala negro clásico',
    category: 'Vestidos de gala',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/e93140282d176aee6e7b0dd6e58be6be3de3f283-1086x1448.png',
    alt: 'Vestido largo negro strapless con falda amplia',
    order: 12,
  },
  {
    name: 'Vestido de gala amarillo',
    category: 'Vestidos de gala',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/c6ee0a5bce667f4e8b7d57294bd393ae5e532921-1086x1448.png',
    alt: 'Vestido largo amarillo claro strapless de gala',
    order: 13,
  },
  {
    name: 'Vestido corto strass',
    category: 'Vestidos cortos',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/9c7708d53676e997786cf158f6a42d0474460bf8-1086x1448.png',
    alt: 'Vestido corto negro halter con brillos de strass y cuello drapeado',
    tag: 'Nuevo',
    order: 15,
  },
  {
    name: 'Blazer celeste',
    category: 'Blazers',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/b531412ed0000c8e0c883f3a6c3c36aecd700a5e-1086x1448.png',
    alt: 'Blazer celeste corto combinado con top negro y falda de mezclilla',
    order: 17,
  },
  {
    name: 'Blazer camel corto',
    category: 'Blazers',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/22008f1b7638c6a13cc43a387e34c6a7e5b8762e-1086x1448.png',
    alt: 'Blazer corto color camel con top negro y falda de mezclilla',
    order: 18,
  },
  {
    name: 'Blazer amarillo',
    category: 'Blazers',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/b19c4b1fd71ff99f3d5ab7872fd11120dde92395-1086x1448.png',
    alt: 'Video de blazer amarillo en modelo',
    tag: 'Video',
    order: 19,
  },
  {
    name: 'Blazer negro',
    category: 'Blazers',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/43d85367ee135723894d3a83298e27d7e44dbf5d-851x1848.png',
    alt: 'Video de blazer negro en modelo',
    tag: 'Video',
    order: 20,
  },
  {
    name: 'Botas negras — colección',
    category: 'Botas',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/93a03032d1b5a4c77e71b871b698501cf3e1b2d2-1086x1448.png',
    alt: 'Selección de botas negras de tacón, plataforma y caña alta',
    order: 21,
  },
  {
    name: 'Botín negro con plataforma',
    category: 'Botas',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/a97f4d3d4ea0a56cfb7c3a34ebfd7f37341c3e2f-1086x1448.png',
    alt: 'Botín negro de tacón alto y plataforma',
    tag: 'Nuevo',
    order: 22,
  },
  {
    name: 'Bota alta plataforma',
    category: 'Botas',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/9b922e0d7c639c8db528c7cf8ed3e9fdcb537bd3-1086x1448.png',
    alt: 'Bota negra alta con caña elástica y plataforma',
    order: 23,
  },
  {
    name: 'Bota alta fruncida',
    category: 'Botas',
    image: 'https://cdn.sanity.io/images/f80yafwm/production/59bd28066af26329a14139d027e90c6643021ffb-1086x1448.png',
    alt: 'Bota negra alta de tacón grueso y caña fruncida',
    order: 24,
  },
]

export const heroImage = '/images/recurso-2.png'
export const storyImage = '/images/Recurso-1.png'
export const heroImageAlt = 'Modelo con conjunto negro de top halter con cinturón y pantalón ancho en la entrada de la tienda'
export const storyImageAlt = 'Look femenino en tonos neutros de la colección Brilliant'

// Sustituye el número por el WhatsApp de la tienda con código de país, sin + ni espacios.
export const whatsappPhone = '56963550639'

export function whatsappLink(message: string) {
  const phone = whatsappPhone.replace(/\D/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
