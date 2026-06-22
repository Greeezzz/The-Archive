import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './BannerModal.css';

export default function BannerModal({ banner, onClose }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="banner-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ '--accent': banner.color }}
      >
        <button className="banner-modal__close" onClick={onClose} aria-label="Close">
          <span>&#10005;</span>
        </button>

        <div className="banner-modal__image-panel">
          {!imgError ? (
            <img
              src={banner.image}
              alt={banner.title}
              className="banner-modal__image"
              onError={() => setImgError(true)}
            />
          ) : null}
          {imgError && (
            <div className="banner-modal__image-fallback" style={{ display: 'flex' }}>
              <span>No Image</span>
            </div>
          )}
          <div className="banner-modal__image-accent" />
        </div>

        <div className="banner-modal__info-panel">
          <h2 className="banner-modal__title">{banner.title}</h2>
          <div className="banner-modal__divider" style={{ background: banner.color }} />
          <p className="banner-modal__description">{banner.description}</p>
          {banner.githubLink && (
            <a
              href={banner.githubLink}
              target="_blank"
              rel="noreferrer"
              className="banner-modal__github-link"
              style={{ borderColor: banner.color, color: '#ffffff' }}
            >
              <span className="banner-modal__github-icon">⟹</span>
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}