export const categories = ['Todo', 'Tops', 'Pantalones', 'Faldas', 'Vestidos', 'Vestidos de gala', 'Vestidos cortos', 'Zapatos', 'Novedades'] as const

export type Category = (typeof categories)[number]
export type Product = {
  name: string
  category: Exclude<Category, 'Todo'>
  image: string
  alt: string
  tag?: string
  imagePosition?: string
}

// Actualiza este listado para cambiar prendas, nombres, categorías o fotografías.
// Guarda cada foto en public/images y escribe su ruta como /images/nombre-del-archivo.jpg.
export const products: Product[] = [
  { name: 'Top esencial', category: 'Tops', image: '/images/top-editorial.png', alt: 'Top tejido marfil con pantalón negro', tag: 'Favorito' },
  { name: 'Pantalón sastrero', category: 'Pantalones', image: '/images/trousers-editorial.png', alt: 'Pantalón sastrero beige de pierna ancha', tag: 'Nuevo' },
  { name: 'Vestido noche', category: 'Vestidos', image: '/images/dress-editorial.png', alt: 'Vestido midi negro de silueta elegante' },
  { name: 'Vestido de gala', category: 'Vestidos de gala', image: '/images/gala-editorial.png', alt: 'Vestido largo negro de gala', tag: 'Ocasión especial' },
  { name: 'Vestido corto negro', category: 'Vestidos cortos', image: '/images/short-dress-editorial.png', alt: 'Vestido corto negro de líneas modernas', tag: 'Nuevo' },
  { name: 'Zapatos de tacón', category: 'Zapatos', image: '/images/shoes-editorial.png', alt: 'Zapatos negros de punta y tacón fino' },
  { name: 'Falda midi', category: 'Faldas', image: '/images/skirt-editorial.png', alt: 'Falda midi color crema con top negro' },
  { name: 'Top de temporada', category: 'Novedades', image: '/images/top-editorial.png', alt: 'Look de temporada en tonos neutros', tag: 'Recién llegado', imagePosition: 'center 35%' },
  { name: 'Pantalón wide leg', category: 'Pantalones', image: '/images/trousers-editorial.png', alt: 'Look con pantalón beige de corte amplio', imagePosition: 'center 65%' },
  { name: 'Vestido clásico', category: 'Vestidos', image: '/images/dress-editorial.png', alt: 'Vestido negro clásico para ocasiones especiales', imagePosition: 'center 38%' },
  { name: 'Falda de invierno', category: 'Novedades', image: '/images/skirt-editorial.png', alt: 'Conjunto femenino en tonos crema y negro', tag: 'Nuevo' },
]

export const heroImage = '/images/hero-editorial.png'
export const storyImage = '/images/skirt-editorial.png'
export const heroImageAlt = 'Modelo con blazer negro y pantalón beige en un estudio cálido'
export const storyImageAlt = 'Look femenino en tonos neutros de la colección Brilliant'

// Sustituye el número por el WhatsApp de la tienda con código de país, sin + ni espacios.
export const whatsappPhone = '56963550639'

export function whatsappLink(message: string) {
  const phone = whatsappPhone.replace(/\D/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
