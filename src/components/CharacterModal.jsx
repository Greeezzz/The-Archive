import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';  // tambahin ini
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

  return createPortal(  // ganti return biasa jadi createPortal
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{ '--accent': character.color }}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <span>&#10005;</span>
        </button>
        <div className="modal__image-panel">
          {!imgError ? (
            <img src={character.image} alt={character.name} className="modal__image" onError={() => setImgError(true)} />
          ) : null}
          {imgError && (
            <div className="modal__image-fallback" style={{ display: 'flex' }}>
              <span>{character.number}</span>
            </div>
          )}
          <div className="modal__image-accent" />
        </div>
        <div className="modal__info-panel">
          <span className="modal__number">Archive #{character.number}</span>
          <h2 className="modal__name">{character.name}</h2>
          <div className="modal__divider" style={{ background: character.color }} />
          <blockquote className="modal__quote">
            <span className="modal__quote-mark">&ldquo;</span>
            {character.quote}
            <span className="modal__quote-mark">&rdquo;</span>
          </blockquote>
        </div>
      </div>
    </div>,
    document.body  // tambahin ini
  );
}