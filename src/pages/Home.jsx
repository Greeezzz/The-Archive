import { Link } from 'react-router-dom';
import characters from '../data/characters.json';
import './Home.css';

const currentYear = new Date().getFullYear();

export default function Home() {
  return (
    <div className="home-wrapper">
      <main className="home">

        {/* Background decorative layer */}
        <div className="home__bg-grid" />
        <div className="home__bg-accent" />
        <div className="home__bg-lines" />
        <div className="home__scanline" aria-hidden="true" />

        {/* Floating decorative orbs */}
        <div className="home__float home__float--1" aria-hidden="true" />
        <div className="home__float home__float--2" aria-hidden="true" />
        <div className="home__float home__float--3" aria-hidden="true" />

        {/* Issue stamp — top right */}
        <div className="home__issue-stamp">
          <span className="home__issue-label">The Archive</span>
          <span className="home__issue-divider" />
          <span className="home__issue-vol">Vol. I</span>
        </div>

        {/* Main content area */}
        <div className="home__layout">

          {/* Left vertical rule */}
          <div className="home__rule-col">
            <div className="home__rule-line" />
            <span className="home__rule-text">EST. {currentYear}</span>
            <div className="home__rule-line home__rule-line--bottom" />
          </div>

          {/* Center content */}
          <div className="home__content">

            {/* Eyebrow row */}
            <div className="home__eyebrow-row">
              <span className="home__eyebrow">— Design Collection</span>
              <span className="home__eyebrow-dot" />
              <span className="home__eyebrow">{characters.length} Entries</span>
            </div>

            {/* Hero title */}
            <div className="home__hero">
              <h1 className="home__title">
                <span className="home__title-line home__title-line--1">
                  <span className="home__title-serif">A curated</span>
                </span>
                <span className="home__title-line home__title-line--2">
                  <span className="home__title-bold">Archive</span>
                  <span className="home__title-accent">.</span>
                </span>
                <span className="home__title-line home__title-line--3">
                  <span className="home__title-serif home__title-serif--indent">of characters</span>
                </span>
              </h1>

              {/* Decorative year marker */}
              <div className="home__year-marker">
                <span className="home__year-num">{currentYear}</span>
              </div>
            </div>

            {/* Description block */}
            <div className="home__desc-block">
              <div className="home__desc-rule" />
              <p className="home__desc">
                Each entry is a design study — a character, a world, a visual language
                built from scratch. A celebration of craft, storytelling, and the art of
                bringing ideas to life.
              </p>
            </div>

            {/* Actions */}
            <div className="home__actions">
              <Link to="/archive" className="home__btn home__btn--primary">
                <span className="home__btn-text">Browse Archive</span>
                <span className="home__btn-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="home__btn-line" />
              </Link>
              <Link to="/about" className="home__btn home__btn--secondary">
                Meet the Creator
                <span className="home__btn-dot" />
              </Link>
              <Link to="/projects" className="home__btn home__btn--secondary">
                View Projects
                <span className="home__btn-dot" />
              </Link>
            </div>

          </div>

          {/* Right decorative column */}
          <div className="home__deco-col">
            <div className="home__deco-number">
              <span className="home__deco-num">01</span>
            </div>
            <div className="home__deco-lines">
              <span className="home__deco-line" />
              <span className="home__deco-line" />
              <span className="home__deco-line" />
            </div>
          </div>

        </div>

        {/* Footer strip */}
        <div className="home__footer">
          <div className="home__footer-inner">
            <div className="home__footer-left">
              <span className="home__footer-tag">CheloKebab10k</span>
              <span className="home__footer-sep">/</span>
              <span className="home__footer-date">{currentYear}</span>
            </div>
            <div className="home__footer-center">
              <span className="home__footer-tagline">Storytelling with design</span>
            </div>
            <div className="home__footer-right">
              <span className="home__footer-scroll-text">Scroll to explore</span>
              <div className="home__footer-scroll-line">
                <div className="home__footer-scroll-progress" />
              </div>
            </div>
          </div>
        </div>

        {/* Ghost watermark */}
        <div className="home__watermark" aria-hidden="true">
          ARCHIVE
        </div>

      </main>
    </div>
  );
}