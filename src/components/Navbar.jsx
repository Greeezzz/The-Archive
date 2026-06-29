import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__logo">
        <span className="navbar__logo-bracket">[</span>
        THE ARCHIVE
        <span className="navbar__logo-bracket">]</span>
      </Link>

      {/* Desktop Links */}
      <div className="navbar__links">
        <Link to="/"        className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}>
          <span className="navbar__link-text">Home</span>
          <span className="navbar__link-line" />
        </Link>
        <Link to="/archive" className={`navbar__link ${location.pathname === '/archive' ? 'navbar__link--active' : ''}`}>
          <span className="navbar__link-text">Archive</span>
          <span className="navbar__link-line" />
        </Link>
        <Link to="/about"   className={`navbar__link ${location.pathname === '/about' ? 'navbar__link--active' : ''}`}>
          <span className="navbar__link-text">About</span>
          <span className="navbar__link-line" />
        </Link>
        <Link to="/projects" className={`navbar__link ${location.pathname === '/projects' ? 'navbar__link--active' : ''}`}>
          <span className="navbar__link-text">Projects</span>
          <span className="navbar__link-line" />
        </Link>
      </div>

      {/* Mobile menu toggle */}
      <button
        className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className="navbar__toggle-line" />
        <span className="navbar__toggle-line" />
        <span className="navbar__toggle-line" />
      </button>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--open' : ''}`}>
        <div className="navbar__mobile-inner">
          <Link to="/"        className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/archive" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>Archive</Link>
          <Link to="/about"   className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/projects" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>Projects</Link>
        </div>
      </div>
    </nav>
  );
}