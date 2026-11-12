import { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/archive', label: 'Archive' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const [prevLocationKey, setPrevLocationKey] = useState(location.key);
  if (prevLocationKey !== location.key) {
    setPrevLocationKey(location.key);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-bracket" aria-hidden="true">[</span>
          THE ARCHIVE
          <span className="navbar__logo-bracket" aria-hidden="true">]</span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar__links">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              >
                <span className="navbar__link-bracket">[</span>
                <span className="navbar__link-text">{item.label}</span>
                <span className="navbar__link-bracket">]</span>
                <span className="navbar__link-line" />
              </Link>
            );
          })}
        </div>

        {/* Mobile menu toggle */}
        <button
          className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="navbar__toggle-line" />
          <span className="navbar__toggle-line" />
          <span className="navbar__toggle-line" />
        </button>
      </nav>

      {/* Mobile menu backdrop & drawer */}
      <div
        className={`navbar__mobile-backdrop ${isMenuOpen ? 'navbar__mobile-backdrop--open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      <div className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--open' : ''}`}>
        <div className="navbar__mobile-inner">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{item.label}</span>
                <span className="navbar__mobile-link-glyph">{isActive ? '●' : '→'}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}