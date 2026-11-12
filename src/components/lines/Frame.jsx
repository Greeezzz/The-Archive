import { useEffect, useRef, useState } from 'react';

/**
 * L5 — dashed frame with four square corner handles.
 *
 * Handles pop in staggered once the frame enters the viewport. The observer
 * watches the frame itself, and nothing on this element clips its own box, so
 * the intersection area is real (see DashRule for the failure mode).
 */
export default function Frame({
  children,
  className = '',
  as: Component = 'div',
  hoverable = true,
  handles = true,
  ...props
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (old browser / jsdom): reveal immediately.
    if (typeof IntersectionObserver === 'undefined') {
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '-10% 0px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = [
    'frame',
    hoverable ? 'frame--hoverable' : '',
    inView ? 'is-in' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} ref={ref} {...props}>
      {handles && (
        <>
          <span className="frame__h frame__h--tl" aria-hidden="true" />
          <span className="frame__h frame__h--tr" aria-hidden="true" />
          <span className="frame__h frame__h--br" aria-hidden="true" />
          <span className="frame__h frame__h--bl" aria-hidden="true" />
        </>
      )}
      {children}
    </Component>
  );
}
