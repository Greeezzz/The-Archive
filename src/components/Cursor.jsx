import React, { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const pos      = useRef({ x: 0, y: 0 });
  const ring     = useRef({ x: 0, y: 0 });
  const raf      = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onDown = () => {
      dotRef.current?.classList.add('cursor__dot--click');
      ringRef.current?.classList.add('cursor__ring--click');
    };
    const onUp = () => {
      dotRef.current?.classList.remove('cursor__dot--click');
      ringRef.current?.classList.remove('cursor__ring--click');
    };

    // Hover on clickables
    const onEnter = () => ringRef.current?.classList.add('cursor__ring--hover');
    const onLeave = () => ringRef.current?.classList.remove('cursor__ring--hover');

    const clickables = 'a, button, [role="button"], .card';
    document.querySelectorAll(clickables).forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // Ring follows with lerp
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor__dot" />
      <div ref={ringRef} className="cursor__ring" />
    </>
  );
}