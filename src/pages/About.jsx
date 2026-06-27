import React, { useState } from 'react';
import './About.css';

const stats = [
  { label: 'Project',    value: 'The Archive' },
  { label: 'Medium',     value: 'Digital Design' },
  { label: 'Characters', value: '22 & growing' },
  { label: 'Since',      value: '2025' },
];

const socials = [
  { label: 'Twitter / X', href: 'https://x.com/reezz47190', icon: 'x' },
  { label: 'Instagram',   href: 'https://www.instagram.com/chelokebab10k/', icon: 'ig' },
  { label: 'Github',      href: 'https://github.com/Greeezzz', icon: 'gh' },
];

export default function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="about-wrapper">
      <main className="about">

        {/* Ghost watermark */}
        <div className="about__watermark" aria-hidden="true">
          ABOUT
        </div>

        {/* Header */}
        <header className="about__header">

          {/* Top rule */}
          <div className="about__top">
            <div className="about__top-rule" />
            <div className="about__issue-info">
              <span className="about__issue-vol">Vol. I</span>
              <span className="about__issue-sep" />
              <span className="about__issue-label">The Archive</span>
            </div>
          </div>

          {/* Main header */}
          <div className="about__header-main">
            <div className="about__meta-col">
              <div className="about__vert-rule" />
              <span className="about__vol">Issue 01</span>
            </div>

            <div className="about__title-block">
              <p className="about__eyebrow">— Creator</p>
              <h1 className="about__title">
                <span className="about__title-line about__title-line--1">
                  <span className="about__title-serif">Hello,</span>
                </span>
                <span className="about__title-line about__title-line--2">
                  <span className="about__title-bold">Chelo</span>
                  <span className="about__title-accent">.</span>
                </span>
              </h1>
            </div>

            <div className="about__deco-col">
              <span className="about__deco-num">01</span>
            </div>
          </div>

          <div className="about__bottom-rule" />
        </header>

        {/* Content */}
        <section className="about__content">

          {/* Left: bio + socials */}
          <div className="about__main">

            {/* Bio */}
            <div className="about__bio-block">
              <div className="about__bio-label">
                <span className="about__bio-label-text">About</span>
                <div className="about__bio-label-line" />
              </div>
              <p className="about__bio">
                Anak muda yang cinta bngt sama anime dan ngedit (boong si), trus pengen ngecoba hal baru dngn story telling di design sendiri jir.
              </p>
              <p className="about__bio about__bio--italic">
                "Storytelling with design."
              </p>
            </div>

            {/* Socials */}
            <div className="about__socials-block">
              <div className="about__socials-label">
                <span className="about__socials-label-text">Connect</span>
                <div className="about__socials-label-line" />
              </div>
              <div className="about__socials">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="about__social-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="about__social-icon">{s.icon}</span>
                    <span className="about__social-text">{s.label}</span>
                    <svg className="about__social-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right: photo + stats */}
          <div className="about__aside">

            {/* Photo */}
            <div className="about__photo-wrap">
              <div className="about__photo-frame">
                {!imgError ? (
                  <img
                    src="/profile/profile.jpg"
                    alt="Chelo"
                    className="about__photo"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="about__photo-fallback">
                    C
                  </div>
                )}
                <div className="about__photo-overlay">
                  <span className="about__photo-overlay-text">Creator</span>
                </div>
              </div>

              <div className="about__bracket about__bracket--tl" />
              <div className="about__bracket about__bracket--tr" />
              <div className="about__bracket about__bracket--bl" />
              <div className="about__bracket about__bracket--br" />

              <div className="about__photo-caption">
                <span className="about__photo-caption-name">Chelo Arung Samudro</span>
                <span className="about__photo-caption-tag">CheloKebab10k</span>
              </div>
            </div>

            {/* Stats */}
            <div className="about__stats">
              {stats.map((s, i) => (
                <div className="about__stat" key={i}>
                  <span className="about__stat-label">{s.label}</span>
                  <span className="about__stat-value">{s.value}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}