'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowRight, MapPin, Menu, MessageCircle, X } from 'lucide-react'
import { categories, heroImage, heroImageAlt, products, storyImage, storyImageAlt, whatsappLink, type Category, type Product } from './catalog-data'

function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="announcement">ENVÍOS Y PEDIDOS · ANTOFAGASTA, CHILE</div>
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Brilliant Tienda, inicio">
          <span>BRILLIANT</span><small>TIENDA</small>
        </a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegación principal">
          <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
          <a href="#catalogo" onClick={() => setMenuOpen(false)}>Colección</a>
          <a href="#nosotras" onClick={() => setMenuOpen(false)}>Nuestra tienda</a>
          <a className="nav-contact" href={whatsappLink('Hola, Brilliant Tienda. Quisiera hacer un pedido.')} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            <MessageCircle aria-hidden="true" /> Hacer un pedido
          </a>
        </nav>
      </header>
    </>
  )
}

function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">ESTILO QUE SE SIENTE COMO TÚ</p>
        <h1 id="hero-title">Descubre tu<br /><em>próximo look.</em></h1>
        <p className="hero-description">Piezas especiales para todos tus días. Encuentra esa prenda que convierte lo cotidiano en algo extraordinario.</p>
        <a className="button-dark" href="#catalogo">Explorar colección <ArrowRight aria-hidden="true" /></a>
        <div className="hero-note"><span className="note-line" /> Una selección hecha para ti</div>
      </div>
      <div className="hero-photo-wrap">
        <Image className="hero-photo" src={heroImage} alt={heroImageAlt} fill priority sizes="(max-width: 720px) 100vw, 54vw" />
        <div className="hero-photo-caption"><span>COLECCIÓN</span><strong>Entre tonos</strong><span>ANTOFAGASTA · 2026</span></div>
        <span className="hero-index">01 — 04</span>
      </div>
      <a className="scroll-cue" href="#catalogo" aria-label="Desplazarse al catálogo"><ArrowDown aria-hidden="true" /></a>
    </section>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const message = `Hola, Brilliant Tienda. Quisiera consultar el precio de ${product.name}.`
  return (
    <article className="product-card">
      <a className="product-image" href={whatsappLink(message)} target="_blank" rel="noreferrer" aria-label={`Consultar ${product.name} por WhatsApp`}>
        <Image src={product.image} alt={product.alt} fill sizes="(max-width: 560px) 46vw, (max-width: 900px) 30vw, 23vw" style={{ objectPosition: product.imagePosition ?? 'center' }} />
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <span className="product-number">0{index + 1}</span>
      </a>
      <div className="product-details">
        <div><p className="product-category">{product.category}</p><h3>{product.name}</h3></div>
        <a className="product-link" href={whatsappLink(message)} target="_blank" rel="noreferrer" aria-label={`Consultar precio de ${product.name} por WhatsApp`}><ArrowRight aria-hidden="true" /></a>
      </div>
      <a className="product-whatsapp" href={whatsappLink(message)} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Consultar precio por WhatsApp</a>
    </article>
  )
}

function Catalog() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todo')
  const filteredProducts = useMemo(
    () => activeCategory === 'Todo' ? products : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  )

  return (
    <section className="catalog section-wrap" id="catalogo" aria-labelledby="catalog-title">
      <div className="section-heading">
        <div><p className="eyebrow">UN CLOSET CON INTENCIÓN</p><h2 id="catalog-title">La colección</h2></div>
        <p className="section-aside">Prendas que combinan con tu manera<br className="desktop-break" /> de vivir y de expresarte.</p>
      </div>
      <div className="category-list" role="group" aria-label="Filtrar productos por categoría">
        {categories.map((category) => <button key={category} type="button" className={`category-button${activeCategory === category ? ' active' : ''}`} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
      </div>
      <div className="product-grid" aria-live="polite">
        {filteredProducts.map((product, index) => <ProductCard key={`${product.name}-${product.category}`} product={product} index={index} />)}
      </div>
      <p className="catalog-footnote">¿Viste algo que te gustó? Escríbenos y te ayudamos a elegir.</p>
    </section>
  )
}

function StoryAndLocation() {
  return (
    <>
      <section className="story" id="nosotras">
        <div className="story-image"><Image src={storyImage} alt={storyImageAlt} fill sizes="(max-width: 720px) 100vw, 45vw" /></div>
        <div className="story-copy"><p className="eyebrow">BRILLIANT TIENDA · ANTOFAGASTA</p><h2>Vestirte bien<br />también es<br /><em>sentirte bien.</em></h2><p>Creemos en la ropa que acompaña tu historia. Descubre prendas versátiles, femeninas y elegidas con cariño para ti.</p><a className="text-link" href={whatsappLink('Hola, Brilliant Tienda. Cuéntame más sobre su colección.')} target="_blank" rel="noreferrer">Conversemos <ArrowRight aria-hidden="true" /></a></div>
      </section>
      <section className="location section-wrap" aria-labelledby="location-title">
        <div className="location-icon"><MapPin aria-hidden="true" /></div>
        <div><p className="eyebrow">CERCA DE TI</p><h2 id="location-title">Desde Antofagasta,<br className="mobile-break" /> con mucho estilo.</h2><p>Visítanos en Uribe #305, local 4, esquina Washington, a una cuadra del Mallplaza Antofagasta.</p></div>
        <a className="location-link" href="https://www.google.com/maps/search/?api=1&query=Uribe+305+local+4+esquina+Washington+Antofagasta+Chile" target="_blank" rel="noreferrer">Ver ubicación <ArrowRight aria-hidden="true" /></a>
      </section>
      <footer className="site-footer"><a className="wordmark footer-wordmark" href="#inicio"><span>BRILLIANT</span><small>TIENDA</small></a><p>Moda para sentirte tú. <span>© 2026 Brilliant Tienda</span></p><a href={whatsappLink('Hola, Brilliant Tienda.')} target="_blank" rel="noreferrer">Hablemos por WhatsApp <ArrowRight aria-hidden="true" /></a></footer>
    </>
  )
}

export default function Storefront() {
  return <><StoreHeader /><main><Hero /><div className="collection-strip"><span>ESTILO · ESENCIA · BRILLIANT</span><span>UNA SELECCIÓN PARA TI</span><span>ANTOFAGASTA, CHILE</span></div><Catalog /><StoryAndLocation /></main></>
}

export { whatsappLink }

export function FloatingWhatsApp() {
  return <a className="floating-whatsapp" href={whatsappLink('Hola, Brilliant Tienda. Quiero hacer una consulta.')} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp"><MessageCircle aria-hidden="true" /><span>Hablemos</span></a>
}

export function StorePage() {
  return <><Storefront /><FloatingWhatsApp /></>
}
