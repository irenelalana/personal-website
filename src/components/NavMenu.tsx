"use client";
import Link from "next/link";
import "../app/style.css";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // íconos burger y close

const NavMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="burger-button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? <X size={30} color="#e8e1d0" /> : <Menu size={30} color="#e8e1d0" />}
      </button>

      <nav className={`nav-menu ${open ? "open" : ""}`}>
        <Link href="./programs" onClick={() => setOpen(false)}>
          Programs
        </Link>
        <Link href="./about" onClick={() => setOpen(false)}>
          About Me
        </Link>
        <Link href="./whatson" onClick={() => setOpen(false)}>
          What's on
        </Link>
        <Link href="./faq" onClick={() => setOpen(false)}>
          FAQ
        </Link>
        <Link href="./partners" onClick={() => setOpen(false)}>
          Venues & Partners
        </Link>
      </nav>
    </>
  );
};

export default NavMenu;