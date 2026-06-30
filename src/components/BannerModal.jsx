import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './BannerModal.css';

export default function BannerModal({ banner, onClose }) {
  const [imgError, setImgError] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    // Focus trap
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [onClose]);

  // Focus trap handler
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    modal.addEventListener('keydown', handleTab);
    return () => modal.removeEventListener('keydown', handleTab);
  }, []);

  const bannerColor = banner.color || '#c0392b';

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <article
        className="banner-modal"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        style={{
          '--accent': bannerColor,
          '--accent-glow': `${bannerColor}80`,
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="banner-modal-title"
      >
        {/* Corner brackets */}
        <div className="banner-modal__bracket banner-modal__bracket--tl" />
        <div className="banner-modal__bracket banner-modal__bracket--tr" />
        <div className="banner-modal__bracket banner-modal__bracket--bl" />
        <div className="banner-modal__bracket banner-modal__bracket--br" />

        {/* Entry label */}
        <div className="banner-modal__entry">
          <span className="banner-modal__entry-label" style={{ color: bannerColor, borderColor: `${bannerColor}60` }}>
            Banner
          </span>
          <span className="banner-modal__entry-line" style={{ background: bannerColor }} />
        </div>

        {/* Close button */}
        <button className="banner-modal__close" onClick={onClose} aria-label="Close modal" ref={closeButtonRef}>
          <span>×</span>
        </button>

        {/* Image panel */}
        <div className="banner-modal__image-panel">
          {/* Color accent overlay */}
          <div
            className="banner-modal__image-color-overlay"
            style={{ background: bannerColor }}
          />
          {!imgError ? (
            <img
              src={banner.image}
              alt={banner.title}
              className="banner-modal__image"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="banner-modal__image-fallback" style={{ display: 'flex' }}>
              <span>No Image</span>
            </div>
          )}
          <div className="banner-modal__image-accent" style={{ background: bannerColor }} />
        </div>

        {/* Info panel */}
        <div className="banner-modal__info-panel">
          <span className="banner-modal__label" style={{ color: bannerColor }}>Banner Entry</span>
          <h2 className="banner-modal__title" id="banner-modal-title">{banner.title}</h2>
          <div className="banner-modal__divider" style={{ background: bannerColor }} />
          <p className="banner-modal__description">{banner.description}</p>

          {/* Decorative element */}
          <div className="banner-modal__deco">
            <span className="banner-modal__deco-line" style={{ background: `linear-gradient(to right, transparent, ${bannerColor}30)` }} />
            <span className="banner-modal__deco-dot" style={{ background: bannerColor, boxShadow: `0 0 12px ${bannerColor}` }} />
            <span className="banner-modal__deco-line" style={{ background: `linear-gradient(to left, transparent, ${bannerColor}30)` }} />
          </div>

          {banner.githubLink && (
            <a
              href={banner.githubLink}
              target="_blank"
              rel="noreferrer"
              className="banner-modal__github-link"
              style={{ borderColor: `${bannerColor}40` }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              View on GitHub
            </a>
          )}
        </div>
      </article>
    </div>,
    document.body
  );
}