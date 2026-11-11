import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../../lib/motion';

export default function Reveal({
  children,
  delay = 0,
  duration = dur.panel,
  className = '',
  as = 'div',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return (
      <MotionComponent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className={className}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      initial={{
        opacity: 0,
        y: 12,
        clipPath: 'inset(0 100% 0 0)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0% 0 0)',
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: ease.out,
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
