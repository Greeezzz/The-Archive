import React, { useState } from 'react';
import './About.css';

export default function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <main className="about page-enter">
      <div className="about__inner">
        {/* Left side */}
        <div className="about__left">
          <p className="about__label">— About</p>
          <h1 className="about__title">
            Hello,<br />I'm <span className="about__name">Chelo Arung Samudro</span>.
          </h1>
          <div className="about__divider" />
          <p className="about__bio">
            Niwbi yang nyoba ngedesign archive bangke
          </p>
          <p className="about__bio">
            Storytelling with design
          </p>

          <div className="about__socials">
            {/* Ganti link ini dengan sosmed lo */}
            <a href="https://x.com/reezz47190" className="about__social-link" target="_blank" rel="noreferrer">Twitter / X</a>
            <a href="https://www.instagram.com/chelokebab10k/" className="about__social-link" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://github.com/Greeezzz" className="about__social-link" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>

        {/* Right side — decorative */}
        <div className="about__right">
          {/* Profile picture section */}
          <div className="about__profile">
            <div className="about__profile-frame">
              {!imgError ? (
                <img
                  src="/profile/profile.jpg"
                  alt="Chelo"
                  className="about__profile-image"
                  onError={() => setImgError(true)}
                />
              ) : null}
              {imgError && (
                <div className="about__profile-fallback" style={{ display: 'flex' }}>
                  <span>PP</span>
                </div>
              )}
            </div>
          </div>

          <div className="about__card">
            <div className="about__card-inner">
              <span className="about__card-label">Creator</span>
              <span className="about__card-value">Chelo Arung Samudro</span>
            </div>
            <div className="about__card-inner">
              <span className="about__card-label">Project</span>
              <span className="about__card-value">The Archive</span>
            </div>
            <div className="about__card-inner">
              <span className="about__card-label">Total Characters</span>
              <span className="about__card-value">20 &amp; growing</span>
            </div>
            <div className="about__card-inner">
              <span className="about__card-label">Medium</span>
              <span className="about__card-value">Digital Design</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
