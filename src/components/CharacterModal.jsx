import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../lib/motion';
import './CharacterModal.css';

export default function CharacterModal({ character, onClose }) {
  const [imgError, setImgError] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
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

  // Tab key focus trap
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

  const entryNum = character.number || '000';
  const entryColor = character.color || 'var(--signal)';

  return createPortal(
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: dur.ui }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-name"
    >
      <motion.article
        className="modal"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        style={{
          '--entry': entryColor,
        }}
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { clipPath: 'inset(50% 0)', opacity: 0, scale: 0.98 }
        }
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : { clipPath: 'inset(0% 0)', opacity: 1, scale: 1 }
        }
        exit={
          shouldReduceMotion
            ? { opacity: 0 }
            : { clipPath: 'inset(50% 0)', opacity: 0, scale: 0.98 }
        }
        transition={{ duration: dur.panel, ease: ease.out }}
      >
        {/* L Brackets */}
        <span className="modal__bracket modal__bracket--tl" aria-hidden="true" />
        <span className="modal__bracket modal__bracket--tr" aria-hidden="true" />
        <span className="modal__bracket modal__bracket--bl" aria-hidden="true" />
        <span className="modal__bracket modal__bracket--br" aria-hidden="true" />

        {/* Close Button */}
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close dossier modal"
          ref={closeButtonRef}
        >
          <span>✕</span>
        </button>

        {/* Art Panel */}
        <div className="modal__image-panel">
          <span className="modal__image-scrim" aria-hidden="true" />
          {!imgError ? (
            <img
              src={character.image}
              alt={character.name}
              className="modal__image"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="modal__image-fallback">
              <span>{entryNum}</span>
            </div>
          )}
        </div>

        {/* Data Panel */}
        <div className="modal__info-panel">
          <div className="modal__meta-header">
            <span>OPERATOR DOSSIER</span>
            <span>//</span>
            <span>ENTRY-{entryNum}</span>
          </div>

          <h2 className="modal__name" id="modal-name">
            {character.name}
          </h2>

          <div className="modal__transcript-block">
            <span className="modal__transcript-label">// TRANSCRIPT_LOG:</span>
            <blockquote className="modal__quote">
              &ldquo;{character.quote}&rdquo;
            </blockquote>
          </div>

          <div className="modal__footer-meta">
            <span>STATUS: VERIFIED</span>
            <span>SECURITY_LEVEL: 04</span>
          </div>
        </div>
      </motion.article>
    </motion.div>,
    document.body
  );
}