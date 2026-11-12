import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../../lib/motion';

/**
 * L12 — poster bracket title.
 *
 * Four heavy L-corners grow out of their own corner first, then the title
 * resolves. Decorative brackets are aria-hidden; the text is real.
 */
export default function BracketTitle({ children, as: Component = 'h1', className = '' }) {
  const reduce = useReducedMotion();

  const corner = (pos, originClass) => (
    <motion.span
      className={`bracket__corner bracket__corner--${pos}`}
      aria-hidden="true"
      initial={reduce ? false : { scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: dur.ui, ease: ease.out }}
      style={{ transformOrigin: originClass }}
    />
  );

  return (
    <Component className={`bracket ${className}`.trim()}>
      {corner('tl', 'top left')}
      {corner('tr', 'top right')}
      {corner('bl', 'bottom left')}
      {corner('br', 'bottom right')}
      <span className="bracket__text">{children}</span>
    </Component>
  );
}
