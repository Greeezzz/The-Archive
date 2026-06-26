import React from 'react';
import { Link } from 'react-router-dom';
import characters from '../data/characters.json';
import './Home.css';

export default function Home() {
  return (
    <main className="home page-enter">

      {/* ── Background decorative layer ── */}
      <div className="home__bg-grid" />
      <div className="home__bg-accent" />

      {/* ── Issue stamp — top right ── */}
      <div className="home__issue-stamp">
        <span className="home__issue-label">The Archive</span>
        <span className="home__issue-divider" />
        <span className="home__issue-vol">Vol. I</span>
      </div>

      {/* ── Main content area ── */}
      <div className="home__layout">

        {/* Left vertical rule */}
        <div className="home__rule-col">
          <div className="home__rule-line" />
          <span className="home__rule-text">EST. 2025</span>
        </div>

        {/* Center content */}
        <div className="home__content">

          {/* Eyebrow row */}
          <div className="home__eyebrow-row">
            <span className="home__eyebrow">— Design Collection</span>
            <span className="home__eyebrow-dot" />
            <span className="home__eyebrow">{characters.length} Entries</span>
          </div>

          {/* Hero title — editorial pull quote style */}
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
              <span>Browse Archive</span>
              <svg className="home__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/about" className="home__btn home__btn--secondary">
              Meet the Creator
            </Link>
          </div>

        </div>

        {/* Right decorative column */}
        <div className="home__deco-col">
          <div className="home__deco-number">
            <span className="home__deco-num">01</span>
          </div>
        </div>

      </div>

      {/* ── Footer strip ── */}
      <div className="home__footer">
        <div className="home__footer-inner">
          <div className="home__footer-left">
            <span className="home__footer-tag">CheloKebab10k</span>
            <span className="home__footer-sep">/</span>
            <span className="home__footer-date">2025</span>
          </div>
          <div className="home__footer-right">
            <span className="home__footer-scroll-text">Scroll to explore</span>
            <div className="home__footer-scroll-line">
              <div className="home__footer-scroll-progress" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Ghost watermark ── */}
      <div className="home__watermark" aria-hidden="true">
        <span>ARCHIVE</span>
      </div>

    </main>
  );
}
