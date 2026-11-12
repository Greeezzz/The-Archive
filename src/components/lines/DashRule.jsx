import { motion, useReducedMotion } from 'motion/react';

/**
 * L2 — dashed rule that reveals along its own axis.
 *
 * clip-path is safe here because the element is decorative and has no
 * IntersectionObserver attached to it (a clipped wrapper with whileInView
 * reports a zero-area intersection and never fires — that is what broke the
 * Archive grid on narrow viewports).
 */
export default function DashRule({
  vertical = false,
  hi = false,
  delay = 0,
  className = '',
}) {
  const reduce = useReducedMotion();
  const from = vertical ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)';

  const classes = [
    'dash-rule',
    vertical ? 'dash-rule--v' : '',
    hi ? 'dash-rule--hi' : '',
    className,
  ].filter(Boolean).join(' ');

  if (reduce) {
    return <span className={classes} aria-hidden="true" />;
  }

  return (
    <motion.span
      className={classes}
      aria-hidden="true"
      initial={{ clipPath: from }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}
