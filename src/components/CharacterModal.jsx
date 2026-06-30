import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import './CharacterModal.css';

// Helper to detect if color is light
const isLightColor = (hex) => {
  if (!hex) return false;
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length < 6) return true;
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150;
};

export default function CharacterModal({ character, onClose }) {
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

  const characterColor = useMemo(() => character.color || '#c0392b', [character.color]);
  const isLight = useMemo(() => isLightColor(characterColor), [characterColor]);
  const textColor = useMemo(() => isLight ? 'rgba(0,0,0,0.8)' : 'inherit', [isLight]);
  const contrastText = useMemo(() => isLight ? 'rgba(0,0,0,0.85)' : '#fff', [isLight]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <article
        className={`modal ${isLight ? 'modal--light' : ''}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        style={{
          '--accent': characterColor,
          '--accent-glow': `${characterColor}80`,
          '--text-on-accent': contrastText,
        }}
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
          <span className="modal__entry-num">{character.number}</span>
          <span className="modal__entry-line" />
        </div>

        {/* Close button */}
        <button className="modal__close" onClick={onClose} aria-label="Close modal" ref={closeButtonRef}>
          <span>×</span>
        </button>

        {/* Image panel */}
        <div className="modal__image-panel">
          <div
            className="modal__image-color-overlay"
            style={{ background: characterColor }}
          />
          {!imgError ? (
            <img
              src={character.image}
              alt={character.name}
              className="modal__image"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="modal__image-fallback">
              {character.number}
            </div>
          )}
          <div className="modal__image-accent" />
        </div>

        {/* Info panel */}
        <div className="modal__info-panel">
          <span className="modal__number">
            {character.number}
          </span>
          <h2 className="modal__name" id="modal-name">
            {character.name}
          </h2>
          <div className="modal__divider" />
          <blockquote className="modal__quote">
            <span className="modal__quote-mark">&ldquo;</span>
            {character.quote}
            <span className="modal__quote-mark">&rdquo;</span>
          </blockquote>

          <div className="modal__deco">
            <span className="modal__deco-line" />
            <span className="modal__deco-dot" />
            <span className="modal__deco-line" />
          </div>
        </div>
      </article>
    </div>,
    document.body
  );
}