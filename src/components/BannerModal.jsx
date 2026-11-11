import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../lib/motion';
import Button from './ui/Button';
import './BannerModal.css';

export default function BannerModal({ banner, onClose }) {
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

  const bannerColor = banner.color || 'var(--signal)';

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
      aria-labelledby="banner-modal-title"
    >
      <motion.article
        className="banner-modal"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        style={{
          '--entry': bannerColor,
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
        <span className="banner-modal__bracket banner-modal__bracket--tl" aria-hidden="true" />
        <span className="banner-modal__bracket banner-modal__bracket--tr" aria-hidden="true" />
        <span className="banner-modal__bracket banner-modal__bracket--bl" aria-hidden="true" />
        <span className="banner-modal__bracket banner-modal__bracket--br" aria-hidden="true" />

        {/* Close button */}
        <button
          className="banner-modal__close"
          onClick={onClose}
          aria-label="Close modal"
          ref={closeButtonRef}
        >
          <span>✕</span>
        </button>

        {/* Image panel */}
        <div className="banner-modal__image-panel">
          <span className="banner-modal__image-scrim" aria-hidden="true" />
          {!imgError ? (
            <img
              src={banner.image}
              alt={banner.title}
              className="banner-modal__image"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="banner-modal__image-fallback">
              <span>NO IMAGE</span>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="banner-modal__info-panel">
          <div className="banner-modal__meta-header">
            <span>BANNER RECORD</span>
            <span>//</span>
            <span>SPECIFICATION</span>
          </div>

          <h2 className="banner-modal__title" id="banner-modal-title">
            {banner.title}
          </h2>

          <p className="banner-modal__description">{banner.description}</p>

          {banner.githubLink && (
            <div className="banner-modal__actions">
              <Button href={banner.githubLink} variant="secondary">
                View on GitHub <span>↗</span>
              </Button>
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>,
    document.body
  );
}