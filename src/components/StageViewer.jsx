import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ease, dur } from '../lib/motion';
import Frame from './lines/Frame';
import ScanLine from './lines/ScanLine';
import GhostText from './lines/GhostText';
import DashRule from './lines/DashRule';
import './StageViewer.css';

const MAX_ZOOM = 4;
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

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
  entries = [],
  onSelect,
  kind = 'operator',
  onClose,
  onPrev,
  onNext,
}) {
  const [imgError, setImgError] = useState(false);
  const [seenEntry, setSeenEntry] = useState(entry);
  const [meta, setMeta] = useState(null);
  const [zoom, setZoom] = useState({ scale: 1, x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fsError, setFsError] = useState(false);
  const panelRef = useRef(null);
  const artRef = useRef(null);
  const stripRef = useRef(null);
  const dragRef = useRef(null);
  const closeRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Adjust state during render when the entry changes: a fresh entry must not
  // inherit the previous one's broken-image flag, measured size or zoom.
  if (seenEntry !== entry) {
    setSeenEntry(entry);
    setImgError(false);
    setMeta(null);
    setZoom({ scale: 1, x: 0, y: 0 });
  }
  const scanKey = seenEntry.number ?? seenEntry.id;

  const isOperator = kind === 'operator';
  const num = isOperator ? entry.number || '000' : String(entry.id).padStart(3, '0');
  const title = isOperator ? entry.name : entry.title;
  const entryColor = entry.color || '#111111';
  const hasPrev = index > 0;
  const hasNext = index < total - 1;
  const zoomed = zoom.scale > 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) onPrev();
  }, [hasPrev, onPrev]);

  const handleNext = useCallback(() => {
    if (hasNext) onNext();
  }, [hasNext, onNext]);

  // Latest handlers behind a ref so the key listener effect can mount once.
  // Re-running it per page step would re-focus the close button and yank the
  // user out of the filmstrip mid-browse.
  const keyHandlers = useRef({ onClose, handlePrev, handleNext });
  useEffect(() => {
    keyHandlers.current = { onClose, handlePrev, handleNext };
  }, [onClose, handlePrev, handleNext]);

  // Esc to close, arrows to page, Tab trap inside the panel. Mount-only.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        keyHandlers.current.onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        keyHandlers.current.handlePrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        keyHandlers.current.handleNext();
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
  }, []);

  // Mirror real fullscreen state so leaving via browser chrome keeps the label.
  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === panelRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  // Keep the active thumbnail centred without touching focus.
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.querySelector('[aria-current="true"]');
    if (!strip || !active) return;
    strip.scrollTo({
      left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  }, [scanKey, shouldReduceMotion]);

  const toggleFullscreen = useCallback(async () => {
    const panel = panelRef.current;
    setFsError(false);
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (panel?.requestFullscreen) {
        await panel.requestFullscreen();
      } else {
        setFsError(true);
      }
    } catch {
      setFsError(true);
    }
  }, []);

  // Functional update: two quick taps on + must accumulate, not read a stale scale.
  const stepZoom = useCallback((delta) => {
    setZoom((z) => {
      const scale = Math.min(MAX_ZOOM, Math.max(1, z.scale + delta));
      return scale === 1 ? { scale: 1, x: 0, y: 0 } : { ...z, scale };
    });
  }, []);
  const resetZoom = useCallback(() => setZoom({ scale: 1, x: 0, y: 0 }), []);

  // Pan only when zoomed, and only across the *rendered* image: object-fit
  // contain leaves letterbox bars, so clamping to the box would let the art
  // slide off into empty space.
  const clampPan = (x, y, scale) => {
    const box = artRef.current?.getBoundingClientRect();
    if (!box) return { x, y };
    const img = artRef.current.querySelector('img');
    const nw = img?.naturalWidth || box.width;
    const nh = img?.naturalHeight || box.height;
    const fit = Math.min(box.width / nw, box.height / nh);
    const maxX = Math.max(0, (nw * fit * (scale - 1)) / 2);
    const maxY = Math.max(0, (nh * fit * (scale - 1)) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const onPointerDown = (e) => {
    if (!zoomed) return;
    dragRef.current = { x: e.clientX, y: e.clientY, ox: zoom.x, oy: zoom.y };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    const next = clampPan(drag.ox + e.clientX - drag.x, drag.oy + e.clientY - drag.y, zoom.scale);
    setZoom((z) => ({ ...z, ...next }));
  };

  const endDrag = (e) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const dims = meta ? `${meta.w} × ${meta.h} PX` : imgError ? 'UNAVAILABLE' : 'READING…';
  const ratio = meta ? `${meta.rw}:${meta.rh}` : '—';

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
          <span className="stage__top-label" id="stage-title">
            {isOperator ? 'OPERATOR DOSSIER' : 'BANNER RECORD'} // ENTRY-{num}
          </span>
          <div className="stage__top-actions">
            <button
              className="stage__icon-btn"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={fsError ? 'Fullscreen unavailable in this browser' : undefined}
            >
              <span aria-hidden="true">{isFullscreen ? '⤡' : '⤢'}</span>
            </button>
            <button
              className="stage__close"
              onClick={onClose}
              ref={closeRef}
              aria-label="Close stage viewer"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        </div>

        <DashRule className="stage__rule" />
        {fsError && (
          <span className="stage__notice" role="status">
            FULLSCREEN UNAVAILABLE HERE — VIEWER STAYS IN PAGE
          </span>
        )}

        {/* ── Body: meta column + stage ── */}
        <div className="stage__body">
          {/* Meta column */}
          <aside className="stage__meta">
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
                <dt>//Color</dt>
                <dd className="stage__color-row">
                  <span
                    className="stage__swatch"
                    style={{ background: entryColor }}
                    aria-hidden="true"
                  />
                  <span>{String(entryColor).toUpperCase()}</span>
                </dd>
              </div>
              <div className="stage__field">
                <dt>//Source</dt>
                <dd>{dims}</dd>
              </div>
              <div className="stage__field">
                <dt>//Ratio</dt>
                <dd>{ratio}</dd>
              </div>
            </dl>

            <GhostText size="clamp(64px, 8vw, 132px)" className="stage__ghost">
              {num}
            </GhostText>
          </aside>

          {/* Stage: framed art */}
          <div className="stage__art-col">
            <Frame className="stage__frame" hoverable={false}>
              <div
                className={`stage__art${zoomed ? ' stage__art--zoomed' : ''}`}
                ref={artRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              >
                <ScanLine key={scanKey} active={!shouldReduceMotion} />
                {!imgError ? (
                  <img
                    src={entry.image}
                    alt={title}
                    className="stage__image"
                    decoding="async"
                    draggable="false"
                    style={{ transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})` }}
                    onLoad={(e) => {
                      const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                      if (!w || !h) return;
                      const d = gcd(w, h);
                      setMeta({ w, h, rw: w / d, rh: h / d });
                    }}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="stage__image-fallback">
                    <span>{num}</span>
                  </div>
                )}
                {zoomed && <span className="stage__zoom-badge">{zoom.scale.toFixed(1)}×</span>}
              </div>

              <div className="stage__zoom" role="group" aria-label="Zoom controls">
                <button
                  className="stage__icon-btn"
                  onClick={() => stepZoom(-0.5)}
                  disabled={!zoomed}
                  aria-label="Zoom out"
                >
                  <span aria-hidden="true">−</span>
                </button>
                <button
                  className="stage__icon-btn"
                  onClick={resetZoom}
                  disabled={!zoomed}
                  aria-label="Reset zoom"
                >
                  <span aria-hidden="true">1:1</span>
                </button>
                <button
                  className="stage__icon-btn"
                  onClick={() => stepZoom(0.5)}
                  disabled={zoom.scale >= MAX_ZOOM}
                  aria-label="Zoom in"
                >
                  <span aria-hidden="true">+</span>
                </button>
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

        {/* ── Filmstrip: neighbours in the active filtered list ── */}
        {entries.length > 1 && (
          <div className="stage__strip" ref={stripRef} role="group" aria-label="Browse entries">
            {entries.map((item, i) => {
              const id = isOperator ? item.number : String(item.id);
              const label = isOperator ? item.name : item.title;
              const active = id === (isOperator ? String(num) : String(entry.id));
              return (
                <button
                  key={id}
                  className={`stage__thumb${active ? ' stage__thumb--active' : ''}`}
                  onClick={() => !active && onSelect?.(item)}
                  aria-current={active ? 'true' : undefined}
                  aria-label={`${String(i + 1).padStart(2, '0')} ${label}`}
                  title={label}
                >
                  <img src={item.image} alt="" loading="lazy" draggable="false" />
                  <span className="stage__thumb-num">{String(i + 1).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>
        )}

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
