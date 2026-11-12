import { useState, useEffect } from 'react';
import characters from '../data/characters.json';
import Button from '../components/ui/Button';
import DecodeText from '../components/motion/DecodeText';
import Reveal from '../components/motion/Reveal';
import DrawLine from '../components/motion/DrawLine';
import './Home.css';

export default function Home() {
  const [booting, setBooting] = useState(() => {
    if (typeof window === 'undefined') return false;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return false;
    return !sessionStorage.getItem('archive_booted');
  });

  useEffect(() => {
    if (!booting) return;

    const timer = setTimeout(() => {
      setBooting(false);
      sessionStorage.setItem('archive_booted', '1');
    }, 1600);

    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        setBooting(false);
        sessionStorage.setItem('archive_booted', '1');
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [booting]);

  const handleSkipBoot = () => {
    setBooting(false);
    sessionStorage.setItem('archive_booted', '1');
  };

  return (
    <div className="home-wrapper">
      {/* Boot Intro Sequence (M12) */}
      {booting && (
        <div className="home__boot" onClick={handleSkipBoot} role="button" tabIndex={0} aria-label="Skip initialization">
          <div className="home__boot-line" />
          <DecodeText
            text="INITIALIZING SYS.ONLINE // THE ARCHIVE"
            duration={800}
            className="home__boot-text"
          />
          <span className="home__boot-skip">[ CLICK / ESC TO SKIP ]</span>
        </div>
      )}

      <main className="home">
        {/* Hero Section */}
        <div className="home__hero-section">
          {/* Eyebrow & Meta */}
          <div className="home__header-meta">
            <span className="home__dossier-code">SEC-00 // TERMINAL_ONLINE</span>
            <span className="home__meta-sep" aria-hidden="true">/</span>
            <span className="home__count-tag">// {characters.length} OPERATOR DOSSIERS</span>
          </div>

          <DrawLine delay={0.1} />

          {/* Title Block with Decode */}
          <div className="home__title-block">
            <p className="home__title-sub">
              <DecodeText text="A Curated Archive" duration={450} delay={100} />
            </p>
            <h1 className="home__title-main">
              <DecodeText text="OF CHARACTERS" duration={650} delay={250} />
              <span className="home__title-signal">.</span>
            </h1>
          </div>

          {/* Description */}
          <Reveal delay={0.3} className="home__desc-panel">
            <p className="home__desc">
              Each entry is a design study — an original character, a visual world, and a system
              language built from scratch. A focused study in craft, storytelling, and digital drafting.
            </p>
          </Reveal>

          {/* 3 Action Buttons */}
          <Reveal delay={0.4} className="home__actions">
            <Button to="/archive" variant="primary">
              Browse Archive <span>→</span>
            </Button>
            <Button to="/about" variant="secondary">
              Meet Creator <span>↗</span>
            </Button>
            <Button to="/projects" variant="secondary">
              View Projects <span>↗</span>
            </Button>
          </Reveal>
        </div>

        {/* Footer Status Strip */}
        <div className="home__status-strip">
          <div className="home__status-item">
            <span className="home__status-dot" />
            <span>SYS.STATUS: OPERATIONAL</span>
          </div>
          <div className="home__status-item">
            <span>LOC: 07.24°S // 112.75°E</span>
          </div>
          <div className="home__status-item">
            <span>EST. 2026 // CHELO ARCHIVE</span>
          </div>
        </div>
      </main>
    </div>
  );
}