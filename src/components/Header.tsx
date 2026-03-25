import '../app/style.css';
import NavMenu from './NavMenu';
import Link from 'next/link'; // Importar Link
import React from 'react';

const Header = () => {
  return (
    <>
      {/* NUEVO: Barra de Anuncios Temporal */}
      <div className="announcement-bar">
        <Link href="/activate-brisbane" className="announcement-link">
          🔥 Launch Special Offer: <strong>Actívate Brisbane!</strong> Grab your tickets now
        </Link>
      </div>

      <header>
        <div className="home-logo">
          <a href="/">
            <img
              src="/images/Isotipo(fondo_oscuro).png"
              alt="Irela13coach logo"
              className="isotipo"
            />
          </a>
          <a href="/">
            <img
              src="/images/IrelaAquaFitnes (fondo oscuro).png"
              alt="Irela13coach logo"
              className="imajotipo"
            />
          </a>
        </div>
        <NavMenu />
      </header>
    </>
  );
};

export default Header;