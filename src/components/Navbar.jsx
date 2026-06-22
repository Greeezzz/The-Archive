import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__logo">
        <span className="navbar__logo-bracket">[</span>
        THE ARCHIVE
        <span className="navbar__logo-bracket">]</span>
      </Link>
      <div className="navbar__links">
        <Link to="/"        className={`navbar__link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/archive" className={`navbar__link ${location.pathname === '/archive' ? 'active' : ''}`}>Archive</Link>
        <Link to="/about"   className={`navbar__link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
      </div>
    </nav>
  );
}
