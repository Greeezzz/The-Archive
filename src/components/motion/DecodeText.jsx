import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_+-[];:';

export default function DecodeText({
  text = '',
  duration = 600,
  delay = 0,
  className = '',
  as: Component = 'span',
}) {
  const [displayText, setDisplayText] = useState(text);
  const [prevText, setPrevText] = useState(text);
  const animRef = useRef(null);
  const timeoutRef = useRef(null);

  if (prevText !== text) {
    setPrevText(text);
    setDisplayText(text);
  }

  useEffect(() => {
    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !text) {
      return;
    }

    const startAnimation = () => {
      const length = text.length;
      const startTime = performance.now();

      const frame = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const revealedCount = Math.floor(progress * length);

        let scrambled = '';
        for (let i = 0; i < length; i++) {
          if (text[i] === ' ' || text[i] === '\n') {
            scrambled += text[i];
          } else if (i < revealedCount) {
            scrambled += text[i];
          } else {
            scrambled += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplayText(scrambled);

        if (progress < 1) {
          animRef.current = requestAnimationFrame(frame);
        } else {
          setDisplayText(text);
        }
      };

      animRef.current = requestAnimationFrame(frame);
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [text, duration, delay]);

  return (
    <Component className={className} aria-label={text}>
      <span aria-hidden="true">{displayText}</span>
    </Component>
  );
}
