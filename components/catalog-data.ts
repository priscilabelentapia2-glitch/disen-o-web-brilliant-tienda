export const categories = ['Todo', 'Tops', 'Pantalones', 'Faldas', 'Vestidos', 'Vestidos de gala', 'Vestidos cortos', 'Zapatos', 'Botas', 'Blazers', 'Novedades'] as const

export type Category = (typeof categories)[number]
export type Product = {
  name: string
  category: Exclude<Category, 'Todo'>
  image: string
  alt: string
  video?: string
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
  { name: 'Blazer amarillo', category: 'Blazers', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03DCCB9C-F1B8-48CE-A233-DC65A7915011-G6SvgAlB2MeClFrGXEn1CrxOpjjRTd.jpeg', alt: 'Blazer amarillo claro combinado con top negro y falda de mezclilla' },
  { name: 'Blazer celeste', category: 'Blazers', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/E03D7FC4-2A0E-468C-973F-0A08DD8EEED2-I3YIABDgJC1uZ192I6I8swkWTxrKb4.jpeg', alt: 'Blazer celeste corto combinado con top negro y falda de mezclilla' },
  { name: 'Blazer camel corto', category: 'Blazers', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/F06532D6-9926-414C-99B6-AD446EB50BC0-l8R6HxndPrZTyrWENmWtdD9MNYIVFJ.jpeg', alt: 'Blazer corto color camel con top negro y falda de mezclilla' },
  { name: 'Blazer negro', category: 'Blazers', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8170-NWIYyk2lFwzXls1gNVqBYeUmAoCOct.jpeg', alt: 'Blazer negro largo con falda de mezclilla' },
  { name: 'Blazer amarillo — video', category: 'Blazers', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03DCCB9C-F1B8-48CE-A233-DC65A7915011-G6SvgAlB2MeClFrGXEn1CrxOpjjRTd.jpeg', alt: 'Video de blazer amarillo en modelo', video: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/59454563-C254-40D0-B9A6-0855CC488299-GKMUyM6kykLpIQay4SIlNax7wXEylm.mov', tag: 'Video' },
  { name: 'Blazer negro — video', category: 'Blazers', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8170-NWIYyk2lFwzXls1gNVqBYeUmAoCOct.jpeg', alt: 'Video de blazer negro en modelo', video: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7720DB82-B7B0-48C0-8C98-83B7046C9E77-8TZKabo1ZrjhcytvJ2WaJGurlbASUd.mov', tag: 'Video' },
  { name: 'Botas negras — colección', category: 'Botas', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8183-QWXPrjyclyJej10EttZ0lM6BEnFyeF.jpeg', alt: 'Selección de botas negras de tacón, plataforma y caña alta' },
  { name: 'Botín negro con plataforma', category: 'Botas', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8181-zWnTfP86VeMX23SntXZx6gPU3qCOfL.jpeg', alt: 'Botín negro de tacón alto y plataforma', tag: 'Nuevo' },
  { name: 'Bota alta plataforma', category: 'Botas', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8180-Hdo1qo0LwWScKhUYgoJGxwyKSABRWb.jpeg', alt: 'Bota negra alta con caña elástica y plataforma' },
  { name: 'Bota alta fruncida', category: 'Botas', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8179-8sdTeFD62rQxwSbBcAcDo1Y1SYhDjq.jpeg', alt: 'Bota negra alta de tacón grueso y caña fruncida' },
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
