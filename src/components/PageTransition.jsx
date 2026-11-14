import { motion, useReducedMotion } from 'motion/react';
import { ease } from '../lib/motion';
import './PageTransition.css';

/**
 * Route transition: a yellow/black slab wipes across (DESIGN.md §5, M1 v2).
 *
 * `AnimatePresence mode="wait"` serialises the two halves - the old page must
 * finish exiting before the new one mounts - so the user waits COVER + REVEAL.
 * Keep that sum under ~500ms or a click feels like it did nothing.
 */
const COVER = 0.16;   // exit: slabs sweep in over the old page
const REVEAL = 0.22;  // enter: slabs sweep out, revealing the new page
const LEAD = 0.04;    // ink trails the signal slab so the wipe reads as two strokes

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
      className="pt-wrapper"
      /* Hold the exit window open only as long as the slabs need; no opacity
         fade on the wrapper, since the slabs already cover everything. */
      exit={{ opacity: 1, transition: { duration: COVER + LEAD } }}
    >
      <motion.span
        className="pt-slab pt-slab--ink"
        initial={{ scaleX: 1 }}
        animate={{
          scaleX: 0,
          transition: { duration: REVEAL, ease: ease.inOut, delay: LEAD },
        }}
        exit={{ scaleX: 1, transition: { duration: COVER, ease: ease.inOut, delay: LEAD } }}
        aria-hidden="true"
      />
      <motion.span
        className="pt-slab pt-slab--signal"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: REVEAL, ease: ease.inOut } }}
        exit={{ scaleX: 1, transition: { duration: COVER, ease: ease.inOut } }}
        aria-hidden="true"
      />
      <motion.div
        className="pt-content"
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          /* Settle in as the slab clears rather than under it. */
          transition: { duration: 0.34, ease: ease.out, delay: REVEAL * 0.35 },
        }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
