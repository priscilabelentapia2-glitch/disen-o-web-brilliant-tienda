'use client'

import {useMemo, useState} from 'react'
import Image from 'next/image'
import {ArrowRight, MessageCircle} from 'lucide-react'
import type {SanityImageSource} from '@sanity/image-url'

import {whatsappLink} from './catalog-data'
import {urlFor} from '@/sanity/lib/image'
import type {CatalogCategory, CatalogProduct} from '@/sanity/types/catalog'

const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

function ProductCard({product, index}: {product: CatalogProduct; index: number}) {
  const message = `Hola, Brilliant Tienda. Quisiera consultar el precio de ${product.name}.`
  const formattedPrice =
    typeof product.price === 'number' &&
    Number.isFinite(product.price) &&
    Number.isInteger(product.price) &&
    product.price >= 0
      ? priceFormatter.format(product.price)
      : null
  const legacyImage = typeof product.image === 'string' ? product.image : null
  const sanityImage = typeof product.image === 'string' ? null : product.image
  const imageUrl = legacyImage
    ? legacyImage
    : urlFor(sanityImage as SanityImageSource)
        .width(900)
        .height(1200)
        .fit('crop')
        .auto('format')
        .quality(85)
        .url()
  const lqip = sanityImage?.asset.metadata?.lqip
  const imageContent = (
    <>
      <Image
        src={imageUrl}
        alt={product.alt || product.name}
        fill
        sizes="(max-width: 560px) 46vw, (max-width: 900px) 30vw, 23vw"
        placeholder={lqip ? 'blur' : 'empty'}
        blurDataURL={lqip}
        style={{objectPosition: product.imagePosition ?? 'center'}}
      />
      {product.tag && <span className="product-tag">{product.tag}</span>}
      {!product.available && <span className="product-availability">Agotado</span>}
      <span className="product-number">{String(index + 1).padStart(2, '0')}</span>
    </>
  )

  return (
    <article className={`product-card${product.available ? '' : ' is-unavailable'}`}>
      {product.available ? (
        <a className="product-image" href={product.video ?? whatsappLink(message)} target="_blank" rel="noreferrer" aria-label={product.video ? `Ver video de ${product.name}` : `Consultar ${product.name} por WhatsApp`}>
          {imageContent}
        </a>
      ) : (
        <div className="product-image" aria-label={`${product.name}, agotado`}>
          {imageContent}
        </div>
      )}
      <div className="product-details">
        <div className="product-copy">
          <p className="product-category">{product.category.name}</p>
          <h3>{product.name}</h3>
          {formattedPrice && <p className="product-price">{formattedPrice}</p>}
        </div>
        {product.available && (
          <a className="product-link" href={whatsappLink(message)} target="_blank" rel="noreferrer" aria-label={`Consultar precio de ${product.name} por WhatsApp`}><ArrowRight aria-hidden="true" /></a>
        )}
      </div>
      {product.description && <p className="product-description">{product.description}</p>}
      {product.available ? (
        <a className="product-whatsapp" href={whatsappLink(message)} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Consultar precio por WhatsApp</a>
      ) : (
        <p className="product-unavailable"><MessageCircle aria-hidden="true" /> No disponible</p>
      )}
    </article>
  )
}

export function Catalog({products, categories}: {products: CatalogProduct[]; categories: CatalogCategory[]}) {
  const [activeCategory, setActiveCategory] = useState('Todo')
  const filteredProducts = useMemo(
    () => activeCategory === 'Todo' ? products : products.filter((product) => product.category._id === activeCategory),
    [activeCategory, products],
  )

  return (
    <section className="catalog section-wrap" id="catalogo" aria-labelledby="catalog-title">
      <div className="section-heading">
        <div><p className="eyebrow">UN CLOSET CON INTENCIÓN</p><h2 id="catalog-title">La colección</h2></div>
        <p className="section-aside">Prendas que combinan con tu manera<br className="desktop-break" /> de vivir y de expresarte.</p>
      </div>
      <div className="category-list" role="group" aria-label="Filtrar productos por categoría">
        <button type="button" className={`category-button${activeCategory === 'Todo' ? ' active' : ''}`} aria-pressed={activeCategory === 'Todo'} onClick={() => setActiveCategory('Todo')}>Todo</button>
        {categories.map((category) => <button key={category._id} type="button" className={`category-button${activeCategory === category._id ? ' active' : ''}`} aria-pressed={activeCategory === category._id} onClick={() => setActiveCategory(category._id)}>{category.name}</button>)}
      </div>
      <div className="product-grid" aria-live="polite">
        {filteredProducts.map((product, index) => <ProductCard key={product._id} product={product} index={index} />)}
      </div>
      <p className="catalog-footnote">¿Viste algo que te gustó? Escríbenos y te ayudamos a elegir.</p>
    </section>
  )
}
