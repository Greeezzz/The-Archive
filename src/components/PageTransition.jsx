import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../lib/motion';
import './PageTransition.css';

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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: dur.ui, ease: ease.out }}
      className="pt-wrapper"
    >
      <motion.div
        className="pt-wipe"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: dur.page, ease: ease.inOut }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}