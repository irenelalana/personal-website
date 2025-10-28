import '../app/style.css';
import NavMenu from './NavMenu';
import NavMenu2 from './NavMenu';

import React from 'react';

const Header = () => {
  return (
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
      <NavMenu2 />
    </header>
  );
};

export default Header;