import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ease, dur } from '../lib/motion';
import Frame from './lines/Frame';
import ScanLine from './lines/ScanLine';
import GhostText from './lines/GhostText';
import DashRule from './lines/DashRule';
import './StageViewer.css';

/**
 * Archive stage viewer (DESIGN.md §4, TASKS-V2 Phase E).
 *
 * Replaces the two modal components. Layout is the console skeleton: meta
 * column on the left, framed art in the middle, pager at the bottom.
 *
 * Behaviour carried over from the modals: portal, focus trap, Esc, scroll
 * lock, and focus returning to the card that opened it. Paging is wired to
 * the caller so the URL stays the single source of truth.
 */
export default function StageViewer({
  entry,
  index,
  total,
  kind = 'operator',
  onClose,
  onPrev,
  onNext,
}) {
  const [imgError, setImgError] = useState(false);
  const [seenEntry, setSeenEntry] = useState(entry);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Adjust state during render when the entry changes: a fresh entry must not
  // inherit the previous one's broken-image flag, and the scan line needs a new
  // key to replay. Both are derived, so no effect and no second render pass.
  if (seenEntry !== entry) {
    setSeenEntry(entry);
    setImgError(false);
  }
  const scanKey = seenEntry.number ?? seenEntry.id;

  const isOperator = kind === 'operator';
  const num = isOperator ? entry.number || '000' : String(entry.id).padStart(3, '0');
  const title = isOperator ? entry.name : entry.title;
  const entryColor = entry.color || 'var(--ink-mute)';
  const hasPrev = index > 0;
  const hasNext = index < total - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) onPrev();
  }, [hasPrev, onPrev]);

  const handleNext = useCallback(() => {
    if (hasNext) onNext();
  }, [hasNext, onNext]);

  // Esc to close, arrows to page, Tab trap inside the panel.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
        return;
      }
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [onClose, handlePrev, handleNext]);

  return createPortal(
    <motion.div
      className="stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: dur.ui }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="stage-title"
    >
      <motion.div
        className="stage__panel"
        ref={panelRef}
        style={{ '--entry': entryColor }}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: dur.panel, ease: ease.out }}
      >
        {/* ── Header row: label + close ── */}
        <div className="stage__top">
          <span className="stage__top-label">
            {isOperator ? 'OPERATOR DOSSIER' : 'BANNER RECORD'} // ENTRY-{num}
          </span>
          <button
            className="stage__close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Close stage viewer"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <DashRule className="stage__rule" />

        {/* ── Body: meta column + stage ── */}
        <div className="stage__body">
          {/* Meta column */}
          <aside className="stage__meta">
            <span
              className="stage__color-tile"
              style={{ background: entryColor }}
              aria-hidden="true"
            />

            <div className="stage__progress">
              <span className="stage__progress-num">
                {String(index + 1).padStart(2, '0')}
                <span className="stage__progress-sep"> / </span>
                {String(total).padStart(2, '0')}
              </span>
              <span className="stage__progress-track" aria-hidden="true">
                <span
                  className="stage__progress-fill"
                  style={{ width: `${((index + 1) / total) * 100}%` }}
                />
              </span>
            </div>

            <dl className="stage__fields">
              <div className="stage__field">
                <dt>//Entry</dt>
                <dd>{num}</dd>
              </div>
              <div className="stage__field">
                <dt>//Name</dt>
                <dd>{title}</dd>
              </div>
              <div className="stage__field">
                <dt>//Status</dt>
                <dd>VERIFIED</dd>
              </div>
              {isOperator && entry.category && (
                <div className="stage__field">
                  <dt>//Class</dt>
                  <dd>{entry.category.toUpperCase()}</dd>
                </div>
              )}
            </dl>

            <GhostText size="clamp(64px, 8vw, 132px)" className="stage__ghost">
              {num}
            </GhostText>
          </aside>

          {/* Stage: framed art */}
          <div className="stage__art-col">
            <Frame className="stage__frame" hoverable={false}>
              <div className="stage__art">
                <ScanLine key={scanKey} active={!shouldReduceMotion} />
                {!imgError ? (
                  <img
                    src={entry.image}
                    alt={title}
                    className="stage__image"
                    width={isOperator ? 900 : 1720}
                    height={isOperator ? 1126 : 968}
                    decoding="async"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="stage__image-fallback">
                    <span>{num}</span>
                  </div>
                )}
              </div>
            </Frame>

            {/* Quote / description under the art */}
            <div className="stage__caption">
              {isOperator ? (
                <>
                  <span className="stage__caption-label">// TRANSCRIPT_LOG</span>
                  <blockquote className="stage__quote">
                    &ldquo;{entry.quote}&rdquo;
                  </blockquote>
                </>
              ) : (
                <p className="stage__quote">{entry.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom pager ── */}
        <div className="stage__bottom">
          <span className="stage__bottom-meta">
            {isOperator ? 'OPERATOR_REGISTRY' : 'BANNER_SPEC'} // SEC-01
          </span>

          <div className="stage__pager">
            <button
              className="stage__pager-btn"
              onClick={handlePrev}
              disabled={!hasPrev}
              aria-label="Previous entry"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <span className="stage__pager-cell">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={num}
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: dur.micro }}
                >
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </span>
            <button
              className="stage__pager-btn"
              onClick={handleNext}
              disabled={!hasNext}
              aria-label="Next entry"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
