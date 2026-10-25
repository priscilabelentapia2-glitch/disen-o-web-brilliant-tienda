'use client'

import {useState} from 'react'
import {Menu, MessageCircle, X} from 'lucide-react'

export function StoreHeader({orderLink}: {orderLink: string}) {
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
          <a className="nav-contact" href={orderLink} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            <MessageCircle aria-hidden="true" /> Hacer un pedido
          </a>
        </nav>
      </header>
    </>
  )
}
