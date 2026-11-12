import { motion, useReducedMotion } from 'motion/react';

/**
 * L3 — solid draw-on via SVG pathLength.
 *
 * `pathLength` is animated on a *solid* stroke; never on a dashed one, because
 * it overrides stroke-dasharray (LINES.md §1 L3 note).
 */
export default function DrawLine({
  d = 'M0 0.5 H100',
  viewBox = '0 0 100 1',
  delay = 0,
  duration = 0.8,
  className = '',
  ...props
}) {
  const reduce = useReducedMotion();

  return (
    <svg
      className={className}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
      />
    </svg>
  );
}
