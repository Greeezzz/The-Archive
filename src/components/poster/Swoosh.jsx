import { motion, useReducedMotion } from 'motion/react';

/**
 * L11 — poster swoosh: thick arrow/curve with a signal→lime gradient.
 *
 * The only allowed gradient besides scrims (DESIGN.md §5). Draws on via
 * clip-path, then settles; no loop.
 */
export default function Swoosh({ className = '', delay = 0 }) {
  const reduce = useReducedMotion();

  return (
    <span className={`swoosh ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 320 120" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id="swoosh-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--signal)" />
            <stop offset="100%" stopColor="var(--lime)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M4 96 C 70 92, 96 22, 176 30 C 244 37, 262 74, 316 46"
          fill="none"
          stroke="url(#swoosh-grad)"
          strokeWidth="26"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay, ease: [0.76, 0, 0.24, 1] }}
        />
      </svg>
    </span>
  );
}
