import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crosshair } from './lines';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'Home', sub: 'Overview' },
  { path: '/archive', label: 'Archive', sub: 'Registry' },
  { path: '/about', label: 'About', sub: 'Personnel' },
  { path: '/projects', label: 'Projects', sub: 'Deploys' },
];

/**
 * Console header (DESIGN.md §4): logo left, tabs separated by dashed vertical
 * rules, active tab keeps ink text and puts the yellow in the subtitle block.
 */
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
      <header className={`console-header ${scrolled ? 'console-header--scrolled' : ''}`}>
        <Link to="/" className="console-header__logo">
          <span className="console-header__logo-bracket" aria-hidden="true">[</span>
          <span className="console-header__logo-text">The Archive</span>
          <span className="console-header__logo-bracket" aria-hidden="true">]</span>
        </Link>

        <nav className="console-tabs" aria-label="Main">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`console-tab ${isActive ? 'console-tab--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {i > 0 && <span className="console-tab__rule" aria-hidden="true" />}
                <span className="console-tab__body">
                  <span className="console-tab__title">{item.label}</span>
                  <span className="console-tab__sub">{item.sub}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="console-header__rail" aria-hidden="true">
          <Crosshair />
          <span className="console-header__glitch">
            <span className="console-header__glitch-a" />
            <span className="console-header__glitch-b" />
            <span className="console-header__glitch-c" />
          </span>
        </div>

        <button
          className={`console-header__toggle ${isMenuOpen ? 'console-header__toggle--open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="console-header__toggle-line" />
          <span className="console-header__toggle-line" />
          <span className="console-header__toggle-line" />
        </button>
      </header>

      {/* Mobile menu: yellow/black poster panel (DESIGN.md §6) */}
      <div
        className={`console-menu-backdrop ${isMenuOpen ? 'console-menu-backdrop--open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      <div className={`console-menu ${isMenuOpen ? 'console-menu--open' : ''}`}>
        <span className="console-menu__label" aria-hidden="true">// NAVIGATION</span>
        <div className="console-menu__inner">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`console-menu__link ${isActive ? 'console-menu__link--active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="console-menu__link-label">{item.label}</span>
                <span className="console-menu__link-glyph" aria-hidden="true">
                  {isActive ? '●' : '→'}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
