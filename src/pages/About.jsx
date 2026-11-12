import { useState } from 'react';
import characters from '../data/characters.json';
import DecodeText from '../components/motion/DecodeText';
import Reveal from '../components/motion/Reveal';
import { DashRule, Frame, GhostText } from '../components/lines';
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
        {/* ── Console header ── */}
        <header className="about__header">
          <div className="about__top-meta">
            <span className="about__status-label">
              <span className="about__status-dot" aria-hidden="true" />
              OPERATOR // PERSONNEL_DOSSIER
            </span>
            <span>CLEARANCE: LEVEL_05</span>
          </div>

          <div className="about__title-block">
            <span className="about__eyebrow">// LEAD_ARCHITECT</span>
            <h1 className="about__title">
              <DecodeText text="CHELO ARUNG S." duration={600} />
            </h1>
            <GhostText size="clamp(72px, 14vw, 200px)" className="about__ghost">
              05
            </GhostText>
          </div>
        </header>

        <DashRule className="about__rule" />

        {/* ── Body: main column + aside ── */}
        <section className="about__content">
          <div className="about__main">
            <Reveal delay={0.1}>
              <Frame className="about__panel">
                <div className="about__panel-body">
                  <span className="about__field-label">// PERSONNEL_MEMO</span>
                  <p className="about__bio">
                    Anak muda yang cinta bngt sama anime dan ngedit (boong si), trus pengen ngecoba
                    hal baru dngn story telling di design sendiri jir.
                  </p>
                  <blockquote className="about__quote">
                    &ldquo;Storytelling with design.&rdquo;
                  </blockquote>
                </div>
              </Frame>
            </Reveal>

            <Reveal delay={0.2} className="about__socials">
              <span className="about__field-label">// FREQUENCY_CHANNELS</span>
              <div className="about__social-rows">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="about__social-row"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="about__social-tag">{s.tag}</span>
                    <span className="about__social-label">{s.label}</span>
                    <span className="about__social-arrow" aria-hidden="true">&#8599;</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="about__aside">
            <Reveal delay={0.25}>
              <Frame className="about__photo-panel">
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
              </Frame>
              <div className="about__caption-bar">
                <span>OPERATOR // CHELO</span>
                <span>HANDLE: CHELOKEBAB10K</span>
              </div>
            </Reveal>

            <Reveal delay={0.35} className="about__stats-grid">
              {stats.map((s) => (
                <div className="about__stat-card" key={s.label}>
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
