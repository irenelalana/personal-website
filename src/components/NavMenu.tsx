"use client"
import Link from 'next/link';
import '../app/style.css';
import React, { useState } from 'react';

const NavMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className={`nav-menu ${open ? 'open' : ''}`}>
        <Link href="./programs" onClick={() => setOpen(false)}>Programs</Link>
        <Link href="./about" onClick={() => setOpen(false)}>About Me</Link>
        <Link href="./whatson" onClick={() => setOpen(false)}>What's on</Link>
        <Link href="./faq" onClick={() => setOpen(false)}>FAQ</Link>
        <Link href="./partners" onClick={() => setOpen(false)}>Venues & partners</Link>
      </nav>

      {/* <button className="burger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <div className={`line ${open ? 'open' : ''}`}></div>
        <div className={`line ${open ? 'open' : ''}`}></div>
        <div className={`line ${open ? 'open' : ''}`}></div>
      </button> */}

      {/* <style jsx>{`
        nav.nav-menu {
          flex-grow: 1;
          display: flex;
          justify-content: space-around;
          font-size: 0.7rem;
          padding: 0;
          background-color: #02678F;
        }
        nav.nav-menu a {
          color: #e8e1d0;
          text-decoration: none;
          display: block;
          padding: 10px;
        }
        nav.nav-menu a:hover {
          background-color: #02678F;
        } */}

        {/* Burger button */}
        {/* .burger {
          display: none;
          position: absolute;
          top: 15px;
          right: 15px;
          flex-direction: column;
          justify-content: space-around;
          width: 30px;
          height: 25px;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 5;
        } */}

        {/* .line {
          width: 30px;
          height: 3px;
          background-color: #e8e1d0;
          border-radius: 2px;
          transition: all 0.3s ease;
        } */}

        {/* Animate burger lines when open */ }
        {/* .line.open:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .line.open:nth-child(2) {
          opacity: 0;
        }
        .line.open:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        } */}

        {/* Responsive styles */}
        {/* @media (max-width: 450px) {
          nav.nav-menu {
            position: fixed;
            top: 0;
            right: 0;
            height: 100vh;
            width: 70%;
            background-color: #02678F;
            flex-direction: column;
            align-items: center;
            padding-top: 60px;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            font-size: 1.7rem;
            z-index: 4;
          }
          nav.nav-menu.open {
            transform: translateX(0);
          }

          nav.nav-menu a {
            padding: 20px 0;
            font-weight: bold;
          }

          .burger {
            display: flex;
          }
        }
      `}</style> */}
    </>
  );
};

export default NavMenu;