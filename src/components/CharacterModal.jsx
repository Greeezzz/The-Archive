import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './CharacterModal.css';

export default function CharacterModal({ character, onClose }) {
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
      <article
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{ '--accent': character.color }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-name"
      >
        {/* Corner brackets */}
        <div className="modal__bracket modal__bracket--tl" />
        <div className="modal__bracket modal__bracket--tr" />
        <div className="modal__bracket modal__bracket--bl" />
        <div className="modal__bracket modal__bracket--br" />

        {/* Entry number */}
        <div className="modal__entry">
          <span className="modal__entry-num">#{character.number}</span>
          <span className="modal__entry-line" />
        </div>

        {/* Close button */}
        <button className="modal__close" onClick={onClose} aria-label="Close modal">
          <span>×</span>
        </button>

        {/* Image panel */}
        <div className="modal__image-panel">
          {!imgError ? (
            <img
              src={character.image}
              alt={character.name}
              className="modal__image"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="modal__image-fallback" style={{ display: 'flex' }}>
              <span>{character.number}</span>
            </div>
          )}
          <div className="modal__image-accent" />
        </div>

        {/* Info panel */}
        <div className="modal__info-panel">
          <span className="modal__number">Archive Entry</span>
          <h2 className="modal__name" id="modal-name">{character.name}</h2>
          <div className="modal__divider" style={{ background: character.color }} />
          <blockquote className="modal__quote">
            <span className="modal__quote-mark">&ldquo;</span>
            {character.quote}
            <span className="modal__quote-mark">&rdquo;</span>
          </blockquote>
        </div>
      </article>
    </div>,
    document.body
  );
}
