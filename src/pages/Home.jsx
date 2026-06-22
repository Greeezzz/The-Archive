import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <main className="home page-enter">
      {/* Subtle noise texture overlay */}
      <div className="home__bg-lines" />

      <div className="home__content">
        <p className="home__eyebrow">— est. 2025</p>
        <h1 className="home__title">
          <span className="home__title-thin">The</span>
          <span className="home__title-bold">Archive</span>
        </h1>
        <p className="home__subtitle">
          A collection of original characters, each with their own world,
          <br className="home__br" /> story, and voice.
        </p>

        <div className="home__actions">
          <Link to="/archive" className="home__btn home__btn--primary">
            Browse Archive
          </Link>
          <Link to="/about" className="home__btn home__btn--ghost">
            About
          </Link>
        </div>

        <div className="home__count">
          <span className="home__count-number">20</span>
          <span className="home__count-label">characters archived</span>
        </div>
      </div>

      {/* Decorative element */}
      <div className="home__deco">
        <span className="home__deco-text">THE ARCHIVE</span>
      </div>
    </main>
  );
}
