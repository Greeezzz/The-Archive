import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../lib/motion';
import './PageTransition.css';

/**
 * Route transition: a yellow/black slab wipes across (DESIGN.md §5, M1 v2).
 *
 * Two stacked slabs offset in time read as one mechanical wipe. Reduced motion
 * collapses to a 150ms fade with no slab at all.
 */
export default function PageTransition({ children }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="pt-wrapper"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: dur.ui, ease: ease.out }}
      className="pt-wrapper"
    >
      <motion.span
        className="pt-slab pt-slab--ink"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: dur.page, ease: ease.inOut }}
        aria-hidden="true"
      />
      <motion.span
        className="pt-slab pt-slab--signal"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: dur.page, ease: ease.inOut, delay: 0.06 }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}
