import { useState } from 'react';
import characters from '../data/characters.json';
import DecodeText from '../components/motion/DecodeText';
import Reveal from '../components/motion/Reveal';
import Panel from '../components/ui/Panel';
import './About.css';

const stats = [
  { label: 'PROJECT', value: 'THE ARCHIVE' },
  { label: 'DISCIPLINE', value: 'DIGITAL CRAFT' },
  { label: 'OPERATORS', value: `${characters.length} ACTIVE` },
  { label: 'CYCLE', value: '2025 – 2026' },
];

const socials = [
  { label: 'Twitter / X', href: 'https://x.com/reezz47190', tag: 'X' },
  { label: 'Instagram', href: 'https://www.instagram.com/chelokebab10k/', tag: 'IG' },
  { label: 'GitHub', href: 'https://github.com/Greeezzz', tag: 'GH' },
];

export default function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="about-wrapper">
      <main className="about">
        {/* Header */}
        <header className="about__header">
          <div className="about__top-meta">
            <span className="about__status-label">
              <span className="about__status-dot" />
              OPERATOR // PERSONNEL_DOSSIER
            </span>
            <span>CLEARANCE: LEVEL_05</span>
          </div>

          <div className="about__title-block">
            <span className="about__eyebrow">// LEAD ARCHITECT</span>
            <h1 className="about__title">
              <DecodeText text="CHELO ARUNG S." duration={600} />
              <span className="about__title-signal">.</span>
            </h1>
          </div>
        </header>

        {/* Content */}
        <section className="about__content">
          {/* Main Left: Bio + Socials */}
          <div className="about__main">
            {/* Bio in Panel */}
            <Reveal delay={0.1}>
              <Panel chamfer={true} brackets={true}>
                <div className="about__bio-box">
                  <span className="about__section-tag">// PERSONNEL_MEMO</span>
                  <p className="about__bio">
                    Anak muda yang cinta bngt sama anime dan ngedit (boong si), trus pengen ngecoba
                    hal baru dngn story telling di design sendiri jir.
                  </p>
                  <blockquote className="about__quote">
                    &ldquo;Storytelling with design.&rdquo;
                  </blockquote>
                </div>
              </Panel>
            </Reveal>

            {/* Socials List */}
            <Reveal delay={0.2} className="about__socials">
              <span className="about__section-tag">// FREQUENCY_CHANNELS</span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="about__social-row"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    [{s.tag}] {s.label}
                  </span>
                  <span className="about__social-arrow">↗</span>
                </a>
              ))}
            </Reveal>
          </div>

          {/* Aside Right: Photo + Stats Grid */}
          <div className="about__aside">
            {/* Framed Photo with Brackets */}
            <Reveal delay={0.25}>
              <Panel chamfer={true} brackets={true} className="about__photo-panel">
                <div className="about__photo-wrap">
                  {!imgError ? (
                    <img
                      src="/profile/profile.jpg"
                      alt="Chelo Arung Samudro"
                      className="about__photo"
                      width={736}
                      height={736}
                      loading="lazy"
                      decoding="async"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="about__photo-fallback">
                      <span>CHELO</span>
                    </div>
                  )}
                </div>
                <div className="about__caption-bar">
                  <span>OPERATOR // CHELO</span>
                  <span>HANDLE: CHELOKEBAB10K</span>
                </div>
              </Panel>
            </Reveal>

            {/* 2x2 Stats Grid */}
            <Reveal delay={0.35} className="about__stats-grid">
              {stats.map((s, i) => (
                <div className="about__stat-card" key={i}>
                  <span className="about__stat-label">{s.label}</span>
                  <span className="about__stat-value">{s.value}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}