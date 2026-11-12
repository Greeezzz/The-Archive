import { useState, useEffect } from 'react';
import characters from '../data/characters.json';
import Button from '../components/ui/Button';
import DecodeText from '../components/motion/DecodeText';
import Reveal from '../components/motion/Reveal';
import GhostText from '../components/lines/GhostText';
import {
  BracketTitle,
  Swoosh,
  MicroTextBand,
  SlabLabel,
  GlitchSlivers,
} from '../components/poster';
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
      {/* Boot intro (M12) */}
      {booting && (
        <div
          className="home__boot"
          onClick={handleSkipBoot}
          role="button"
          tabIndex={0}
          aria-label="Skip initialization"
        >
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
        {/* ── Poster hero ── */}
        <section className="poster">
          <MicroTextBand
            text="THE ARCHIVE · GALLERY · OPERATOR FILES"
            repeat={10}
            className="poster__band poster__band--top"
          />

          <div className="poster__meta">
            <SlabLabel>{characters.length} OPERATOR DOSSIERS</SlabLabel>
            <span className="poster__meta-code">
              <DecodeText text="SEC-00 // TERMINAL_ONLINE" duration={500} delay={120} />
            </span>
            <GlitchSlivers />
          </div>

          <div className="poster__headline">
            <p className="poster__kicker">
              <DecodeText text="A Curated Archive" duration={420} delay={80} />
            </p>

            <BracketTitle className="poster__title">
              <DecodeText text="OF CHARACTERS" duration={620} delay={220} />
            </BracketTitle>

            <Swoosh className="poster__swoosh" delay={0.35} />

            <GhostText size="clamp(72px, 16vw, 240px)" hatched className="poster__ghost">
              ARCHIVE
            </GhostText>
          </div>

          <Reveal delay={0.35} className="poster__desc">
            <p>
              Each entry is a design study — an original character, a visual world, and a system
              language built from scratch. A focused study in craft, storytelling, and digital
              drafting.
            </p>
          </Reveal>

          <Reveal delay={0.45} className="poster__actions">
            <Button to="/archive" variant="primary">
              Browse Archive <span aria-hidden="true">→</span>
            </Button>
            <Button to="/about" variant="secondary">
              Meet Creator <span aria-hidden="true">↗</span>
            </Button>
            <Button to="/projects" variant="secondary">
              View Projects <span aria-hidden="true">↗</span>
            </Button>
          </Reveal>

          <MicroTextBand
            text="THE ARCHIVE · EXHIBITION TERMINAL · 2026"
            repeat={10}
            className="poster__band poster__band--bottom"
            reverse
          />
        </section>

        {/* Footer status strip */}
        <div className="home__status-strip">
          <div className="home__status-item">
            <span className="home__status-dot" aria-hidden="true" />
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
