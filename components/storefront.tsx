import Image from 'next/image'
import { ArrowDown, ArrowRight, MapPin, MessageCircle } from 'lucide-react'
import { heroImage, heroImageAlt, storyImage, storyImageAlt, whatsappLink } from './catalog-data'
import {Catalog} from './catalog'
import {StoreHeader} from './store-header'
import type {CatalogData} from '@/sanity/types/catalog'

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
        <a className="location-link" href="https://maps.app.goo.gl/RZYjJy8g189ieu4x8?g_st=ic" target="_blank" rel="noreferrer">Ver ubicación <ArrowRight aria-hidden="true" /></a>
      </section>
      <footer className="site-footer"><a className="wordmark footer-wordmark" href="#inicio"><span>BRILLIANT</span><small>TIENDA</small></a><p>Moda para sentirte tú. <span>© 2026 Brilliant Tienda</span></p><a href={whatsappLink('Hola, Brilliant Tienda.')} target="_blank" rel="noreferrer">Hablemos por WhatsApp <ArrowRight aria-hidden="true" /></a></footer>
    </>
  )
}

export default function Storefront({catalog}: {catalog: CatalogData}) {
  return <><StoreHeader orderLink={whatsappLink('Hola, Brilliant Tienda. Quisiera hacer un pedido.')} /><main><Hero /><div className="collection-strip"><span>ESTILO · ESENCIA · BRILLIANT</span><span>UNA SELECCIÓN PARA TI</span><span>ANTOFAGASTA, CHILE</span></div><Catalog products={catalog.products} categories={catalog.categories} /><StoryAndLocation /></main></>
}

export { whatsappLink }

export function FloatingWhatsApp() {
  return <a className="floating-whatsapp" href={whatsappLink('Hola, Brilliant Tienda. Quiero hacer una consulta.')} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp"><MessageCircle aria-hidden="true" /><span>Hablemos</span></a>
}

export function StorePage({catalog}: {catalog: CatalogData}) {
  return <><Storefront catalog={catalog} /><FloatingWhatsApp /></>
}
