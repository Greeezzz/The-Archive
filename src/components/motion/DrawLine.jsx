import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../../lib/motion';

export default function DrawLine({
  className = '',
  orientation = 'horizontal',
  delay = 0,
  duration = dur.panel,
  style = {},
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const isHorizontal = orientation === 'horizontal';

  const initial = isHorizontal ? { scaleX: 0 } : { scaleY: 0 };
  const animate = isHorizontal ? { scaleX: 1 } : { scaleY: 1 };
  const origin = isHorizontal ? 'left' : 'top';

  if (shouldReduceMotion) {
    return (
      <div
        className={className}
        style={{
          ...style,
          transformOrigin: origin,
          transform: isHorizontal ? 'scaleX(1)' : 'scaleY(1)',
        }}
        {...props}
      />
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={{
        duration,
        delay,
        ease: ease.out,
      }}
      style={{
        ...style,
        transformOrigin: origin,
      }}
      {...props}
    />
  );
}
